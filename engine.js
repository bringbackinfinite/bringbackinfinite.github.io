var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var shadow = canvas.getContext("2d");

let FPS = 60;

// Игрок
let paddleHeight = 50;
let paddleWidht = 50;
var paddleX = 200;
var paddleY = (canvas.height - paddleHeight - 30);
var rightPressed = false;
var leftPressed = false;
var playerSprite = document.createElement("IMG");
playerSprite.src = "img/oneright.png";
let collisionRange = 30;
// Игрок

//Обьекты
let objpos = [1,-50,300, -100, 1, -50, 300, -100];
let objSpeed = 5;
//Обьекты

// Счет и уровень сложности
let Timer = 0;
let Score = 0;
let level = 0;
let bestScore = 0;
let difficult = 1;
// Счет и уровень сложности

var gameOver = false;

//Анимации
var AnimTimer = 0;
var anim = 0;
var isRight = true;
var isLeft = false;
//Анимации

//background
var backgroundSprite = document.createElement("IMG");
backgroundSprite.src = "img/background.png";

var skySprite = document.createElement("IMG");
skySprite.src = "img/sky.png";

var cloudSprite = document.createElement("IMG");
cloudSprite.src = "img/cloud.png";

var floorSprite = document.createElement("IMG");
floorSprite.src = "img/floor.png";

var bombSprite = document.createElement("IMG");
bombSprite.src = "img/bomb.png";

var explosionSprite = document.createElement("IMG");
explosionSprite.src = "img/explosion.png";
//background

let cloudspeed = 0.5;
let cloudX = -150;

let bombHeight = 45;

let explosionPosition = [1000, 1000, 1000, 1000, 1000, 1000, 1000];

//sounds
var music = new Audio();
music.preload = 'auto';
music.src = "sounds/music.mp3";
music.play();
//sounds

document.getElementById("auf").style.display = "none";

// Подключение управления
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
   if(e.keyCode == 39){
   	 rightPressed = true;
   }
   if(e.keyCode == 37){
   	 leftPressed = true;
   }
}

function keyUpHandler(e){
   if(e.keyCode == 39){
   	 rightPressed = false;
   }
   if(e.keyCode == 37){
   	 leftPressed = false;
   }
}
// Подключение управления


function spawnExplosionOne()
{
	ctx.beginPath();
	ctx.drawImage(explosionSprite, explosionPosition[0], explosionPosition[1], 50, 50);
	ctx.fill();
	ctx.closePath();
}

function spawnExplosionTwo()
{
	ctx.beginPath();
	ctx.drawImage(explosionSprite, explosionPosition[2], explosionPosition[3], 50, 50);
	ctx.fill();
	ctx.closePath();
}

function spawnExplosionThree()
{
	ctx.beginPath();
	ctx.drawImage(explosionSprite, explosionPosition[4], explosionPosition[5], 50, 50);
	ctx.fill();
	ctx.closePath();
}

function spawnExplosionFour()
{
	ctx.beginPath();
	ctx.drawImage(explosionSprite, explosionPosition[6], explosionPosition[6], 50, 50);
	ctx.fill();
	ctx.closePath();
}



// Отрисовка игрока
function drawPaddle(){

   ctx.beginPath();
   ctx.drawImage(playerSprite, paddleX, paddleY , paddleWidht, paddleHeight);
   //ctx.rect(paddleX, paddleY , paddleWidht, paddleHeight);
   shadow.fillSyle = "white";
   ctx.fill();
   ctx.closePath();
}
// Отрисовка игрока

