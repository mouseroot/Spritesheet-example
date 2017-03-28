//Started with http://www.gaminglogy.com/tutorial/draw-image/index.php
//Filed in the blanks with some game concepts from Earthbound, for fun
var canvas =  document.getElementById("display");
var cx = canvas.getContext("2d");

var width = 640;
var height = 480;

//Sprite
var player;

//Popup
var popup;

/*
var popup = false;
var popup_text_offsetx = 5;
var popup_text_offsety = 10;
var popup_cursor_x = 9;
var popup_cursor_y = 20;
var popup_wait = false;

var talkpopup = false;
var talkpopup_text = "";
*/

function RectCollision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    return true;
  } else {
    return false;
  }
}

var floor = {x: 250, y: 250, width: 300, height: 100};

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

    //Create the sprite
    player = new Sprite(5,200,"spritesheet2.png",72,96,30,40);

    popup = new Popup(5,5);
}

function keyup(code) {
    player.keyup(code);
}

CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {

    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {

        var words = lines[i].split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }

        this.fillText(line, x, y);
        y += lineHeight;
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
            var playerRect = {
                x: spx,
                y: spy,
                width: 30,
                height: 40
            };
            if(RectCollision(playerRect, floor)) {
                talkpopup_text = "For some strange reason there is a black floor outline here";
            } else {
                talkpopup_text = "No Problem here.";
            }
            talkpopup = true;
            popup_wait = true;
        break;
    }
}

/*
function keydown(code) {
    player.keydown(code);

    
    if(popup && !talkpopup && !popup_wait) {
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
*/

function keydown(code) {
    if(!popup.visible) {
        player.keydown(code);
        if(code == Keys["KEY_Z"]) {
            popup.visible = !popup.visible;
        }
    }
    else {
        popup.keydown(code);
    }
}

function update() {

    //Animate Sprite
    player.update();
    //player.move();

/*
    if(popup_cursor_y >= 90) {
        popup_cursor_y = 20;
    }
    else if(popup_cursor_y < 20) {
        popup_cursor_y = 20 + (30 * 2);
    }
*/
}

function draw() {
    cx.fillStyle = "#555";
    cx.fillRect(0,0,width, height);

    cx.fillStyle = "black";
    cx.font = "14px Consolas";
    cx.fillText("Sprite Counter: " + player.framecounter,5,200);

    //Floor
    //cx.lineWidth = 2;
    //cx.strokeStyle = "black";
    //cx.strokeRect(floor.x, floor.y, floor.width, floor.height);

    //Player
    //cx.drawImage(spritesheet, sprite_frame_x, sprite_frame_y,CHAR_WIDTH,CHAR_HEIGHT,spx,spy,30,40);
    player.draw();
    
    popup.draw();

    /*
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
            //cx.fillText(talkpopup_text,175 + 10, 10 + 20);
            cx.wrapText(talkpopup_text,175 + 10, 10 + 20,220,25);

            
        }


    }
    */

    update();
    requestAnimationFrame(draw);
}


init();
requestAnimationFrame(draw);
