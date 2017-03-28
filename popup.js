function Popup(x,y) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 100;
    this.visible = false;
    this.selection = 0;
    this.text_offset = {
        x: 10,
        y: 10
    };
    this.cursor = {
        x: 10,
        y: 20,
        starty: 20
    };
    this.wait = false;

    this.draw = function() {
        if(this.visible) {
            //Popup
            cx.strokeStyle = "grey";
            cx.lineWidth = 3;
            cx.fillStyle = "black";
            cx.fillRect(this.x,this.y,this.width, this.height);
            cx.strokeRect(this.x,this.y,this.width, this.height);

            //Cursor
            cx.fillStyle = "white";
            cx.fillRect(this.cursor.x, this.cursor.y,5,5);

            //Items
            cx.fillStyle = "white";
            cx.font = "16px Consolas";
            cx.fillText("Talk to",this.text_offset.x + 10, this.text_offset.y + 20);
            cx.fillText("PSI",this.text_offset.x + 10, this.text_offset.y + 50);
            cx.fillText("Check",this.text_offset.x + 10, this.text_offset.y + 80);            
        }
    }

    this.reset = function() {
        this.visible = false;
        this.cursor.y = 20;
    }

    this.keydown = function(code) {

        //Confirm on Selection
        if(code == Keys["KEY_Z"] && this.visible) {
            this.selection = Math.floor(this.cursor.y / 30);
            console.log("Selection: " + this.selection);
        }
        //Cancel
        else if(code == Keys["KEY_X"] && this.visible) {
            this.reset();

        }

        if(code == Keys["DOWN_ARROW"]) {
            if(this.cursor.y >= 60) {
                this.cursor.y = this.cursor.starty;
            } else {
                this.cursor.y += 30;
            }
        }
        else if(code == Keys["UP_ARROW"]) {
            if(this.cursor.y <= this.cursor.starty) {
                this.cursor.y = 80;
            } else {
                this.cursor.y -= 30;
            }
        }

    }.bind(this);

    this.keyup = function(code) {

    }.bind(this);
}