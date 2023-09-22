// JavaScript Document
function dimLink(x){
	p = document.getElementById('navigation');
	L = p.getElementsByTagName('a');
	for (i = 0; i < L.length; i++){
		if (L[i].href == x){
			L[i].className = 'currentPage';
			L[i].href = 'javascript:;';
			L[i].innerHTML = "<span style='font-weight:bold; font-size:14px'>" + L[i].innerHTML + "</span>";
			return;
		}
	}
}

function newKeyword(){
	p = prompt("Please enter only one word, it may have spaces:","");
	if (p == null || p == ''){
		return false;
	}
	p = ", " + p;
	p = document.form2.keywords.value + p
	document.form2.keywords.value = p
}