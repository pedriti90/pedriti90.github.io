let mapaTextos = new Map();
//Al cargar el documento se ejecuta esto
$(document).ready(function(){
	
	//Cargamos textos del XML
    $.ajax({
        type: "GET" ,
        url: "xml/esES.xml" ,
        dataType: "xml" ,
        success: function(xml) {
            $(document).find("title").text($(xml).find('title').text());
            
            var idTexto;
            $(xml).find('texto').each(function(){ 
                idTexto = $(this).attr('class');
                $('.'+idTexto).html($(this).text());
                mapaTextos.set(idTexto, $(this).text());
            });
        }       
    });

    //Ocultamos la ventan de info
    $('.dialogoInfo').hide();
	
});

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
  $(".textoInfo1").fitText(2.0);
  $(".textoInfo2").fitText(2.0);
  $(".textoInfo3").fitText(2.0);
  $(".textoInfo4").fitText(2.0);
  $(".textoInfo5").fitText(2.0);
  $(".textoAyuda").fitText(2.0);

  
}