// Original command
// sonar-scanner -Dsonar.projectKey=Modeler -Dsonar.sources=. -Dsonar.host.url=https://sonar.netgrif.com -Dsonar.login=e81d57cb61a670e6bfb54db6401a1d8639ccda71 -Dsonar.projectName="Builder - frontend"

const sonarqubeScanner = require('sonarqube-scanner');
const childProcess = require('child_process');
const fs = require('fs');

/* EDIT ONLY HERE */

const projectName = 'Application Builder - Frontend';
const projectKey = 'netgrif_modeler';
const organization = 'netgrif';
const lcovPath = 'coverage/builder/lcov.info';
const sources = 'src';
const exclusions = 'src/**/*.spec.ts,./src/scripts';

/* END OF EDIT ZONE */


/* DO NOT EDIT UNDER THIS LINE */

/* --------------------------- */
function fixLcovFileNames() {
    const filePath = lcovPath;
    try {
        let content = fs.readFileSync(filePath).toString().trim();
        if (!content || content.length === 0)
            return;
        console.log('Found valid lcov report file');

        const indexOfSF = content.indexOf('SF:');
        if (indexOfSF === -1)
            return;
        console.log('Found SF segment');

        console.log('Sanitizing path to Linux convention');
        content = content.replace(/\\/g, '/');

        if (content.substring(indexOfSF + 3, indexOfSF + (sources.length + 3)) !== sources) {
            console.log(`File path 'SF' does not start with '${sources}'`);
            const indexOfProject = content.indexOf(sources, indexOfSF);
            if (indexOfProject !== -1) {
                const unwanted = content.substring(indexOfSF + 3, indexOfProject);
                console.log(`Removing string ${unwanted}`);
                content = content.replace(new RegExp(unwanted, 'g'), '');
            }
        }

        console.log('Writing file');
        fs.writeFileSync(filePath, content);
    } catch (e) {
        console.log('Failed to open lcov file');
    }
}

fixLcovFileNames();
const scannerOptions = {
    'sonar.projectKey': projectKey,
    'sonar.projectName': projectName,
    'sonar.projectDescription': process.env.npm_package_description,
    'sonar.organization': organization,
    'sonar.projectVersion': process.env.npm_package_version,
    'sonar.sources': sources,
    'sonar.exclusions': exclusions,
    'sonar.javascript.lcov.reportPaths': lcovPath
    //'sonar.typescript.tslint.reportPaths': ''
};
if (process.env.BRANCH_NAME && !process.env.CHANGE_ID) {
    // it is branch build
    scannerOptions['sonar.branch.name'] = process.env.BRANCH_NAME;
    if (process.env.BRANCH_NAME !== 'master')
        scannerOptions['sonar.branch.target'] = process.env.BRANCH_NAME;
} else if (process.env.CHANGE_ID) {
    // it is PR build
    scannerOptions['sonar.pullrequest.branch'] = process.env.BRANCH_NAME;
    scannerOptions['sonar.pullrequest.base'] = process.env.CHANGE_TARGET;
    scannerOptions['sonar.pullrequest.key'] = process.env.CHANGE_ID;
}
sonarqubeScanner(
    {
        serverUrl: 'https://sonarcloud.io',
        token: '519254f55277af7d1c5d071c7dadf50b03f307f3',
        options: scannerOptions
    },
    () => process.exit()
);
