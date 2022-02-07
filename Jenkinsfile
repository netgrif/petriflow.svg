pipeline {
  agent any
  options {
    disableConcurrentBuilds()
  }
  tools {
    nodejs 'localNodeJS'
  }
  stages {

    stage('Install Dependencies') {
      steps {
        script {
          packageJson = readJSON(file: 'package.json')
        }
        echo 'Installing dependencies'
        sh '''
          npm install
          mkdir -p coverage/application-builder
        '''
      }
    }

    stage('Tests') {
      parallel {
        stage('Lint') {
          steps {
            echo 'Starting ts-lint'
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              sh 'npx ng lint --format=junit > coverage/application-builder/lint.junit.xml'
              junit 'coverage/application-builder/lint.junit.xml'
            }
          }
        }

        stage('Unit Test') {
          steps {
            echo 'Starting tests using karma and jasmine'
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              sh 'npm run test application-builder'
              junit 'coverage/application-builder/JUNITX-test-report.xml'
            }
          }
        }

        stage('E2E Test') {
          steps {
            echo 'Starting end-to-end tests using protractor'
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              sh 'npm run e2e'
              junit 'coverage/application-builder/protractor-e2e.junit.xml'
            }
          }
        }
      }
    }

    stage('Sonar') {
      steps {
        echo 'Sent to SonarQube to analyse'
        sh 'npm run builder:sonar:ci'
      }
    }

    stage('Increase version') {
      when {
        expression { BRANCH_NAME ==~ /(master|dev)/ }
      }
      steps {
        script {
          versionIncrease = "prerelease"
          if(BRANCH_NAME == "master") {
            def slackBlocks = [
              [ "type":"header",
                "text":[ "type":"plain_text",
                         "text":"Application Builder production release is waiting for user input :exclamation:",
                         "emoji":true
                ]
              ],
              [ "type":"section",
                "text":[ "type":"mrkdwn",
                         "text":"Build will wait until *${java.time.LocalDateTime.now().plusHours(1)}*"
                ],
                "accessory": [
                  "type": "button",
                  "text": [
                    "type": "plain_text",
                    "text": "Open Build :totok:",
                    "emoji": true
                  ],
                  "url": "${BUILD_URL}"
                ]
              ]
            ]
            slackSend(channel:"#petriflow", blocks:slackBlocks)
            timeout(time: 1, unit: "HOURS"){
              versionIncrease = input(
                message: "What kind of release type is this release build?",
                ok: "Confirm",
                parameters: [
                  choice(name: 'release-types', choices: ['major', 'minor', 'patch'], description: 'Release type')
                ])
            }
          }
        }
        echo "Increasing project version from ${packageJson['version']} to next ${BRANCH_NAME == 'master' ? versionIncrease + ' release' : versionIncrease}"
        sh "npm version ${versionIncrease} -m 'Increase version to %s'"
      }
    }

    stage('Build') {
      steps {
        echo 'Starting building Application Builder app'
        sh 'npm run builder:build:prod'
      }
    }

    stage('Publish') {
      when {
        expression { BRANCH_NAME ==~ /(master|dev)/ }
      }
      parallel {
        stage('Deploy') {
          steps {
            script {
              deployFolder = "/sub/builder/${BRANCH_NAME}"
              deployURL = "https://builder.netgrif.com/"
              if (BRANCH_NAME == "dev") {
                deployFolder = "/sub/next.builder"
                deployURL = "https://next.builder.netgrif.com/"
              } else if (BRANCH_NAME == "master") {
                deployFolder = "/sub/builder"
              }
            }
            echo "App will be deployed to ${deployURL}"
            sshPublisher(
              publishers: [
                sshPublisherDesc(
                  configName: 'netgrif.com',
                  transfers: [
                    sshTransfer(
                      cleanRemote: true,
                      excludes: '',
                      execCommand: '',
                      execTimeout: 120000,
                      flatten: false,
                      makeEmptyDirs: false,
                      noDefaultExcludes: false,
                      patternSeparator: '[, ]+',
                      remoteDirectory: "${deployFolder}",
                      remoteDirectorySDF: false,
                      removePrefix: 'dist/application-builder',
                      sourceFiles: 'dist/application-builder/**')],
                  usePromotionTimestamp: false,
                  useWorkspaceInPromotion: false,
                  verbose: true)])
          }
        }

        stage('Push changes') {
          steps {
            echo "Pushing repository changes"
            sh '''
              git push origin ${BRANCH_NAME}
              git push --tags origin ${BRANCH_NAME}
            '''
          }
        }
      }
    }
  }

  post {

    always {
      echo 'See build results'
    }

    success {
      script {
          if(BRANCH_NAME ==~ /(master|dev)/) {
            DATETIME_TAG = java.time.LocalDateTime.now().toString().replace(':','_')
            zip zipFile: "NETGRIF-Application_Builder-${packageJson['version']}-Frontend-${DATETIME_TAG}.zip", archive: false, dir: 'dist/application-builder'
            archiveArtifacts artifacts:"NETGRIF-Application_Builder-${packageJson['version']}-Frontend-${DATETIME_TAG}.zip", fingerprint: true
          }
      }
      echo 'There is no artifacts for PR builds!'
    }

    unstable {
        echo 'Build ended up unstable'
    }

    failure {
        echo 'Build has failed'
    }
  }
}
