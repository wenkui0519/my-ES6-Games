import * as map from './map.js';

/**
 * 初始化整体box宽度
 * 判断是否在正确位置
 * 根据行列创建格子加入到容器中，并且判断当前位置，添加类型
 * 遍历每一个map中content的数据，生成格子
 * */

const diveContainer = document.getElementById('game');
const pieceWidth = 45;//定义每个格子的宽
const pieceHeight = 45;//定义每个格子的高

//初始化整体box宽高
function setDivContainer() {
    diveContainer.style.width = pieceWidth * map.colNumber + 'px';
    diveContainer.style.height = pieceHeight * map.rowNumber + 'px';
}


//确定是否在正确位置上
function isCorrect(row, col) {
    return map.correct.find(p => p.row === row && p.col === col) !== undefined;
}
//生成格子
function setOneBox(row, col) {
    const value = map.content[row][col];
    const div = document.createElement('div');
    const correct = isCorrect(row, col);
    div.className = 'item';
    div.style.left = col * pieceWidth + 'px';
    div.style.top = row * pieceHeight + 'px';
    if (value === map.PLAYER) {
        div.classList.add('player');
    }
    else if (value === map.WALL) {
        div.classList.add('wall');
    }
    else if (value === map.BOX) {
        if (correct) {
            div.classList.add('correct-box');
        } else {
            div.classList.add('box');
        }
    }
    else {
        //为空
        if (correct) {
            div.classList.add('correct');
        } else {
            return;
        }
    }
    diveContainer.appendChild(div);
}

//遍历生成格子
function setContent() {
    diveContainer.innerHTML='';//清空上一次容器
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            setOneBox(row, col);
        }
    }
}
export default function () {
    setDivContainer();
    setContent();
}
