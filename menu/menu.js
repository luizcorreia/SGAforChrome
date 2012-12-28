var bgPage = chrome.extension.getBackgroundPage();


function callback(){ 
	var preload = $(this).html();
	var prefix = "http://www.sistemas.pucminas.br/";
    var old = "./../../../";
    
    preload = preload.replace(new RegExp(old, "g"), prefix);
	preload = preload.replace(new RegExp("_top", "g"), "new");
	
	$('#materias').html(preload);
	bgPage.menuMaterias = preload;
}

function preload(){
	$('#preload').load('http://www.sistemas.pucminas.br/sco/SilverStream/Pages/pgNOT_AreaNoticia.html .menulateral1', callback);	
}

function load(){
	if(bgPage.menuMaterias == ""){
		preload();
	}else{
		$('#materias').html(bgPage.menuMaterias);
	}
}
function checkMens(){
	if(bgPage.menuMensagens > 0){
		$('#mens').attr('data-notifications', bgPage.menuMensagens);
	}else{
		$('#mens').attr('data-notifications', "");
		$('#mens').removeAttr('data-notifications');
		
	}
}

function nameCallback(){ 
	var preload = $(this).html();

	preload = preload.substring(427, 3000);
	
	$('#nome').html(preload);
	bgPage.nome = preload;
}

function setName(){
	if(bgPage.nome == ""){
		$('#nome_preload').load('http://www.sistemas.pucminas.br/sco/SilverStream/Pages/pgNOT_AreaNoticia.html .class2 span:nth-child(1)', nameCallback);

	}else{
		$("#nome").html(bgPage.nome);
	}
}



function menu_main() {
	if (localStorage["menu"] != "" ){
		$(".primeiro").html(localStorage["menu"]);
	}

		setName();
		checkMens();
		load();
}

function clickHandler(e) {
  //setTimeout(load, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
  menu_main();
});