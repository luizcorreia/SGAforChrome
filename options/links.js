// Intervalo Checagem
function setCheckTime(time){
	$("#"+time).attr('checked','checked');	
}

function setMenu(id){
	$("#menu"+id).attr('checked','checked');	
}

function click(){
$('#s-bloqueios').bind('change', function(){
     if (this.checked) {
         localStorage["bloqueios"] = "true";
	} else { 
         localStorage["bloqueios"] = "false";
    }
});

$('#s-mensagem').bind('change', function(){
     if (this.checked) {
         localStorage["mensagens"] = "true";
	} else { 
         localStorage["mensagens"] = "false";
    }
});

$('#site-icon').bind('change', function(){
     if (this.checked) {
         localStorage["site_icon"] = "true";
	} else { 
         localStorage["site_icon"] = "false";
    }
});

$('#site-grade').bind('change', function(){
     if (this.checked) {
         localStorage["nova_grade"] = "true";
	} else { 
         localStorage["nova_grade"] = "false";
    }
});

$('[name="check_time"]').bind('change', function(){

         localStorage["default_checktime"] = $(this).attr('id');

});
$('[name="mselect"]').bind('change', function(){

         localStorage["menu_code"] = $(this).attr('id');

});


//Botoes
	$('#limpar').bind({
  		click: function() {
			localStorage["menu"] = "";
		}
	});

	$('#reloadBG').bind({
  		click: function() {  
			bgPage.bgMain(0, "yes");
			
			settimeout(checkOptions(), 300);
  		}	
	});

}

function siteCheck(){
// Site Icon
	if(localStorage["site_icon"] == "true"){
		//alert(localStorage["site_icon"]);
		$('#site-icon').attr('checked','')
	}


// Nova Grade
	if(localStorage["nova_grade"] == "true"){
		$('#site-grade').attr('checked','');
}
}
function geralCheck(){

//Menu 01
if(localStorage["menu_code"] == "login_01"){
	$('#login_01').attr('checked','');
}
//Menu 02
if(localStorage["menu_code"] == "login_02"){
	$('#login_02').attr('checked','');
}
//Menu 03
if(localStorage["menu_code"] == "login_03"){
	$('#login_03').attr('checked','');
}

//Bloqueios
if(localStorage["bloqueios"] == "true"){
	$('#s-bloqueios').attr('checked','');
}

//Mensagens
if(localStorage["mensagens"] == "true"){
	$('#s-mensagem').attr('checked','');	
}

//Nota
	$('#s-nota').attr('disabled','true');
	$('#s-nota').closest('label').attr('class','disable');	
	
//Material
	$('#s-material').attr('disabled','true');
	$('#s-material').closest('label').attr('class','disable');	

//E-Mail
	$('#s-email').attr('disabled','true');
	$('#s-email').closest('label').attr('class','disable');	




}

document.addEventListener('DOMContentLoaded', function () {
  	options_main();
  	click();
  	geralCheck();
	siteCheck();
	//alert("Working");
	setCheckTime(localStorage["default_checktime"]);

});
