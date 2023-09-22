$(document).ready(function() {

    var $el = $('<div id="testPanel"></div>');
    $el.css({
        width: 200,
        height: 100,
        position: 'absolute',
        bottom: 0,
        marginBottom: 10,
        backgroundColor: 'black'
    });

    $('body').append($el);

    $('#testLink').click(function(){       
        $('#testPanel').animate({bottom: 150}, 2000, 'linear');
        return false;
    });

}); 