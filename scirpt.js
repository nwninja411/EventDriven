// make a shortcut to the score span
let spnScore = document.getElementById("spnScore");
let Bonk = document.getElementById("Bonk")
//array of the holes - get any html element with the css class and automagically add it into an array- this will make it easier to work with the holes- or make global updates to elements with the same CSS class
let divHoles = document.querySelectorAll(".hole");
//variable to keep track of user score
let score = 0;
// variable to keep track of last hole was clicked on
let lastHole;
//variable to keep track of if the time is up
let timeUp = false;

//function to start game
function startGame(){
    // reset the score to zero each time Start game is clicked
    spnScore.textContent = 0;
    //reset the score variable to zero
    score = 0;
    //reset time up back to false so that the game can rune
    timeUp = false;

    //start having moles pop up
    popUp();

    //specify how long we want the game to last
    setTimeout(function(){
        timeUp = true;
    }, 10000);
}


//create a funtion to genereate a random amount of time
function randomTime(min, max){
    //we willreturn a random amount of time
    //we will multiply our random number by the difference between our min and max and then we bump the random number to at least the min 
    //lets say that our range is min 5 max 10 we multiply the random number by 5 and we get three as our number, then we add five to our random number so it is within the range of 5 to 10 so our random number goes 3 to 8
    return Math.floor((Math.random() * (max-min)) + min);
}

//build function to grab a random hole
function randomHole(divHoles){
    //generate a random number
    let randomNumber = Math.floor(Math.random() * divHoles.length);

    // create a shortcut to the selected hole
    let hole = divHoles[randomNumber];

    //if we got the same random hole in a row call the funtion again the user expereicne will be better if the mole pops up in a unique hole each time
    if (hole == lastHole){
        return randomHole(divHoles);
    }

    //keep track of the last hole for reasons states above
    lastHole = hole;
    //return the new hole to the calling mode
    return hole;
}

//function to make the mole appear to pop up in the hole
function popUp(){
    //this is the sweet spot for timing - MIN MAX time
    let time = randomTime(300, 1000);
    //get the random hole
    let hole = randomHole(divHoles);

    //change the css to make the mole appear
    hole.classList.add("mole"); //changes the background color of the hole to red

    // remove the mole after the random amount of time
    //we are creating an anoynmous function for the first argument of the setTimeout function; setTimeout allows us to run a function for a specfic amount of time
    setTimeout(function(){
        //remove the mole from the hole
        hole.classList.remove("mole");

        //if (timeUp == false) same as below
        if (!timeUp){
            //if the time is not yet up, pop up another mole
            popUp();
        }
        //time is the second argument of the set time out function
    }, time);
}

//function to keep the score when the mole was hit
function whack(event){
    //check to see if the class containts mole, if so the user hit the mole
    if (this.classList.contains("mole")){
        //add one to the score
        score++;
        //remove the mole once clicked
        this.classList.remove("mole");

        //update the score
        spnScore.textContent = score;

        //play sound effect
        //.currentTime restarts sound if its already playing 
        Bonk.currentTime = 0;
        Bonk.play();
    }
}

divHoles.forEach(hole => hole.addEventListener("click", whack));