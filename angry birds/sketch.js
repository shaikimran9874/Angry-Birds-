var redBird;
var greenPig;
var twoBirds;
var angryBg;
var redBirdImg;
var greenPigImg;
var twoBirdsImg;
var eggsGroup;
var pigsGroup;
var gameOver;
var gameOverImg;
var slingshot;
var slingshotImg;
var egg;
var eggImg;
var angryBgSound;
var score;
var health;

function preload(){
    redBirdImg = loadImage("./images/red.png")
    greenPigImg = loadImage("./images/pig.png")
    twoBirdsImg = loadImage("./images/logo.png")
    angryBg = loadImage("./images/angrybirdmania.png")
    gameOverImg = loadImage("./images/gameover.jpg")
    eggImg = loadImage("./images/egg.png")
    angryBgSound = loadSound("./Sounds/AngryBirdsMusic.mp3")
}

function setup(){
    canvas = createCanvas(windowWidth,windowHeight)
    redBird = createSprite(60,windowHeight/2,100,100) 
    redBird.addImage(redBirdImg)
    redBird.scale = 0.06
    
    eggsGroup = new Group();
    pigsGroup = new Group();
    score = 0;
    health = 3;

    gameOver = createSprite(width/2,height/2,10,10)
    gameOver.addImage(gameOverImg)
    gameOver.visible = false
}

function draw(){
    background(angryBg)

    if(keyIsDown(UP_ARROW)){
        redBird.position.y = redBird.position.y - 5
    }

    if(keyDown(DOWN_ARROW)){
        redBird.position.y = redBird.position.y +5
    }

    if(keyDown("space")){
        SpawnEggs();
    }
        
    SpawnPigs();

      drawSprites();

      for(var i = 0; i<pigsGroup.length;i++){
          if(eggsGroup.collide(pigsGroup.get(i))){
            pigsGroup.get(i).remove();
            score+=1;
            eggsGroup.removeSprites();

            if(pigsGroup.collide(redBird)){
                      PigsGroup.get(i).remove();
                        health-=1
                    }
        }
    }

    fill("black")
    textSize(20)
    text("Score: "+ score,width-100,50)
    text("Health: "+ health,width-250,50)

    for(var i = 0; i<pigsGroup.length;i++){
        if(pigsGroup.get(i).collide(redBird)){
            pigsGroup.get(i).remove();
            health-=1
        }
       }

        if(health === 0 ){
            gameOver.visible = true
            pigsGroup.removeSprites();
            eggsGroup.removeSprites();
        }
    }




function SpawnEggs(){
    egg = createSprite(redBird.position.x+100,redBird.position.y,50,50)
    egg.addImage(eggImg) 
    egg.setVelocity(5,0)
    egg.scale = 0.10
    eggsGroup.add(egg)
}

function SpawnPigs(){
    if(frameCount % 80 === 0){
        greenPig = createSprite(width,random(10,height-50),10,10)
        greenPig.addImage(greenPigImg)
        greenPig.setVelocity(-4,0)
        greenPig.scale = 0.06
        pigsGroup.add(greenPig)
}
}