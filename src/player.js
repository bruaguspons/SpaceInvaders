import Ship1 from './img/ship3.png'

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

export default class Player {
    constructor() {

        this.velocity = 0;
        this.rotation = 0;
        this.color = "orange";
        this.opacity = 1;

        const image = new Image();
        image.src = Ship1;
        image.onload = () => {
            const scale = 0.30;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.image = image;
            this.position = {
                x: (canvas.width / 2) - (this.width / 2),
                y: canvas.height - this.height - 20
            };
        };
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        );
        c.rotate(this.rotation);
        c.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        );

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        c.restore();
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity;
        }
    }

}