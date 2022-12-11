import { SpaceValuesPosition } from "../types/SpaceValues";
import Particle from "./Particle";

const colors = ['orangered', 'violet', 'crimson']
const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
export default class PlayerProjectile extends Particle {

    constructor({ position, velocity, colorNum }: { position: SpaceValuesPosition, velocity: SpaceValuesPosition, colorNum: number }) {
        super({ position, velocity, radio: 5, color: colors[colorNum] })

    }
    draw() {
        const [x, y] = super.getPosition()
        c!.beginPath();
        c!.arc(x, y, super.getRadio(), 0, 2 * Math.PI);
        c!.closePath();
        c!.fillStyle = super.getColor();
        c!.fill();
    };
    updatePlayerProjectile() {
        this.draw()
        super.update()
    }
}