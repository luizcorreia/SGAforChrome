﻿

//-- Nova Grade de Horarios
function novaGrade(){
	var g = $('a:contains("Grade de Horários")');
	g.attr("href", "#");
	$("body").append('<div id="grade"></div>');
	
	g.click( function() {  
    	$("#grade").bPopup({
			content:'iframe',
			positionStyle:'fixed',
			scrollBar:false,
			position:['auto',0],
        	loadUrl: 'http://www.sistemas.pucminas.br/sga3/SilverStream/Pages/pgAln_GradedeHorarios.html'
		});
	});
}
chrome.extension.sendRequest({localstorage: "nova_grade"}, function(response){ 
	var grade = response;
	if(grade == "yes"){
		novaGrade();
	}
})


//-- Icone
chrome.extension.sendRequest({localstorage: "site_icon"}, function(response){ 
	var icon = response;	
	if(icon == "true"){
		$('head').append('<link rel="shortcut icon" href="https://dl.dropbox.com/u/2345114/SGA/logo97x100.png">');
	}
})






var teste = $('span:contains("Disciplinas em Curso"):eq(1)');
teste.css('display', 'none');



var a = $('img[src="./../../../sga3/SilverStream/Objectstore/Images/apoiodidatico_r1_c1.gif"]');
a.replaceWith('<a href="./../../../sgaaluno3/SilverStream/Pages/pgAln_Noticias.html"><img src="./../../../sga3/SilverStream/Objectstore/Images/apoiodidatico_r1_c1.gif" width="125" height="32" border="0"></a>')








//<link rel="shortcut icon" href="https://dl.dropbox.com/u/2345114/SGA/logo97x100.png">

//$("#left-fixed").load('http://www.sistemas.pucminas.br/sgaaluno3/SilverStream/Pages/pgAln_NotaFrequencia2.html .class1');

//$("#left-fixed").load(chrome.extension.getURL('menu/menu.html'));



//setInterval(keep_alive,120000);

//$("body").append('</form><div id="final"> <h1>Raphael</h1>');
