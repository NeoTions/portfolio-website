var humidity = function(p,humidity_percent) {
    console.log(humidity_percent)
    p.percent = 60;
    p.setup = function() {
        p.canvas = p.createCanvas(200, 200);
        p.canvas.parent("humidity");

        p.strokeWeight(10);
        p.noFill();
        p.noLoop();
        // type
        p.textAlign(p.CENTER);
        p.textSize(p.height/5);
}
    p.draw = function() {
        p.stroke(200);
        p.circle(p.width/2,p.height/2,p.height/2)
        p.stroke(0, 194, 58);
        p.arc(p.width/2,p.height/2,p.height/2,p.height/2,0,p.map(p.percent,0,100,0,360));
        p.noStroke();
        p.fill(0, 194, 58);
        p.text(p.str(p.percent),p.width/2,p.height*0.56)
    }
}

var uv = function(a) {
a.setup = function() {
    a.canvas = a.createCanvas(400, 200);
    a.canvas.parent("uv_index");
    a.sw = a.width/10;
    a.strokeWeight(a.sw);
    a.strokeCap(a.SQUARE);
    a.textAlign(a.CENTER);
    a.textSize(a.width/4);
  }
a.draw = function() {
    a.background(255,255,255,0);
    a.stroke(33, 219, 0);
    a.line(0,a.height,a.width*0.2,a.height);
    a.stroke(227, 227,0);
    a.line(a.width*0.2,a.height,a.width*0.4,a.height); 
    a.stroke(227, 106, 0);
    a.line(a.width*0.4,a.height,a.width*0.6,a.height);
    a.stroke(227, 0, 0);
    a.line(a.width*0.6,a.height,a.width*0.8,a.height);
    a.stroke(117, 0, 227);
    a.line(a.width*0.8,a.height,a.width,a.height);
    a.stroke(255);
    a.place = a.width*0.10;
    a.line(a.place,a.height,a.place+10,a.height) 
    a.fill(33, 219, 0);
    a.noStroke();
    a.text("3.6",a.width/2,a.height/1.75);
  }
}

var aqi = function(a) {
    a.setup = function() {
        a.canvas = a.createCanvas(400, 200);
        a.canvas.parent("aqi");
        a.sw = a.width/10;
        a.strokeWeight(a.sw);
        a.strokeCap(a.SQUARE);
        a.textAlign(a.CENTER);
        a.textSize(a.width/4);
        a.pixelDensity(4)
      }
    a.draw = function() {
        a.background(255,255,255,0);
        a.stroke(33, 219, 0);
        a.line(0,a.height,a.width*0.2,a.height);
        a.stroke(227, 227,0);
        a.line(a.width*0.2,a.height,a.width*0.4,a.height); 
        a.stroke(227, 106, 0);
        a.line(a.width*0.4,a.height,a.width*0.6,a.height);
        a.stroke(227, 0, 0);
        a.line(a.width*0.6,a.height,a.width*0.8,a.height);
        a.stroke(117, 0, 227);
        a.line(a.width*0.8,a.height,a.width,a.height);
        a.stroke(255);
        a.place = a.width*0.10;
        a.line(a.place,a.height,a.place+10,a.height) 
        a.fill(33, 219, 0);
        a.noStroke();
        a.text("3.6",a.width/2,a.height/1.75);
      }
    }

var sketch1 = new p5(humidity);
var sketch2 = new p5(uv);
var sketch2 = new p5(aqi);
