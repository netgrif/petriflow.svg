# Petri.SVG

[![GitHub](https://img.shields.io/github/license/netgrif/petriflow.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![npm dev dependency version (scoped)](https://img.shields.io/npm/dependency-version/@netgrif/petri.svg/dev/typescript?label=Typescript)](https://www.typescriptlang.org/)
[![Petriflow 1.0.1](https://img.shields.io/badge/Petriflow-1.0.1-0aa8ff)](https://petriflow.com)
[![npm (scoped)](https://img.shields.io/npm/v/@netgrif/petri.svg)](https://www.npmjs.com/package/@netgrif/petri.svg)
[![npm](https://img.shields.io/npm/dt/@netgrif/petri.svg)](https://www.npmjs.com/package/@netgrif/petri.svg)
[![build](https://github.com/netgrif/petriflow.svg/actions/workflows/master-build.yml/badge.svg)](https://github.com/netgrif/petriflow.svg/actions/workflows/release-build.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=netgrif_petriflow.svg&metric=alert_status)](https://sonarcloud.io/dashboard?id=netgrif_petriflow.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/netgrif/petri.svg/badge.svg)](https://snyk.io/test/github/netgrif/petri.svg)

> Visual library for Petri Net objects

Petri.SVG is a Typescript library for visual representation of [Petri Net](https://en.wikipedia.org/wiki/Petri_net)
objects. The library is for rendering and
modeling Petri Net objects as SVG elements. The library consists of classes that represents SVG elements of Petri Net
components.

## Install

First, make sure you have installed the latest version of Node.js and npm with it (You may need to restart your computer
after this step).

You can install it with the following command:

```shell
npm install --save @netgrif/petri.svg
```

### Requirements

Currently, the library **only supports browser applications** because **
requires [DOM Web API](https://www.w3.org/DOM/DOMTR)** to correctly process Petriflow files.
It can be used in Node.js environments with the latest release of the [jsdom](https://github.com/jsdom/jsdom) library
installed.

## Reporting issues

If you find a bug, let us know. First, please read
our [Contribution guide](https://github.com/netgrif/petriflow.js/blob/master/CONTRIBUTING.md)

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use these files except in compliance with
the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "
AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the License for the specific language governing permissions and limitations under the
License.
