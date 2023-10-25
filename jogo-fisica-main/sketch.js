
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var bola
var cesta
var chao
var pontos = 0

var backgroundImg;
function preload(){
  backgroundImg = loadImage("background.png");
  bolaImg = loadImage("bola.png");
  cestaImg = loadImage("cesta.png") 
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;

  bolaProp = {
    isStatic: true,
    frictionAir:0.00000002,
    density: 1,
  }
  chaoProp = {
    isStatic: true,
  }
  //criando chao
  chao = Bodies.rectangle(width/2, height, width, 5, chaoProp);
  World.add(world, chao);
  
  //criando o corpo
 bola = Bodies.circle(width/2, 100, 60, bolaProp)
 //add no mundo
 World.add(world, bola);

 cesta = createSprite(width / 2, height - 100, 50, 50);
  cesta.addImage(cestaImg);
  cesta.scale = 1.2;
  cesta.velocityX = 10;
  cesta.setCollider("rectangle", 0, 0, 67.8, 10)
  cesta.debug = true
}


function draw() {
  background("#ccc");
  image (backgroundImg,0,0,width,height)

  textSize(40);
  stroke("black");
  fill("white");
  text("pontos"+pontos, 500, 50)
  
  if(keyDown("space")){
    Body.setStatic(bola,false);
  } 

  if (cesta.position.x >= width - 300 ) {
    cesta.velocityX = -10;
  }

  if (cesta.position.x <= 300) {
    cesta.velocityX = 10;
   
  }
  engine.world.gravity.y = 3
  //criando a bola
  pos= bola.position
  image(bolaImg, pos.x,pos.y, 60, 60)

  var c = Matter.SAT.collides(bola,chao);
  if(c.collided){
    pontos = 0;
    Body.setStatic(bola,true);
    Body.setPosition(bola,{x:width/2, y:10})
  }
  Engine.update(engine);
  drawSprites();
 
}

  

