$(document).ready(function () {

    $('#butt').click(function () {
        $('#cb').click();
    });

    $('#cb').click(function () {
        console.log('State: ' + (this.checked ? 'ON' : 'OFF'));
    });

});
