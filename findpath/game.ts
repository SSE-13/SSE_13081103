module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;

    export class WorldMap extends DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
            

        }

        render(context: CanvasRenderingContext2D) {
         
           // context.fillStyle = '#0000FF';
            context.strokeStyle = '#FF0000';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    if (this.grid.getNode(i,j).walkable == false) {
                        context.fillStyle = "#000000";
                         context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                         
                    }
                    else{
                         context.fillStyle = "#0000FF";
                         context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                         context.fill();
                         context.stroke();
                        
                    }
                   
                   // console.log(i);
                   
                  
                    
                }
            }
      
            context.closePath();

        }

    }

    export class BoyShape extends DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {
        
       
        path;
         n = 1;
         dx = new Array;
         dy = new Array;
        // da = new Array;
         //db = new Array;
          h = GRID_PIXEL_HEIGHT;
          w = GRID_PIXEL_WIDTH;


        public run(grid) {
            grid.setStartNode(0, 0);
            
            this.x = grid.startNode.x * this.w; 
            this.y = grid.startNode.y * this.h; 
            
            grid.setEndNode(10, 8);
            
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
           // var path = findpath._path;
           this.path = findpath._path;
           
           for (var i = 0; i < this.path.length; i++) {
               this.dx[i] = this.path[i].x - this.path[i-1].x;
               this.dy[i] = this.path[i].y - this.path[i-1].y;
               
           }
           
            console.log(this.path);
            console.log(grid.toString());
        }

        public onTicker(duringTime) {
            
            if (this.n < this.path.length-1) {
              //  var x0 = this.path[this.n].x * this.w;
               // var y0 = this.path[this.n].y * this.h;
                
                this.x += this.dx[this.n] * this.w;
                this.y += this.dy[this.n] * this.h;
                this.n++;
                
                
               
           
            }
           // console.log(this.x,this.y,this.n);
        }
         
    }
}




var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);


var renderCore = new RenderCore();
renderCore.start([world, boyShape]);

var ticker = new Ticker();
ticker.start([body]);
ticker.onTicker();
