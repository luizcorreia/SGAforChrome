//--- Variaveis Globais
var menuMaterias = "";
var menuMensagens = 0;
var email = 0;
var nomeDefault = "Homer Simpsons";
var nome = "";
var logado = false;
var bloqueio = false;

function getResolution(){
	if(screen.height >= 768){
		localStorage["nova_grade"] = "true";
	}
		localStorage["resolution"] = screen.height;
}

function firstTime(){
	if(localStorage["first"] != "false"){
		localStorage["first"] = "false";
// -- Extension Options
		localStorage["mensagens"] = "true";
		localStorage["bloqueios"] = "true";
		localStorage["menu"] = "";
// --- Advanced Options
		localStorage["ping"] = 0;
		localStorage["default_checktime"] = Sec(45);
		localStorage["timeout"] = 0;		
		localStorage["usuario"] = 0;
		localStorage["senha"] = 0;
		localStorage["origem"] = 0;
		localStorage["menu_code"] = "login_01";
// --- Site Options
		localStorage["site_icon"] = "true";
		localStorage["nova_grade"] = "false";
		localStorage["resolution"] = 0;
		getResolution();
		
		alert("Faça um tour pela versão 1.7. (Clique aqui)")
	}
}
function Sec(ms){ return (ms*1000); }

function bgMain(p, mens){
	
	firstTime();
	
	var tempo;
	if(localStorage["timeout"] == 0){
		tempo = parseInt(localStorage.getItem("default_checktime")) /2;
	}else{
		tempo = localStorage.getItem("timeout");
	}
	
	
	clearTimeout(principal);
	var page = new Array();
	page[0] = "http://www.sistemas.pucminas.br/sgaaluno3/SilverStream/Pages/pgAln_Noticias.html";
	page[1] = "http://www.sistemas.pucminas.br/sga3/SilverStream/Pages/pgSCP_TrocarSenhaWebmail.html";
	
	var x = localStorage.getItem("default_checktime");
    var y = parseInt(x);
	
	SessionStart(page[p], tempo, "no");
	var principal = setInterval( function(){ SessionStart(page[p], tempo, mens); }, y );	

	
}
	

	bgMain(0, "no");	

	

	
	var raphael = "raphael";
	


	
	
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.start == "yes"){
	   setTimeout(function(){ bgMain(0, "no"); } , 1100);
   	}
});

	
	
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) 
{
    if (request.localstorage == "nova_grade"){
        sendResponse(localStorage["nova_grade"]);
    }else if(request.localstorage == "site_icon"){
		sendResponse(localStorage["site_icon"]);
	}else{
        sendResponse({}); // snub them.
     }    
});
	
	


	












	
// var array = new Array();
// 
// 
// 
// var c = 0; 
// 
// array[0]  = setTimeout(function(){ chrome.browserAction.setBadgeText({text:"   L"}); }, 1000 );
// array[1]  = setTimeout(function(){ chrome.browserAction.setBadgeText({text:"  Lo"}); }, 2000 );
// array[2] = setTimeout(function(){ chrome.browserAction.setBadgeText({text:" Loa"}); }, 3000 );
// array[3]  = setTimeout(function(){ chrome.browserAction.setBadgeText({text:"Load"}); }, 4000 );
// array[4]  = setTimeout(function(){ chrome.browserAction.setBadgeText({text:"oadi"}); }, 5000 );
// array[5]  = setTimeout(function(){ chrome.browserAction.setBadgeText({text:"adin"}); }, 6000 );	
// array[6]  = setTimeout(function(){ chrome.browserAction.setBadgeText({text:"ding"}); }, 7000 );	
// array[7]  = setTimeout(function(){ chrome.browserAction.setBadgeText({text:"ing."}); }, 8000 );	
// array[8]  = setTimeout(function(){ chrome.browserAction.setBadgeText({text:"ng.."}); }, 9000 );	
// array[9]  = setTimeout(function(){ chrome.browserAction.setBadgeText({text:"g. . ."}); }, 10000 );
		



