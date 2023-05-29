$(schedule);

var attempt = 0, limit = 4;

function runTest(){
	
	var i = 500,
		$e = $('#target'),
		name = 'offset(500 times) - attempt '+attempt;
		
	if( attempt == 1 )
		console.profile();
		
	console.time(name);
	while( i-- )
		$e.offset();
	console.timeEnd(name);
	
	if( attempt != limit )
		schedule()
	else
		console.profileEnd();
};
function schedule(){
	attempt++;
	setTimeout(runTest, 1500 );
};