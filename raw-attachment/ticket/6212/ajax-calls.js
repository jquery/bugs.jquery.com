function loadMapFromUrl(url)
{
    $.ajax({
        type: 'GET',
        url: url,
        beforeSend: showLoading,
        success: showMap,
        error: showError 
    });
}

function showError(request,textStatus)
{
    $('#mapContent').html('Maps are temporarily unavailable');
}

function showMap(response,textStatus,request)
{
    // IE6 was grabbing the images twice doing this, causing the ImageProxyServlet to blow up
    $('#mapContent').html(response);
    //document.getElementById('mapContent').innerHTML=response;
}

function showLoading(request)
{
    $('#mapContent').html('Loading Map...');
}