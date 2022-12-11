import Invader from './ships/Invader'
import { SpaceValuesPosition } from './types/SpaceValues';
const canvas = document.querySelector("canvas");
// const c = canvas!.getContext("2d");



export default class Grid {
    private position: SpaceValuesPosition
    private velocity: SpaceValuesPosition
    private invaders: Invader[]
    private width: number
    // private height: number
    constructor() {
        let columns: number = Math.ceil(Math.random() * 7 + 3);
        if (innerWidth < 500) {
            columns = Math.ceil(Math.random() + 3);
        }
        let rows: number = Math.ceil(Math.random() * 4 + 2);
        if (innerWidth < 500) {
            rows = Math.ceil(Math.random() * 2 + 1);
        }

        const colors = ['red', 'blue', 'green']
        const numRand: number = Math.floor(Math.random() * 3) % 3
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
        // this.height = 40 * rows;

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

        if (this.position.x >= canvas!.width - this.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 40;
        }
    }
    getInvader(ind: number) {
        return this.invaders[ind]
    }
    deleteInvader(ind: number) {
        this.invaders.splice(ind, 1)
    }
    getLength() {
        return this.invaders.length
    }
    getAllInvaders() {
        return this.invaders
    }
    getVelocity() {
        return this.velocity
    }
}