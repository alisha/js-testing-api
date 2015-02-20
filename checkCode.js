/** 
* This file has the functions for:
*   - designing rules
*   - parsing JS (using [API])
*   - checking the JS code against the rules
*/

var whitelist = []; // program must have these elements
var blacklist = []; // program must not have these elements
var structure = {}; // rough structure of program's elements
var program; // the program - an abstract syntax tree object


// Updates the local list of rules to check the program against
//   whitelistRules and blacklistRules are string arrays
//   structureRules is an object
function getRules(whitelistRules, blacklistRules, structureRules) {

}


// Updates program to be abstract syntax tree object using the Acorn API
//   code is a string of JS code
function parseCode(code) {

}


// Checks to see if the program meets the requirements
function checkRules() {

}
