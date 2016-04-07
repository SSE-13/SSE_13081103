
var humanContainer = new render.DisplayObjectContainer();
var centerContainer = new render.DisplayObjectContainer();

centerContainer.addChild(humanContainer);

//centerContainer.x = -50;
//centerContainer.y = -100;

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
renderCore.start(centerContainer, ["head.png" , "trunk.png" , "left_arm.png" , "left_leg.png" , "right_arm.png" , "right_leg.png"]);


//var rv = 4;
//var vx = 5;

class HumanBody extends Body {
    
    
    x = 50;
    y = 50;
   vx = 5;
   rv = 4;
   
    
    

    onTicker(duringTime: number) {
       
        
        this.x += this.vx * duringTime;
       // this.y += this.vy * duringTime;
        this.rotation += this.rv * Math.PI * duringTime;

    }


    }

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var Head = 0;
var ClickHead = false;
var Legs = 0;
var ClickLegs = false;

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
     console.log(localPoint.x,localPoint.y);
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    //return true;
    
    if (localPoint.x <= 80 && localPoint.y <= 50 && localPoint.x > 10 && localPoint.y > 0) {
        
        Head +=1;
        ClickHead = true;
    }
    return ClickHead;
}

var LegsHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
     console.log(localPoint.x,localPoint.y);
   // alert (`点击位置为${localPoint.x},${localPoint.y}`);
    //return true;
    
    if (localPoint.x <= 80 && localPoint.y <= 152 && localPoint.x > 10 && localPoint.y > 110) {
        
        Legs +=1;
        ClickLegs = true;
    }
    return ClickLegs;
}

var headOnClick = () => {
   // alert("clicked!!");
    if (Head == 1) {
        if(body.vx !=0){
            body.vx *= -1;
           // body.x *= -1; 
            body.rv *=-1;
            //body.vy *= -1;
           // body.y *= -1;
        }
        if(body.vx == 0){
            Head = 0;
        }
    }
    if (Head != 1) {
        body.vx = 5;
        //body.vy = 10;
        body.rv = 4;
        Head = 0;
    }
    ClickHead = false;
}

var LegsOnClick = () => {
   // alert("clicked!!");
    if (Legs == 1) {
       body.vx = 0;
       body.rv = 0;
      // body.vy = 0;
       body.rotation = 0;
    }
    if (Legs > 1) {
       Legs = 0;
    }
    ClickLegs = false;
}

eventCore.register(head,headHitTest,headOnClick);
eventCore.register(left_leg,LegsHitTest,LegsOnClick);
eventCore.register(right_leg,LegsHitTest,LegsOnClick);










