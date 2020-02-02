import showUI from './ui.js';
import { playerMove, toWin } from './play.js'
showUI();
// play.playerMove('left')
// window.playerMove = play.playerMove;
// console.log(play.toWin());
let over = false;
window.onkeydown = function (e) {
    // console.log(e.key)
    if (over) {
        return;
    }
    let result = false;
    if (e.key == 'ArrowUp') {
        result = playerMove('top');
    }
    else if (e.key == 'ArrowDown') {
        result = playerMove('down');
    }
    else if (e.key == 'ArrowLeft') {
        result = playerMove('left');
    }
    else if(e.key == 'ArrowRight') {
        result = playerMove('right');
    }
    console.log(toWin());
    if(result){
        showUI();
        setTimeout(()=>{
            if(toWin()){
                over = true;
                this.alert('游戏结束');
            }
        },30)
    }
}