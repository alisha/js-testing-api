/** 
* This file has the functions for:
*   - parsing JS (using Acorn.js)
*   - checking the JS code against the rules
*/


/**
* A Node is an element of the program
* Programs will be stored as a tree using Nodes
* Parameters:
*    - elementName: the type of program element (e.g. "WhileStatement")
*    - children: array of Nodes representing elements inside the current Node
*/
var Node = function(elementName) {
  this.elementName = elementName;
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
        createProgramTree(child, currentChild);
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
* Uses Acorn to store a program as a tree in a root node
*/
function parseCode(code) {
  var root = new Node(""); // root node of the program
  createProgramTree(root, acorn.parse(code));
  return root;
}


/**
* Checks to see if the program has all of the required elements
* Returns all required elements that are not in the program
* Parameters:
*   - node: the root node of a tree representing the program
*   - whitelist: an array of elements the program must contain
*/
function checkWhitelist(node, whitelist) {
  // validation?

  if (typeof whitelist === 'undefined') {
    return whitelist;
  }

  var index = whitelist.indexOf(node.elementName);
  if (index != -1) {
    whitelist.splice(index, 1);
  }

  if (node.children.length != 0) {
    for (var i = 0; i < node.children.length; i++) {
      whitelist = checkWhitelist(node.children[i], whitelist);
    }
  }

  return whitelist;
}


/**
* Checks to see if the program has all of the required elements
* Returns true if the program meets whitelisted requirements, false if not
* Parameters:
*   - code: a tree of nodes representing the program
*   - whitelist: an array of elements the program must contain
*/
function passesWhitelist(code, whitelist) {
  return checkWhitelist(code, whitelist).length == 0;
}


/**
* Checks to see if the program has any of the prohibited elements
* Returns all blacklisted elements that are in the program
* Parameters:
*   - node: the root node of a tree representing the program
*   - blacklist: an array of elements the program must not have
*   - errors: an array of blacklisted elements in the program
*             should be passed as an empty array; used inside the function only
*/
function checkBlacklist(node, blacklist, errors) {
  // validation?

  if (blacklist.indexOf(node.elementName) != -1) {
    errors.push(node.elementName);
  }

  if (node.children.length != 0) {
    for (var i = 0; i < node.children.length; i++) {
      errors = checkBlacklist(node.children[i], blacklist, errors);
    }
  }

  return errors;
}


/**
* Checks to see if the program has any of the prohibited elements
* Returns true if the program doesn't have any blacklisted elements, false otherwise
* Parameters:
*   - code: a tree of nodes representing the program
*   - blacklist: an array of elements the program must not have
*/
function passesBlacklist(code, blacklist) {
  return checkWhitelist(code, blacklist, []).length == 0;
}


// Checks to see if the program matches the required structure
// Returns an array with any possible errors
function checkStructure(code, structure) {

}


function checkAllRules(code, whitelist, blacklist, structure) {

}