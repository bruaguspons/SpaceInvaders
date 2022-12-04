import Invader from './Invader'
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

export default class Grid {

    constructor() {
        let columns = Math.ceil(Math.random() * 7 + 3);
        if (innerWidth < 500) {
            columns = Math.ceil(Math.random() + 3);
        }
        let rows = Math.ceil(Math.random() * 4 + 2);
        if (innerWidth < 500) {
            rows = Math.ceil(Math.random() * 2 + 1);
        }

        const colors = ['red', 'blue', 'green']
        const numRand = Math.floor(Math.random() * 3) % 3
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 3,
            y: 0
        }
        this.invaders = []


        this.width = 50 * columns;
        this.height = 40 * rows;

        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < columns; i++) {
                this.invaders.push(new Invader({
                    position: {
                        x: 50 * i,
                        y: 40 * j
                    }, color: colors[numRand]
                }))
            }
        };
    }
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.y = 0;

        if (this.position.x >= canvas.width - this.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 40;
        }
    }
}