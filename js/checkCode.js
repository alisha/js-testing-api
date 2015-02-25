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
* Returns the root node of the tree
* Parameters:
*   - code: the string of JavaScript to be parsed
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
*   - node: the root node of a tree representing the program
*   - whitelist: an array of elements the program must contain
*/
function passesWhitelist(node, whitelist) {
  return checkWhitelist(node, whitelist).length == 0;
}


/**
* Returns an array of error messages for missing whitelist elements
* Parameters:
*   - node: the root node of a tree representing the program
*   - whitelist: an array of elements the program must contain
*/
function whitelistErrors(node, whitelist) {
  var elements = checkWhitelist(node, whitelist);
  
  if (typeof elements == 'undefined' || elements.length === 0) {
    elements = ["Your program includes all of the required elements! Hooray!"];
  } else {
    for (var i = 0; i < elements.length; i++) {
      elements[i] = "The program does not include a(n) " + elements[i];
    }
  }

  return elements;
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
*   - node: the root node of a tree representing the program
*   - blacklist: an array of elements the program must not have
*/
function passesBlacklist(node, blacklist) {
  return checkWhitelist(node, blacklist, []).length == 0;
}


/**
* Returns an array of error messages for present blacklisted elements
* Parameters:
*   - node: the root node of a tree representing the program
*   - blacklist: an array of elements the program must not have
*/
function blacklistErrors(node, blacklist) {
  var elements = checkBlacklist(node, blacklist, []);
  
  if (typeof elements == 'undefined' || elements.length === 0) {
    elements = ["Your program does not include any of prohibited elements! Go you!"];
  } else {
    for (var i = 0; i < elements.length; i++) {
      elements[i] = "The program should not include a(n) " + elements[i];
    }
  }

  return elements;
}


/**
* Checks to see if the program matches the required structure
* Returns true if meets the structure
* Parameters:
*   - node: the root node of a tree representing the program
* Note: this function is not completely working
*/
function checkStructure(node, structure) {
  if (node.elementName == structure.elementName) {
    for (var i = 0; i < node.children.length; i++) {
      for (var j = 0; j < structure.children.length; j++) {
        checkStructure(node.children[i], structure.children[j]);
      }
    }
  }
}


/**
* Returns an array of error messages for the whitelisted and blacklisted elements
* Parameters:
*   - node: the root node of a tree representing the program
*   - whitelist: an array of elements the program must contain
*   - blacklist: an array of elements the program must not have
*/
function allErrors(node, whitelist, blacklist) {
  return whitelistErrors(node, whitelist).concat(blacklistErrors(node, blacklist));
}
