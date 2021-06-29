![CI](https://github.com/iamgilvan/ImageRotation/workflows/CI/badge.svg)
### RGB Image Rotate
This project executes rotation on RGBA image considering ImageData objects, besides that supporting ImageData rotation in browsers.

___

#### Prerequisites

To get the most out of this tutorial you should already have a basic understanding of the following.

* Node
* Git
* Yarn

___
#### Usage

~~~shell
$ git clone https://github.com/iamgilvan/ImageRotation.git
$ cd ImageRotation
$ yarn
$ yarn build
~~~

___

#### Performance Test

This project has been used the `Jest` and `window.performance` API to be executed in a browser context. The performance test was executed on file `test/performance.test.js` and the outcome are displayed below:

~~~shell
...
[0628/123745.308904:INFO:CONSOLE(17)] "rotate [PERFORMANCE][ImageDataRotator#rotate] 2x3 run-time takes: ~0.03500", source: __puppeteer_evaluation_script__ (17)
[0628/123745.314697:INFO:CONSOLE(17)] "rotate [PERFORMANCE][ImageDataRotator#rotate] 4x6 run-time takes: ~0.06500", source: __puppeteer_evaluation_script__ (17)
[0628/123745.319142:INFO:CONSOLE(17)] "rotate [PERFORMANCE][ImageDataRotator#rotate] 8x12 run-time takes: ~0.12000", source: __puppeteer_evaluation_script__ (17)
[0628/123745.341945:INFO:CONSOLE(17)] "rotate [PERFORMANCE][ImageDataRotator#rotate] 16x24 run-time takes: ~0.45000", source: __puppeteer_evaluation_script__ (17)
[0628/123745.389186:INFO:CONSOLE(17)] "rotate [PERFORMANCE][ImageDataRotator#rotate] 64x96 run-time takes: ~1.64000", source: __puppeteer_evaluation_script__ (17)
...
~~~

___
#### Local Development

Below is a list of commands you will probably find useful.

### `yarn start`

Runs the project in development/watch mode. The project will be rebuilt upon changes with special logger for your convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

### `yarn build`

Bundles the package to the `dist` folder.

### `yarn build && yarn test`

Bundles the package and runs unit, functional and performance tests. Note, the functional tests depend on a target bundled package to test, so that's why we build first!

### `yarn test:watch`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

### `yarn test:coverage`

Runs the tests and tell Jest to collect coverage information and report it to the output.

### `yarn lint`

Runs ESlint with Prettier on source and test .ts files.

___


- [x] Support for 90 degrees right-wards rotation via ImageDataRotator#rotate
- [x] Basic (Node-only) unit testing with Jest
- [x] Linting pipeline with ESlint and Prettier.
- [x] Functional tests with [Pupeteer](https://github.com/puppeteer/puppeteer) and Jest
- [x] Code coverage support
- [x] Performance testing support
- [x] Refactor naive degree/angle input validation and usage in src/index.ts
- [x] Support naive right-wards rotation greater than 90 degrees
- [x] Support naive left-wards rotation (-ve angle)
- [x] Refactor naive degree/angle input validation and usage in src/index.ts
- [x] Automated [CI build pipeline] (https://github.com/iamgilvan/ImageRotation/actions) (GitHub actions)
- [ ] Add package to NPM registry or create and deploy an API on heroku
- [ ] Improve rotation algo implementation (perhaps via array reversal approach)