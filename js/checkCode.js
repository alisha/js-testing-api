/** 
* This file has the functions for:
*   - parsing JS (using Acorn.js)
*   - checking the JS code against the rules
*/


/**
* A Node is an element of the program
* Programs will be stored as a tree using Nodes
* Parameters:
*    - description: the type of program element (e.g. "WhileStatement")
*    - children: array of Nodes representing elements inside the current Node
*/
var Node = function(description) {
  this.description = description;
  this.children = [];
}


/**
* Returns a tree of nodes representing a program
* Parameters:
*   - currentNode: the root node of the program
*   - acornObj: the AST that Acorn.js returns when parsing code
*/
function createProgramTree(currentNode, acornObj) {
  // if program element has children (stored in 'body' or 'consequent')
  if (acornObj['body'] || acornObj['consequent']) {
    var childrenElements = acornObj['consequent'] ? acornObj['consequent'] : acornObj['body'];
    
    // if children are stored in an array, loop through all children
    if (Object.prototype.toString.call(childrenElements) === '[object Array]') {
      for (var i = 0; i < childrenElements.length; i++) {
        var currentChild = childrenElements[i];
        var child = new Node(currentChild['type']);
        currentNode.children.push(child);
        createProgramTree(child, childrenElements[i]);
      }
    } 
    
    // for one child element
    else {
      var child = new Node(childrenElements['type']);
      currentNode.children.push(child);
      createProgramTree(child, childrenElements);
    }
  } 

  // return program tree when finished
  else {
    return currentNode;
  }
}


/**
* Uses Acorn to store a program as a tree
* Each node consists of: 
*   - a description (e.g. "WhileStatement")
*   - an array of child nodes
*/
function parseCode(code) {
  var root = new Node(""); // root node of the program
  return createProgramTree(root, acorn.parse(code));
}

// Checks to see if the program has all of the required elements
// Returns an array with any possible errors
function checkWhitelist(code, whitelist) {
  
}


// Checks to see if the program has any of the blacklisted elements
// Returns an array with any possible errors
function checkBlacklist(code, blacklist) {

}


// Checks to see if the program matches the required structure
// Returns an array with any possible errors
function checkStructure(code, structure) {

}


function checkAllRules(code, whitelist, blacklist, structure) {
  
}