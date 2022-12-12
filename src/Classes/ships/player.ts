import ship1 from '../../img/ship1.png'
import ship2 from '../../img/ship2.png'
import ship3 from '../../img/ship3.png'
import Ship from './Ship'
import { SpaceValuesDimentions, SpaceValuesPosition } from './../types/SpaceValues'
const ships = [ship1, ship2, ship3]
const colors = ['orangered', 'violet', 'crimson']
const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");

let scale = 0.30;
if (innerWidth < 500) {
    scale = 0.20
}
export default class Player extends Ship {
    private rotation: number
    constructor(shipNum: number) {
        super({ img: ships[shipNum], color: colors[shipNum], scale: scale })
        this.rotation = 0;
    }

    private draw(): void {
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
    UpdatePlayer({ velocity, opacity, dimentions }: { velocity?: SpaceValuesPosition, opacity?: number, dimentions?: SpaceValuesDimentions }): void {
        super.update({ velocity, opacity, dimentions })
        this.draw()
    }
    updateRotation(rotation: number): void {
        this.rotation = rotation
    }
    playerMoveZone(keys: { ArrowLeft: boolean, ArrowRight: boolean }) {
        const [wPlayer,] = this.getDimentions()

        const [x,] = this.getPosition()
        if (keys.ArrowLeft && x >= 0) {
            this.UpdatePlayer({ velocity: { x: -7, y: 0 } })
            this.updateRotation(-0.20);
        } else if (keys.ArrowRight && x <= canvas!.width - wPlayer) {
            this.UpdatePlayer({ velocity: { x: 7, y: 0 } })
            this.updateRotation(0.20);
        } else {
            this.UpdatePlayer({ velocity: { x: 0, y: 0 } })
            this.updateRotation(0);
        };
    }
    // disableControllers(bool: boolean) {
    //     const handleDisable = (e: any) => {
    //         e.stopPropagation();
    //         e.preventDefault();
    //     }
    //     if (bool) {

    //         document.addEventListener('touchstart', handleDisable, true);
    //         document.addEventListener('touchend', handleDisable, true);
    //         document.addEventListener("keydown", handleDisable, true);
    //         document.addEventListener("keyup", handleDisable, true);
    //     } else {
    //         document.removeEventListener('touchstart', handleDisable, true);
    //         document.removeEventListener('touchend', handleDisable, true);
    //         document.removeEventListener("keydown", handleDisable, true);
    //         document.removeEventListener("keyup", handleDisable, true);
    //     }

    // }
}