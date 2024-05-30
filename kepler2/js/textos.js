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
            });
        }       
    });

    //Ocultamos la ventan de info
    $('.dialogoInfo').hide();
	
});

//Para la ventana de info
function muestraInfo(){
  $('.dialogoInfo').toggle();
  $(".textoAyudaTitulo").fitText(2.8);
  $(".contenidoInfo").fitText(3.8);
  $(".textoAyuda").fitText(4.5); 
  $('.general').toggle();
  $('.slider').toggle();
  $('.rangeSlider').toggle();
  $('.textoExplicacion2').toggle();
  $('.textoExplicacion3').toggle();
  $('.textoExplicacion4').toggle();
}