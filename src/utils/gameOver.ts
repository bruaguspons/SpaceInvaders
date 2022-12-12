import { chooseShip } from "../../main";
import { startGame } from "../StartGame";

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");

// invaderShoots
export default (numScore: number, shipNum: number) => {

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
        document.querySelector('#GO')!.remove()
        document.querySelector('#scoreBox')!.remove()
        if (innerWidth < 500) document.querySelector('#mobil')!.remove()
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
}