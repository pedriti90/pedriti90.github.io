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