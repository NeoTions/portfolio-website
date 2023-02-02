var scl = 10;
var cols, rows;
var inc = 0.05;
var particles = [];
var flowfield;
var zoff = 0;
var particle_num = 1000;
var t = 0;

var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

function setup() {
  canvas = createCanvas(windowWidth,limit);
  canvas.position(0,0);
  canvas.style("z-index","-1");
  //pixelDensity();
  noiseDetail(20)
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  colorMode(RGB)

  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, limit);
  console.log("resized")
  redraw();
}

function draw() {

  var dark_mode = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (dark_mode) {
    stroke(60);
    background(4,6,7);
  }
  else {
    stroke(200);
    background(255);
  }

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff,yoff,zoff) * TWO_PI// * 2;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);      
      flowfield[index] = v;
  
      xoff += inc 
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      strokeWeight(noise(x,y)*2)
      line(0,0,scl,0);    
      pop(); 
      //fill(r);    
      //rect(x * scl, y * scl,scl,scl)
    }

    yoff += inc
    zoff += 0.0002;
  } 

  //t += 1;
}