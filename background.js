//var loading = new LoadingAnimation;	

function SessionStart(page, time, loadIcon){	
	var d = new Date();
	if(loadIcon == "yes"){
		chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
		chrome.browserAction.setBadgeText ( { text: " . . . " } );	
	}
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", page, true);
	
	xmlHttp.onreadystatechange = stages;
	
	function stages(){
			if (xmlHttp.readyState == 4){// Pronto
				clearTimeout(TO);
				//clearTimeout(TO2);
				//chrome.browserAction.setBadgeText ( { text: "Fast" } );			
				var local_page = xmlHttp.responseText;
				
				carregarDados(local_page);
				
				//var x = d.getMilliseconds();
				//localStorage["ping"]=x;
			}
	}	
	xmlHttp.send(null);
	var TO = setTimeout(offline, time);

			function offline() {
				xmlHttp.abort();
				//var g = d.getMilliseconds();
				//localStorage["ping"]= g; 
				chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
				chrome.browserAction.setBadgeText ( { text: "Lento " } );
				//var remove = setTimeout(function(){ chrome.browserAction.setBadgeText ( { text: "" }); }, 700);
				
				
	}


}

function Session(page, time, loadIcon){	
	var d = new Date();
	if(loadIcon == "true"){
		chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
		chrome.browserAction.setBadgeText ( { text: " . . . " } );	
	}
//Pagina 1	
	var xmlHttp1 = new XMLHttpRequest();//Conection p1
	var xmlHttp2 = new XMLHttpRequest();//Conection p2
	var TO1 = setTimeout(offline1, time);
	var TO2 = setTimeout(offline2, (time+time));
	var loadedPages = new Array();
	xmlHttp1.open("GET", page[0], false); //  Get P0(material, falta, bloqueio)
	xmlHttp1.onreadystatechange = stages1; // Stages get p0
	function stages1(){
			if (xmlHttp1.readyState == 4){// 200 ok
				clearTimeout(TO1);
				
				//chrome.browserAction.setBadgeText ( { text: "Fast" } );			
				loadedPages[0] = xmlHttp1.responseText;
				
				
				xmlHttp2.open("GET", page[1], false); //Get p1 (mensagens)
				xmlHttp2.onreadystatechange = stages2;
				xmlHttp2.send(null);
			}
	}	
	xmlHttp1.send(null);
	
			function offline1() {
				xmlHttp1.abort();
				//var g = d.getMilliseconds();
				//localStorage["ping"]= g; 
				chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
				chrome.browserAction.setBadgeText ( { text: "L2 " } );
				//var remove = setTimeout(function(){ chrome.browserAction.setBadgeText ( { text: "" }); }, 700);
	}
//Pagina 2

	function stages2(){
			if (xmlHttp2.readyState == 4){// Pronto
				clearTimeout(TO2);
				//clearTimeout(TO2);
				//chrome.browserAction.setBadgeText ( { text: "Fast" } );			
				loadedPages[1] = xmlHttp2.responseText;
				
				carregarDados(loadedPages);
				
				//var x = d.getMilliseconds();
				//localStorage["ping"]=x;
			}
	}	
	
	

			function offline2() {
				xmlHttp2.abort();
				//var g = d.getMilliseconds();
				//localStorage["ping"]= g; 
				chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
				chrome.browserAction.setBadgeText ( { text: "L2 " } );
				//var remove = setTimeout(function(){ chrome.browserAction.setBadgeText ( { text: "" }); }, 700);
				
				
	}

}

function getPUCMail(page){
	var re1='[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})';	// Non-greedy match on filler


	var p = new RegExp(re1,["i"]);
	if(page.search(p) >= 0){
			alert("Good one");
	}else{
		alert("Shit");
	}

}

function CheckMensagens(page){
	var num = 0;
	var c = 0;
	var re1='.*?';	// Non-greedy match on filler
    var re2='(\\()';	// Any Single Character 1
    var re3='(2)';	// Any Single Character 2
    var re4='(\\))';	// Any Single Character 3
    var re5='(<)';	// Any Single Character 4

	for (c = 1; c <=10; c++){	
		var p = new RegExp(re1+re2+'('+c+')'+re4+re5,["i"]);
		if(page.search(p) >= 0){
			num = c;
			break;
		}
	}	
	if(num > 0){
		menuMensagens = num;
		return num;
	}else{
		menuMensagens = 0;
		return 0;
	}
	return 0;

}
function CheckBloqueios(page){
	var re1='../../../sgaaluno3/SilverStream/Pages/pgAln_BloqueioNoticia.html';
	if(page.search(re1) >= 0){
		return true;
	}else{
		return false;
	}
	return false;
}

