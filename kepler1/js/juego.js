
let X0;
let Y0;                                    let PER = 10;
let t = 0; 
let eps = 0.7; let A_PIX = 120;                                           let B_PIX;                                           let ePix;                                                 let semiejeMayor = 1230.387;
let semiejeMenor;
let radioSol = 50;
let sliderExcentricidad;
let sliderSemieje;
let verLineas = false;
function setup() {
  var canvas = createCanvas(1300, 750);
  canvas.id = "canvas";
  canvas.parent('general');
  X0 = width/2;
  Y0 = height/2;
  sliderExcentricidad = document.getElementById("sliderExcentricidad");
  sliderExcentricidad.oninput = function() {
    eps = map(this.value, 0, 100, 0, 0.98);
  }
  sliderSemieje = document.getElementById("sliderSemieje");
  A_PIX = map(sliderSemieje.value, 0, 100, height/2-150, height/2+150);
  sliderSemieje.oninput = function() {
    A_PIX = map(this.value, 0, 100, height/2-150, height/2+150);
  }
}
function cambiaModo(){
  verLineas = !verLineas;
}
function draw() {
  t+=0.025;
  background(255);
  noFill();
  dibujaEjes();
  dibujaOrbita();
  dibujaSol();
  dibujaPlaneta();
}
function dibujaEjes(){
  B_PIX = A_PIX*semiejeMenor/semiejeMayor;
  stroke(0);
  line(X0-A_PIX, Y0, X0+A_PIX,Y0);
  line(X0, Y0-B_PIX, X0,Y0+B_PIX);
  fill(0);
  textSize(30);
  if(eps==0){
    text('e = ' + eps,30, 30);
  }
  else{
    text('e = ' + (""+eps.toFixed(2)).replace(".",","),30, 30);  
  }
  text('a = ' + A_PIX,30, 70);
  text('b = ' + (""+B_PIX.toFixed(2)).replace(".",","),30, 110);
  textSize(20);
  text('a',X0-A_PIX/2, Y0-15);
  drawArrow(X0-A_PIX/2-20,Y0-15,X0-A_PIX+10,Y0-15);
  drawArrow(X0-A_PIX/2+20,Y0-15,X0-10,Y0-15);
  text('b',X0+20, Y0-B_PIX/2);
  drawArrow(X0+20, Y0-B_PIX/2-20,X0+20, Y0-B_PIX+10);
  drawArrow(X0+20, Y0-B_PIX/2+20,X0+20, Y0-10);
}
function drawArrow(x1, y1, x2, y2) {
    strokeWeight(2);
    line(x1, y1, x2, y2);
    push();
    translate(x2, y2);
    let a = atan2(x1 - x2, y2 - y1);
    rotate(a);
    line(0, 0, -5, -5);
    line(0, 0, 5, -5);
    pop();
}
function dibujaPlaneta(){
  ePix = eps*A_PIX;
  let n = Math.floor(t/PER);
  c1 = Math.sqrt((1+eps)/(1-eps));                                 if (n > 0){
    t -= n*PER;                                     } 
  var e = excAnomaly(2*PI*t/PER);                             var phi1 = 2*Math.atan(c1*Math.tan(e/2));                  var rRel = 1-eps*Math.cos(e);                              var rPix = A_PIX*rRel;                                     var x = X0+ePix+rPix*Math.cos(phi1);                       var y = Y0-rPix*Math.sin(phi1);                            fill(color('lightblue'));                                      
  circle(x,y,20);                               if(verLineas){
    var yy = (y<Y0 ? y-6 : y+16);                                stroke(0);
    line(X0-ePix,Y0,x,y);                                        line(X0+ePix,Y0,x,y);                                      }

}
function dibujaOrbita () {
  stroke(0);
  semiejeMenor = semiejeMayor*Math.sqrt(1-eps*eps);                                B_PIX = A_PIX*semiejeMenor/semiejeMayor;                                          noFill();
  ellipse(X0,Y0,2*A_PIX,2*B_PIX);                               }
function dibujaSol(){
  let posL = X0-ePix;                                        let posR = X0+ePix;
  noStroke();
  fill(color('orange'));                                      
  if(radioSol>=A_PIX-ePix){
    radioSol = A_PIX-ePix;
  }
  else{
    radioSol = 50;
  }
  circle(posR,Y0,2*radioSol);                    

}
function excAnomaly (m) {
  let eL = 0;
  let eR = 2*PI;                                      let e;
  while (eR-eL > 1e-5) {                                         e = (eL+eR)/2;                                           if (e-eps*Math.sin(e) < m){                      eL = e;
      }        
      else{
        eR = e;                                                 } 
  }
  return e;                                                }

 
function muestraInfo(){
  $('.dialogoInfo').toggle();
  $('.general').toggle();
  $('.slider').toggle();
  $('.rangeSlider').toggle();
  $('.textoExplicacion2').toggle();
  $('.textoExplicacion3').toggle();
  $('.textoExplicacion4').toggle();
  $(".textoCabecera").fitText(4.5);
  $(".explicacionRecurso").fitText(4);
  $(".contenidoInfo").fitText(3);
  $(".textoDatos1").fitText(5); 
  $(".textoDatos2").fitText(5); 
  $(".textoAyudaTitulo").fitText(5); 
  $(".textoDerechos").fitText(7); 
}