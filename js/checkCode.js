/** 
* This file has the functions for:
*   - parsing JS (using Acorn.js)
*   - checking the JS code against the rules
*/

var code = "var answer = 42;"

// Checks to see if the program has all of the required elements
// Returns an array with any possible errors
function checkWhitelist(whitelist) {
  console.log(acorn.parse(code));
}


// Checks to see if the program has any of the blacklisted elements
// Returns an array with any possible errors
function checkBlacklist(blacklist) {

}


// Checks to see if the program matches the required structure
// Returns an array with any possible errors
function checkStructure(structure) {

}


// Checks to see if the program meets all of the requirements
// Returns an array with any possible errors
function checkAllRules() {

}
