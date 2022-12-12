import PlayerProjectile from '../Classes/Particles/PlayerProjectile';
import Player from '../Classes/ships/player';
import Aim from './../img/aim.svg'
import LeftArrow from './../img/left-arrow.svg'
import RightArrow from './../img/right-arrow.svg'

export default (player: Player, playerProjectiles: PlayerProjectile[], shipNum: number, over: boolean, keys: any) => {
    if (innerWidth < 500) {
        if (over) return
        document.querySelector('#mobil')!.innerHTML += `
            <div>
                <button><img src=${LeftArrow}></img></button>
                <button><img src=${RightArrow}></img></button>
            </div>
            <button><img src=${Aim}></img></button>
        `
        if (innerWidth < 500) {
            const arrows = document.querySelectorAll('#mobil button')
            arrows[0].addEventListener('touchstart', () => {
                keys.ArrowLeft = true;
            })
            arrows[0].addEventListener('touchend', () => {
                keys.ArrowLeft = false;
            })
            arrows[1].addEventListener('touchstart', () => {
                keys.ArrowRight = true;
            })
            arrows[1].addEventListener('touchend', () => {
                keys.ArrowRight = false;
            })
            arrows[2].addEventListener('touchstart', () => {
                const [x, y] = player.getPosition()
                const [w, ,] = player.getDimentions()
                playerProjectiles.push(new PlayerProjectile({
                    position: {
                        x: x + (w / 2),
                        y: y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    },
                    colorNum: shipNum
                }));
            })
        }
    }

    addEventListener("keydown", ({ key }) => {
        const [x, y] = player.getPosition()
        const [w,] = player.getDimentions()
        if (over) return
        switch (key) {
            case "a":
            case "ArrowLeft":
                keys.ArrowLeft = true;
                break;

            case "d":
            case "ArrowRight":
                keys.ArrowRight = true;
                break;
            case " ": {
                playerProjectiles.push(new PlayerProjectile({
                    position: {
                        x: x + (w / 2),
                        y: y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    },
                    colorNum: shipNum
                }));
                break
            }
        }
    })

    addEventListener("keyup", ({ key }) => {
        switch (key) {
            case "a":
            case "ArrowLeft":
                keys.ArrowLeft = false;
                break;

            case "d":
            case "ArrowRight":
                keys.ArrowRight = false;
                break;
        }
    })

}