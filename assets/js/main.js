function centerMaindiv() {
var top = Math.floor(($(window).height() / 2) / 20) * 20;
var left = Math.floor(($(window).width() / 2) / 20) * 20;

$("#character-div").css('top', top);
$("#character-div").css('left', left);
}

$(window).on('load', function() {
  centerMaindiv();
});

function moveTop(element) {
  element.css("top", element.position().top - 20);
}

function moveBot(element) {
  element.css("top", element.position().top + 20);
}

function moveLeft(element) {
  element.css("left", element.position().left - 20);
}

function moveRight(element) {
  element.css("left", element.position().left + 20);
}

document.onkeydown = moveBlock;

function moveBlock(e) {

  e = e || window.event;

  var character = $("#character-div");
  var position = character.position();

  if (position.top > 0 && e.keyCode == '38' || e.keyCode == '87' && position.top > 0) {
    moveTop(character);
  }
  else if (position.top < $(window).height() - 60 && e.keyCode == '40' || e.keyCode == '83'
           && position.top < $(window).height() - 50) {
    moveBot(character);
  }
  else if (position.left > 0 && e.keyCode == '37' || e.keyCode == '65' && position.left > 0) {
    moveLeft(character);
  }
  else if (position.left < $(window).width() - 60 && e.keyCode == '39' || e.keyCode == '68'
           && position.left < $(window).width() - 50) {
    moveRight(character);
  }

  if(typeof character.collision(".bad-div")[0] !== 'undefined') {
    endGame();
  }
}

function newDiv() {
  var div = $("<div class='bad-div'></div>");
  div.css("top",  Math.floor(Math.random()*($(window).height() - 40) / 20) * 20);
  div.appendTo("#main-div");
}

function endGame() {
  $(".bad-div").remove();
  centerMaindiv();
}

setInterval(function(){
   newDiv();
}, 300);

setInterval(function(){
   $(".bad-div").each(function(){
     if($(this).position().left > $(window).width() - 60) {
       $(this).remove();
     }

     moveRight($(this));

     if(typeof $(this).collision("#character-div")[0] !== 'undefined') {
       endGame();
     }

   });
}, 100);
