// variable tombol hp
var tombolAtas = document.getElementById("tmblAtas");
var tombolBawah = document.getElementById("tmblBawah");
var tombolKiri = document.getElementById("tmblKiri");
var tombolKanan = document.getElementById("tmblKanan");
// 
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
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




let previousXVelocity = 0;
let previousYVelocity = 0;

// game loop
function drawGame(){
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

    if(score > 4) {
         speed = 5;
    }
    if(score > 9) {
        speed = 7;
    }
    
    if(score > 14) {
        speed = 9;
    }

    if(score > 24) {
        speed = 11;
    }

    if(score > 29) {
        speed = 14;
    }

    if(score > 44) {
        speed = 16;
    }

    if(score > 49){
        speed = 20;
    }
    if(score > 99){
        speed = 25;
    }

    


    setTimeout(drawGame, 1000/ speed);
}


function isGameOver(){
    let gameOver = false;
    if(yVelocity ===0 && xVelocity ===0){
         return false;
    }

    // wals
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

    for(let i =0; i < snakeParts.length; i++){
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

// Cek Score akhir
function HitungBestScore(){
    let BestScore = 0;
    ctx.fillStyle ='#a9a9a9';
    ctx.font = "15px Impact";
    if(!localStorage.key("Best")){
        ctx.fillText('Best Score: ' + "0", canvas.width-350, 15);
        
    } else{
        ctx.fillText('Best Score: ' + localStorage.getItem("Best"), canvas.width-350, 15);

    }
    if(BestScore !== null){
        if(score > localStorage.getItem("Best")){
            ctx.fillText('Best Score: ' + localStorage.setItem("Best", score), canvas.width-350, 15);
        }
    }else{
        ctx.fillText('Best Score: ' + localStorage.setItem("Best", score), canvas.width-350, 15);
    }

}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'blue';
    ctx.fillRect(headX * tileCount, headY* tileCount, tileSize,tileSize);

    ctx.fillStyle = 'lime';
    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
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
}

function checkAppleCollision(){
    if(appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        Makan.play();

    }
}
tombolKanan.addEventListener("click", fKanan);
tombolKiri.addEventListener("click", fKiri);
tombolAtas.addEventListener("click", fAtas);
tombolBawah.addEventListener("click", fBawah);
document.body.addEventListener('keydown', keyDown);

// TombolHp
function fKanan(){
    console.log(inputsXVelocity, inputsYVelocity);
    if(event) {
        inputsYVelocity = 0;
        inputsXVelocity = 1;
        Click.play();
     

    }
}

function fKiri(){
    console.log(inputsXVelocity, inputsYVelocity);
    if(event) {
        inputsYVelocity = 0;
        inputsXVelocity = -1;

       Click.play();
    }
}

function fAtas(){
    console.log(inputsXVelocity, inputsYVelocity);
    if(event) {
        inputsYVelocity = -1;
        inputsXVelocity = 0;

        Click.play();
    }

}

function fBawah(){
    console.log(inputsXVelocity, inputsYVelocity);
    if(event) {
        inputsYVelocity = 1;
        inputsXVelocity = 0;


         Click.play();
       

    }
}


function keyDown(event){
    console.log(inputsXVelocity, inputsYVelocity);
    // up atau W
    if(event.keyCode == 38 || event.keyCode == 87) {
        inputsYVelocity = -1;
        inputsXVelocity = 0;

        Click.play();
    }

    // down Atau S
    if(event.keyCode == 40 || event.keyCode == 83) {
        inputsYVelocity = 1;
        inputsXVelocity = 0;


         Click.play();
       

    }
    // left atau A
    if(event.keyCode === 37 || event.keyCode == 65) {
        inputsYVelocity = 0;
        inputsXVelocity = -1;

       Click.play();
    }
    // right Atau D
    if(event.keyCode === 39 || event.keyCode == 68) {
        inputsYVelocity = 0;
        inputsXVelocity = 1;

        Click.play();
     

    }
    
}




drawGame();

// musik program
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
