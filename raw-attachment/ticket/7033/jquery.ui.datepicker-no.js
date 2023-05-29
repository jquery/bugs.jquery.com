/* Updated Norwegian initialisation for the jQuery UI date picker plugin. */
/* Written by Martin Gr�nbekk Moen (martin@mgmweb.no). */
jQuery(function ($) {
    $.datepicker.regional['no'] = {
        closeText: 'Lukk',
        prevText: '&laquo;Forrige',
        nextText: 'Neste&raquo;',
        currentText: 'I dag',
        monthNames: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun',
        'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
        dayNamesShort: ['S�n', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'L�r'],
        dayNames: ['S�ndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'L�rdag'],
        dayNamesMin: ['S�', 'Ma', 'Ti', 'On', 'To', 'Fr', 'L�'],
        weekHeader: 'Uke',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['no']);
});