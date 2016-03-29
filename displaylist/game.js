var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var centerContainer = new render.DisplayObjectContainer();
centerContainer.addChild(humanContainer);
humanContainer.y = -100;
humanContainer.x = -50;
var head = new render.Bitmap();
head.source = "head.png";
humanContainer.addChild(head);
var trunk = new render.Bitmap();
trunk.source = "trunk.png";
humanContainer.addChild(trunk);
var left_arm = new render.Bitmap();
left_arm.source = "left_arm.png";
humanContainer.addChild(left_arm);
var left_leg = new render.Bitmap();
left_leg.source = "left_leg.png";
humanContainer.addChild(left_leg);
var right_arm = new render.Bitmap();
right_arm.source = "right_arm.png";
humanContainer.addChild(right_arm);
var right_leg = new render.Bitmap();
right_leg.source = "right_leg.png";
humanContainer.addChild(right_leg);
var renderCore = new render.RenderCore();
renderCore.start(centerContainer, ["head.png", "trunk.png", "left_arm.png", "left_leg.png", "right_arm.png", "right_leg.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        if (this.x < 300) {
            this.vx = 3;
        }
        else {
            this.vx = -3;
        }
        if (this.y < 300) {
            this.vy = 10;
        }
        else if (this.y > 300) {
            this.vy = -10;
        }
        this.x += this.vx * duringTime;
        this.y += this.vy * duringTime;
        this.rotation += 10 * Math.PI * duringTime;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map