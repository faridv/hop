# HOP

[![Build Status](https://travis-ci.org/faridv/hop.svg?branch=master)](https://travis-ci.org/faridv/hop)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7d4955cc21e2453388e1fef337a24056)](https://app.codacy.com/app/faridv/hop?utm_source=github.com&utm_medium=referral&utm_content=faridv/hop&utm_campaign=Badge_Grade_Dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/03df719cdd9acbb1322f/maintainability)](https://codeclimate.com/github/faridv/hop/maintainability)
[![Dependencies](https://david-dm.org/faridv/hop/status.svg)](https://david-dm.org/faridv/hop)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/faridv/hop/raw/master/LICENSE)

<h3 align="center">
HbbTV Open Platform - A TypeScript platform for creating fast and optimized HbbTV apps
</h3>

### Important note
Currently, HOP is highly under development and some features might change in future releases. Make sure that your code won't break after update.

## Roadmap
You can check out the roadmap here. We happily welcome any suggestions or requests.
Please refer to [contribution documentation](https://github.com/faridv/hop/blob/master/.github/CONTRIBUTING.md) if you want to provide a fix or create a pull request.

## To install
clone the repo and simply run `npm install`.

## To run
For development, run `npm run start` and then open `localhost:3000`. You can use [FireFox add-on](https://addons.mozilla.org/en-US/firefox/addon/hybridtvviewer/) or any other tools to preview and debug your application.
For production, run `npm run build:prod` and copy the contents of `dist` folder to your web server.

## Tests
Test are being done using both Karma+Jasmine and Cypress. Currently I've added Cypress as a dependency in `package.json` thus installing the application might take a while, since Cypress will download and install its binaries. You can remove Cypress from dependencies if it takes to long to install the application.

### Browser Tests
This application is being tested using BrowserStack.

<a href="https://www.browserstack.com" target="_blank" title="BrowserStack">
	<img width="250" src="https://p14.zdusercontent.com/attachment/1015988/T9xPfWK3jeCpq4jAw3Eb0xo66?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..SmZuUZvaL7M8qtX6AXUc9g.ScXz5PUZKRwpR2qogyEEjMSHtqCIH0iXktOC5_D4qSrkGBHj1p-wjy0xvs9eB7jpF3-S9w5d8rKo6BR2GIpQG_r9h9WK7UTrl3xT51eHDeXyVFL3TdpMRgIpFkceZzs2drLBJN8C2ubHhU0t2F9i2rJPuCXOoVTjIT9rXbGbLd5DiHcOjrG20hV_vY1e6QSJa5hDx5fniFfMKpchGtssdMg4zVIsyHBFdvBiAlQhmRBQD31FmkMK2ESOm0-qGcfRdQTTyq8N8L5bWAD7epPZCbWxMp3aGdt0fyr0TBYEzv4.tJM-NnNqZx0tewAF6cC1tA" />
</a>
