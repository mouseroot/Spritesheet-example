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

//TalkWindow
var talkwindow;


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
    player = new Sprite(250,200,"spritesheet2.png",72,96,30,40);
    talkwindow = new TalkWindow(175,10);
    popup = new Popup(5,5);
    popup.setTalkWindow(talkwindow);
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


function keydown(code) {
    if(!popup.visible) {
        player.keydown(code);
        if(code == Keys["KEY_Z"]) {
            popup.visible = !popup.visible;
        }
    }
    else {
        popup.keydown(code);
        talkwindow.keydown(code);
    }
}

function update() {

    //Animate Sprite
    player.update();

}

function draw() {
    cx.fillStyle = "#555";
    cx.fillRect(0,0,width, height);

    //Floor
    cx.lineWidth = 2;
    cx.strokeStyle = "black";
    cx.strokeRect(floor.x, floor.y, floor.width, floor.height);

    //Player
    player.draw();

    //Popup
    popup.draw();

    //TalkWindow
    talkwindow.draw();

    update();
    requestAnimationFrame(draw);
}


init();
requestAnimationFrame(draw);
