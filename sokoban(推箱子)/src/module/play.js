import * as map from './map.js';

/**
 * 移动返回true false 便于game中操作
 * 获取当前玩家坐标
 * 获取目标坐标，移动后坐标变化
 * 判断输赢*/
export function playerMove(direction) {
    let playerPoint = getPlayerPoint();//获取当前坐标
    // console.log(playerPoint);
    let nextPoint = getNextPoint(playerPoint.row, playerPoint.col, direction);//获取下一坐标
    // console.log(nextPoint.value);
    if(nextPoint.value === map.WALL){
        return false;//不能移动
    }
    else if(nextPoint.value === map.SPACE){
        exchange(playerPoint,nextPoint);
        return true;
    }
    else if(nextPoint.value === map.BOX){
        let nextNextPoint = getNextPoint(nextPoint.row,nextPoint.col,direction);
        console.log(nextNextPoint.value);
        if(nextNextPoint.value === map.SPACE){
            exchange(nextPoint,nextNextPoint);
            exchange(playerPoint,nextPoint);
            return true;
        }else{
            return false;
        }
    }
}

//判断输赢
export function toWin(){
    for(let i =0;i<map.correct.length;i++){
        const point = map.correct[i];
        if (map.content[point.row][point.col] !== map.BOX){
            return false;
        }
    }
    return true;
}

//获取当前坐标
function getPlayerPoint() {
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            if (map.content[row][col] === map.PLAYER) {
                return {
                    row,
                    col
                }
            }
        }
    }
}

//交换坐标
function exchange(point1,point2){
    let temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;
}

//获取下一坐标
function getNextPoint(row, col, direction) {
    let content = map.content;
    if (direction == 'left') {
        return {
            row,
            col:col-1,
            value: content[row][col - 1]
        }
    }
    if (direction == 'right') {
        return {
            row,
            col: col + 1,
            value: content[row][col + 1]
        }
    }
    if (direction == 'top') {
        return {
            row: row - 1,
            col,
            value: content[row - 1][col]
        }
    }
    if (direction == 'down') {
        return {
            row: row + 1,
            col,
            value: content[row + 1][col]
        }
    }
}