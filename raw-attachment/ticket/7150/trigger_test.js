// Doesn't work
var foo = {
	events: {}
};

$(foo).one('bar', function () { alert('WIN!'); });
$(foo).triggerHandler('bar'); // :-( no win

// Works
var foo = {
	baz: {}
};

$(foo).one('bar', function () { alert('WIN!'); });
$(foo).triggerHandler('bar'); // great success