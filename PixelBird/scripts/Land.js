const landDom = document.querySelector(".land");
const landStyles = getComputedStyle(landDom);
const landWidth = parseFloat(landStyles.width);
const landHeight = parseFloat(landStyles.height);
const landTop = parseFloat(landStyles.top)

class Land extends Rectangle {
    constructor(speed) {
        super(landWidth, landHeight, 0, landTop, speed, 0, landDom)
    }

    toMove() {
        if (this.left <= -landWidth / 2) {
            this.left = 0;
        }
    }
}
// var nowLand = new Land;
// setInterval(() => {
//     nowLand.move(16 / 1000);
// }, 16);