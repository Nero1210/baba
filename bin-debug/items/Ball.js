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
        // 小球坠落
        _this.dropTimer.addEventListener(egret.TimerEvent.TIMER, _this.drop, _this);
        _this.speedTimer.addEventListener(egret.TimerEvent.TIMER, function () { return _this.a += 20 / 60; }, _this);
        return _this;
    }
    Ball.prototype.init = function (e) {
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
    Ball.prototype.onTouchBegin = function () {
        this.sizeTimer.start();
    };
    Ball.prototype.onTouchEnd = function () {
        this.sizeTimer.stop();
        this.dropTimer.start();
        this.speedTimer.start();
        this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    Ball.prototype.drop = function (e) {
        if (!this.hited) {
            // this.ball.intersects(this.hitTest)
            var isHit = this.ball.hitTestPoint(this.ball.x + 25, 300);
            if (isHit)
                log('碰到啦!');
            this.hited = true;
        }
        if (this.ball.y > this.stage.$stageHeight - 60 - this.ball.height) {
            this.dropTimer.stop();
            this.speedTimer.stop();
            this.removeChild(this.ball);
            this.init(e);
            return;
        }
        this.ball.y = this.ball.y + this.a;
    };
    return Ball;
}(Items));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Ball.js.map