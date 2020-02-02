/* 
    继承方块类创建水管类（水管销毁）
    创建水管组类，使用水管类创建上水管和下水管（）
    创建自动生成水管组（定时器，销毁数组）
*/
const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom);
    }
    toMove() {
        if (this.left <= -this.width) {
            this.dom.remove();
        }
    }
}

function randomFunc(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class PipePare {
    constructor(speed) {
        this.spaceHeight = 150; //空隙位置的高度
        this.minHeight = 80; //水管最小高度
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;
        const upHeight = randomFunc(this.minHeight, this.maxHeight);

        const upDom = document.createElement("div");
        upDom.className = "pipe up";

        this.upPipe = new Pipe(upHeight, 0, speed, upDom); //上水管
        const downHeight = landTop - upHeight - this.spaceHeight;
        const downTop = landTop - downHeight;

        const downDom = document.createElement("div");
        downDom.className = "pipe down";
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom)//下水管

        gameDom.appendChild(upDom)
        gameDom.appendChild(downDom)
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }

    get useLess() {
        return this.upPipe.left < -this.upPipe.width;
    }
}

class PipePareProducer {
    constructor(speed) {
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 1500;
    }

    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed));
            //移除掉用不到的柱子
            for (let i = 0; i < this.pairs.length; i++) {
                var pair = this.pairs[i];
                if (pair.useLess) {
                    //没用的柱子对
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.tick)
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

// const pArr = new pipeArr()
// const pipePro = new PipePareProducer(-100);
// pipePro.startProduce();

// setInterval(() => {
//     pipePro.pairs.forEach(ele => {
//         ele.move(16 / 1000);
//     })
// }, 16)