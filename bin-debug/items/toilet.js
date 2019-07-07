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
var Toilet = (function (_super) {
    __extends(Toilet, _super);
    function Toilet() {
        var _this = _super.call(this) || this;
        _this.img = createBitmapByName("glass_jpeg");
        return _this;
    }
    Toilet.prototype.init = function () {
    };
    return Toilet;
}(Items));
__reflect(Toilet.prototype, "Toilet");
//# sourceMappingURL=toilet.js.map