import InvaderImgB from '../../img/invaderB.svg'
import InvaderImgR from '../../img/invaderR.svg'
import InvaderImgG from '../../img/invaderG.svg'
import InvaderProjectile from './../Particles/InvaderProjectile';
import Ship from './Ship';
import { SpaceValuesDimentions, SpaceValuesPosition } from './../types/SpaceValues';
const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
const images = new Map()
images.set('blue', InvaderImgB)
images.set('red', InvaderImgR)
images.set('green', InvaderImgG)
let scale = 0.28;
if (innerWidth < 500) {
    scale = 0.2
}
export default class Invader extends Ship {
    constructor({ position, color }: { position: SpaceValuesPosition, color: string }) {
        super({ position, img: images.get(color), color, scale })
    }

    private draw(): void {
        const [x, y] = super.getPosition()
        const [w, h] = super.getDimentions()
        c!.drawImage(super.getImage(), x, y, w, h);
    }
    shoot(invaderProjectiles: InvaderProjectile[]): void {
        const [x, y] = super.getPosition()
        const [w, h] = super.getDimentions()
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: x + (w / 2),
                y: y + h
            },
            velocity: {
                x: 0,
                y: 5
            },
            color: super.getColor()
        }))
    }
    updateInvader({ velocity, opacity, dimentions }: { velocity?: SpaceValuesPosition, opacity?: number, dimentions?: SpaceValuesDimentions }): void {
        this.draw()
        super.update({ velocity, opacity, dimentions })
    }
}