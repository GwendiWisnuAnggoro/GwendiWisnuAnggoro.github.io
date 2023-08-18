

var tombolAtas = document.getElementById("tmblAtas");
var tombolBawah = document.getElementById("tmblBawah");
var tombolKiri = document.getElementById("tmblKiri");
var tombolKanan = document.getElementById("tmblKanan");

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const custom = canvas.getContext('2d');
class SnakePart{
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }
}

let speed = 3;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity=0;
let yVelocity=0;

let score = 0;

let Click = new Audio();
Click.src="Click.mp3";

let Kalah = new Audio();
Kalah.src="Kalah.mp3";

let Makan = new Audio();
Makan.src="Makan.mp3";
let isAIEnabled = false;



let previousXVelocity = 0;
let previousYVelocity = 0;

let kecepatanNormal = 3;
let Score_Bertambah = 5;
let TambahkanKecepatan = 2;
let currentSpeed = kecepatanNormal;
let isPaused = false;
let currentHue = 0;
const hueChangeRate = 0.1;
let TulisanPause = "Game Paused !!";
let speedIncreased = false;


function drawGame() {
  if (isPaused) {
    ctx.fillStyle = "white";
    ctx.font = "50px Oswald";
    ctx.textAlign = "center";  
    ctx.textBaseline = "middle"; 

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "lime");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(1, "red");

    ctx.fillStyle = gradient;
    
    
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeText(TulisanPause, canvas.width / 2, canvas.height / 2);
    
    ctx.fillText(TulisanPause, canvas.width / 2, canvas.height / 2); 
    return;
}
    
    if (score > 0 && score % Score_Bertambah === 0 && !speedIncreased) {
        currentSpeed += TambahkanKecepatan;
        speedIncreased = true;
    } else if (score % Score_Bertambah !== 0) {
        speedIncreased = false;
    }


    if (isAIEnabled) {
        aStarAI();
    }


    xVelocity = inputsXVelocity;
    yVelocity = inputsYVelocity;

    if (previousXVelocity === 1 && xVelocity === -1) {
        xVelocity = previousXVelocity;
    }

    if (previousXVelocity === -1 && xVelocity === 1) {
        xVelocity = previousXVelocity;
    }
    if (previousYVelocity === -1 && yVelocity === 1) {
        yVelocity = previousYVelocity;
    }
    if (previousYVelocity === 1 && yVelocity === -1) {
        yVelocity = previousYVelocity;
    }

    previousXVelocity = xVelocity;
    previousYVelocity = yVelocity;
    
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        tombolKanan.addEventListener("click", fKanan);
        tombolKiri.addEventListener("click", fKiri);
        tombolAtas.addEventListener("click", fAtas);
        tombolBawah.addEventListener("click", fBawah);
        document.body.removeEventListener('keydown', keyDown);
        return;
    }

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();
    HitungBestScore();
    drawScore();



    setTimeout(drawGame, 1000 / currentSpeed);
}




function isGameOver(){
    let gameOver = false;
    
    if(yVelocity === 0 && xVelocity === 0){
         return false;
    }

    
    if(headX < 0 ){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true
    }
    else if(headY < 0) {
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true;
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }
    

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Oswald";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "lime");
        gradient.addColorStop("0.5", "yellow");
        gradient.addColorStop("1.0", "red");

        ctx.fillStyle = gradient;

        ctx.fillText("Game Over!", canvas.width / 5.5, canvas.height / 2);
        Kalah.play();
        HitungBestScore();

    }
    return gameOver;
}

function drawScore() {
    ctx.fillStyle ='#a9a9a9';
    ctx.font = "15px Impact"
    ctx.fillText('Score: ' + score, canvas.width-100, 15);
}



function HitungBestScore(){
    let BestScore = 0;
    ctx.fillStyle ='#a9a9a9';
    ctx.font = "15px Impact";
    if(!localStorage.getItem("Best")){
        ctx.fillText('Score Tertinggi: ' + localStorage.setItem("Best", "0"), canvas.width-350, 15);
        
    } else{
        ctx.fillText('Score Tertinggi: ' + localStorage.getItem("Best"), canvas.width-350, 15);
    }
    
    
    
    
    if(BestScore !== null){
        if(score > localStorage.getItem("Best")){
            ctx.fillText('Score Tertinggi: ' + localStorage.setItem("Best", score), canvas.width-350, 15);
        }
    }else{
        ctx.fillText('Score Tertinggi: ' + localStorage.setItem("Best", score), canvas.width-350, 15);
    }
    
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    ctx.fillStyle = `blue`;
    ctx.strokeStyle = "white";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    ctx.strokeRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillStyle = `hsl(${currentHue + (i * 20)}, 100%, 50%)`; 
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength){
        snakeParts.shift();
    }
}



