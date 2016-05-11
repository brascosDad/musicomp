# Musicomp
 
## Description
Service to provide a band with a way to compose song ideas in a structured format

## TODO
1. Add proper code coverage with jasmine (server & client)
2. Complete the remaining UI functional requirements
	a. edit section DONE
	b. create new from DONE
	c. delete functionality
3. Add travis CI support, code coverage, & code climate information?
4. Cleanup package.json dependencies
5. Make sure create controller is updating URI with section change
6. Fix issues where toggling between sections within create controller resets blocks

#### sample config.js
module.exports = {

    databaseUrl: "YOUR DB URL HERE",
    databaseStartCommand: "YOUR START COMMAND HERE"

};

### turn on production mode
`npm --isProduction=true start`

