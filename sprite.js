function Sprite(x, y, imgSrc, frame_width, frame_height, width, height) {
    this.frame = {
        width: frame_width,
        height: frame_height
    };
    this.dirs = {
        up: 0,
        right: 96,
        down: 196,
        left: 288
    };
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.xvel = 0;
    this.yvel = 0;
    this.isMoving = false;
    this.fps = 10;
    this.framecounter = 0;
    this.frame_x = 72;
    this.frame_y = this.dirs.down;

    this.image = new Image();
    this.image.ready = false;
    this.image.onload = function() {
        this.ready = true;
    }
    this.image.src = imgSrc;

    this.update = function() {

        if(this.framecounter >= this.fps && this.isMoving) {
            this.frame_x += this.frame.width;
            if (this.frame_x >= 216) {
                this.frame_x = 0;
            }
            this.framecounter = 0;
        }
        if(this.isMoving) {
            this.framecounter++;
            this.x += this.xvel;
            this.y += this.yvel;
        }
    }


    this.draw = function() {
        cx.drawImage(this.image, this.frame_x, this.frame_y,this.frame.width,this.frame.height,this.x,this.y,this.width,this.height);   
        cx.strokeStyle = "#0E0";
        cx.strokeRect(this.x, this.y, this.width, this.height);
    }

    this.keydown = function(code) {
        if(code == Keys["RIGHT_ARROW"]) {
            this.xvel = 1;
            this.isMoving = true;
            this.frame_y = this.dirs.right;
            
        }
        else if(code == Keys["LEFT_ARROW"]) {
            this.xvel = -1;
            this.isMoving = true;
            this.frame_y = this.dirs.left;
        }

        if(code == Keys["UP_ARROW"]) {
            this.yvel = -1;
            this.isMoving = true;
            this.frame_y = this.dirs.up;
        }
        else if(code == Keys["DOWN_ARROW"]) {
            this.yvel = 1;
            this.isMoving = true;
            this.frame_y = this.dirs.down;
        }        
    }.bind(this);

    this.stop = function() {
        this.xvel = 0;
        this.yvel = 0;
        this.frame_x = 72;
        this.isMoving = false;
    }

    this.keyup = function(code) {
        if(code == Keys["RIGHT_ARROW"]) {
            this.stop();
        }
        if(code == Keys["LEFT_ARROW"]) {
            this.stop();
        }

        if(code == Keys["UP_ARROW"]) {
            this.stop();
        }
        if(code == Keys["DOWN_ARROW"]) {
            this.stop();
        }        
    }.bind(this);
}