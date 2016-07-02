# Musicomp
[![Build Status][travis-ci-image]][travis-ci-url] [![Code Climate][code-climate-image]][code-climate-url] [![Coverage Status][coveralls-image]][coveralls-url]

[travis-ci-url]: https://travis-ci.org/sunnee5150/musicomp
[travis-ci-image]: https://api.travis-ci.org/sunnee5150/musicomp.svg

[code-climate-url]: https://codeclimate.com/github/sunnee5150/musicomp
[code-climate-image]: https://codeclimate.com/github/sunnee5150/musicomp/badges/gpa.svg

[coveralls-url]: https://coveralls.io/github/sunnee5150/musicomp?branch=master
[coveralls-image]: https://coveralls.io/repos/github/sunnee5150/musicomp/badge.svg?branch=master
 
## Description
Service to provide a band with a way to compose song ideas in a structured format

## TODO
1. Add proper code coverage with jasmine (server & client)
	a. getSongs mock - how do you mock if there is a searchObj or none?
	b. 4 errors from test-server
	c. 
2. UI functional requirements
	a. 
	b. 
	c. 
	d. 
3. Add travis CI support, code coverage, & code climate information?
4. 
5. (OPT)arrange page needs refresh to display correct song
6. (OPT)refactor bundle task/compileSass/pipeMaterialCss to use globals
7. (OPT)Refactor ArrangeCtrl using lodash
8. (OPT)Make sure create controller is updating URI with section change

#### sample config.js
module.exports = {

    databaseUrl: "YOUR DB URL HERE",
    databaseStartCommand: "YOUR START COMMAND HERE"

};

### turn on production mode
`npm --isProduction=true start`

