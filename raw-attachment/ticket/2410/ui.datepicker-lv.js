/* Latvian initialisation for the jQuery UI date picker plugin. */
/* Written by Lauris Bukšis-Haberkorns (lauris@nix.lv). */
jQuery(function($){
	$.datepicker.regional['lv'] = {clearText: 'Notīrīt', clearStatus: 'Notīrīt atzīmēto datumu',
		closeText: 'Aizvērt', closeStatus: 'Aizvērt bez izmaiņām',
		prevText: '&#x3c;Iepriekšējais', prevStatus: 'Pāriet uz iepriekšējo mēnesi',
		nextText: 'Nākošais&#x3e', nextStatus: 'Pāriet uz nākošo mēnesi',
		currentText: 'Šodiena', currentStatus: 'Pāriet uz šodienas datumu',
		monthNames: ['Janvāris','Februāris','Marts','Aprīlis','Maijs','Jūnijs',
		'Jūlijs','Augusts','Septembris','Oktobris','Novembris','Decembris'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mai','Jūn',
		'Jūl','Aug','Sep','Okt','Nov','Dec'],
		monthStatus: 'Pāriet uz citu mēnesi', yearStatus: 'Pāriet uz citu gadu',
		weekHeader: 'Ned', weekStatus: 'Gada nedēļa',
		dayNames: ['Svētdiena','Pirmdiena','Otrdiena','Trešdiena','Ceturtdiena','Piektdiena','Sestdiena'],
		dayNamesShort: ['Sv','Pirm','Otr','Tre','Cet','Piekt','Sest'],
		dayNamesMin: ['Sv','P','O','T','C','Pk','S'],
		dayStatus: 'Izvēlieties DD kā pirmo nedēļas dienu', dateStatus: 'Izvēlieties DD, M d',
		dateFormat: 'dd.mm.yyyy.', firstDay: 1, 
		initStatus: 'Izvēlieties datumu', isRTL: false};
	$.datepicker.setDefaults($.datepicker.regional['lv']);
});
