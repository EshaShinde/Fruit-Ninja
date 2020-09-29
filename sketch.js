var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;

var fruit
var sword,swordImage;
var fruit1,fruit2,fruit3,fruit4,fruitGroup;
var alien1,alien2,alienGroup,alienImage;

var background;
var cutsound,gameOversound


function preload(){
 swordImage=loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  alienImage =loadAnimation("alien1.png","alien2.png");
  gameoverImage = loadImage("gameover.png")
  cutsound=loadSound("knifeSwooshSound.mp3")
  gameOversound=loadSound("gameover.mp3")

}

function setup(){
   createCanvas(450,450);
 
  sword = createSprite(40,200,20,20);  
  sword.addImage(swordImage);
  sword.scale=0.8;
  
  fruitGroup=createGroup();
  alienGroup=createGroup();
 
}

function draw(){
background("black");  
  if (gameState===PLAY){
    
    aliens();
    fruits();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if (sword.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      
       cutsound.play();
      
       score=score+1;
      
    }
  }    
  
  else if(sword.isTouching(alienGroup)){
    gameState=END;
    
   fruitGroup.destroyEach();
    alienGroup.destroyEach();
    
    fruitGroup.velocityX=0;
    alienGroup.velocityX=0;
    
    sword.addImage(gameoverImage);
    sword.scale=2;
    sword.x=225;
    sword.y=225;
    
       }
  
 if(alienGroup.isTouching(sword)) {
   gameState=END
    
    gameOversound.play();
  }
  
  drawSprites();
  fill("white");
   textSize(20);
  text("Score:"+score,350,30);
  textSize(35);
  

  
}

function fruits(){

 if(World.frameCount%80===0){ 
  fruit=createSprite(400,200,20,20);
  fruit.scale=0.2;
   var position=Math.round(random(1,4));
   if(position===1){
   fruit.x=400
   fruit.velocityX=(7+(score/4)) 
   }
   else if(position===2){
       fruit.x=0
     
     fruit.velocityX=(7+(score/4))
   }
 
   
   
  if(position===1 ) {
  fruit.addImage("fruit1",fruit1);
  } 
  else if (position === 2){
    fruit.addImage("fruit2",fruit2)
  } 
  else if (position=== 3){
    fruit.addImage("fruit3",fruit3)
  } 
  else if ( position=== 4){
    fruit.addImage("fruit4",fruit4)
  }
   fruit.y=Math.round(random(50,340));
   fruit.velocityX=-7;
   fruit.setlifetime=100;
   
   fruitGroup.add(fruit);
}
}

  
function aliens(){
  
 if(World.frameCount%200===0){ 
 alien=createSprite(400,200,20,20);
 alien.addAnimation("aliens",alienImage);
 alien.y=Math.round(random(100,300)); 
 alien.velocityX=-(8+(score/10));
 alien.setlifetime=50;
   
 alienGroup.add(alien);  
}
}  
  
  
  
  
  
  


