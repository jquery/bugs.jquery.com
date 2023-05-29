$(function() {
	$.getJSON("/admin/dashboard/catalog/json/getidclc="+ $('select#idclc').val(),function(j){
	    var options = '<option value="0">Aucune sous-catégorie</option>';
	    for (var i = 0; i < j.length; i++) {
	      options += '<option value="' + j[i].optionValue + '">' + j[i].optionDisplay + '</option>';
	    }
	    $("select#idcls").html(options);
	  });
	$("select#idclc").change(function(){
	   $.getJSON("/admin/dashboard/catalog/json/getidclc="+ $(this).val(),function(j){
	    var options = '<option value="0">Aucune sous-catégorie</option>';
	    for (var i = 0; i < j.length; i++) {
	      options += '<option value="' + j[i].optionValue + '">' + j[i].optionDisplay + '</option>';
	    }
	    $("select#idcls").html(options);
	  });
	});
});