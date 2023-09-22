
var showToolbar = true;

document.onmouseup = ffmouseup;

var mouseCoors;

function ffmouseup(evt){
    if(evt && !window.event) {
        mouseCoors = new Coordinates(evt.clientX, evt.clientY);        
    }  
}

function ffrelativepostion(root,child){
    if(!window.event){
    //alert("root: " + root.id);
    //alert("child: " + child.id);
        var relativeX = mouseCoors.x - root.offsetLeft; 
        var relativeY = mouseCoors.y - root.offsetTop;
        
        //define boundaries
        if(relativeX == null || relativeX < 0 || relativeX ==''){
            relativeX = 0;
        }
        if(relativeY == null || relativeY < 0 || relativeY ==''){
            relativeY = 0;
        }
        
        
        child.style.position = 'relative';
        child.style.top = relativeY - 20 + 'px';
        child.style.left = relativeX - 10 + 'px';
            
        window.status = "relX: " + relativeX + " relY: " + relativeY;
    }

}      


function iemouseup(){
        if(window.event){
            window.status = "msX: " + event.x + " msY: " + event.y;
        }
}

function ieclick(){
    //alert(this.id);
    
}


function draghelper(){

    //var temp = this;
    //this.parentNode = document;
    
    var temp = document.createElement("div");
    //var temp = document.getElementById("scrollingParent");
    var textNode = document.createTextNode("dragging");
    temp.setAttribute("id","externaldraggable");
    temp.appendChild(textNode);
    temp.style.zIndex = 10000;
   // alert(temp.parentNode);
    //temp.style.position = 'absolute';
    //temp.innerHTML = this.innerHTML;
    return temp;
    //return("<div style='z-index: 1000;position:absolute'>" + this.innerHTML + '</div>');
}

$(document).ready(function(){
    
    document.getElementById('drop').onclick = ieclick;

    //$(document).pngFix(); 
    document.getElementById('drop').onmouseup = iemouseup;
    document.getElementById('drop2').onmouseup = iemouseup;
    
    $(".block").draggable({helper: draghelper ,ghosting: 'false', zIndex: 10000, cursor: 'true'});
    $(".block2").draggable({helper: draghelper ,ghosting: 'false', zIndex: 10000, cursor: 'true'});
    
    /*$(".block").draggable({
            zIndex:         1000,
            ghosting:       true,
            revert: true,
            opacity:         0.9
            });*/
    /*$(".block2").draggable({
        zIndex:         1000,
            ghosting:       true,
            revert: true,
            opacity:         0.9
        });
    */
       
    //$(".block").draggable();
    //$(".block2").draggable();
    
    $("#drop").droppable({
        accept: ".block, .block2",
        activeClass: 'droppable-active',
        hoverClass: 'droppable-hover',
        drop: function(ev, ui) {
            //alert('drop');
            //$(this).append("<div class='block'>" + ui.element.innerHTML + "</div>");
            
            $(this).append(ui.draggable.element);
            ui.draggable.element.style.top = '0px';
            ui.draggable.element.style.left = '0px';
            //if(this.id == "drop"){
            //    $(this).append("<div class='block2'>" + ui.element.innerHTML + "</div>");
            //}
            //ffrelativepostion(this,ui.draggable.element);
            //ui.draggable.element.className = "block";
            
        }
    });
    
    $("#drop2").droppable({
        accept: ".block, .block2",
        activeClass: 'droppable-active',
        hoverClass: 'droppable-hover',
        drop: function(ev, ui) {
            //if(this.id == "drop2"){
            //    $(this).append("<div class='block2'>" + ui.element.innerHTML + "</div>");
            //}
            //$(this).append("<div class='block2'>" + ui.element.innerHTML + "</div>");
            
            $(this).append(ui.draggable.element);
            ui.draggable.element.style.top = '0px';
            ui.draggable.element.style.left = '0px';
            
            //ffrelativepostion(this,ui.draggable.element);
           // ui.draggable.element.className = "block2";
                    
        }
    });
    
    
    
    $('#menu').clickMenu();
    $('#menu>li').addClass("toolbar-text");
    $('#filesubmenu>li').addClass("toolbar-submenu");
    $('#filesubmenu>li').click(mouseclick);
 
    $('#editsubmenu>li').addClass("toolbar-submenu");
    $('#editsubmenu>li').click(mouseclick);

    $('#viewsubmenu>li').addClass("toolbar-submenu");
    $('#viewsubmenu>li').click(mouseclick);
    
    $('#toolssubmenu>li').addClass("toolbar-submenu");
    $('#toolssubmenu>li').click(mouseclick);
    
    $('#custom-toolbar>a').click(mouseclick);
    $('#custom-toolbar>a').mouseover(toolbar_mouseover);
    $('#custom-toolbar>a').mouseout(toolbar_mouseout);
    $('#custom-toolbar>a').mousedown(toolbar_mousedown);
    $('#custom-toolbar>a').mouseup(toolbar_mouseup);
    
    $.hotkeys.add('Ctrl+x',function(){alert('cut anyone?');});
    $.hotkeys.add('Ctrl+c',function(){alert('copy anyone?');});
    $.hotkeys.add('Ctrl+v',function(){alert('paste anyone?');});
    $.hotkeys.add('Esc',function(){alert('esc anyone?');});
    $.hotkeys.add('Alt+f',function(){alert('file?');});
   // $.hotkeys.remove('Alt+f',{target: 'window'});
  
   /*$('.block').bgiframe();
   $('.block2').bgiframe();*/
   /*$('#drop').bgiframe();
   $('#drop2').bgiframe();*/
    
});

