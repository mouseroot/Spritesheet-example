var canvas =  document.getElementById("display");
var cx = canvas.getContext("2d");

var width = 640;
var height = 480;

var spritesheet = new Image();
    spritesheet.ready = false;
    spritesheet.onload = function() {
        this.ready = true;
    }
    spritesheet.src = "spritesheet2.png";


var CHAR_WIDTH = 72,
	CHAR_HEIGHT = 96,
	SPRITE_WIDTH = 216;

var sprite_up_y = 0;
var sprite_right_y = 96;
var sprite_down_y = 196;
var sprite_left_y = 288;

var sprite_frame_x = 0;
var sprite_frame_y = sprite_down_y;
var isMoving = false;
var sprite_fps = 10;
var sprite_counter = 0;

var spx = 0;
var spy = 0;

var svx = 0;
var svy = 0;

var popup = false;

var Keys = {
  "UP_ARROW": 38,
  "DOWN_ARROW": 40,
  "LEFT_ARROW": 37,
  "RIGHT_ARROW": 39,
  "KEY_Z": 90,
  "KEY_X": 88,
  "RETURN": 13,
  "ESCAPE": 27,
  "SPACE": 32
}

function init() {
    document.addEventListener("keyup",function(e){
        keyup(e.keyCode);
    },false);
    document.addEventListener("keydown", function(e){
        keydown(e.keyCode);
    },false);
}

function keyup(code) {
    if(code == Keys["RIGHT_ARROW"]) {
        svx = 0;
        svy = 0;
        sprite_frame_x = 72;
        isMoving = false;
    }
    if(code == Keys["LEFT_ARROW"]) {
        sprite_frame_x = 72;
        isMoving = false;
        svx = 0;
        svy = 0;
    }

    if(code == Keys["UP_ARROW"]) {
        isMoving = false;
        sprite_frame_x = 72;
        svx = 0;
        svy = 0;
    }
    if(code == Keys["DOWN_ARROW"]) {
        isMoving = false;
        sprite_frame_x = 72;
        svx = 0;
        svy = 0;
    }
}

function keydown(code) {
    if(code == Keys["RIGHT_ARROW"]) {
        svx = 1;
        isMoving = true;
        sprite_frame_y = sprite_right_y;
        
    }
    else if(code == Keys["LEFT_ARROW"]) {
        svx = -1;
        isMoving = true;
        sprite_frame_y = sprite_left_y;   
    }

    if(code == Keys["UP_ARROW"]) {
        svy = -1;
        isMoving = true;
        sprite_frame_y = sprite_up_y;
    }
    else if(code == Keys["DOWN_ARROW"]) {
        svy = 1;
        isMoving = true;
        sprite_frame_y = sprite_down_y;
    }

    if(code == Keys["KEY_Z"]) {
        popup = !popup;
    }
}

function update() {

    //Animate Sprite
    
    if(sprite_counter >= sprite_fps && isMoving) {
        sprite_frame_x += CHAR_WIDTH;
        if (sprite_frame_x >= SPRITE_WIDTH) {
            sprite_frame_x = 0;
        }
        sprite_counter = 0;
    }
    if(isMoving) {
        sprite_counter++;
    }
    
    spx = spx += svx;
    spy = spy += svy;
}

function draw() {
    cx.fillStyle = "#555";
    cx.fillRect(0,0,width, height);

    cx.fillStyle = "black";
    cx.font = "14px Consolas";
    cx.fillText("Sprite Counter: " + sprite_counter,5,200);

    cx.drawImage(spritesheet, sprite_frame_x, sprite_frame_y,CHAR_WIDTH,CHAR_HEIGHT,spx,spy,30,40);
    if(popup) {
        cx.strokeStyle = "grey";
        cx.lineWidth = 2;
        cx.fillStyle = "black";
        cx.fillRect(5,5,300,150);
        cx.strokeRect(5,5,300,150);
    }

    update();
    requestAnimationFrame(draw);
}


init();
requestAnimationFrame(draw);
