# Musicomp
 
## Description
Service to provide a band with a way to compose song ideas in a structured format

## TODO
1. Add proper code coverage with jasmine (server & client)
2. Complete the remaining UI functional requirements
	a. edit section DONE
	b. create new from DONE
	c. delete functionality DONE
3. Add travis CI support, code coverage, & code climate information?
4. Cleanup package.json dependencies
5. Make sure create controller is updating URI with section change
6. Need to add save functionality to Arrange Ctrl functions
7. Refactor ArrangeCtrl using lodash
8. Use client-side songModel to build new section (since it's in 2 places)

#### sample config.js
module.exports = {

    databaseUrl: "YOUR DB URL HERE",
    databaseStartCommand: "YOUR START COMMAND HERE"

};

### turn on production mode
`npm --isProduction=true start`

