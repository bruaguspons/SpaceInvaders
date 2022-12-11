import { chooseShip } from "../../main";
import InvaderProjectile from "../Classes/Particles/InvaderProjectile"
import ParticleExplotion from "../Classes/Particles/ParticleExplotion";
import Player from "../Classes/ships/player"
import Ship from "../Classes/ships/Ship";
import { startGame } from "../StartGame";

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");


function createParticles(object: Ship, particlesExplotions: ParticleExplotion[]) {
    const [x, y] = object.getPosition()
    const [w, h] = object.getDimentions()
    for (let i = 0; i < 10; i++) {
        particlesExplotions.push(new ParticleExplotion({
            position: {
                x: x + w / 2,
                y: y + h / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radio: Math.random() * 3 + 3,
            color: object.getColor()

        }))
    }
}

// invaderShoots
export const invaderShoot = (invaderProjectiles: InvaderProjectile[], player: Player, game: any, shipNum: number, numScore: number, particlesExplotions: ParticleExplotion[]) => {
    invaderProjectiles.forEach((invaderProjectile, index) => {
        const [xPlayer, yPlayer] = player.getPosition()
        const [wPlayer, hPlayer] = player.getDimentions()
        const [xProjectile, yProjectile] = invaderProjectile.getPosition()
        const [wProjectile, hProjectile] = invaderProjectile.getDimentions()

        if (yProjectile >= canvas!.height) {
            invaderProjectiles.splice(index, 1)
        } else {
            invaderProjectile.updateInvaderProjectile();

        }
        if (
            yProjectile + hProjectile >= yPlayer &&
            yProjectile <= yPlayer + hPlayer &&
            xProjectile + (2 * wProjectile) >= xPlayer &&
            xProjectile <= xPlayer + wPlayer
        ) {
            invaderProjectiles.splice(index, 1)
            createParticles(player, particlesExplotions)
            player.UpdatePlayer({
                opacity: 0, dimentions: {
                    w: 0,
                    h: 0
                }
            });
            game.over = true;

            setTimeout(() => {
                game.active = false
                document.querySelector('#app')!.innerHTML += `
                    <div id="GO">
                        <h2>Game Over</h2>
                        <p>Your Score is: ${numScore} </p>
                        <button id="playAgain">Play Again</button>
                        <button id='ship'>Choose Ship</button>
                    </div>
                `
                document.getElementById('ship')!.addEventListener('click', () => {
                    document.querySelector('#GO')!.remove()
                    document.querySelector('#scoreBox')!.remove()
                    if (innerWidth < 500) document.querySelector('#mobil')!.remove()
                    c!.clearRect(0, 0, canvas!.width, canvas!.height)
                    chooseShip()
                })
                document.querySelector('#playAgain')!.addEventListener("click", () => {
                    c!.clearRect(0, 0, canvas!.width, canvas!.height)
                    startGame(shipNum)
                    // console.log("hola")
                    // game.active = true
                    // game.over = false
                    // invaderProjectiles = []
                    // grids = []
                    // grids.push(new Grid());
                    // player.reset()
                    // loop()
                    // score.innerHTML = 0
                    // responstive()
                })
            }, 2000)
        }

    })
}

export const particlesExplotion = (particlesExplotions: ParticleExplotion[]) => {
    // particles from explotion
    particlesExplotions.forEach((particle, index) => {
        if (particle.getOpacity() <= 0.01) {
            particlesExplotions.splice(index, 1)
        } else { particle.updateExplotion(); }

    });
}