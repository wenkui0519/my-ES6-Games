/*小鸟
    继承自父类，获得初始高度，left值，左右上下速度初始值为0
    定义个加速度 最大top值 
    重写move()top值随着重力加速度的改变而变化
    重写toMove 当最大top值和最小top值适合top值的定义
    跳动定义
    翅膀变化
*/
const birdDom = document.querySelector(".bird");
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdLeft = parseFloat(birdStyle.left);
const birdTop = parseFloat(birdStyle.top);
const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500;
        this.maxTop = gameHeight - this.height - landHeight;
        this.swingStatus = 1;
        this.timer = null;
        this.render();
    }
    move(duration) {
        super.move(duration);
        this.ySpeed += this.g * duration;
    }
    toMove() {
        if (this.top <= 0) {
            this.top = 0;
        } else if (this.top >= this.maxTop) {
            this.top = this.maxTop;
        }
    }
    jump() {
        this.ySpeed = -450;
    }
    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus++;
            this.swingStatus = this.swingStatus % 3 + 1;
            this.render();
        }, 200)
    }
    render() {
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`;
    }
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }

}

// var bird = new Bird;
// setInterval(() => {
//     bird.move(16 / 1000);
// }, 16);