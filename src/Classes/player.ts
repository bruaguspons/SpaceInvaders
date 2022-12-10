import ship1 from '../img/ship1.png'
import ship2 from '../img/ship2.png'
import ship3 from '../img/ship3.png'
import Ship from './Ship'
import { SpaceValuesDimentions, SpaceValuesPosition } from './types/SpaceValues'
const ships = [ship1, ship2, ship3]

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");

let scale = 0.30;
if (innerWidth < 500) {
    scale = 0.20
}
export default class Player extends Ship {
    private rotation: number
    constructor(shipNum: number) {
        super({ img: ships[shipNum], color: "orange", scale: scale })
        this.rotation = 0;
    }
    datos() {
        const [x, y] = super.getPosition()
        console.log([x, y])
    }
    draw() {
        const [x, y] = super.getPosition()
        const [w, h] = super.getDimentions()
        c!.save()
        c!.globalAlpha = super.getOpacity()
        c!.translate(
            x + w / 2,
            y + h / 2
        );
        c!.rotate(this.rotation);
        c!.translate(
            -x - w / 2,
            -y - h / 2
        );

        c!.drawImage(super.getImage(), x, y, w, h);
        c!.restore();
    }
    UpdatePlayer({ velocity, opacity, dimentions }: { velocity?: SpaceValuesPosition, opacity?: number, dimentions?: SpaceValuesDimentions }) {
        super.update({ velocity, opacity, dimentions })
        this.draw()
    }
    updateRotation(rotation: number) {
        this.rotation = rotation
    }
}