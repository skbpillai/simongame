// Button ID/Color     Button No   Button Alpha (Note)
// green               1           I
// red                 2           O
// yellow              3           K
// blue                4           L

var gameOn = false;
var listenOn = false;
var roundNo = 0;
var inputSeq = "";
var respSeq = "";
var isPaused = false;
var playSpeed = 500;

$("body").keypress(function (event) {
    if(!gameOn && event.key == " ") {
        gameOn = true;
        listenOn = false;
        roundNo = 0;
        inputSeq = "";
        respSeq = "";
        console.log("Game Started");
        playNextRound();
    }
    if (gameOn && listenOn) {
        // console.log("Keyboard key pressed: " + event.key.toUpperCase());
        var btnAlpha = event.key.toUpperCase();
        if ((btnAlpha == "I") || (btnAlpha == "O") || (btnAlpha == "K") || (btnAlpha == "L")) {
            // console.log(btnAlpha + " is one of I|O|K|L");
            var buttonID = convertBtnNoteToColor(btnAlpha);
            console.log(btnAlpha + " corresponding to color " + buttonID + " pressed");
            animateButton(buttonID);
            respSeq = respSeq + btnAlpha;
            console.log("Current Response Series: " + respSeq);
            console.log("Round Number: " + roundNo);
            //-------
            if (respSeq.length < roundNo) {
            
                var matchResult = checkPassFail(inputSeq.substring(0,respSeq.length),respSeq);
                if (matchResult == "pass") {
                    gameOn = true;
                    listenOn = true;
                }
                if (matchResult == "fail") {
                    playFailAnim();
                }
            }
            if (respSeq.length == roundNo) {
                var matchResult = checkPassFail(inputSeq, respSeq);
                if (matchResult == "pass") {
                    gameOn = true;
                    respSeq = "";
                    listenOn = false;
                }
                if (matchResult == "fail") {
                    playFailAnim();
                }
            }
            //------
        }
    }
    if (gameOn && !listenOn) {
        playNextRound();

    }
})

$(".btn").click(function(event) {
    // console.log(event.target.id);
    if (gameOn && listenOn) {
        var buttonID = event.target.id;
        animateButton(buttonID);
        var newResp = convertBtnIdToNote(buttonID);
        // console.log("Resp Seq bef adding newresp: " + respSeq);
        respSeq = respSeq + newResp;
        // console.log("Input Seq: " + inputSeq);
        // console.log("Resp Seq aft adding newresp: " + respSeq);
        // console.log("Round No: " + roundNo);
        // console.log("Resp. Seq. Len: " + respSeq.length);

        if (respSeq.length < roundNo) {
            
            var matchResult = checkPassFail(inputSeq.substring(0,respSeq.length),respSeq);
            if (matchResult == "pass") {
                gameOn = true;
                listenOn = true;
            }
            if (matchResult == "fail") {
                playFailAnim();
            }
        }
        if (respSeq.length == roundNo) {
            var matchResult = checkPassFail(inputSeq, respSeq);
            if (matchResult == "pass") {
                gameOn = true;
                respSeq = "";
                listenOn = false;
            }
            if (matchResult == "fail") {
                playFailAnim();
            }
        }
    }
    if (gameOn && !listenOn) {
        playNextRound();

    }

})


function playNextRound () {
    // console.log("entering playNextRound");
    roundNo++;
    // alert("i am here");
    
    
    var newNote = generateRandomNote();
    inputSeq = inputSeq + newNote;
    setTimeout(function () {
        
        playInputSeq(inputSeq);
        
    },1000);
    // playInputSeq(inputSeq);
    console.log("Finished playing input seq: " + inputSeq);
    listenOn = true;
}

function animateButton(btnID) {
    // console.log(btnID);
    isPaused = true;
    $("."+btnID).addClass("pressed");
    var btnAud = new Audio("sounds/"+btnID+".mp3");
    btnAud.play();
    setTimeout(function() { 
        $("."+btnID).removeClass("pressed");
    },300);
    isPaused = false;
}

