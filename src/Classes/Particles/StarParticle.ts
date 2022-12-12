import Particle from "./Particle";

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
export default class StarParticle {
    private stars: Particle[] = []
    constructor() {
        for (let i = 0; i < 100; i++) {
            this.stars.push(new Particle({
                position: {
                    x: Math.random() * canvas!.width,
                    y: Math.random() * canvas!.height
                },
                velocity: {
                    x: 0,
                    y: 1
                },
                radio: Math.random() * 3,
                color: "white",
                fades: true
            }))
        }

        // super({ position, velocity, radio, color, fades })
    }

    private draw() {
        for (const star of this.stars) {
            const [x, y] = star.getPosition()
            c!.save();
            c!.globalAlpha = star.getOpacity();
            c!.beginPath();
            c!.arc(x, y, star.getRadio(), 0, 2 * Math.PI);
            c!.fillStyle = star.getColor();
            c!.fill();
            c!.closePath();
            c!.restore()
        }
    };
    updateStar() {
        this.draw()

        for (const star of this.stars) {
            const [, y] = star.getPosition()
            const r = star.getRadio()
            if (y - r >= canvas!.height) {
                star.updatePosition({ x: Math.random() * canvas!.width })
                star.updatePosition({ y: 0 })
            }
            star.update()
        }
    }

}