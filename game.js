//Started with http://www.gaminglogy.com/tutorial/draw-image/index.php
//Filed in the blanks with some game concepts from Earthbound, for fun
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
var spy = 200;

var svx = 0;
var svy = 0;

var popup = false;
var popup_text_offsetx = 5;
var popup_text_offsety = 10;
var popup_cursor_x = 9;
var popup_cursor_y = 20;
var popup_wait = false;

var talkpopup = false;
var talkpopup_text = "";

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
    document.addEventListener("keyup",function(e) {
        keyup(e.keyCode);
    },false);
    document.addEventListener("keydown", function(e) {
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

function doAction(actionID) {
    switch(actionID) {
        case 0:
            talkpopup_text = "Who are you talking to?";
            talkpopup = true;
            popup_wait = true;
        break;

        case 1:
            talkpopup_text = "You cant use any PSI now.";
            talkpopup = true;
            popup_wait = true;
        break;

        case 2:
            talkpopup_text = "No Problem here.";
            talkpopup = true;
            popup_wait = true;
        break;
    }
}

function keydown(code) {
    if(!popup) {
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
    } else if(popup && !talkpopup && !popup_wait) {
        if(code == Keys["DOWN_ARROW"]) {
            popup_cursor_y += 30;
        }
        else if(code == Keys["UP_ARROW"]) {
            popup_cursor_y -= 30;
        }
    }

    //Menu / Confirm key
    if(code == Keys["KEY_Z"]) {
        //Nothing shown
        if(!popup) {
            popup = true;
            isMoving = false;
            sprite_frame_x = 72;

        }

        //Menu shown and item selected
        else if(popup && !talkpopup) {
            var selection = Math.floor(popup_cursor_y / 30);
            doAction(selection);
            popup_wait = true;
        }

        //Menu shown and item selected and waiting
        else if(popup && talkpopup && popup_wait) {
            popup = false;
            popup_wait = false;
            talkpopup = false;
            popup_cursor_y = 20;
        }
    }
    //Cancel / Back key
    if(code == Keys["KEY_X"]) {
        if(popup) {
            popup = false;
            popup_wait = false;
            talkpopup = false;
            popup_cursor_y = 20;
        }
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
        spx = spx += svx;
        spy = spy += svy;
    }

    if(popup_cursor_y >= 90) {
        popup_cursor_y = 20;
    }
    else if(popup_cursor_y < 20) {
        popup_cursor_y = 20 + (30 * 2);
    }

}

function draw() {
    cx.fillStyle = "#555";
    cx.fillRect(0,0,width, height);

    cx.fillStyle = "black";
    cx.font = "14px Consolas";
    cx.fillText("Sprite Counter: " + sprite_counter,5,200);

    cx.drawImage(spritesheet, sprite_frame_x, sprite_frame_y,CHAR_WIDTH,CHAR_HEIGHT,spx,spy,30,40);
    if(popup) {

        //Popup
        cx.strokeStyle = "grey";
        cx.lineWidth = 3;
        cx.fillStyle = "black";
        cx.fillRect(5,5,200,100);
        cx.strokeRect(5,5,200,100);

        //Cursor
        cx.fillStyle = "orange";
        cx.fillRect(popup_cursor_x, popup_cursor_y,2,5);

        //Items
        cx.fillStyle = "white";
        cx.font = "16px Consolas";
        cx.fillText("Talk to",popup_text_offsetx + 10, popup_text_offsety + 20);
        cx.fillText("PSI",popup_text_offsetx + 10, popup_text_offsety + 50);
        cx.fillText("Check",popup_text_offsetx + 10, popup_text_offsety + 80);

        if(talkpopup) {
            //Talk Window
            cx.strokeStyle = "grey";
            cx.lineWidth = 3;
            cx.fillStyle = "black";
            cx.fillRect(175,10,250,150);
            cx.strokeRect(175,10,250,150);
            //Draw Text
            cx.fillStyle = "white";
            cx.font = "15px Consolas";
            cx.fillText(talkpopup_text,175 + 10, 10 + 20);

            
        }


    }

    update();
    requestAnimationFrame(draw);
}


init();
requestAnimationFrame(draw);