function convertBtnIdToNote(btnID) {
    var buttonAlpha = "";
    switch (btnID) {
        case "green":
            buttonAlpha = "I";
            break;

        case "red":
            buttonAlpha = "O";
            break;
        
        case "yellow":
            buttonAlpha = "K";
            break;
        
        case "blue":
            buttonAlpha = "L";
        break;
        
        default:
            break;
    }
    return buttonAlpha;
}

function convertBtnNoToNote(btnNo) {
    var buttonAlpha = "";
    switch (btnNo) {
        case 1:
            buttonAlpha = "I";
            break;

        case 2:
            buttonAlpha = "O";
            break;
        
        case 3:
            buttonAlpha = "K";
            break;
        
        case 4:
            buttonAlpha = "L";
        break;
        
        default:
            break;
    }
    return buttonAlpha;
}

function convertBtnNoteToColor(btnNote) {
    var buttonColor = "";
    switch (btnNote) {
        case "I":
            buttonColor = "green";
            break;
        case "O":
            buttonColor = "red";
            break;
        case "K":
            buttonColor = "yellow";
            break;
        case "L":
            buttonColor = "blue";
            break;
    
        default:
            break;
    }
    return buttonColor;
}

function checkPassFail (inpStr, outStr) {
    var resultVal = "";
    if (inpStr == outStr) {
        resultVal = "pass";
    } else {
        resultVal = "fail";
    }
    // console.log("in checkpassfail");
    // console.log("InpStr: " + inpStr);
    // console.log("outStr: " + outStr);
    // console.log("Result Value: " + resultVal);
    return resultVal;
}

function playFailAnim () {
    $("#level-title").text("Game Over!  You reached Round "+ (roundNo - 1) + ".  Press Space Bar to restart.");
    // console.log(roundNo);
    var errAud = new Audio("sounds/wrong.mp3");
    errAud.play();
    $("body"). addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);

    gameOn = false;
    listenOn = false;
}

function generateRandomNote () {
    var resultRndNo = Math.random();
    resultRndNo = resultRndNo * 4;
    resultRndNo = Math.floor(resultRndNo);
    resultRndNo = resultRndNo + 1;

    var rdmNote = convertBtnNoToNote(resultRndNo);
    
    return rdmNote;
}

async function playInputSeq (inputSeq) {
    var i =0;
    $("h1").text("Round: " + roundNo + " ...listen");
    for(i=1;i<=inputSeq.length;i++) {
        var noteToPlay = inputSeq.substring(i-1,i);
        console.log("Note to play: " + noteToPlay);
        var colorToPlay = convertBtnNoteToColor(noteToPlay);
        console.log("Color to play: " + colorToPlay);
        // setTimeout(function () {
        //     animateButton(colorToPlay);
        // },2000);
        // function waitForIt(){
        //     if (isPaused) {
        //         setTimeout(function(){waitForIt()},1000);
        //     } else {
        //         // go do that thing
        //     };
        // }
        // console.log("Starting wait... ");
        await delay(playSpeed);
        // console.log("Ending wait");
        animateButton(colorToPlay);
        // var playStatus = animateButtonWithReturn(colorToPlay);
        // console.log("playStatus as return from new animate function isPaused is: " + playStatus);
        console.log("Sequence " + i + "... played " + colorToPlay);

    }
    $("h1").text("Round: " + roundNo);

}

// function animateButtonWithReturn(btnID) {
//     // console.log(btnID);
//     isPaused = true;
//     $("."+btnID).addClass("pressed");
//     var btnAud = new Audio("sounds/"+btnID+".mp3");
//     btnAud.play();
//     setTimeout(function() { 
//         $("."+btnID).removeClass("pressed");
//     },300);
//     isPaused = false;
//     return isPaused;
// }

const delay = ms => new Promise(res => setTimeout(res, ms));