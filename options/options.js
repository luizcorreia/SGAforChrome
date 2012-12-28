var bgPage = chrome.extension.getBackgroundPage();


// Drag and Drop
function drag_and_drop(){

var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.


  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

	
	
  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
  	  if (dragSrcEl != this) {
  
//  	var z = dragSrcEl.innerHTML;
//	dragSrcEl.innerHTML = this.innerHTML;
//	this.innerHTML = z;
    
  }
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
  
    // Set the source column's HTML to the HTML of the column we dropped on.
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
	this.classList.remove('over');
    localStorage["menu"] = $("#menu-sort").html();
    
  }
	this.classList.remove('over');
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.

  [].forEach.call(cols, function (col) {
    this.classList.remove('over');
  });
}

var cols = document.querySelectorAll('.lista .move');
[].forEach.call(cols, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false)
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);
});




}


function nameCallback(){ 
	var preload = $(this).html();

	preload = preload.substring(427, 3000);
	
	$('#top_name').html(preload);
	bgPage.nome = preload;
}
function setName(){
	if(bgPage.nome == ""){
		$('#nome_preload').load('http://www.sistemas.pucminas.br/sco/SilverStream/Pages/pgNOT_AreaNoticia.html .class2 span:nth-child(1)', nameCallback);

	}else{
		$("#top_name").html(bgPage.nome);
		largura = $("#top_name").width();
		$("#sair").css("left", largura + 5 +"px");
		$("#sair").css("display","block");
	}
	
}

function options_main(){

// Check menu saved
	if(localStorage["menu"] != ""){
		$("#menu-sort").html(localStorage["menu"]);
	}
// Load Drag and Drop
	drag_and_drop();
}


