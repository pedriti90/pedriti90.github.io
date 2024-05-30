
let X0;
let Y0;                                    let PER = 10;
let t = 2; 
let eps = 0.7; let A_PIX = 120;                                           let B_PIX;                                           let ePix;                                                 let semiejeMayor = 1230.387;
let semiejeMenor;
let radioSol = 50;
let sliderExcentricidad;
let sliderSemieje;
let sliderArea;
let phi1;
let phi1Min;
let phi1Max;
let phi2;
let phi2Min;
let phi2Max;
let t0S1;
let t0S2;
let tS1;
let tS2;
var part;                                                  let area;
let seHaPintado = false;
let nr = 0;
let c1;
function setup() {
  var canvas = createCanvas(1300, 750);
  canvas.id = "canvas";
  canvas.parent('general');
  X0 = width/2;
  Y0 = height/2;
  phi1 = 0;
  phi2 = PI;
  part = 0.1;                                                sliderExcentricidad = document.getElementById("sliderExcentricidad");
  sliderExcentricidad.oninput = function() {
    eps = map(this.value, 0, 100, 0, 0.98);
  }
  sliderSemieje = document.getElementById("sliderSemieje");
  A_PIX = map(sliderSemieje.value, 0, 100, height/2-150, height/2+150);
  sliderSemieje.oninput = function() {
    A_PIX = map(this.value, 0, 100, height/2-150, height/2+150);
  }
  sliderArea = document.getElementById("sliderArea");
  area = sliderArea.value;
  sliderArea.oninput = function() {
    area = this.value;
    part = area/40;                                          reiniciaDatos();                                             

  }
}
function reiniciaDatos(){
  phi1 = 0; 
  phi2 = PI;
  semiejeMenor = semiejeMayor*Math.sqrt(1-eps*eps);                                B_PIX = A_PIX*semiejeMenor/semiejeMayor;                                          ePix = eps*A_PIX;                                          c1 = Math.sqrt((1+eps)/(1-eps));                         }
function draw() {
  t+=0.025;
  background(255);
  noFill();
  dibujaTextos();
  dibujaOrbita();
  dibujaSectores(1);
  dibujaSectores(2);
  dibujaPlaneta();
  dibujaSol();
  
  
}
function dibujaTextos(){
  B_PIX = A_PIX*semiejeMenor/semiejeMayor;
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
  
  var tActual1 = tS1/PER;
  tActual1 = tActual1.toFixed(3);
  var s1 = ''+(""+tActual1).replace(".",",")+" T";           
  var tActual2 = (tS2/PER);
  tActual2 = (""+tActual2.toFixed(3)).replace(".",",");
  var s2 = ''+tActual2+" T";           
  text('T1 = ' + s1,30, 150);
  text('T2 = ' + s2,30, 190);
  
  
  
}
function dibujaPlaneta(){
  ePix = eps*A_PIX;
  let n = Math.floor(t/PER);
  c1 = Math.sqrt((1+eps)/(1-eps));                                 if (n > 0){
    t -= n*PER;                                     } 
  var e = excAnomaly(2*PI*t/PER);                             var phi1 = 2*Math.atan(c1*Math.tan(e/2));                  var rRel = 1-eps*Math.cos(e);                              var rPix = A_PIX*rRel;                                     var x = X0+ePix+rPix*Math.cos(phi1);                       var y = Y0-rPix*Math.sin(phi1);                            fill(color('blue'));                                      
  circle(x,y,20);                               tS1 = (insideSector(1,x,y) ? timeSector(1) : part*PER);    tS2 = (insideSector(2,x,y) ? timeSector(2) : part*PER);    var xSol = X0+ePix;
  stroke(0);
  line(xSol,Y0,x, y);
  
}
function moveSector (s) {
  var s0 = 3-s;                                              var dir = 0;                                               var sector1 = (s == 1);                                    var phi0 = (sector1 ? phi2 : phi1);                        var phiMin = (sector1 ? phi1Min : phi2Min);                var phiMax = (sector1 ? phi1Max : phi2Max);                var x = X0+ePix+100*Math.cos(phiMin);                      var y = Y0-100*Math.sin(phiMin);                           if (insideSector(s0,x,y)){
    dir = 1;                                                            } 
  x = X0+ePix+100*Math.cos(phiMax);                          y = Y0-100*Math.sin(phiMax);                               if (insideSector(s0,x,y)){
    dir = -1;                        } 
  if (dir == 0){
    return;                                      } 
  var e2 = 2*Math.atan(Math.tan(phi0/2)/c1);                 if (e2 < 0){
    e2 += 2*PI;                                     } 
  var m2 = e2-eps*Math.sin(e2);                              var m1 = m2+dir*part*2*PI;                                  if (m1 < 0){
    m1 += 2*PI;                                     } 
  if (m1 > 2*PI){
    m1 -= 2*PI;                                   } 
  var e1 = excAnomaly(m1);                             var phiNew = 2*Math.atan(c1*Math.tan(e1/2));               console.log('El ángulo al girar es ' + phiNew);
  if (phiNew < 0){
    phiNew += 2*PI;                             } 
  if (sector1){
    phi1 = phiNew;               console.log('phi1 es ahora ' + phi1);
  } 
  else {
    phi2 = phiNew;              console.log('phi2 es ahora ' + phi2);
  }
}

