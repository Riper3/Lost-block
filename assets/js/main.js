function centerMaindiv() {
var top = Math.floor(($(window).height() / 2) / 20) * 20;
var left = Math.floor(($(window).width() / 2) / 20) * 20;

$("#character-div").css('top', top);
$("#character-div").css('left', left);
}

$(window).on('load', function() {
  centerMaindiv();
});

var speed = 20;

function moveTop(element) {
  var position = element.position();
  if(position.top > 0) {
    element.css("top", position.top - speed);
  }

}

function moveBot(element) {
  var position = element.position();
  if(position.top < $(window).height() - 60) {
    element.css("top", position.top + speed);
  }
}

function moveLeft(element) {
  var position = element.position();
  if(position.left > 0) {
    element.css("left", position.left - speed);
  }
}

function moveRight(element) {
  var position = element.position();
  if(position.left < $(window).width() - 60) {
    element.css("left", position.left + speed);
  }
}

$(document).keydown(function(e){
  var character = $("#character-div");
  var position = character.position();

  if (e.keyCode == '38' || e.keyCode == '87') {
    moveTop(character);
  }
  else if (e.keyCode == '40' || e.keyCode == '83') {
    moveBot(character);
  }
  else if (e.keyCode == '37' || e.keyCode == '65') {
    moveLeft(character);
  }
  else if (e.keyCode == '39' || e.keyCode == '68') {
    moveRight(character);
  }

  if(typeof character.collision(".bad-div")[0] !== 'undefined') {
    endGame();
  }
});

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
