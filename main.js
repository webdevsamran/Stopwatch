$(document).ready(function() {
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var lapNumber = 0;
    var timeMinutes,timeSeconds,timeMiliSeconds;
    var lapMinutes, lapSeconds, lapMiliSeconds;
    hideshowButtons("#startButton","#lapButton");
    $("#startButton").on("click",function(){
        mode = 1;
        hideshowButtons("#stopButton","#lapButton");
        startAction();
    });
    $("#stopButton").on("click",function(){
        hideshowButtons("#resumeButton","#resetButton");
        clearInterval(action);
    });
    $("#resumeButton").on("click",function(){
        hideshowButtons("#stopButton","#lapButton");
        startAction();
    });
    $("#resetButton").on("click",function(){
        location.reload();
    });
    $("#lapButton").on("click",function(){
        if(mode){
            clearInterval(action);
            lapCounter = 0;
            addLap();
            startAction();
        }
    });
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*60){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*60){
                lapCounter = 0;
            }
            updateTime();
        },10)
    }
    function updateTime(){
        timeMinutes = Math.floor(timeCounter/6000);
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeMiliSeconds = (timeCounter%6000)%100;
        $('#timeminute').text(format(timeMinutes));
        $('#timesecond').text(format(timeSeconds));
        $('#timemilisecond').text(format(timeMiliSeconds));

        lapMinutes = Math.floor(lapCounter/6000);
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapMiliSeconds = (lapCounter%6000)%100;
        $('#lapminute').text(format(lapMinutes));
        $('#lapsecond').text(format(lapSeconds));
        $('#lapmilisecond').text(format(lapMiliSeconds));
    }
    function format(number){
        if(number<10){
            return '0'+number;
        }else{
            return number;
        }
    }
    function addLap(){
        lapNumber++;
        var myLapDetails = '<div class="lap">'+'<div class="laptimeTitle">Lap'+lapNumber+'</div>'+'<div class="laptime"><span>'+format(lapMinutes)+'</span><span>:'+format(lapSeconds)+'</span><span>:'+format(lapMiliSeconds)+'</span>'+'</div>'+'</div>';
        $(myLapDetails).prependTo("#laps");
    }
});