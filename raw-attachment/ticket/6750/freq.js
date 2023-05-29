function getMedalText (metal){
    var msg, metals;
    metals = {"g":"Gold","s":"Silver","b":"Bronze"};
    msg = 'Your score was so good you get a <span style="color:red;">'+metals[metal]+" Medal!</span><br><br>"+
            '<button class="fb_button" onclick="nextGame();">Play Next Level</button> or '+
            '<button class="fb_button" onclick="postOnWall(\''+metals[metal]+"',"+glevel+');nextGame();">Post on Wall and Play Next Level</button>';
    return msg;
}

function tymer(){
    var clock = $("div#clock");
    var secs = Number(clock.html())-1;
    clock.html(secs);
    if(secs==0){
        started = false;
        showGameOver();
    }
    if(started)
        setTimeout(tymer, 1000);
}
function isSolved(){
    var i;
    for(i=(gridSize*gridSize) - 2; i >=0; i--)
        if(!gridStatus[i])
            return false;
    started = false;
    return true;
}
function showGameOver(){
    var pts,msg,medflag=true;
    $("#playpen").hide();
    pts = $("div#clock").text();
    msg = 'You scored <span style="color:red;">'+pts+" points</span>";
    if(pts=='0'){
        msg = "Uh oh! "+ msg+" because you ran out of time.<br>Restarting level now...";
    }
    else{
        msg = "Congratulations! <br>"+msg+".<br>";
        if(timeallowed - pts < ggt){ //gold medal
            msg += getMedalText('g');
        }
        else if(timeallowed - pts < gst){ //silver medal
            msg += getMedalText('s');
        }
        else if(timeallowed - pts < gbt){ //bronze medal
            msg += getMedalText('b');
        }
        else{
            medflag = false;
            msg += "Taking you up to the next level now.";
        }
    }
    $("div#score").html(msg);
    $("#gameoverdiv").show();
    if(medflag==false){
        timeoutvar = setTimeout(nextGame, 2500);
    }
}

function finishGame(){
    showGameOver();
    if(glevel == playerlevel){
        playerlevel++;
        $.getJSON(baseurl + "ajax.php?f=up&u=" + playa);
    }
}

