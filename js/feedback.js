$(document).ready(function() {
  // set up code editor
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/solarized_light");
  editor.getSession().setMode("ace/mode/javascript");

  // update feedback whenever user types
  editor.on("change", function(e) {
    update(editor)
  });

  function update(editor) {
    setTimeout(function() {
      var feedback = allErrors(parseCode(editor.getValue()), ["ForStatement", "IfStatement"], ["WhileStatement"]);
      $('div#feedback').html('<ul><li>' + feedback.join('</li><li>') + '</li></ul>');
    })
  }

});