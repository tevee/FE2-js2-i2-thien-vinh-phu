/**
 * Thien Vinh Phu, 2024
 * (c) CC BY - https://creativecommons.org/licenses/by/4.0/
 *
 * Scrum Board
 * Backend for Scrum Board
 * Backend handles database
 * Backend uses express to create server, API and handle requests
 * Backend also uses express validator for POST requests
 * Backend handles error for status 400 for POST requests and 404 for remaining requests
 */

import {app} from "./src/server.js"

app.listen(3000, () => {
    console.log('Listening on port 3000 ...');
})