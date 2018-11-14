var level = 1;
var negativeScore=0;
var positiveScore=0;
var finallevel=0;
var score=0;
var speed=200;




// Enemies our player must avoid
/******************************************Enemy*/
var Enemy = function(x,y,Speed) {
  // Variables applied to each of our instances
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
 // which will ensure the game runs at the same speed for
// all computers.

     this.x = this.x+(speed*dt);
     // speed chages every time Playes levels

    //repositioning the disappeared enemy from right of the board
    if( this.x >= 500 ){
      this.x = this.startX;
      this.y = this.startY;
    }
    // repositioning the Player in case of any collision
    if( player.x >= (this.x -40)&& player.x <=(this.x + 40)){
        if( player.y >= (this.y -40) && player.y <=(this.y+40)){
          score=0;
            player.x = 200;
            player.y = 400;
            if(level>1){
            level=level-1;
            speed=speed-100;

       }


          document.getElementById("levels").innerHTML= level;
          document.getElementById("scores").innerHTML= score;

        }
       }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




/*************************************************PLAYER**/


var Player = function(){
  this.doll=['images/char-cat-girl.png','images/char-boy.png']
    this.sprite = this.doll[Math.floor((Math.random() * 2) + 0)];
    this.x = 200;
    this.y = 400;



};

// Player class requires an update()
Player.prototype.update = function(){

//locate the gem and associate a value to based on the distance of the gem from the grass
            if(this.x>=(gem1.x-50)&&this.x<=(gem1.x+50)){
               if(this.y>=150 &&this.y<=270){
               score+=10;
               document.getElementById("scores").innerHTML= score;
               gem1.x=(100* Math.floor(Math.random() * 5));

             }
                }


            if(this.x>=(gem2.x-50)&&this.x<=(gem2.x+50)){
              if(this.y>=100 &&this.y<=190){
             score+=20;
             document.getElementById("scores").innerHTML= score;
             gem2.x=(100* Math.floor(Math.random() * 5));
             }
              }


              if(this.x>=(gem3.x-50)&&this.x<=(gem3.x+50)){
                if(this.y>=15 &&this.y<=110){
               score+=30;
               document.getElementById("scores").innerHTML= score;
               gem3.x=(100* Math.floor(Math.random() * 5));
               }
                }

//check if the player got to the water
  if( this.y < -10 ){
            this.x = 200;
            this.y = 400;

            level++;
            speed+=100;
            score+=10;
            document.getElementById("final").innerHTML= score;


          document.getElementById("levels").innerHTML= level;
          document.getElementById("scores").innerHTML= score;

//check if the player won
          if(level>=4){

                          setTimeout(
                        function closeModal(){
                           document.getElementById("popup").classList.toggle("showModal");}, 1);



                      setTimeout(
                    function closeModal(){

                       document.getElementById("popup").classList.remove("showModal");
                       }, 2000);
                       level=1;
                       speed=200;
                       score=0;
                    document.getElementById("levels").innerHTML= level;
                    document.getElementById("scores").innerHTML= score;
                        }
                }
};


// Player class requires an update()
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Player handleInput() method.
Player.prototype.handleInput = function(loc){

    if(loc === 'left' && this.x > 0 )
        this.x = this.x - 100;
    else if( loc === 'right' && this.x < 400)
        this.x = this.x + 100;
    else if( loc === 'up' && this.y > -50)
        this.y = this.y - 100;
    else if( loc === 'down' && this.y < 400)
        this.y = this.y +100;
};


// Player changePlayer() method.(change the character with clicking)(we can add as much as character we want)
Player.prototype.changePlayer = function(){

if(this.sprite===this.doll[0]){
  this.sprite=this.doll[1];
}
else if(this.sprite===this.doll[1]){
  this.sprite=this.doll[0];
}

};


/*************************************************Gem*****/
var Gem = function(x,y,k){
  this.i=k;
  this.allGem=['images/Gem-Orange.png', 'images/Gem-Green.png','images/Gem-Blue.png'];
    this.sprite =this.allGem[this.i];

    this.x =x;
    this.y = y;

};


Gem.prototype.update = function(){
  player.x.addEventListener("click", function() {
    alert("Hello! I am an alert box!!");
  })

};


Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Player handleInput() method.


/*************************************************Objects****/

var allEnemies = [new Enemy(-165,140),new Enemy(-400,220),new Enemy(-100,60)];
var player = new Player();
var gem1= new Gem(410,270,0);
var gem2=new Gem(110,190,1);
var gem3=new Gem(410,110,2);



/***********************************************************/


//for playing with keyboard

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});



//for changing the player character

document.addEventListener('click', function() {
    player.changePlayer();

});
