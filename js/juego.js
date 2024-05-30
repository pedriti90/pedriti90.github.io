//Para la ventana de info
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
}