function CheckMaterial(page){
	//var p ="<B>notas, faltas ou material didático";
	var p ="<B>Material Didático";
	if(page.search(p) >= 0){
		return true;
	}else{
		return false;
	}
	return false;
}

function CheckFalta(page){
	var p ='<B>Falta';
	if(page.search(p) >= 0){
		return true;
	}else{
		return false;
	}
	return false;
}
function CheckNota(page){
	var p ='<B>Nota';
	if(page.search(p) >= 0){
		return true;
	}else{
		return false;
	}
	return false;
}

function checkPage0(page){ //Material, Falta, Bloqueio, Logado ou nao
			

		chrome.browserAction.setPopup( {popup: "menu/menu.html"} );
		var boolMaterial = CheckMaterial(page);
		var boolFalta = CheckFalta(page);
		var boolNota = CheckNota(page);
		
		if(boolMaterial){
			material = true;
		}
		if(material){
			chrome.browserAction.setBadgeBackgroundColor({color: "#ff9900"});
			chrome.browserAction.setBadgeText ( { text: "Mate." } );
		}
		if(boolFalta){
			falta = true;
		}
		if(falta){
			chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
			chrome.browserAction.setBadgeText ( { text: "Falta" } );
		}
	
}

function checkPage1(page){//Mensagens
			
	if(page.search("ENCERRADA") >= 0){ //encontrar
		chrome.browserAction.setPopup( {popup: "menu/" + localStorage["menu_code"] + ".html"} );
		chrome.browserAction.setBadgeBackgroundColor({color: "#bababa"});
		chrome.browserAction.setBadgeText ( { text: "?" } );
		logado = false;
		return logado;
	}else{
		var numMen = CheckMensagens(page);
		var block = CheckBloqueios(page);

		var m = localStorage["mensagens"];
		var b = localStorage["bloqueios"];
		
		if(m != "true"){
			numMen = 0;
		}
		if(b != "true"){
			block = false;;
		}
		
		if((numMen <= 0 && !block)){
			chrome.browserAction.setBadgeText ( { text: "" } );
		}else{
			if(numMen > 0){
				chrome.browserAction.setBadgeBackgroundColor({color: "#ff9900"});
				chrome.browserAction.setBadgeText ( { text: numMen + "" } );	
			}
			if(block){
				chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
				chrome.browserAction.setBadgeText ( { text: "Bloq." } );
				
			}
			
		}
		
		
		
	}
	
	return true;
}

function carregarDados(page){
			if(checkPage1(page[1])){
				checkPage0(page[0])
			}
}

function carregarDados2(page){
			
	if(page.search("ENCERRADA") >= 0){ //encontrar
		chrome.browserAction.setPopup( {popup: "menu/" + localStorage["menu_code"] + ".html"} );
		chrome.browserAction.setBadgeBackgroundColor({color: "#bababa"});
		chrome.browserAction.setBadgeText ( { text: "?" } );
		logado = false;
	}else{
		chrome.browserAction.setPopup( {popup: "menu/menu.html"} );
		var numMen = mensagens(page);
		var block = bloqueios(page);
		var boolMaterial = FUNCmaterial(page);
		var boolFalta = FUNCfalta(page);

		logado = true;
		var m = localStorage["mensagens"];
		var b = localStorage["bloqueios"];
		
		if(m != "true"){
			numMen = 0;
		}
		if(b != "true"){
			block = false;;
		}
		
		if((numMen <= 0 && !block)){
			chrome.browserAction.setBadgeText ( { text: "" } );
		}else{
			if(numMen > 0){
				chrome.browserAction.setBadgeBackgroundColor({color: "#ff9900"});
				chrome.browserAction.setBadgeText ( { text: numMen + "" } );	
			}
			if(block){
				chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
				chrome.browserAction.setBadgeText ( { text: "Bloq." } );
				
			}
			
		}
		if(boolMaterial){
			material = true;
		}
		if(material){
			chrome.browserAction.setBadgeBackgroundColor({color: "#ff9900"});
			chrome.browserAction.setBadgeText ( { text: "Mate." } );
		}
		if(boolFalta){
			falta = true;
		}
		if(falta){
			chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
			chrome.browserAction.setBadgeText ( { text: "Falta" } );
		}
		
		
	}
	
	return logado;
}