function Coordinates(tx,ty){
    this.x = tx;
    this.y = ty;
}


//var mouseCoors;

function getMouseCoordinates(){
    //if(myEvent == null){
    //    myEvent = evt ? evt : window.event;
    //}
    //var root = this;
    var absolutex;
    var absolutey;
    //var browserevent = evt ? evt : window.event;
    var mouseCoors = new Coordinates(myEvent.clientX, myEvent.clientY);
    //alert(mouseCoors.x);
    //alert(mouseCoors.y);
    window.status = "X: " + mouseCoors.x + " Y: " + mouseCoors.y;
}

function displayToolbarIcon(selected){
    var ret;
    if(!showToolbar){
        ret = "./images/blank.gif";
    }
    else {
        ret = "./images/checkMark.png";
    }
    return ret;
}

/*function menu_mouseout() {
    var img = new Image();
    if(this.id && this.id == 'toolbar'){
       img.src = displayToolbarIcon();
    }
    else if(this.id == 'addContacts' || this.id == 'options'){
       img.src = "./images/blank.gif";
    } 
    else if(this.id) {
       img.src = "./images/" + this.id + ".png";
    }
    this.childNodes[0].src = img.src;
} */

/*function menu_mouseover(){
    var img = new Image();
    if (this.id == 'toolbar'){
        img.src = displayToolbarIcon("Selected");
        this.childNodes[0].src = img.src;
    } 
    else if(this.id == 'addContacts' || this.id == 'options'){
       img.src = "./images/blank.gif";
    }
    else if(this.id){
        img.src = "./images/" + this.id + "Selected.png";
    } 
    
}*/

function menu_toolbarclick(){
    showToolbar = !showToolbar; 
    if(showToolbar){
        document.getElementById("custom-toolbar").className = 'custom-toolbar';
    } 
    else {
        document.getElementById("custom-toolbar").className = 'hide-custom-toolbar';
    }
}

function mouseclick(){
    if (this.id == 'toolbar'){
        menu_toolbarclick();
    } else {
        alert(this.id);
    }
}

function toolbar_mousedown(){
    this.className = 'custom-toolbar-icons_onmousedown custom-toolbar-icons-selected';
    //var img = new Image();
    //img.src = "./images/" + this.id +".png";
    //this.src = img.src;
}

function toolbar_mouseup(){
    this.className = 'custom-toolbar-icons_onmouseup custom-toolbar-icons-selected';
    //var img = new Image();
    //img.src = "./images/" + this.id + "Selected.png";
    //this.src = img.src;
}

function toolbar_mouseout() {
    this.className = 'custom-toolbar-icons';
    //var img = new Image();
    //img.src = "./images/" + this.id + ".png";
    //this.src = img.src;
}

function toolbar_mouseover() {
    this.className = 'custom-toolbar-icons_onmouseover custom-toolbar-icons-selected';
    //var img = new Image();
    //img.src = "./images/" + this.id + "Selected.png";
    //this.src = img.src;
}