function setUpGame(lvl){
    $("#waitdiv").show();
    $("#playpen").hide();
    $("#friendrankingsdiv").hide();
    var ajaxurl;
    ajaxurl = baseurl+'ajax.php?f=gg&l='+lvl;
    if(hasfriends == false)
        ajaxurl += '&nofr=1';
    //ajaxurl += '&jsoncallback=?';
    //alert("Attempting to fetch "+ajaxurl);
    //$.get('ajax.php',{ "f": "gg", "l": ""+lvl });
    //return;
    $.getJSON(ajaxurl,function(data){
        var i,j,usefriends,tgt,cnv,indx,tmpimgsrc,iconset, frimagesoffset=0;
        gridSize = data.gsize;
        timeallowed = data.secs;
        usefriends = data.fr;
        ggt = data.gt;
        gst = data.st;
        gbt = data.bt;
        if(usefriends == 0){ //using icons
            iconset = data.icon;
        }
        else {
            frimagesoffset = Math.floor(1 + Math.random()*(frimages.length - ((gridSize*gridSize) - 1))) - 1;//gets a random number between 0 and frimages.length - (gridSize^2 - 1). I think!
        }
        started = false;
        tgt = data.tgt; //an array
        cnv = data.cnv; //an array
        $("#clock").html(timeallowed);
        gridStatus = [];
        for(i=(gridSize*gridSize)-1; i >= 0 ; i--)
                gridStatus[i]=false;
        //$(".caption:odd").css("margin-left",10*gridSize+"px");
        //$(".caption:even").css("margin-left",15*gridSize+"px");
        $("#target").empty();
        $("#canvas").empty();
        for(i=0;i<gridSize;i++){
            $("#target").append('<tr id="row'+i+'"></tr>');
            $("#canvas").append('<tr id="crow'+i+'"></tr>');
            for(j=0;j<gridSize;j++){
                //First, let's handle the target
                if((gridSize-i)>1 || (gridSize-j)>1){
                    indx = tgt[(i*gridSize)+j];
                    if(usefriends==0) //using icons, not friends
                        tmpimgsrc = baseurl+'photos/icons/set'+iconset+'/'+indx+'.jpg';
                    else
                        tmpimgsrc = frimages[indx+frimagesoffset];
                    $("#row"+i).append('<td id="cell'+i+'_'+j+'" class="targetCell"><a target="_blank" href="'+frurls[indx+frimagesoffset]+
                                        '"><img width="50" height="50" id="tgtimg_'+i+'_'+j+'" src="'+tmpimgsrc+'"></a></td>');
                }
                else //it is the last cell and should be empty
                    $("#row"+i).append('<td id="cell'+i+'_'+j+'" class="targetCell"></td>');

                //Now, let's take care of the canvas
                indx = cnv[j+(gridSize*i)];
                if(indx!=1001){
                    if(usefriends==0)
                        tmpimgsrc = baseurl+'photos/icons/set'+iconset+'/'+indx+'.jpg';
                    else
                        tmpimgsrc = frimages[indx+frimagesoffset];
                    $("#crow"+i).append('<td id="c_cell'+i+'_'+j+'" class="canvasCell"><img width="50" height="50" src="'+tmpimgsrc+'"></td>');

                }
                else
                    $("#crow"+i).append('<td id="c_cell'+i+'_'+j+'" class="hole">&nbsp;</td>');
            }
        }
        $("#canvas td").click(function(){
            if(started==false){
                started=true;
                tymer();
            }
            //First find the coordinates of this cell.
            var coord = this.id.substr(6).split('_');
            var xc = Number(coord[0]);
            var yc = Number(coord[1]);
            var holecoord = $("td.hole")[0].id.substr(6).split('_');
            var holexc = Number(holecoord[0]);
            var holeyc = Number(holecoord[1]);
            var xdist = xc-holexc;
            var ydist = yc-holeyc;
            if(xdist==0 && ydist==0)
                return;
            if(xdist==0 || ydist==0){ //in the same row or column as the hole. Can be moved
                var inc,ptr1,ptr2;
                if(xdist==0){ //same row. So movement is going to be horizontal
                    if(ydist>0)
                        inc = 1;
                    else
                        inc = -1;
                    ptr1 = holeyc;
                    while(ptr1 != yc){
                        ptr2 = ptr1 + inc;
                        //var currCell = $("#c_cell"+xc+"_"+ptr1);
                        //currCell.html($("#c_cell"+xc+"_"+ptr2).html());
                        var currCell = document.getElementById("c_cell"+xc+"_"+ptr1);
                        currCell.innerHTML = document.getElementById("c_cell"+xc+"_"+ptr2).innerHTML;
                        if(ptr1 == holeyc)
                            currCell.className = 'canvasCell';//currCell.removeClass("hole").addClass("canvasCell");
                        if(xc < (gridSize - 1) || ptr1 < (gridSize - 1)){
                            //if($("#c_cell"+xc+"_"+ptr1+" img").attr('src') == $("#cell"+xc+"_"+ptr1+" img").attr('src'))
                            if($("#c_cell"+xc+"_"+ptr1+" img").attr('src') == document.getElementById("tgtimg_"+xc+"_"+ptr1).src)
                                gridStatus[ptr1 + (xc*gridSize)] = true;
                            else
                                gridStatus[ptr1 + (xc*gridSize)] = false;
                        }
                        ptr1 += inc;
                    }
                }
                else { //ydist = 0. So movement is going to be vertical
                    if(xdist>0)
                        inc = 1;
                    else
                        inc = -1;
                    ptr1 = holexc;
                    while(ptr1 != xc){
                        ptr2 = ptr1 + inc;
                        //var currCell = $("#c_cell"+ptr1+"_"+yc);
                        //currCell.html($("#c_cell"+ptr2+"_"+yc).html());
                        var currCell = document.getElementById("c_cell"+ptr1+"_"+yc);
                        currCell.innerHTML = document.getElementById("c_cell"+ptr2+"_"+yc).innerHTML;
                        if(ptr1 == holexc)
                            currCell.className = 'canvasCell';//currCell.removeClass("hole").addClass("canvasCell");
                        if(ptr1 < (gridSize -1) || yc < (gridSize -1)){
                            //if($("#c_cell"+ptr1+"_"+yc+" img").attr('src') == $("#cell"+ptr1+"_"+yc+" img").attr('src'))
                            if($("#c_cell"+ptr1+"_"+yc+" img").attr('src') == document.getElementById("tgtimg_"+ptr1+"_"+yc).src)
                                gridStatus[yc + (ptr1*gridSize)] = true;
                            else
                                gridStatus[yc + (ptr1*gridSize)] = false;
                        }
                        ptr1 += inc;
                    }
                }
                //$(this).html("&nbsp;").removeClass("canvasCell").addClass("hole");
                this.innerHTML = "&nbsp;";
                this.className = "hole";
                if(isSolved()){
                    finishGame();
                    //$("#waitdiv").show();
                    //setTimeout(setUpGame, 2500, glevel);
                }
            }
        }); //end of click event for canvas td
        $("#waitdiv").hide();
        $("#playpen").show();
        $("#gameoverdiv").hide();
        if(glevel==1)
            $("#prevgame").removeClass("fb_button").addClass("fb_button_selected");
        else
            $("#prevgame").removeClass("fb_button_selected").addClass("fb_button");
        if(playerlevel>glevel)
            $("#nextgame").removeClass("fb_button_selected").addClass("fb_button");
        else
            $("#nextgame").removeClass("fb_button").addClass("fb_button_selected");
        $("#whichlevel").text("Level "+glevel);
    }); //end of getJSON function

}; //end of setUpGame()


