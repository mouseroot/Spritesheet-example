function SpriteSheet(imgSrc,frame_width, frame_height) {
    this.image = new Image();
    this.image.ready = false;
    this.image.onload = function() {
        this.ready = true;
    }
    this.image.src = imgSrc;

    this.animate = function() {

    }

    this.move = function() {

    }

    this.draw = function() {
        
    }
}