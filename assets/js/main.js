function centerMaindiv() {
var top = Math.floor(($(window).height() / 2) / 20) * 20;
var left = Math.floor(($(window).width() / 2) / 20) * 20;

$("#character-div").css('top', top);
$("#character-div").css('left', left);
$("#character-div").show();
}

$(window).on('load', function() {
  centerMaindiv();
});

var speed = 20;
var keyspeed = 50;
var backgroundcolor = "rgb(255, 255, 255)";

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

  if(!!character.collision(".bad-div")[0]) {
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
  $("<div class='bad-div'></div>")
  .css("top",  Math.floor(Math.random()*($(window).height() - 40) / 20) * 20)
  .css("background", backgroundcolor)
  .appendTo("#main-div");
}

function endGame() {
  $(".bad-div").remove();
  $("#character-div").hide();
  centerMaindiv();
}

setInterval(function(){
  let colornumbers = [];

  for (let x = 0; x < 3; x++) {
    colornumbers[x] = Math.floor((Math.random() * 255) + 20);
  }

  backgroundcolor = "rgb("+colornumbers.join()+")";
}, 3000);

setInterval(function(){
   newDiv();
}, 100);

setInterval(function(){
   $(".bad-div").each(function(){
     if($(this).position().left > $(window).width() - 60) {
       $(this).remove();
     }

     moveRight($(this));

     if(!!$(this).collision("#character-div")[0]) {
       endGame();
     }

   });
}, 50);
