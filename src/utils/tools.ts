function drawBox({ x, y, width, heigth }, that) {
    const rec = new egret.Rectangle(x, y, width, heigth)
    that.addChild(rec)
}