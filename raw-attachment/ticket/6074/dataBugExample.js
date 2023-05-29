//HTML
<select id="isWithBug">
    <option value='1'>With .data()</option>
    <option value='2' selected="selected">Without .data()</option>
</select>
<div id="debug"></div>
<div id="box1"></div>


//JS CODE
$(function(){
    function tryit(withData){
        $("#debug,#box1").empty();
        function debug(txt){
            var h = $("#debug").html();
            $("#debug").html(h+"<br/>"+txt);
        }
        
        var o1 = $("<option value='1'>1</option>");
        var o2 = $("<option value='2'>2</option>");
        
        var s = $("<select>").append(o1).append(o2).appendTo("#box1");
    
        if(withData == 1){
            s.change(function(){debug("0");})
             .data({})
             .change(function(){debug("1");})
             .change(function(){debug("2");});
        }else{
            s.change(function(){debug("0");})
             /*.data({})*/
             .change(function(){debug("1");})
             .change(function(){debug("2");});
        }
    }
            
    $("#isWithBug").change(function(){
        tryit($(this).val());
    });
    tryit(2);
});