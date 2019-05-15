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
var keyspeed = 50;

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

var interval;
var repeatkey = 0;
var changekey = 0;

$(document).keydown(function(e){
  var character = $("#character-div");

  if(repeatkey != e.keyCode && repeatkey != 0) {
    repeatkey = 0;
    changekey = 1;
    clearInterval(interval);
  }

  if(repeatkey == 0) {

  repeatkey = e.keyCode;

    if (e.keyCode == '38' || e.keyCode == '87') {
      interval = setInterval(function() {
              moveTop(character);
          }, keyspeed);
    }
    else if (e.keyCode == '40' || e.keyCode == '83') {
      interval = setInterval(function() {
              moveBot(character);
          }, keyspeed);
    }
    else if (e.keyCode == '37' || e.keyCode == '65') {
      interval = setInterval(function() {
              moveLeft(character);
          }, keyspeed);
    }
    else if (e.keyCode == '39' || e.keyCode == '68') {
      interval = setInterval(function() {
                  moveRight(character);
          }, keyspeed);
    }
  }

  if(typeof character.collision(".bad-div")[0] !== 'undefined') {
    endGame();
  }
})
.keyup(function(e){
  if(changekey != 1) {
  repeatkey = 0;
  clearInterval(interval);
  }
  else {
    changekey = 0;
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
}, 200);

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
