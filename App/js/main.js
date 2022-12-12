window.addEventListener("load", () => {
    let canvas = document.getElementById("canvas")
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
    
    const Canv = new Dice(canvas);
    Canv.drawDiceFrame(Canv.size.w*0.7);
    // Canv.drawResult();

    Canv.drawResult(1);
    canvas.addEventListener("click", () => {
        let random = Math.floor(Math.random()*6+1);
        Canv.drawResult(random);
        console.log(random);
    })
})

class MasterCanvas {
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        this.cv = canvas;
        this.ctx = this.cv.getContext("2d");
        // cssでずらした時用のサイズ合わせ(アス比を直す)
        this.cv.width = this.cv.getBoundingClientRect().width;
        this.cv.height = this.cv.getBoundingClientRect().height;
        this.cache = [];
    }
    get size() {
        return {w: this.cv.width, h: this.cv.height};
    }
    /**
     * 図形を中央に配置したときの左上の座標を計算する
     * @param {number} size 
     * @returns {Array<number,number>}
     */
    calcRectPositionInCenter(size) {
        let [x, y] = [(this.size.w-size)/2, (this.size.h-size)/2];
        return [x, y];
    }
    // 参考元 [https://qiita.com/PG0721/items/6fb9e9c02675be832402]
    createRoundRectPath(x, y, s, r) {
        console.log(arguments)
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.lineTo(x + s - r, y);
        this.ctx.arc(x + s - r, y + r, r, Math.PI * (3/2), 0, false);
        this.ctx.lineTo(x + s, y + s - r);
        this.ctx.arc(x + s - r, y + s - r, r, 0, Math.PI * (1/2), false);
        this.ctx.lineTo(x + r, y + s);       
        this.ctx.arc(x + r, y + s - r, r, Math.PI * (1/2), Math.PI, false);
        this.ctx.lineTo(x, y + r);
        this.ctx.arc(x + r, y + r, r, Math.PI, Math.PI * (3/2), false);
        this.ctx.closePath();
    }
}

MasterCanvas.prototype.pop = function() {
    this.cache.push(this.ctx.fillStyle);
}

MasterCanvas.prototype.push = function() {
    this.ctx.fillStyle = this.cache.pop();
}

class Dice extends MasterCanvas {
    constructor(canvas) {
        super(canvas);
        this.coe = {
            diceFrameSize: this.size.w*0.7,
            pip: {
                one: this.size.w*0.25,
                other: this.size.w*0.18
            }
        }
    }
    drawDiceFrame(size) {
        const [x, y] = this.calcRectPositionInCenter(size);
        // Pathを生成する
        this.createRoundRectPath(x, y, size, size/8);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.fillStyle = "black";
        this.ctx.stroke();
    }
    drawResult(result) {
        this.pop();
        this.drawDiceFrame(this.coe.diceFrameSize);
        if(result == 1) {
            this.ctx.fillStyle = "red";
            let size = this.coe.pip.one;
            const [x, y] = this.calcRectPositionInCenter(size);
            this.createRoundRectPath(x, y, size, size/2);
            this.ctx.fill();
        } else {
            let size = this.coe.pip.other;
            let x, y;
            if(result == 2) {
                [x,y] = this.calcPipPosition(3,1);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(1,3);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
            } else if(result == 3) {
                [x,y] = this.calcPipPosition(3,1);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(2,2);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(1,3);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
            } else if(result == 4) {
                [x,y] = this.calcPipPosition(1,1);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(3,1);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(1,3);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(3,3);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
            } else if(result == 5) {
                [x,y] = this.calcPipPosition(1,1);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(3,1);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(2,2);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(1,3);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(3,3);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
            } else if(result == 6) {
                [x,y] = this.calcPipPosition(1,1);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(3,1);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(1,2);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(3,2);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(1,3);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
                [x,y] = this.calcPipPosition(3,3);
                this.createRoundRectPath(x, y, size, size/2);
                this.ctx.fill();
            }
        }
        this.push();
    }
    calcPipPosition(x, y) {
        let [_x, _y] = this.calcRectPositionInCenter(this.coe.diceFrameSize);
        _x -= this.coe.pip.other/2;
        _y -= this.coe.pip.other/2;
        _x += this.coe.diceFrameSize*(x*2-1)/6;
        _y += this.coe.diceFrameSize*(y*2-1)/6;
        return [_x, _y]
    }
}