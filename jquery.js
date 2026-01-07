//jquery.js
var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval
// read fruits list from GAME_CONFIG if available, otherwise fallback
var fruits = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.fruits) ? GAME_CONFIG.fruits : ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
$(function(){
    
//click on start reset button
    
$("#startreset").click(function(){

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
    // use configured initial trials if available
    trialsLeft = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.initialTrials) ? GAME_CONFIG.initialTrials : 3;
    addHearts();

        //hide game over box
        $("#gameOver").hide();

        //change button text to reset game
        $("#startreset").html("Reset Game");

        //start sending fruits
        startAction();
    }
});

    
//slice a fruit
    
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
//    document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//play sound
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit
    
    //send new fruit
    setTimeout(startAction, 500);
});
 
//functions

//fill trialLeft box with hearts
    
function addHearts(){
    $("#trialsLeft").empty();
    var heartPath = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.heartImagePath) ? GAME_CONFIG.heartImagePath : 'images/heart.png';
    for(var i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="' + heartPath + '" class="life">');
    }
}

//start sending fruits

function startAction(){
    
    //generate a fruit
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    var spawnRange = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.spawnXRange) ? GAME_CONFIG.spawnXRange : 550;
    $("#fruit1").css({'left' : Math.round(spawnRange*Math.random()), 'top' : -50}); //random position

    //generate a random step
    var stepMin = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.stepMin) ? GAME_CONFIG.stepMin : 1;
    var stepMax = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.stepMax) ? GAME_CONFIG.stepMax : 6;
    step = stepMin + Math.round((stepMax - stepMin) * Math.random()); // change step

    // Move fruit down by one step every intervalDelay ms
    var intervalDelay = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.intervalDelay) ? GAME_CONFIG.intervalDelay : 10;
    action = setInterval(function(){
        
        //move fruit by one step
        $("#fruit1").css('top', $("#fruit1").position().top + step);                              
    
        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            //check if we have trials left
            if(trialsLeft > 1 ){
                //generate a fruit
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                var spawnRange = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.spawnXRange) ? GAME_CONFIG.spawnXRange : 550;
                $("#fruit1").css({'left' : Math.round(spawnRange*Math.random()), 'top' : -50}); //random position

                //generate a random step
                var stepMin = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.stepMin) ? GAME_CONFIG.stepMin : 1;
                var stepMax = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.stepMax) ? GAME_CONFIG.stepMax : 6;
                step = stepMin + Math.round((stepMax - stepMin) * Math.random()); // change step
                
                //reduce trials by one
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts();
                
            }else{ // game over
                playing = false; //we are not playing anymore
                $("#startreset").html("Start Game"); // change button to Start Game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, intervalDelay);
}

// generate a random fruit

function chooseFruit(){
    // choose a random fruit name from the fruits array and set the image src based on config
    var idx = Math.floor(Math.random() * fruits.length);
    var imagePath = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.fruitImagePath) ? GAME_CONFIG.fruitImagePath : 'images/';
    $("#fruit1").attr('src' , imagePath + fruits[idx] +'.png');   
}

//Stop dropping fruits

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});