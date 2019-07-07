var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var log = console.log;
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        // 小球变大的定时器
        _this.sizeTimer = new egret.Timer(16, 0);
        // 小球下落运动的定时器
        _this.dropTimer = new egret.Timer(16, 0);
        _this.speedTimer = new egret.Timer(1000 / 60, 0);
        // 停止变大的操作
        _this.flag = true;
        // 碰撞检测区域
        _this.hitTest = new egret.Rectangle(100, 300, 400, 400);
        _this.hited = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        // 小球变大
        _this.sizeTimer.addEventListener(egret.TimerEvent.TIMER, function () {
            // if (this.ball.width < 70) {
            _this.ball.width += 1;
            _this.ball.height += 1;
            _this.ball.x -= 0.5;
            // }
            // 使用碰撞检测依然不是canvas层面的检测
            // if (this.ball.hitTestPoint(this.stage.stageWidth / 2 + 125, 125 + 40)) {
            // 	log(this.ball.width)
            // 	egret.log(this.ball)
            // 	this.onTouchEnd()
            // }
            if (_this.ball.width === 70 && _this.flag) {
                _this.flag = false;
                setTimeout(function () {
                    _this.onTouchEnd();
                }, 1500);
            }
        }, _this);
        return _this;
        // 小球坠落
        // this.dropTimer.addEventListener(egret.TimerEvent.TIMER, this.drop, this)
        // this.speedTimer.addEventListener(egret.TimerEvent.TIMER, () => this.a += 20 / 60, this)
    }
    Ball.prototype.init = function (e) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.drop, this);
        this.a = 1;
        this.flag = true;
        this.ball = createBitmapByName("ball_png");
        this.ball.width = 50;
        this.ball.height = 50;
        this.ball.x = this.stage.stageWidth / 2 - 25;
        this.ball.y = 40;
        this.addChild(this.ball);
        this.ball.$touchEnabled = true;
        this.ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.ball.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    Ball.prototype.getBigger = function () {
        if (this.ball.width > 250) {
            log(this.ball.width);
            // setTimeout(() => {
            this.ball.width = 250;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.getBigger, this);
            // }, 200)
            return;
        }
        this.ball.width += 1;
        this.ball.height += 1;
        this.ball.x -= 0.5;
    };
    Ball.prototype.onTouchBegin = function () {
        // this.sizeTimer.start()
        this.addEventListener(egret.Event.ENTER_FRAME, this.getBigger, this);
        // egret.Tween.get(this.ball).to({
        // 	width: 300,
        // 	height: 300,
        // 	x: this.stage.stageWidth / 2 - 125
        // }, 3000)
        // egret.Tween.get(this.ball).to({ width: 250 }, 2000).to({ height: 250 }, 2000).wait(200).call(() => {
        // 	log(this.ball.width)
        // })
    };
    Ball.prototype.onTouchEnd = function () {
        this.sizeTimer.stop();
        var _a = this.ball, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        // this.ballRec = new egret.Rectangle(x, y, width, height)
        // this.ballRec = this.ball.getBounds()
        // this.addChild(this.ballRec)
        // this.ball.mask = this.ballRec
        // this.dropTimer.start()
        // this.speedTimer.start()
        this.addEventListener(egret.Event.ENTER_FRAME, this.drop, this);
        this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    Ball.prototype.drop = function (e) {
        if (!this.hited) {
            // this.ballRec.intersects(this.hitTest)
            var isHit = this.ball.hitTestPoint(this.ball.x + 25, 300);
            if (isHit)
                log('碰到啦!');
            this.hited = true;
        }
        if (this.ball.y > this.stage.$stageHeight - 60 - this.ball.height) {
            // this.dropTimer.stop()
            // this.speedTimer.stop()
            // this.removeChild(this.ball)
            this.init(e);
            return;
        }
        this.ball.y = this.ball.y + this.a;
        // this.ballRec.y = this.ball.y
        this.a += 20 / 60;
    };
    return Ball;
}(Items));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Ball.js.map