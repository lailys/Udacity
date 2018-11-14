
/*add the card to a *list* of "open" cards */
let arrayCards=[];
let cards=document.getElementsByClassName("card");
arrayCards.push(...cards);
const deck = document.querySelector(".deck");

let clickedCards=[];
let moves=0;
const stars = document.querySelectorAll(".fa-star");
let matchCount=0;
let seconds = 0;
let minutes = 0;
let timing;
let p,k;



/*reset the page */

document.body.onload = myFunction();

/*make all the cards apear*/

function displayAll(array){
    for (var i = 0; i < array.length; i++) {
    array[i].classList.toggle("open");
    array[i].classList.toggle("show");
}}


/*make all the cards disapear*/

function disappearALL(array){
    for (var i = 0; i < array.length; i++) {
    array[i].classList.remove("open","show","clicked","match");

}}


/*get the game reset */

function myFunction() {
seconds = 0;
minutes = 0;

 document.querySelector(".seconds").innerHTML=0;
     document.querySelector(".minutes").innerHTML=0;


      var start = shuffle(arrayCards);

      for (var i= 0; i < start.length; i++){
      deck.appendChild(start[i]);
      start[i].classList.remove("open","show","clicked","match");
      }
      const moveCount=document.querySelector("span");
      moveCount.innerHTML=0;
      moves=0;
     /*make all cards apear for few seconds and let the player have a memory picture and then disapear all the cards*/
      displayAll(arrayCards);
      setTimeout(function(){disappearALL(arrayCards) 


      }, 2000);


     /*reset the stars*/
      stars[0].style.visibility = "visible";
      stars[1].style.visibility = "visible";
      stars[2].style.visibility = "visible";

       /*reset the timer

        seconds = 0;
        minutes = 0;*/
        
 };




function displayCard(){
   this.classList.toggle("open");
   this.classList.toggle("show");
   this.classList.toggle("clicked");
   
};


function closeModal(){
   document.getElementById("popup").classList.remove("showModal");
   myFunction();
};




function winner() {
     if (matchCount=== 8){
       p=seconds;
   k=minutes;
  seconds = 0;
minutes = 0;

 document.querySelector(".seconds").innerHTML=0;
     document.querySelector(".minutes").innerHTML=0;
     document.getElementById("time").innerHTML=k+" minutes "+p+" seconds"
     document.getElementById("popup").classList.toggle("showModal");
     };

}


function closeModal(){
     document.getElementById("popup").classList.remove("showModal");
     myFunction();
     matchCount=0;
};

function playAgain(){
     myFunction();
     closeModal();
};

/*
 * set up the event listener for a card. If a card is clicked:*/
for (var i = 0; i <arrayCards.length; i++){
   arrayCards[i].addEventListener("click", displayCard);
   arrayCards[i].addEventListener("click", openCards);
   arrayCards[i].addEventListener("click", winner);
   };


/* start counting the moves and the stopwatch and check for the cards being match or not*/

function openCards(){
    clickedCards.push(this);
    moves++;
   
    if(moves%2==0){

    document.querySelector(".moves").innerHTML=moves/2;

    document.getElementById("move").innerHTML=moves/2;
  }
    if(moves===1){

     timing=setInterval(function(){
     document.querySelector(".seconds").innerHTML=seconds;
     document.querySelector(".minutes").innerHTML=minutes;
  
     seconds++;
     if(seconds===60){
     minutes++;
     seconds=0;}},1000);
     }
    if(clickedCards.length===2){


    if (moves > 10 && moves < 15){
    stars[2].style.visibility = "collapse";
    }
    else if (moves >=15 && moves < 20){
    stars[1].style.visibility = "collapse";
    }
    

    

    if(clickedCards[0].innerHTML===clickedCards[1].innerHTML){
     matchCount++;
    clickedCards[0].classList.toggle("match");
    clickedCards[0].classList.remove("open");
    clickedCards[0].classList.remove("show");
    clickedCards[1].classList.toggle("match");
    clickedCards[1].classList.remove("open");
    clickedCards[1].classList.remove("show");
    clickedCards=[];
    }
    else{

    clickedCards[0].classList.toggle("noMatch");
    clickedCards[1].classList.toggle("noMatch");

    setTimeout(function(){
    clickedCards[0].classList.remove("noMatch");
    clickedCards[1].classList.remove("noMatch");
    clickedCards[0].classList.remove("open");
    clickedCards[0].classList.remove("show");
    clickedCards[1].classList.remove("open");
    clickedCards[1].classList.remove("show");
    clickedCards[0].classList.remove("clicked");
    clickedCards[1].classList.remove("clicked");
    clickedCards=[];
     }, 1000);

  }}};







// Shuffle function from http://stackoverflow.com/a/2450976*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**/
/*
 * set up the event listener for a card. If a card is clicked:*/


 /*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
