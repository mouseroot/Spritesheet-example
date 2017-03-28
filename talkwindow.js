function TalkWindow(x,y) {
    this.x = x;
    this.y = y;
    this.width = 250;
    this.height = 150;
    this.offset = {
        x: 10,
        y: 20
    };
    this.visible = false;
    this.wait = false;
    this.more = false;
    this.text = "";

    this.setText = function(txt) {
        this.text = txt;
    }

    this.draw = function() {
        if(this.visible) {
            cx.strokeStyle = "grey";
            cx.lineWidth = 3;
            cx.fillStyle = "black";
            cx.fillRect(this.x, this.y, this.width, this.height);
            cx.strokeRect(this.x, this.y, this.width, this.height);

            //Text
            cx.fillStyle = "white";
            cx.font = "15px Consolas";

            cx.wrapText(this.text, this.x + this.offset.x, this.y + this.offset.y,230,22);
        }
    }

    this.keydown = function(code) {
        if(code == Keys["KEY_Z"] && this.visible) {
            this.visible = false;
        }
        else if(code == Keys["KEY_Z"] && !this.visible) {
            this.visible = true;
        }
    }.bind(this);
}