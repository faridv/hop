<h1 align="center">HbbTV Open Platform</h1>
<h3 align="center">A TypeScript platform for creating fast and optimized HbbTV apps</h3>

[![Build Status](https://travis-ci.org/faridv/hop.svg?branch=master)](https://travis-ci.org/faridv/hop)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7d4955cc21e2453388e1fef337a24056)](https://app.codacy.com/app/faridv/hop?utm_source=github.com&utm_medium=referral&utm_content=faridv/hop&utm_campaign=Badge_Grade_Dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/03df719cdd9acbb1322f/maintainability)](https://codeclimate.com/github/faridv/hop/maintainability)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/faridv/hop/raw/master/LICENSE)

### Important note
Currently, HOP is highly under development and some features might change in future releases. Make sure that your code won't break after update.

## HOP-CLI
I have created another project called [hop-cli](https://github.com/faridv/hop-cli). which will help you create, develop and run you HOP-based application in no time. By using [hop-cli](https://github.com/faridv/hop-cli) you won't need documentations on installing and running of HOP.

## Roadmap
You can check out the project [roadmap](https://github.com/faridv/hop/wiki/Roadmap). We happily welcome any suggestions or requests.

## Contribution
Please refer to [contribution documentation](https://github.com/faridv/hop/blob/master/.github/CONTRIBUTING.md) if you want to provide a fix or create a pull request.

## To install
clone the repo and simply run `npm install`.

## To run
For development, run `npm run start` and then open `localhost:3000`. You can use [FireFox add-on](https://addons.mozilla.org/en-US/firefox/addon/hybridtvviewer/) or any other tools to preview and debug your application.
For production, run `npm run build:prod` and copy the contents of `dist` folder to your web server.

## Tests
Test are being done using both Karma+Jasmine and Cypress. Currently I've added Cypress as a dependency in `package.json` thus installing the application might take a while, since Cypress will download and install its binaries. You can remove Cypress from dependencies if it takes to long to install the application.

### Browser Tests
This application is being cross-browser tested using BrowserStack.

<a href="https://www.browserstack.com" target="_blank" title="BrowserStack">
	<img width="200" src="https://d2ogrdw2mh0rsl.cloudfront.net/production/images/static/header/header-logo.svg" />
</a>
