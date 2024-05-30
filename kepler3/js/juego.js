
let X0;
let Y0;          
let numPlaneta = 2;
let PER = 10;
let t = 0; 
let eps = 0.017; let A_PIX = 300;                                           let B_PIX;                                           let ePix;                                                 let semiejeMayor = 1.000;
let semiejeMenor;
let radioSol = 50;
let epsPlanets = [0.206, 0.007, 0.017, 0.093, 0.048, 0.056, 0.046, 0.009];    
let aPlanets = [0.387, 0.723, 1.000, 1.52, 5.20, 9.55, 19.2, 30.1];let periodos = [0.24, 0.62, 1, 1.88, 11.86, 29.46, 84.01, 164.8];
let listaPlanetas = [];
let coloresPlanetas = ['maroon', 'silver', 'blue', 'crimson', 'maroon', 'plum', 'silver', 'silver'];
let distanciaAlSol = 15.21;
let periodo;
let UA = 149600000;
let cociente; 
let formula;
let tF = 'T<sup>2</sup>/a<sup>3</sup> = ';
function setup() {
  var canvas = createCanvas(1300, 750);
  canvas.id = "canvas";
  canvas.parent('general');
  X0 = width/2;
  Y0 = height/2;
  cambiaPlaneta(numPlaneta);
     listaPlanetas.push(txtRecursos.Mercurio);
   listaPlanetas.push(txtRecursos.Venus);
   listaPlanetas.push(txtRecursos.Tierra);
   listaPlanetas.push(txtRecursos.Marte);
   listaPlanetas.push(txtRecursos.Jupiter);
   listaPlanetas.push(txtRecursos.Saturno);
   listaPlanetas.push(txtRecursos.Urano);
   listaPlanetas.push(txtRecursos.Neptuno);
}
function calculaCociente(){
  let valor  = Math.pow(periodo,2)/(Math.pow(semiejeMayor,3));
  if(valor==1){
    return valor;
  }
  return (""+valor.toFixed(2)).replace(".",",");
}
function cambiaPlaneta(n,m){
  numPlaneta = n;
  eps = epsPlanets[numPlaneta];
  semiejeMayor = aPlanets[numPlaneta];
  periodo = periodos[numPlaneta];
  cociente = calculaCociente();  
  t = 0;
  if (m) {
    document.getElementById("Planetas").innerHTML = m;
  }
}
function draw() {
  t+=0.025;
  PER = map(periodo,0.24,164.8,5,50);
  A_PIX = map(semiejeMayor, 0.381, 30.1, 100, 300);
  radioSol = 70-map(semiejeMayor, 0.381, 30.1, 20, 50);
  background(255);
  dibujaOrbita();
  dibujaSol();
  dibujaPlaneta();
  dibujaTextos();
}
function dibujaTextos(){
  let tAT = numPlaneta==2?txtRecursos.aT:txtRecursos.aTs;
  let se = semiejeMayor==1?semiejeMayor:semiejeMayor.toFixed(2);
  fill(0);
  textSize(30);
  text('e = ' + (""+eps.toFixed(3)).replace(".",","),30, 70);
  text('a = ' + (""+se).replace(".",",") + ' ' + txtRecursos.UA,30, 110);
  text('T = ' + (""+periodo).replace(".",",") + ' ' +tAT,30, 150);
  text(txtRecursos.datoUA,30, 190);
  text('T /a = ' + cociente, 30,230);
  textSize(20);
  text(' 2   3', 45,215);
  textSize(30);

}
function dibujaOrbita () {
  stroke(0);
  semiejeMenor = semiejeMayor*Math.sqrt(1-eps*eps);                                B_PIX = A_PIX*semiejeMenor/semiejeMayor;                                          noFill();
  ellipse(X0,Y0,2*A_PIX,2*B_PIX);                               }
function dibujaSol(){
  let posL = X0-ePix;                                        let posR = X0+ePix;
  noStroke();
  fill(color('orange'));                                      
  circle(posR,Y0,2*radioSol);                    
}
function dibujaPlaneta(){
  ePix = eps*A_PIX;
  let n = Math.floor(t/PER);
  c1 = Math.sqrt((1+eps)/(1-eps));                                 if (n > 0){
    t -= n*PER;                                     } 
  var e = excAnomaly(2*PI*t/PER);                             var phi1 = 2*Math.atan(c1*Math.tan(e/2));                  var rRel = 1-eps*Math.cos(e);                              var rPix = A_PIX*rRel;                                     var x = X0+ePix+rPix*Math.cos(phi1);                       var y = Y0-rPix*Math.sin(phi1);                            fill(color(coloresPlanetas[numPlaneta]));                                      
  circle(x,y,20);                             }
function excAnomaly (m) {
  let eL = 0;
  let eR = 2*PI;                                      let e;
  while (eR-eL > 1e-5) {                                         e = (eL+eR)/2;                                           if (e-eps*Math.sin(e) < m){                      eL = e;
      }        
      else{
        eR = e;                                                 } 
  }
  return e;                                                }

$("#clickable").click(function(e) {
    var elemento = document.getElementById("miMenu");
    elemento.classList.toggle("show");
   
});
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')&&!event.target.matches('p.Planetas')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
function muestraInfo(){
  $('.dialogoInfo').toggle();
  $('.general').toggle();
  $('.slider').toggle();
  $('.rangeSlider').toggle();
  $('.divFormula').toggle();
  $('.formula').toggle();
  $('.dropbtn').toggle();
  $(".textoCabecera").fitText(4.5);
  $(".explicacionRecurso").fitText(4);
  $(".contenidoInfo").fitText(3);
  $(".textoDatos1").fitText(5); 
  $(".textoDatos2").fitText(5); 
  $(".textoAyudaTitulo").fitText(5); 
  $(".textoDerechos").fitText(7); 
}
