const { log } = console

class Ball extends Items {
	private ball: egret.Bitmap
	// 小球变大的定时器
	private sizeTimer: egret.Timer = new egret.Timer(16, 0)
	// 小球下落运动的定时器
	private dropTimer: egret.Timer = new egret.Timer(16, 0)
	// 加速度
	private a: number
	private speedTimer: egret.Timer = new egret.Timer(1000 / 60, 0)
	// 停止变大的操作
	private flag: boolean = true
	// 碰撞检测区域
	private hitTest: egret.Rectangle = new egret.Rectangle(100, 300, 400, 400)

	public constructor() {
		super()
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this)
		// 小球变大
		this.sizeTimer.addEventListener(egret.TimerEvent.TIMER, () => {
			// if (this.ball.width < 70) {
			this.ball.width += 1
			this.ball.height += 1
			this.ball.x -= 0.5
			// }

			// 使用碰撞检测依然不是canvas层面的检测
			// if (this.ball.hitTestPoint(this.stage.stageWidth / 2 + 125, 125 + 40)) {
			// 	log(this.ball.width)
			// 	egret.log(this.ball)
			// 	this.onTouchEnd()
			// }
			if (this.ball.width === 70 && this.flag) {
				this.flag = false
				setTimeout(() => {
					this.onTouchEnd()
				}, 1500)
			}
		}, this)
		// 小球坠落
		// this.dropTimer.addEventListener(egret.TimerEvent.TIMER, this.drop, this)
		// this.speedTimer.addEventListener(egret.TimerEvent.TIMER, () => this.a += 20 / 60, this)
	}

	private init(e: egret.Event) {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.drop, this)
		this.a = 1
		this.flag = true

		this.ball = createBitmapByName("ball_png")
		this.ball.width = 50
		this.ball.height = 50
		this.ball.x = this.stage.stageWidth / 2 - 25
		this.ball.y = 40
		this.addChild(this.ball)

		this.ball.$touchEnabled = true
		this.ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)
		this.ball.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
	}

	private getBigger() {
		if (this.ball.width > 250) {
			log(this.ball.width)
			// setTimeout(() => {
				this.ball.width = 250
				this.removeEventListener(egret.Event.ENTER_FRAME, this.getBigger, this)
			// }, 200)
			return
		}
		this.ball.width += 1
		this.ball.height += 1
		this.ball.x -= 0.5
	}
	private onTouchBegin() {
		// this.sizeTimer.start()

		this.addEventListener(egret.Event.ENTER_FRAME, this.getBigger, this)

		// egret.Tween.get(this.ball).to({
		// 	width: 300,
		// 	height: 300,
		// 	x: this.stage.stageWidth / 2 - 125
		// }, 3000)

		// egret.Tween.get(this.ball).to({ width: 250 }, 2000).to({ height: 250 }, 2000).wait(200).call(() => {
		// 	log(this.ball.width)
		// })
	}

	private ballRec: egret.Rectangle
	private onTouchEnd() {
		this.sizeTimer.stop()
		const { x, y, width, height } = this.ball
		// this.ballRec = new egret.Rectangle(x, y, width, height)
		// this.ballRec = this.ball.getBounds()
		// this.addChild(this.ballRec)
		// this.ball.mask = this.ballRec
		// this.dropTimer.start()
		// this.speedTimer.start()
		this.addEventListener(egret.Event.ENTER_FRAME, this.drop, this)
		this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)
	}

	private hited: boolean = false
	private drop(e: egret.Event) {
		if (!this.hited) {
			// this.ballRec.intersects(this.hitTest)
			let isHit: boolean = this.ball.hitTestPoint(this.ball.x + 25, 300)
			if (isHit) log('碰到啦!')
			this.hited = true
		}

		if (this.ball.y > this.stage.$stageHeight - 60 - this.ball.height) {
			// this.dropTimer.stop()
			// this.speedTimer.stop()
			// this.removeChild(this.ball)
			this.init(e)
			return
		}
		this.ball.y = this.ball.y + this.a
		// this.ballRec.y = this.ball.y
		this.a += 20 / 60
	}
}