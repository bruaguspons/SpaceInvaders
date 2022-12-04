const canvas = document.querySelector("canvas");

export default class Ship {
    constructor({ position, img, color, scale }) {
        this.color = color;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.opacity = 1;
        const image = new Image();
        image.src = img;
        image.onload = () => {
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.image = image;
            this.position = {
                x: position?.x ?? (canvas.width / 2) - (this.width / 2),
                y: position?.y ?? canvas.height - this.height - 20
            };
        };
    }

    update({ velocity, opacity, dimentions }) {
        if (this.image) {
            this.draw()
            this.velocity.x = velocity?.x ?? this.velocity.x
            this.velocity.y = velocity?.y ?? this.velocity.y
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            this.opacity = opacity ?? this.opacity
            this.width = dimentions?.w ?? this.width
            this.height = dimentions?.h ?? this.height
        }
    }
    getPosition() {
        return [this.position.x, this.position.y]
    }
    getDimentions() {
        return [this.width, this.height]
    }
}