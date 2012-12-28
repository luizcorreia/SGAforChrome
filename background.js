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

function timeTest(page, TimeOut, loadIcon){
	
	if(loadIcon == "yes"){
		chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
		chrome.browserAction.setBadgeText ( { text: " . . . " } );	
	}
	//var xmlHttpTimeout = setTimeout(offline, TimeOut);
	var d = new Date();
	var req = new XMLHttpRequest();
	req.onreadystatechange = stages;
	req.open("GET", page, false);
	req.send(null);	
	//var xmlHttpTimeout = setTimeout(offline, TimeOut);
	
	function stages(){
			if (req.readyState == 4 && req.status == 200){// Pronto
				//clearTimeout(xmlHttpTimeout); 			
				var local_page = req.responseText;
				//chrome.browserAction.setBadgeText ( { text: "" } );
				//carregarDados(local_page);
				var x = d.getSeconds();
				//var y = (x/1000)*60;
				if(x > localStorage["ping"]){localStorage["ping"]=x;}
				chrome.browserAction.setBadgeText ( { text: x +"" } );
				//alert(x);
			}
	}
	function offline() {
				req.abort();
				chrome.browserAction.setBadgeText ( { text: "Slow " } );
				
				
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

function mensagens(page){
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
function bloqueios(page){
	var re1='../../../sgaaluno3/SilverStream/Pages/pgAln_BloqueioNoticia.html';
	if(page.search(re1) >= 0){
		return true;
	}else{
		return false;
	}
	return false;
}

function carregarDados(page){
			
	if(page.search("ENCERRADA") >= 0){ //encontrar
		chrome.browserAction.setPopup( {popup: "menu/" + localStorage["menu_code"] + ".html"} );
		chrome.browserAction.setBadgeBackgroundColor({color: "#919191"});
		chrome.browserAction.setBadgeText ( { text: "?" } );
		logado = false;
	}else{
		chrome.browserAction.setPopup( {popup: "menu/menu.html"} );
		var numMen = mensagens(page);
		var block = bloqueios(page);

		logado = true;
		var m = localStorage["mensagens"];
		var b = localStorage["bloqueios"];
		
		if(m != "yes"){
			numMen = 0;
		}
		if(b != "yes"){
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
	
	return logado;
}