function insideSector (s, x, y) {
  var sector1 = (s == 1);                                     
  var phi = (sector1 ? phi1 : phi2);                          
  var phiMin = (sector1 ? phi1Min : phi2Min);                   if (phiMin > phi){
    phiMin -= 2*PI;                              } 
  var phiMax = (sector1 ? phi1Max : phi2Max);                   if (phiMax < phi){
    phiMax += 2*PI;                              } 
  if (diff(phiMin,x,y) > 0 && diff(phi,x,y) < 0){
    return true;   }
  if (diff(phiMax,x,y) < 0 && diff(phi,x,y) > 0){
    return true;   } 
  return false;                                               }
  
function diff (phi0, x, y) {
  var d = Math.atan2(Y0-y,x-X0-ePix)-phi0;                   while (d < -Math.PI) d += 2*PI;                             while (d > Math.PI) d -= 2*PI;                              return d;                                                }

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
function positionAngle (e) {
  var x = A_PIX*Math.cos(e);                                 var y = B_PIX*Math.sin(e);                                  return atanMio(y,x-ePix);                                  
}
function atanMio (dy, dx) {
  var w = Math.atan2(dy,dx);                                 return (w>=0 ? w : w+2*PI);                               }

function dibujaSectores(s){
  var sector1 = (s == 1);                                    c1 = Math.sqrt((1+eps)/(1-eps));                                 var phi = (sector1 ? phi1 : phi2);                         var e = 2*Math.atan(Math.tan(phi/2)/c1);                   if (e < 0){
    e += 2*PI;                                               } 
  var m = e-eps*Math.sin(e);                                 var m0 = m-part*PI;                                        if (m0 < 0) {
    m0 += 2*PI;                                              }
  var m1 = m+part*PI;                                        if (m1 > 2*PI){
    m1 -= 2*PI;                                               } 
  var e0 = excAnomaly(m0);                             var e1 = excAnomaly(m1);                             var rRel0 = 1-eps*Math.cos(e0);                              var rPix0 = A_PIX*rRel0;                                     var rRel1 = 1-eps*Math.cos(e1);                              var rPix1 = A_PIX*rRel1;                                     
  if (sector1) {
    phi1Min = positionAngle(e0);                               phi1Max = positionAngle(e1);                               t0S1 = PER*m0/(2*PI);                                         }
  else {                                                       phi2Min = positionAngle(e0);                               phi2Max = positionAngle(e1);                               t0S2 = PER*m0/(2*PI);                                         }

  drawingContext.save();                                                drawingContext.beginPath();                                           drawingContext.translate(X0,Y0);                                      drawingContext.scale(A_PIX,B_PIX);                                     drawingContext.arc(0,0,1,2*PI-e0,2*PI-e1,true);                         drawingContext.restore();                                             drawingContext.lineTo(X0+ePix,Y0);                                    drawingContext.closePath();                                           if(sector1){
    drawingContext.fillStyle = 'rgb(152, 186, 3)';
  }
  else{
    drawingContext.fillStyle = 'rgb(252, 3, 235)';
  }
  drawingContext.fill();
  drawingContext.stroke();                                
  fill(0);
  stroke(0);  
  var xSol = X0+ePix;
  if(sector1){
    var xA = xSol+rPix0*Math.cos(phi1Min);                         var yA = Y0-rPix0*Math.sin(phi1Min);                              var xB = xSol+rPix1*Math.cos(phi1Max);
    var yB = Y0-rPix1*Math.sin(phi1Max);                        
    line(xSol,Y0,xA,yA);                                      line(xSol,Y0,xB,yB);               
  }
  else{
    var xA = xSol+rPix0*Math.cos(phi2Min);                         var yA = Y0-rPix0*Math.sin(phi2Min);                              var xB = xSol+rPix1*Math.cos(phi2Max);
    var yB = Y0-rPix1*Math.sin(phi2Max);                        
    line(xSol,Y0,xA,yA);                                      line(xSol,Y0,xB,yB);               
  }
  strokeWeight(1);
  
} 
function timeSector (s) {
  var t0 = (s==1 ? t0S1 : t0S2);                             var dt = t-t0;                                             if (dt < 0) dt += PER;                                     return Math.min(dt,part*PER);                            }

function touchMoved(){
  if (nr == 0){
    return;                                       } 
  reactionMove(mouseX,mouseY);                         
}
function touchEnded(){
  nr = 0;
  
}

function touchStarted(){
  if (mouseX > 0 && mouseY > 0 && mouseX <width && mouseY<height) {
      reactionDown(mouseX, mouseY);
  }
}

function reactionMove (u, v) {
  var w = atan2(Y0-v,u-X0-ePix);                             if (nr == 1) {phi1 = w; moveSector(2);}                    if (nr == 2) {phi2 = w; moveSector(1);}                  }
function reactionDown (u, v) {
  if (insideSector(1,u,v)) nr = 1;                           else if (insideSector(2,u,v)) nr = 2;                      else nr = 0;                                             } 


function muestraInfo(){
  $('.dialogoInfo').toggle();
  $(".textoAyudaTitulo").fitText(2.8);
  $(".explicacionRecurso").fitText(4);
  $(".contenidoInfo").fitText(3);
  $(".textoDatos1").fitText(5); 
  $(".textoDatos2").fitText(5); 
  $(".textoAyudaTitulo").fitText(5); 
  $(".textoDerechos").fitText(7); 
  $('.general').toggle();
  $('.slider').toggle();
  $('.rangeSlider').toggle();
  $('.textoExplicacion2').toggle();
  $('.textoExplicacion3').toggle();
  $('.textoExplicacion4').toggle();
}