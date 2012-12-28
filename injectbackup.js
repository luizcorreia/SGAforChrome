//---- Basico


function replace(original,novo){
	var reg = new RegExp(original, "g");
	document.body.innerHTML = document.body.innerHTML.replace(reg, novo);
};

function keep_alive() {
    http_request = new XMLHttpRequest();
    http_request.open('GET', "http://www.sistemas.pucminas.br/sga3/SilverStream/Pages/pgAln_ArquivosPostados.html");
    http_request.send(null);
};

//---- Chamadas

// --- Basicos

var menuFix = '<td valign="TOP" bgcolor="#F9F9F9" style="border-top:1px solid #CCCCCC" width="100%">';
var menuOld = '<td valign="TOP" bgcolor="#F9F9F9" style="border-top:1px solid #CCCCCC">';
replace(menuOld, menuFix);

var menuSizeOld = '<table border="0" bordercolor="#808080" cellpadding="0" cellspacing="2" width="156">';
var menuSizeFix = '<table border="0" bordercolor="#808080" cellpadding="0" cellspacing="0"  id="left-fixed">';
replace(menuSizeOld,menuSizeFix);

var logoOld = '<img src="./../../../sga3/SilverStream/Objectstore/Images/apoiodidatico_r1_c1.gif" width="125" height="32" border="0">';
var logoFix = '<a href="./../../../sgaaluno3/SilverStream/Pages/pgAln_Noticias.html"> <img src="./../../../sga3/SilverStream/Objectstore/Images/apoiodidatico_r1_c1.gif" width="125" height="32" border="0" > </a>';
replace(logoOld, logoFix);


var noticiasOld = '<td valign="TOP" width="80%">'; 
var noticiasFix = '<td valign="left" width="100% style="margin:left !important;">';
replace(noticiasOld, noticiasFix);

var pVaziosOld = '<p></p>'; 
var pVaziosFix = '';
replace(pVaziosOld, pVaziosFix);

var sairOld = '<img src="./../../../sga3/SilverStream/Objectstore/Images/Sair.gif" width="25" height="25" border="0">'; 
var sairFix = '<img id="image_alive" src="http://www.sistemas.pucminas.br/sga3/SilverStream/Objectstore/Images/Sair.gif" width="25" height="25" border="0">';
//replace(sairOld, sairFix);



var lixoOld = 'border-collapse:collapse'; 
var lixoFix = '';
replace(lixoOld, lixoFix);

var test2Old = 'bgcolor="#FFFFFF"'; 
var test2Fix = '';
replace(test2Old, test2Fix);

var test3Old = 'cellpadding="2"'; 
var test3Fix = 'cellpadding="0"';
replace(test3Old, test3Fix);

var test4Old = 'cellspacing="1"'; 
var test4Fix = 'cellspacing="0"';
replace(test4Old, test4Fix);

var test5Old = 'cellpadding="1"'; 
var test5Fix = 'cellpadding="0"';
replace(test5Old, test5Fix);
// ---- Basico

var test6Old = 'A apuração da freqüência '; 
var test6Fix = '';
//replace(test6Old, test6Fix);

var test7Old = 'final será feita com base no número total de aulas apuradas no semestre, caso este'; 
var test7Fix = '';
//replace(test7Old, test7Fix);




//-- Nova Grade de Horarios
function novaGrade(){
	var gradeOld = './../../../sga3/SilverStream/Pages/pgAln_ChamaGrade.html"'; 
	var gradeFix = '#" id="horario"';
	replace(gradeOld, gradeFix);

	$("body").append('<div id="grade"></div>');

	$('#horario').click( function() {  
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













//<link rel="shortcut icon" href="https://dl.dropbox.com/u/2345114/SGA/logo97x100.png">

//$("#left-fixed").load('http://www.sistemas.pucminas.br/sgaaluno3/SilverStream/Pages/pgAln_NotaFrequencia2.html .class1');

//$("#left-fixed").load(chrome.extension.getURL('menu/menu.html'));



//setInterval(keep_alive,120000);

//$("body").append('</form><div id="final"> <h1>Raphael</h1>');
