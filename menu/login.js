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
		document.getElementById('popup').innerHTML = "Salvo";
		setTimeout(function(){ clear(); }, clearTime );
		localStorage["usuario"] = usuario;
		localStorage["senha"] = senha;
		localStorage["origem"] = origem;
		localStorage["lembrar"] = true;
		document.getElementById('login').submit();
		
	}else{
		document.getElementById('popup').innerHTML = "Enviado sem salvar";
		setTimeout(function(){ clear(); }, clearTime );
		localStorage["usuario"] = 0;
		localStorage["senha"] = 0;
		localStorage["origem"] = 0;
		localStorage["lembrar"] = 0;
		document.getElementById('login').submit();
	}
//	alert(popup);
	
	
	//document.getElementById('login').submit();
	

 	
// Envio de Menssagem para o Background	
	chrome.extension.sendMessage({start: "yes"}, function(response) {
  console.log(response.farewell);
});

	
	
	
}

function main(){

	if(localStorage["lembrar"] != 0){
		document.getElementById('lembrar').checked= true;
		if(localStorage["usuario"] != 0){
			document.getElementById('usuario').value = localStorage["usuario"];
		}
		if(localStorage["senha"] != 0){
			document.getElementById('senha').value = localStorage["senha"];
		}
		if(localStorage["origem"] != 0){
			document.getElementById('origem').value = localStorage["origem"];
			
		}
		
	}
}




document.addEventListener('DOMContentLoaded', function () {
  main();
  document.getElementById('submit').addEventListener('click', login_main);
          
});