// Обьекты
function drawEnemyOne(){
	ctx.beginPath();
	//ctx.rect(objpos[0], objpos[1], 15, 15);
	ctx.drawImage(bombSprite,objpos[0], objpos[1], 15, 15);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function drawEnemyTwo(){
	ctx.beginPath();
	//ctx.rect(objpos[2], objpos[3], 15, 15);
	ctx.drawImage(bombSprite,objpos[2], objpos[3], 15, 15);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function drawEnemyThree(){
    ctx.beginPath();
	//ctx.rect(objpos[4], objpos[5], 15, 15);
	ctx.drawImage(bombSprite,objpos[4], objpos[5], 15, 15);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function drawEnemyFour()
{
	ctx.beginPath();
	//ctx.rect(objpos[6], objpos[7],15,15);
	ctx.drawImage(bombSprite,objpos[6], objpos[7], 15, 15);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}
// Обьекты

// Рестарт
function restart()
{
	cloudX = -150;
	isRight = true;
	isLeft = false;
	Timer = 0;
	Score = 0;
	level = 0;
	objSpeed = 5;
	objpos = [1,-50,300, -100];
	paddleX = 200;
	paddleY = (canvas.height - paddleHeight - 30);
	gameOver = false;
	document.getElementById("auf").style.display = "none";
	document.getElementById('logo').innerHTML = "Bring Back: Infinite";
}
// Рестарт

//Отображение счета
function drawPos()
{
	document.getElementById('scoreText').innerHTML = "Score: " + Math.floor(Score);
	document.getElementById('bestscore').innerHTML = "Best score: " + Math.floor(bestScore);
}
//Отображение счета

// Collision
function onCollisionEnter()
{
	if(objpos[0] > paddleX - collisionRange)
    {
    	if(objpos[0] < paddleX  + collisionRange  && objpos[1] > paddleY){
    		gameOver = true;
	  }
    }
    else if(objpos[2] > paddleX - collisionRange)
    {
    	if(objpos[2] < paddleX + collisionRange && objpos[3] > paddleY)
    	{
    		gameOver = true;
    	}
    }
     else if(objpos[4] > paddleX - collisionRange)
    {
    	if(objpos[4] < paddleX + collisionRange && objpos[5] > paddleY)
    	{
    		gameOver = true;
    	}
    }
     else if(objpos[6] > paddleX - collisionRange)
    {
    	if(objpos[6] < paddleX + collisionRange && objpos[7] > paddleY)
    	{
    		gameOver = true;
    	}
    }
}
//Collision

// Запуск анимаций
function animEvent(){
     AnimTimer += 1;
  		if(AnimTimer > 5){
  		 if(anim < 1){
            anim = 1;
            AnimTimer = 0;
          }
          else{
            anim = 0;
            AnimTimer = 0;
          }
  		}
}
// Запуск анимаций

//Счетчик счета
function scoreEvent()
{
    Timer += 1;
    if(Timer > 120){
    	Score += 1;
    	level += 1;
    	Timer = 0;
    }
    if(level == 5){
    	objSpeed += difficult;
    	level = 0;
    }
    if(Score > bestScore){
    	bestScore = Score;
    }
}
//Счетчик счета

// Отрисовка определенное кол-во раз в секунду (UPDATE)
function draw(){
	if(gameOver == false){   
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.drawImage(skySprite, 0, 0, 500, 500);
	ctx.drawImage(cloudSprite, cloudX, 0, 150, 150);
	ctx.drawImage(floorSprite, 0, 370,500,500);
	ctx.drawImage(backgroundSprite, 100, 70 , 300, 300);
	// Управление

	if(cloudX < canvas.width)
	{
      cloudX += cloudspeed;
	}
	else
	{
		cloudX = -150;
	}
	if(rightPressed && paddleX < canvas.width - paddleWidht){
  		paddleX += 7;
  		isRight = true;
  		isLeft = false;
  	    animEvent();	
  	}
  	else if(leftPressed && paddleX > 0){
  		paddleX -= 7;
  		isRight = false;
  		isLeft = true;
  		animEvent();
  	}
  	else{
  		anim = 0;
  		AnimTimer = 0;
  	}
  	// Управление
     
    //Активация определенных анимаций
    if(isRight){
    	if(anim == 1){
    		playerSprite.src = "img/tworight.png";
    	}
    	else{
    		playerSprite.src = "img/oneright.png";
    	}
    }
    if(isLeft){
    	if(anim == 1){
    		playerSprite.src = "img/twoleft.png";
    	}
    	else{
    		playerSprite.src = "img/oneleft.png";
    	}
    }
    //Активация определенных анимаций
    
    // Падающие обьекты
    if(objpos[1] < canvas.height - bombHeight){
    	objpos[1] += objSpeed;
    	explosionPosition[0] = 1000; explosionPosition[1] = 1000;
    }
    else{
    	explosionPosition[0] = objpos[0];
    	explosionPosition[1] = objpos[1] - 10;
    	objpos[1] = Math.floor(Math.random() * (-100 - -50)) + -50;
    	objpos[0] = Math.floor(Math.random() * (400 - 0)) + 0;
    	
    }
    if(objpos[3] < canvas.height - bombHeight){
    	objpos[3] += objSpeed;
    	explosionPosition[2] = 1000; explosionPosition[3] = 1000;
    }
    else{
    	explosionPosition[2] = objpos[2];
    	explosionPosition[3] = objpos[3] - 10;
    	objpos[3] = Math.floor(Math.random() * (-100 - -50)) + -50;
    	objpos[2] = Math.floor(Math.random() * (400 - 0)) + 0;
    	
    }
    if(objpos[5] < canvas.height - bombHeight){
    	objpos[5] += objSpeed;
    	explosionPosition[4] = 1000; explosionPosition[5] = 1000;
    }
    else{
    	explosionPosition[4] = objpos[4];
    	explosionPosition[5] = objpos[5] - 10;
    	objpos[5] = Math.floor(Math.random() * (-100 - -50)) + -50;
        objpos[4] = Math.floor(Math.random() * (400 - 0)) + 0;
        
    }
     if(objpos[7] < canvas.height - bombHeight){
    	objpos[7] += objSpeed;
    	explosionPosition[6] = 1000; explosionPosition[7] = 1000;
    }
    else{
    	explosionPosition[6] = objpos[6];
    	explosionPosition[7] = objpos[7] - 10;
    	objpos[7] = Math.floor(Math.random() * (-100 - -50)) + -50;
        objpos[6] = Math.floor(Math.random() * (400 - 0)) + 0;

    }

    // Падающие обьекты

    // Вызов остальных функций
      	  spawnExplosionOne();
  	  spawnExplosionTwo();
  	  spawnExplosionThree();
  	  spawnExplosionFour();
      onCollisionEnter();
  	  drawPaddle();
  	  drawEnemyOne();
  	  drawEnemyTwo();
  	  drawEnemyThree();
  	  drawEnemyFour();
  	  drawPos();
  	  scoreEvent();
  	  // Вызов остальных функций
  	}

  	    // Меню проигрыша 
    if(gameOver == true){
    	document.getElementById("auf").style.display = "inline-block";
    	document.getElementById('logo').innerHTML = "GameOver";
    }
    // Меню проигрыша 
}
// Отрисовка определенное кол-во раз в секунду (UPDATE)

// Интервал (FPS)
setInterval(draw, 1000/FPS);