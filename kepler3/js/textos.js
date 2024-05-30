//Al cargar el documento se ejecuta esto
let mapaTextos = new Map();
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
  $(".textoAyudaTitulo").fitText(2.8);
  $(".contenidoInfo").fitText(3.8);
  $(".textoAyuda").fitText(4.5); 
  $('.general').toggle();
  $('.slider').toggle();
  $('.rangeSlider').toggle();
  $('.divFormula').toggle();
  $('.formula').toggle();
  $('.dropbtn').toggle();
}

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

$('textoExplicacion2').click(false);