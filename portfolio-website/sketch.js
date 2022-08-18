var scl = 10;
var cols, rows;
var inc = 0.05;
var fr;
var particles = [];
var flowfield;
var zoff = 0;
var particle_num = 1000;
var t = 0;

function setup() {
  canvas = createCanvas(windowWidth,2500);
  canvas.position(0,0);
  canvas.style("z-index","-1");
  //pixelDensity();
  noiseDetail(20)
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
   flowfield = new Array(cols * rows);
  colorMode(RGB)


  
  background(0);
  noLoop();
}

function draw() {
  
  background(0)
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
      stroke(60);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      strokeWeight(1)
      line(0,0,scl,0);    
      pop(); 
      //fill(r);    
      //rect(x * scl, y * scl,scl,scl)
    }
    yoff += inc
    zoff += 0.0002;
  }  


  t += 1;

 //if(t >= 40) {
   //noLoop();
  //}
}