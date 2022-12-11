
import Grid from './Classes/GridInvader';
import StarParticle from './Classes/Particles/StarParticle';

import InvaderProjectile from './Classes/Particles/InvaderProjectile';
import { playerBehave, playerMoves, playerMoveZone } from './objectsBehave/playerBehave';
import ParticleExplotion from './Classes/Particles/ParticleExplotion';
import { invaderShoot, particlesExplotion } from './objectsBehave/InvaderBehave';

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");

canvas!.width = innerWidth;
canvas!.height = innerHeight
if (innerWidth < 500) canvas!.height = innerHeight - 2 * 80;

export const startGame = (shipNum: number) => {
    // variables
    const game = {
        over: false,
        active: true
    }
    const keys = {
        ArrowLeft: false,
        ArrowRight: false
    }
    const { player, playerProjectiles } = playerBehave(shipNum)


    const particlesExplotions: ParticleExplotion[] = [];

    // display score
    let numScore = 0;
    document.querySelector('#app')!.innerHTML += `
    <div id="scoreBox">Score: <span id="score">${numScore}</span></div>
    `
    const score = document.querySelector('#score')
    // display player controllers
    playerMoves(player, playerProjectiles, shipNum, game.over, keys)


    let grids: Grid[] = [];
    let invaderProjectiles: InvaderProjectile[] = [];

    const stars: StarParticle[] = []
    let frames = 0;
    let randomNumber = Math.ceil(Math.random() * 500 + 400);




    for (let i = 0; i < 100; i++) {
        stars.push(new StarParticle({
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


    function loop() {
        if (!game.active) return
        // background
        requestAnimationFrame(loop);
        c!.fillStyle = "black";
        c!.fillRect(0, 0, canvas!.width, canvas!.height)

        stars.forEach((star) => {
            const [, y] = star.getPosition()
            const r = star.getRadio()
            if (y - r >= canvas!.height) {
                star.updatePosition({ x: Math.random() * canvas!.width })
                star.updatePosition({ y: 0 })
            }
            star.updateStar()
        })


        // player
        playerMoveZone(player, keys)
        player.UpdatePlayer({});

        particlesExplotion(particlesExplotions)
        invaderShoot(invaderProjectiles, player, game, shipNum, numScore, particlesExplotions)

        playerProjectiles.forEach((projectile, index) => {
            const [, y] = projectile.getPosition()
            if (y + projectile.getRadio() <= 0) {
                playerProjectiles.splice(index, 1)
            } else {
                projectile.updatePlayerProjectile();
            }
        });

        grids.forEach((grid, gridIndex) => {
            grid.update()
            const InvadersLength = grid.getLength()
            if (frames % 50 == 0 && InvadersLength > 0) {
                grid.getInvader(Math.floor(Math.random() * InvadersLength)).shoot(invaderProjectiles)
            }

            grid.getAllInvaders().forEach((invader, index) => {
                invader.updateInvader({ velocity: grid.getVelocity() })
                const [xInvader, yInvader] = invader.getPosition()
                const [wInvader, hInvader] = invader.getDimentions()
                playerProjectiles.forEach((projectile, i) => {
                    const [x, y] = projectile.getPosition()
                    const r = projectile.getRadio()
                    if (
                        y >= yInvader &&
                        y + 2 * r <= yInvader + hInvader &&
                        x >= xInvader &&
                        x + 2 * r <= xInvader + wInvader

                    ) {
                        // createParticles(invader);
                        grid.deleteInvader(index)
                        playerProjectiles.splice(i, 1)
                        numScore += 100;
                        console.log(numScore)
                        score!.innerHTML = String(numScore)
                        console.log(score)
                    }
                })
            })
            if (grid.getLength() == 0) {
                grids.splice(gridIndex, 1);
            }
            if (grids.length === 0) {
                frames = randomNumber - 1
            }
        })


        // spawning enemies
        if (frames % randomNumber == 0) {
            grids.push(new Grid());
            randomNumber = Math.ceil(Math.random() * 500 + 800);
            frames = 0;

        }

        frames++;
    }

    loop();
}