function tabClick (){
    //obj is the object that is clicked.
    $("a.fbtab_selected").removeClass("fbtab_selected").addClass("fbtab").click(tabClick);
    $(this).removeClass("fbtab").addClass("fbtab_selected");
    $("#gameoverdiv").hide();
    $("#playpen").show();
    setUpGame(Number(this.id.substr(0,1)));
}

function prevGame() {
    clearTimeout(timeoutvar);
    if(glevel > 1){
        glevel--;
        setUpGame(glevel);
    }
}

function nextGame() {
    clearTimeout(timeoutvar);
    if(glevel < playerlevel){
        glevel++;
        setUpGame(glevel);
    }
}

function postOnWall(metal, level){
    var msg = "Sweet! I got a "+metal+" medal at Level "+level+" in Frequence.";
    msg = encodeURIComponent(msg) ;
    $.getJSON(baseurl+'ajax.php?f=pow&msg='+msg+'&u='+playa, function(){
    });
}
function showFriendRankings(){
    var selfrank;
    $("#waitdiv").show();
    $.getJSON(baseurl+'ajax.php?f=gfr&u='+playa,function(data){
        var cnt,str=[];
        for(cnt=0; cnt < data.length; cnt++){
            if(data[cnt].uid == playa)
                selfrank = " selfrank";
            else
                selfrank = "";
            if(data[cnt].level < 4)
                peckingorder = 'Rookie';
            else if(data[cnt].level < 10)
                peckingorder = 'Amateur';
            else if(data[cnt].level < 20)
                peckingorder = 'Professional';
            else if(data[cnt].level < 30)
                peckingorder = 'Champion';
            else if(data[cnt].level < 45)
                peckingorder = 'Hall of Famer';
            else if(data[cnt].level < 65)
                peckingorder = 'FreGod';
            str.push('<div class="rank'+selfrank+'"><img src="'+data[cnt].upic+'"><br>'+
                    '<div class="naam">'+data[cnt].uname+'</div><br>'+
                    '<table>'+
                      '<tr><td class="laybl">Level<td>'+
                      '<td class="valoo">'+data[cnt].level+'<br>('+peckingorder+')</td></tr>'+
                      '<tr><td class="laybl">Gold Medals<td>'+
                      '<td class="valoo">'+data[cnt].golds+'</td></tr>'+
                      '<tr><td class="laybl">Silver Medals<td>'+
                      '<td class="valoo">'+data[cnt].silvers+'</td></tr>'+
                      '<tr><td class="laybl">Bronze Medals<td>'+
                      '<td class="valoo">'+data[cnt].bronzes+'</td></tr>'+
                      '<tr><td class="laybl">Games Played<td>'+
                      '<td class="valoo">'+data[cnt].numplays+'</td></tr>'+
                    '</table>'+
                    '</div>');
        }
        $("#waitdiv").hide();
        $("#friendrankingsdiv").html(str.join(' ')).show();
        $("#playpen").hide();
    });
}

$(document).ready(function(){
    setUpGame(playerlevel);
    $("a.fbtab").click(tabClick);
});
