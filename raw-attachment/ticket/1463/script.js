
function $cm_createTable()
{
    var markup = '<table border="1">' + "\n";
    var count = this.getCount();
    for(var i = 1;i<=count;i++)
    {
        markup += '<tr>' + "\n";
        markup += '<td><span>' + i++ + '</span></td>' + "\n";
        markup += '<td><span>' + i++ + '</span></td>' + "\n";
        markup += '<td><span>' + i++ + '</span></td>' + "\n";
        markup += '<td><span>' + i++ + '</span></td>' + "\n";
        markup += '<td><span>' + i + '</span></td>' + "\n";
        markup += '</tr>' + "\n";
    }
    markup += '</table>' + "\n";
    $('#' + this._containerId).empty().append(markup);
}

function $cm_attachBehavior()
{
    /// <summary>Fastest method</summary>
    this._startTime = new Date();
    var selector = '#' + this._containerId + ' table tr td span';
    $(selector).addClass('ClickBox')
        .css('font-family', 'arial, verdana, san-serif')
        .bind('click', function() 
        {
            alert(this.innerHTML);
        });
    this._endTime = new Date();
    this.setDuration();
}

function $cm_attachBehavior2()
{
    /// <summary>Medium speed method</summary>
    this._startTime = new Date();
    var selector = '#' + this._containerId + ' table tr td span';    
    var setClassName = function()
        {
            $(this).addClass('ClickBox');
        }
    
    var setFontFamily = function()
        {
            $(this).css('font-family', 'arial, verdana, san-serif');
        }
    
    var bindClick = function()
        {
            $(this).bind('click', function() 
            {
                alert(this.innerHTML);
            });
        }
    
    $(selector).each(setClassName).each(setFontFamily).each(bindClick);
    this._endTime = new Date();
    this.setDuration();
}

function $cm_attachBehavior3()
{
    /// <summary>Slowest method</summary>
    this._startTime = new Date();
    var selector = '#' + this._containerId + ' table tr td span';
    $(selector).addClass('ClickBox');
    $(selector).css('font-family', 'arial, verdana, san-serif');
    $(selector).bind('click', function() 
        {
            alert(this.innerHTML);
        });
    this._endTime = new Date();
    this.setDuration();
}

function $cm_reset()
{
    this.startTime = null;
    this.endTime = null;
    $('div#' + this._containerId).empty();
    //document.getElementById(this._containerId).innerHTML = '';
}

function $cm_setCount(count)
{
    this._count = count;
}

function $cm_getCount()
{
    return this._count;
}

function $cm_setDuration()
{
    this._duration = this._endTime - this._startTime;
}

function $cm_getDuration()
{
    return this._duration;
}

var ContentManager = function(containerId)
{
    this._containerId = containerId;
    this._startTime;
    this._endTime;
    this._count = 250;
    this._duration;
}

ContentManager.prototype = 
{
    createTable : $cm_createTable,
    attachBehavior : $cm_attachBehavior,
    attachBehavior2 : $cm_attachBehavior2,
    attachBehavior3 : $cm_attachBehavior3,
    reset : $cm_reset,
    setCount : $cm_setCount,
    getCount : $cm_getCount,
    setDuration : $cm_setDuration,
    getDuration : $cm_getDuration
}
