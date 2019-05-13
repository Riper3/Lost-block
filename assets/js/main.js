document.onkeydown = moveBlock;

function moveBlock(e) {

  e = e || window.event;

  var character = $("#character-div");
  var position = character.position();

  if (e.keyCode == '38' && position.top != 0) {
    character.css("top", position.top - 10);
  }
  else if (e.keyCode == '40' && position.top < $(window).height() - 45) {
    character.css("top", position.top + 10);
  }
  else if (e.keyCode == '37' && position.left != 0) {
    character.css("left", position.left - 10);
  }
  else if (e.keyCode == '39' && position.left < $(window).width() - 50) {
    character.css("left", position.left + 10);
  }
}
