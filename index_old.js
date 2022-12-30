$("body").keypress(function (event) {
    // console.log(event.key);
    if(event.key == " ") {
        gameOn();
    }
});


function gameOn () {
    console.log("Game Started");
    var levelNumber = 0;
    var randomSequence = "";
    var userResponse = "";
    while (randomSequence == userResponse) {
        var newKey = keyRandomGenerate();
        randomSequence = randomSequence + newKey;
        console.log(randomSequence);
        console.log(randomSequence.length);

        switch(newKey) {
            case 1:
                var rdmBtnID = "#green";
            break;
            case 2:
                var rdmBtnID = "#red";
            break;
            case 3:
                var rdmBtnID = "#yellow";
            break;
            case 4:
                var rdmBtnID = "#blue";
            break;
            default:
                var rdmBtnID = "ERROR!"
            break;
        }
        
        console.log(rdmBtnID);

        $(rdmBtnID).addClass("pressed");
        setTimeout(function() { 
            $(rdmBtnID).removeClass("pressed");
        },300);

        // for(i=1;i<=randomSequence.length;i++) {
            
         
        // }

        // for (i=1;i<=10;i++) {
        //     $(".btn").click(function (event){
        //         console.log("seq: "+i);
        //         console.log("Button: "+event.target.id);
        //     });
        // }

        var i = 1;
        while(i<=10) {
            $(".btn").click(function (event){
                console.log("seq: "+i);
                console.log("Button: "+event.target.id);
            });
            i++;
        }


    }

    
}



function keyRandomGenerate() {
    var resultRndNo = Math.random();
    resultRndNo = resultRndNo * 4;
    resultRndNo = Math.floor(resultRndNo);
    resultRndNo = resultRndNo + 1;

    return resultRndNo;
}