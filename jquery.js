//jquery.js
var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval
var fruits = ['Chris1', 'Chris2', 'Chris3', 'Chris4'];
$(function(){
    
//click on start reset button
    
$("#startreset").click(function(){
    $("#start")[0].play();//play sound
    //we are playing
    if(playing == true){

        //reload page
        location.reload();
    }else{

        //we are not playing
        playing = true; //game initiated

        //set score to 0
        score = 0; //set score to 0
        $("#scorevalue").html(score);

        //show trials left 
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        //hide game over box
        $("#gameOver").hide();

        //change button text to reset game
        $("#startreset").html("Reset Game");

        //start sending fruits
        startAction();
    }
});

    

    
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score

    $("#slicesound")[0].play();//play sound
    
    //stop picture
    clearInterval(action);
    
    //hide picture
    $("#fruit1").hide("explode", 500); //slice fruit
    
    //send new chris pic
    setTimeout(startAction, 800);
});
 
//functions

//fill trialLeft box with hearts
    
function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending pictures of Chris

function startAction(){
    
    //generate a picture
    $("#fruit1").show();
    chooseFruit(); 
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
    
    //generate a random step
    step = 1+ Math.round(5*Math.random()); // change step
    
    action = setInterval(function(){
        
        //move pictures by one step
        $("#fruit1").css('top', $("#fruit1").position().top + step);                              
    
        //check if the picture is too low
        if($("#fruit1").position().top > $("#slapContainer").height()){
            //check if we have trials left
            if(trialsLeft > 1 ){
              
                
                $("#fruit1").show();
                chooseFruit(); 
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

                //generate a random step
                step = 1+ Math.round(5*Math.random()); // change step
                
                //reduce trials by one
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts();
                
            }else{ // game over
                $("#startsound")[0].play();//play sound
                playing = false; //we are not playing anymore
                $("#startreset").html("Start Game"); // change button to Start Game
                $("#gameOver").show();
                $("#gameOver").html('<p>Oscar Over!</p><p>You scored '+ score +' slaps</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, 10);
}

// generate a random picture

function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(3*Math.random())] +'.png');   
}

//Stop dropping pictures

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});