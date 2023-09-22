	$(document).ready(function(){
	
		var baseCode = "";
		var productsPerPage = 8;
	
		$(".tabbar").addClass("activated");
		$(".activated").find("a:first").after("<a id='ie7selector' href='#hersteller'>Hersteller</a>");
		$(".tabbar a, #sidebar div.produkte ul li a").css("outline", "none");

		pager();
		
		$("a[href='#hersteller']").click(function(){

			if( $(this).hasClass("active") ) return false;
			
			baseCode = $("#sidebar div.produkte ul").html();
			
			$(this).parent().removeClass("activated").addClass("activated2");
			$(this).parent().find("a").removeClass("active");
			$(this).addClass("active");

			herstellerArr = new Array();
			var i = 0;
			$("#sidebar div.produkte ul li a span").each(function(){
				if( $.inArray($(this).text(), herstellerArr) < 0 ) {
					herstellerArr[i++] = $(this).text();
				}
			});
			
			herstellerArr.sort();
			
			var nCode = new Array();
			var i = 0;
			$(herstellerArr).each(function(index, value) {
				
				
				var thisHersteller = value;
				if(thisHersteller) {
					nCode[i++] = $("<li/>").text(thisHersteller).addClass("hersteller");
				}
				else {
					nCode[i++] = $("<li/>").text("Ohne Herstellerangabe").addClass("hersteller");
				}
				
				$("#sidebar div.produkte ul li a span").each(function(){
					if( $(this).text() == thisHersteller ) {
						nCode[i++] = $(this).parent().parent();
					}
				});
			});
			
			$("#sidebar div.produkte ul").empty();

			$(nCode).each(function(index, value){
				$("#sidebar div.produkte ul").append(value).addClass("sortByHersteller");
			});
								
			$("#sidebar div.produkte ul li a span").hide();
			$("#sidebar div.produkte ul li a:last").addClass("last");
			
			pager(true);
			
			return false;
		});
		
		$("a[href='#produkte']").click(function(){
		
			if( $(this).hasClass("active") ) return false;
		
			$(this).parent().removeClass("activated2").addClass("activated");
			$(this).parent().find("a").removeClass("active");
			$(this).addClass("active");
			
			$("#sidebar div.produkte ul").empty();
			$("#sidebar div.produkte ul").append(baseCode).removeClass("sortByHersteller");
			
			pager();
			return false;
		});
		
		$("div.produkt").hide();
		$("div.produkt:first").show();
		$("#sidebar div.produkte ul li:first").addClass("aktiv");
		
		$("#sidebar div.produkte ul li a").live("click", function(){
			$("#sidebar div.produkte ul li").removeClass("aktiv");
			$(this).parent().addClass("aktiv");
			
			aktivesProdukt = $(this).attr("href").substring(1);
			$("div.produkt").hide();
			$("#" + aktivesProdukt).show();
			return false;
		});
		
		
		function pager(tabHersteller) {
			var countProducts = $("#sidebar .produkte ul li").length;
			var countPages = Math.ceil(countProducts / productsPerPage);
			
			//Generate Pageination
			$("#sidebar .produkte .pagination").remove();
			$("#sidebar .produkte").append("<div class='pagination'></div>");
			

			for (var i = 1; i <= countPages; i++) {
				//$("#sidebar .produkte .pagination").append("<a href='#tabpage" + i + "'>" + i + "</a> ");
								
				//Page Buttons with Event
				$("<a/>").attr("href", "#tabpage" + i).text(i).appendTo("#sidebar .produkte .pagination").click(
					function(){
						var page = $(this).attr("href").replace(/[^0-9]/gi, "");
			
						$("#sidebar .produkte ul li").hide();
						var e = 0;
						
						$("#sidebar .produkte ul li").each(function(i){
							if(i-e <= productsPerPage * page - 1 && i -e>= productsPerPage * (page - 1) ) {
								if( $(this).hasClass("hersteller") ) {
									e = e + 1;
								}
								$(this).show();
							}
						});
						
						if(tabHersteller == true) {
							$(".tmpheadlines").remove();
							
							var tmpLine = $("#sidebar .produkte ul li:visible:first");
							if( !$(tmpLine).hasClass("hersteller") ) {
								currentHersteller = $(tmpLine).prevAll(".hersteller").eq(0).text();
								$("#sidebar .produkte ul li:visible:first").before("<li class='hersteller tmpheadlines'>"+currentHersteller+"</li>");
							}
														
							if( $("#sidebar .produkte ul li:visible:last").hasClass("hersteller") ) {
								$("#sidebar .produkte ul li:visible:last").hide();
							}
						}
						
						$("#sidebar .produkte .pagination a").removeClass("aktiv");
						$(this).addClass("aktiv");
						return false;
					}
				);
				
				
			}
			
			//Trigger click on Page 1 Button
			$("#sidebar .produkte .pagination a[href^='#tabpage']:first").trigger("click");
			
			//If login in Weblication show ShowAll-Button, with its Event
			if( $("#divEditbutton").length > 0) {
				$("<a/>").attr("href", "#showAllTabPages").text("Alle").appendTo( "#sidebar .produkte .pagination" ).click(
				function(){
					$("#sidebar .produkte ul li").show();
					$(".tmpheadlines").remove();
					$("#sidebar .produkte .pagination a").removeClass("aktiv");
					$(this).addClass("aktiv");
				}
				);
			}
			
		}
		







	});