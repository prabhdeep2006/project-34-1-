//Create variables here
var dog;
var happyDog;
var database;
var foodS=0;
var foodStock; 
var dog1; 
var addFood,feedFood;
var fedTime,lastFed; 
var foodObj; 

function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
   dog1 = createSprite(250,300);
   dog1.addImage(dog);
   //dog1.addImage(happyDog);
   dog1.scale=0.2;
  addFood = createButton("add the food"); 
  feedFood = createButton("feed the food"); 
  addFood.position(100,100); 
  addFood.mousePressed(foodAdd);
  feedFood.mousePressed(feedDog); 
  feedFood.position(200,100);
   foodObj = new Food(200,200); 
 
  database = firebase.database(); 
  foodStock = database.ref('Food'); 
  foodStock.on("value",readStock); 
}


function draw() { 
  background(46,139,87); 
  foodObj.display(); 

  fedTime = database.ref('FeedTime'); 
  fedTime.on("value",function(data){
    lastFed = data.val(); 
  })

  fill(255,255,254);
  textSize(15); 

  if(lastFed>=12){ 
    text("Last feed " + lastFed%12 + "PM",350,30); 
  }
    else if(lastFed===0){
      text("last feed 12 AM ",350,30); 
    }
    else{
     text("Last feed "  + lastFed + "AM",350,30); 
    }
    drawSprites();
    fill("black");
    textSize(20); 
    text("Feed the dog to make it happy",100,100); 
    text("No.of foodstocks available " + foodS,100,150); 
  
  
  }
  

 
  //add styles here
 
function readStock(data){
  foodS=data.val(); 
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
} 
function foodAdd(){
  foodS++; 
  foodObj.updateFoodStock(foodS); 
  database.ref('/').update({
    Food:foodS

  })
}
function feedDog(){
  dog1.addImage(happyDog)
foodS--; 
  foodObj.updateFoodStock(foodS); 
  database.ref('/').update({
    Food:foodS, 
    FeedTime:hour()

  })

}