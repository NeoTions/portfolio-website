// color conversions

/* accepts parameters
 * r  Object = {r:x, g:y, b:z}
 * OR 
 * r, g, b
*/

function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    /*
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    v = Math.round(v * 100);
    */

    return {
        h: h,
        s: s,
        v: v
    };
}

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

let colors = 0;
let color_amt = 5;

function shades(start,amt,variance) {
  let palette = [start]
  for (i=1;i<(amt+1);i++) {
    let color = [start[0],start[1],(palette[i-1][2]+variance)%100];
    palette.push(color);
  }
  return palette;
}

function split_compliment(start) {
  
  let color2 = [(start[0]+180)%360,start[1],start[2]];
  let color3 = [(color2[0]+30)%360,start[1],start[2]];
  let color4 = [(color3[0]+180)%360,start[1],start[2]];
  let color5 = [start[0],start[1],abs(start[2]-50)];
  
  let palette = [start,color2,color3,color4,color5];
  return palette; 
}

function tetradic(start) {
  let color1 = [(start[0]+30)%360,random(40,100),start[2]];
  let color2 = [color1[0],random(40,100),(start[2]+80)%100];
  let color3 = [(color2[0]+120)%360,random(40,100),start[2]];
  let color4 = [(color3[0]+60)%360,random(40,100),start[2]];
  let color5 = [(color4[0]+120)%360,random(40,100),start[2]];
  let palette = [color1,color2,color3,color4,color5];
  
  return palette;
}

function compliment(start) {
  let color2 = [(start[0]+180%360),start[1],start[2]];
  palette = [start,color2];
  return palette; 
}

function analog_compliment(start) {
  
  let color2 = [(start[0]+30)%360,start[1],start[2]];
  let color3 = [(color2[0]+150)%360, start[1], start[2]];
  let color4 = [(color3[0]+150)%360,start[1],start[2]];
  let color5 = [start[0],start[1],start[2]-50];
  let palette = [start,color2,color3,color4,color5];
  
  return palette;
 }

function triad(start) {
  let color2 = [(start[0]+90)%360,start[1],start[2]];
  let color3 = [(color2[0]+90)%360,start[1],start[2]];
  let palette = [start,color2,color3];
    
  return palette;
}

let w = document.getElementById("palette").clientWidth;


function setup() {
  myCanvas = createCanvas(w, 200);
  myCanvas.parent("palette");
  noLoop();
  background(220);
  fill(0);
  colorMode(HSB);
}



let r = 30;
let g = 205;
let b = 58;

let hsb = RGBtoHSV(r, g, b);

let h = Math.round(hsb.h * 360);


let s = Math.round(hsb.s * 100);
let v = Math.round(hsb.v * 100);



function draw() {


function windowResized(){
    resizeCanvas(document.getElementById("palette").clientWidth, 200);
}


console.log()


color_input = document.getElementById("head");

color_input.addEventListener('input', () => {
        redraw();
        console.log(color_input.value)
    }
);

  let divs = width /color_amt;
  start = [h,s,v];
  
  let p = split_compliment(start);
  
  for (let i = 0; i<width;i+=divs) {
    

    
    fill(p[colors]);

    square(i,0,height);
    colors += 1;
  }

  //noLoop();
  
}



