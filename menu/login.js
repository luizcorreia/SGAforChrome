function rng(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
}

function c(string){if(localStorage["rng"] == 0){localStorage["rng"] = rng(11,127);}var code=[];var s = string.length;var rn = parseInt(localStorage["rng"]);var partial = s * rn;for(var c = 0; c < s; c++ ){code[c] = string.charCodeAt(c)* partial;}localStorage['senha']=JSON.stringify(code);}

function d(string){var code = JSON.parse(string);var s = code.length;var rn = parseInt(localStorage["rng"]);var partial = s * rn;var result="";for(var c = 0; c < s; c++ ){result = result + String.fromCharCode((parseInt(code[c])/partial));}return result;}

function clear(){
	document.getElementById('popup').innerHTML = "";
}
var clearTime = 1500;
function login_main(){
	
	var usuario = document.getElementById('usuario').value;
	var senha = document.getElementById('senha').value;
	var origem = document.getElementById('origem').value;
	var popup = document.getElementById('popup').innerHTML;
	var lembrar = document.getElementById('lembrar').checked;
	
	//document.getElementById('popup').innerHTML = "raphael";
	//alert(lembrar);
	if(usuario == ""){
		document.getElementById('popup').innerHTML = "Informe a Matrícula.";
		setTimeout(function(){ clear(); }, clearTime );
	}else if(senha == ""){
		document.getElementById('popup').innerHTML = "Informe a Senha.";
		setTimeout(function(){ clear(); }, clearTime );
	}else if(origem == "0"){
		document.getElementById('popup').innerHTML = "Selecione a origem.";
		setTimeout(function(){ clear(); }, clearTime );
	}else if(lembrar){
		//document.getElementById('popup').innerHTML = "OK";
		setTimeout(function(){ clear(); }, clearTime );
		localStorage["usuario"] = usuario;
		c(senha);
		localStorage["origem"] = origem;
		localStorage["lembrar"] = true;
		document.getElementById('login').submit();
		
		// Envio de Menssagem para o Background	
		chrome.extension.sendMessage({start: "yes"}, function(response) {
		  console.log(response.farewell);
		});
		
	}else{
		//document.getElementById('popup').innerHTML = "Enviado sem salvar";
		setTimeout(function(){ clear(); }, clearTime );
		localStorage["usuario"] = 0;
		localStorage["senha"] = 0;
		localStorage["origem"] = 0;
		localStorage["lembrar"] = 0;
		document.getElementById('login').submit();
		// Envio de Menssagem para o Background	
		chrome.extension.sendMessage({start: "yes"}, function(response) {
		  console.log(response.farewell);
		});

	}
//	alert(popup);
//document.getElementById('login').submit();
	

 	


	
	
	
}

function main(){
	if(localStorage["lembrar"] != 0){
		document.getElementById('lembrar').checked= true;
		if(localStorage["usuario"] != 0){
			document.getElementById('usuario').value = localStorage["usuario"];
		}
		if(localStorage["senha"] != 0){
			document.getElementById('senha').value = d(localStorage['senha']);
		}
		if(localStorage["origem"] != 0){
			document.getElementById('origem').value = localStorage["origem"];
			
		}
		
	}
}
var click = false;
function loadIframe(){
	var iframe = '<iframe src="https://www.sistemas.pucminas.br/sgaaluno3/SilverStream/Pages/pgAln_LoginSSL.html" height="0" width="0" frameborder="0"></iframe>';
	if(!click){
		document.getElementById('frame').innerHTML = iframe;
		click = true;
	}
}





document.addEventListener('DOMContentLoaded', function () {
  main();
  //c("Raphael Quintao Silveira");
  //d(localStorage['senha']);
  document.getElementById('submit').addEventListener('click', login_main);
  setTimeout(function(){ loadIframe();} , 100 );
  
  //document.body.addEventListener('click', function(){ loadIframe(); });
  //document.body.addEventListener('focus', function(){ loadIframe(); });
          
});
