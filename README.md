For running tests
1. `npm install` in project root
2. `docker-compose up` you should see ` Listening on 3005` 

After installation and running Docker container:
1. `cd test/e2e`
2. `npm install`

Open cypress with UI
`npm run test`
after that should open Cypress interface where you can choose any test suite

if you want to run tests in headless mode
`npm run test:cli`