function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);

    ctx.strokeStyle = "white";
    ctx.strokeRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}


function checkAppleCollision() {
    let collision = false;

    if (appleX === headX && appleY === headY) {
        collision = true;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === appleX && part.y === appleY) {
            collision = true;
            break;
        }
    }

    if (collision) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);

        
        while (isAppleOnSnake(appleX, appleY)) {
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
        }

        tailLength++;
        score++;
        Makan.currentTime = 0; 
        Makan.play();
    }
}


function isAppleOnSnake(x, y) {
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === x && part.y === y) {
            return true;
        }
    }
    return false;
}

tombolKanan.addEventListener("click", fKanan);
tombolKiri.addEventListener("click", fKiri);
tombolAtas.addEventListener("click", fAtas);
tombolBawah.addEventListener("click", fBawah);
document.body.addEventListener('keydown', keyDown);


function fKanan() {
    console.log(inputsXVelocity, inputsYVelocity);
    if (event) {
        inputsYVelocity = 0;
        inputsXVelocity = 1;
        Click.currentTime = 0; 
        Click.play();
    }
}

function fKiri() {
    console.log(inputsXVelocity, inputsYVelocity);
    if (event) {
        inputsYVelocity = 0;
        inputsXVelocity = -1;
        Click.currentTime = 0; 
        Click.play();
    }
}

function fAtas() {
    console.log(inputsXVelocity, inputsYVelocity);
    if (event) {
        inputsYVelocity = -1;
        inputsXVelocity = 0;
        Click.currentTime = 0; 
        Click.play();
    }
}

function fBawah() {
    console.log(inputsXVelocity, inputsYVelocity);
    if (event) {
        inputsYVelocity = 1;
        inputsXVelocity = 0;
        Click.currentTime = 0; 
        Click.play();
    }
}


function keyDown(event){
    console.log(inputsXVelocity, inputsYVelocity);
    
    if(event.keyCode == 38 || event.keyCode == 87) {
        inputsYVelocity = -1;
        inputsXVelocity = 0;
        Click.currentTime = 0;
        Click.play();
    }

    
    if(event.keyCode == 40 || event.keyCode == 83) {
        inputsYVelocity = 1;
        inputsXVelocity = 0;

        Click.currentTime = 0;
        Click.play();
       

    }
    
    if(event.keyCode === 37 || event.keyCode == 65) {
        inputsYVelocity = 0;
        inputsXVelocity = -1;

        Click.currentTime = 0;
       Click.play();
    }
    
    if(event.keyCode === 39 || event.keyCode == 68) {
        inputsYVelocity = 0;
        inputsXVelocity = 1;

        Click.currentTime = 0;
        Click.play();
     

    }
    
}





class Node {
    constructor(x, y, parent, cost, heuristic) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.cost = cost;
        this.heuristic = heuristic;
    }
}


function calculateHeuristic(x1, y1, x2, y2) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

function aStarAI() {
    const visited = new Set();
    const queue = [];
    const tailSet = new Set(snakeParts.map(part => `${part.x},${part.y}`));

    queue.push({ x: headX, y: headY, path: [] });
    visited.add(`${headX},${headY}`);

    while (queue.length > 0) {
        const current = queue.shift();

        const neighbors = [
            { x: current.x + 1, y: current.y },
            { x: current.x - 1, y: current.y },
            { x: current.x, y: current.y + 1 },
            { x: current.x, y: current.y - 1 }
        ];

        for (const neighbor of neighbors) {
            const neighborKey = `${neighbor.x},${neighbor.y}`;
            if (
                neighbor.x >= 0 && neighbor.x < tileCount &&
                neighbor.y >= 0 && neighbor.y < tileCount &&
                !visited.has(neighborKey) &&
                !tailSet.has(neighborKey)
            ) {
                const newPath = [...current.path, neighbor];
                visited.add(neighborKey);
                queue.push({ ...neighbor, path: newPath });

                if (neighbor.x === appleX && neighbor.y === appleY) {
                    // Choose the first step of the path
                    if (newPath.length > 0) {
                        const nextStep = newPath[0];
                        inputsXVelocity = nextStep.x - headX;
                        inputsYVelocity = nextStep.y - headY;
                    }
                    return;
                }
            }
        }
    }
}





    if (isAIEnabled) {
        aStarAI();
    }




drawGame();



var musik = new Audio();
musik.src="Backsound Game Snake.mp3"
musik.loop=true;
musik.pause();

    function mulaiAudio(){
        var play=document.getElementById('play');

        play.addEventListener('click',fplay);

        function fplay(){
            if(musik.paused){
                musik.play();
                play.style.background="url(../../img/PlaySong.png)";
            }else{
                musik.pause();
                play.style.background="url(../../img/StopSong.png)";
            }
        }
    }

window.addEventListener('load', mulaiAudio)

