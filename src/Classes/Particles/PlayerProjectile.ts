import Invader from "../ships/Invader";
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
    shootInvader(invader: Invader) {
        const [xInvader, yInvader] = invader.getPosition()
        const [wInvader, hInvader] = invader.getDimentions()
        const [x, y] = this.getPosition()
        const r = this.getRadio()
        if (y + this.getRadio() <= 0) {
            return {
                shoot: false,
                outScreen: true
            }
        }
        if (
            y >= yInvader &&
            y + 2 * r <= yInvader + hInvader &&
            x >= xInvader &&
            x + 2 * r <= xInvader + wInvader
        ) {
            return {
                shoot: true,
                outScreen: false
            }
        }
        return {
            shoot: false,
            outScreen: false
        }
    }
}