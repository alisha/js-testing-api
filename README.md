# JavaScript Testing Framework

## Files

`checkCode.js` can parse a string of JavaScript code and determine whether it meets certain requirements. It can check for whitelist (required) program elements and for blacklist (prohibited) elements.

The JS code is stored as a tree, where each node represents one program element. I was not able to check the code against a given program structure. However, I would implement this as a comparison between 2 trees: the required structure and the actual code.

This file uses the Acorn.js to parse the string of JavaScript. I chose Acorn because it's [very fast](http://marijnhaverbeke.nl/blog/acorn.html). It also has good documentation, and the descriptions of different program elements are clear.

---

`feedback.js` can update an HTML page with feedback from `checkCode.js`. It also sets up the Ace code editor.

---

`index.html` has a sample challenge and provides feedback that updates as a user types their code into the code editor. 

---

The challenge and requirements are hardcoded in `index.html` and `feedback.js` because if this project were to be used, there should be an intermediate file to connect data from the actual challenges and these code checkers.

## Todo

* Checking a program's structure against a given structure
* Validation for the whitelist, blacklist, and structure
* Wrapper function for blacklist, so it can be called similarly to the whitelist function
* Combine the `checkCode.js` functions `whitelistErrors()` and `blacklistErrors()` into one function
