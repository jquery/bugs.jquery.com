(function($) {

window.selectors = {
	'*': 											{ size: 34 },
	'body': 										{ size: 1, nodes: ['body'] },
	'body div': 									{ size: 8, nodes: ['div'] }, 
	'div p': 										{ size: 5, nodes: ['p'] }, 
	'div > p': 										{ size: 5, nodes: ['p'] }, 
	'div + p': 										{ size: 2, nodes: ['p'] }, 
	'div ~ p': 										{ size: 3, nodes: ['p'] }, 
	'div[class^=exa][class$=mple]': 				{ size: 1, nodes: ['div'] }, 
	'div p a': 										{ size: 1, nodes: ['a'] }, 
	'div': 											{ size: 8, nodes: ['div'] }, 
	'p': 											{ size: 5, nodes: ['p'] }, 
	'a': 											{ size: 2, nodes: ['a'] }, 
	'.user': 										{ size: 1, nodes: ['div'] }, 
	'div.example': 									{ size: 1, nodes: ['div'] }, 
	'ul .liclass': 									{ size: 1, nodes: ['li'] }, 
	'div.example': 									{ size: 1, nodes: ['div'] }, 
	'div.user': 									{ size: 1, nodes: ['div'] }, 
	'#title': 										{ size: 1, nodes: ['h1'] }, 
	'h1#title': 									{ size: 1, nodes: ['h1'] }, 
	'div #title': 									{ size: 1, nodes: ['h1'] }, 
	'ul.ulclass li.liclass': 						{ size: 1, nodes: ['li'] }, 
	'ul.ulclass > li.liclass': 						{ size: 1, nodes: ['li'] }, 
	'h1#title + div > p': 							{ size: 1, nodes: ['p'] }, 
	'h1[id]:contains(Selectors)': 					{ size: 1, nodes: ['h1'] }, 
	'a[href][lang][class]': 						{ size: 1, nodes: ['a'] }, 
	'div[class]': 									{ size: 3, nodes: ['div'] }, 
	'div[class=example]': 							{ size: 1, nodes: ['div'] }, 
	'div[class^=exa]': 								{ size: 1, nodes: ['div'] }, 
	'div[class$=mple]': 							{ size: 1, nodes: ['div'] }, 
	'div[class*=e]': 								{ size: 3, nodes: ['div'] }, 
	'div[class|=first]': 							{ size: 3, nodes: ['div'] }, 
	'div[class!=different]': 						{ size: 8, nodes: ['div'] }, 
	'div[class~=example]': 							{ size: 1, nodes: ['div'] }, 
	'div:not(.example)': 							{ size: 7, nodes: ['div'] }, 
	'p:contains(selectors)': 						{ size: 1, nodes: ['p'] }, 
	'p:nth-child(even)': 							{ size: 1, nodes: ['p'] }, 
	'p:nth-child(2n)': 								{ size: 1, nodes: ['p'] }, 
	'p:nth-child(odd)': 							{ size: 4, nodes: ['p'] }, 
	'p:nth-child(2n+1)': 							{ size: 4, nodes: ['p'] }, 
	'p:nth-child(n)': 								{ size: 5, nodes: ['p'] }, 
	'p:last-child': 								{ size: 2, nodes: ['p'] }, 
	'p:first-child': 								{ size: 2, nodes: ['p'] },
	'p:empty': 										{ size: 1, nodes: ['p'] },
	'input:enabled': 								{ size: 2, nodes: ['input'] },
	'input:disabled': 								{ size: 1, nodes: ['input'] },
	'input:checked': 								{ size: 1, nodes: ['input'] },
	'input:not(:checked)': 							{ size: 2 },
	'#main [class]':								{ size: 6, nodes: ['div', 'div', 'ul', 'li', 'a', 'div'] }
};


var tab = "&nbsp;&nbsp;&nbsp;&nbsp;", 

execTest = function(expr, expectResult, method, scope) {
	
	var moduleText = 'Selector' + (method ? [' $("', scope, '").', method ,'("', expr, '")'].join('') : '');
	
	module(moduleText);
	
	test(expr, function() {
		
		var query = method && scope ? $(scope)[method](expr) : $(expr);
		
		if (typeof expectResult == "object") {
			var size = expectResult.size || 0, nodes = expectResult.nodes, exprText = ['( ', expr, ' )'].join('');
			
			while (size && nodes && nodes.length != size)
				nodes.push(nodes[nodes.length-1]);
			
			// testing size()
			equals( query.size(), size, 'testing size ' );
			
			// testing node names
			(nodes && $.map(nodes, function(nodeName, i) { 
				if (query.length) equals( query.get(i).nodeName.toLowerCase(), nodeName.toLowerCase(), [tab, 'testing node name ', i].join('') );
			}));
		}
		if (typeof expectResult == "number") {
			equals( query.size(), expectResult, 'testing size ' );
		}
	});
};

$.each(window.selectors, function(expr, expectResult) {
	execTest(expr, expectResult);
});

execTest('html', { size: 1, nodes: ['html'] }, 'parents', 'body');
execTest('> html', { size: 1, nodes: ['html'] }, 'parents', 'body');
execTest('body > div', { size: 0, nodes: ['html'] }, 'parents', 'body');
execTest('#testId', { size: 0 }, 'parents', 'body');
execTest('#testId div', { size: 0, nodes: ['div'] }, 'parents', 'body');

execTest('div', { size: 1, nodes: ['div'] }, 'children', 'body');
execTest('body > div', { size: 5, nodes: ['p'] }, 'children', 'body');
execTest('h1#title', { size: 0, nodes: ['h1'] }, 'children', 'body');

delete window.selectors['*'];

$.each(window.selectors, function(expr, expectResult) {
	//execTest(expr, expectResult, 'find', 'html');
});


})(jQuery);
