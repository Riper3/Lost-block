document.onkeydown = moveBlock;

function moveBlock(e) {

  e = e || window.event;

  var character = $("#character-div");
  var position = character.position();
  console.log(character.position());

  if (position.top > 10 && e.keyCode == '38' || e.keyCode == '87' && position.top > 10) {
    character.css("top", position.top - 10);
  }
  else if (position.top < $(window).height() - 55 && e.keyCode == '40' || e.keyCode == '83' && position.top < $(window).height() - 55) {
    character.css("top", position.top + 10);
  }
  else if (position.left > 10 && e.keyCode == '37' || e.keyCode == '65' && position.left > 10) {
    character.css("left", position.left - 10);
  }
  else if (position.left < $(window).width() - 50 && e.keyCode == '39' || e.keyCode == '68' && position.left < $(window).width() - 50) {
    character.css("left", position.left + 10);
  }
}
