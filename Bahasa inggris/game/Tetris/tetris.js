const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
var Rotasi = document.querySelector(".bi-arrow-counterclockwise");
var tombolBawah = document.querySelector(".bi-arrow-down-circle-fill");
var tombolKiri = document.querySelector(".bi-arrow-left-circle-fill");
var tombolKanan = document.querySelector(".bi-arrow-right-circle-fill");


let Muter = new Audio();
Muter.src="Backsound Muter.mp3";

let KiriKananBawah = new Audio();
KiriKananBawah.src="Kiri Kanan Backsound.mp3"

let LarikHilang = new Audio();
LarikHilang.src="1 Larik Hilang.mp3"

let Kalah = new Audio();
Kalah.src = "Kalah.mp3";

let Notok = new Audio();
Notok.src = "notok.mp3";

let Turun = new Audio();
Turun.src = "Turun.mp3";

context.scale(20, 20);

function arenaSweep() {
    let rowCount = 1;
    let rowsToRemove = [];
    for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena [y][x] === 0) {
                break;
            }

            if (x === arena[y].length - 1) {
                rowsToRemove.push(y);
                player.score += rowCount * 10;
                rowCount *= 2;
            }
        }
    }

    if (rowsToRemove.length === 0) {
        return;
    }

    const flashDuration = 300;
    let flashInterval = setInterval(() => {
        for (const row of rowsToRemove) {
            for (let i = 0; i < arena[0].length; ++i) {
                arena[row][i] = arena[row][i] === 2 ? 3 : 2;
            }
        }
    }, 50);

    setTimeout(() => {
        clearInterval(flashInterval);
        for (const row of rowsToRemove) {
            for (let i = 0; i < arena[0].length; ++i) {
                arena[row][i] = 0;
            }
        }
        
        for (let i = rowsToRemove.length - 1; i >= 0; --i) {
            const row = arena.splice(rowsToRemove[i], 1)[0].fill(0);
            arena.unshift(row);
        }
        
        console.log(rowsToRemove)
        
        LarikHilang.play();
    }, flashDuration);
}




function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && 
                (arena[y + o.y] && 
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function creatMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    // red
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    }
    // blue 
    else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } 
    // violet
    else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } 
    // lime
    else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } 
    //yellow // ffff00
    else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } 
    // orange
    else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } 
    // pink
    else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    
    }

}

function draw() {
    if (isPaused) return;
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    drawMatrix(arena, {x: 0,y: 0});
    drawMatrix(player.matrix, player.pos);

    // Tambahkan kode ini untuk menambahkan grid lines:
    context.strokeStyle = 'gray';
    context.lineWidth = 0.03;
    for (let i = 0; i <= canvas.width; i++) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();
    }
    for (let j = 0; j <= canvas.height; j++) {
        context.beginPath();
        context.moveTo(0, j);
        context.lineTo(canvas.width, j);
        context.stroke();
    }
}

function drawMatrix(matrix, offset) {
    context.strokeStyle = 'black';
    context.lineWidth = 0.05;
    
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y, 
                                 1, 1);
                context.strokeRect(x + offset.x,
                                   y + offset.y, 
                                   1, 1);
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerDrop() {
    if (isPaused) return;
    player.pos.y++;


    if (collide(arena, player)) {
        Notok.play();
        player.pos.y--;
        merge(arena, player);
        playerReset();       
        arenaSweep();
        updateScore();
        
    }
    dropCounter = 0;
}


function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function GameOver(){
    Kalah.play()
    document.querySelector(".Kalah").style.display = "block";
    Turun.stop();
    return playerDrop = function(){}
    
}



let pieces = 'TOLJISZ';
let nextPieces = [];

function playerReset() {
    if (nextPieces.length === 0) {
        for (let i = 0; i < 7; i++) {
            nextPieces.push(pieces[pieces.length * Math.random() | 0]);
        }
    }
    
    let currentPiece = nextPieces.shift();
    Nextpieces(nextPieces[0] || pieces[pieces.length * Math.random() | 0])
    
    
    player.matrix = createPiece(currentPiece);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        GameOver();
    }
    
    nextPieces.push(pieces[pieces.length * Math.random() | 0]);
}


const Nextpieces = bentuk => {
    const canvas = document.getElementById('Next');
    canvas.width = 60;
    canvas.height = 60;
    const context = canvas.getContext('2d');

    const piece = createPiece(bentuk);
    const colors = ['red', 'blue', 'violet', 'lime', '#ffff00', 'orange', 'pink'];

    if(bentuk == "T"){
        DrawPieces(piece, context, colors[0]);
    } else if(bentuk == "O"){
        DrawPieces(piece, context, colors[1]);
        
    } else if (bentuk == "L"){
        DrawPieces(piece, context, colors[2]);
        
    } else if(bentuk == "J"){
        DrawPieces(piece, context, colors[3]);
        
    } else if(bentuk == "I"){
        
        DrawPieces(piece, context, colors[4]);
    } else if(bentuk == "S"){
        DrawPieces(piece, context, colors[5]);
        
    } else if(bentuk == "Z"){
        DrawPieces(piece, context, colors[6]);

    }

    
}


function DrawPieces(matrix, context, color) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] !== 0) {
                context.fillStyle = color;
                context.fillRect(col * 15, row * 15, 15, 15);
                context.strokeStyle = 'black';
                context.lineWidth = 1.24;
                context.strokeRect(col * 15, row * 15, 15, 15);
            }
        }
    }
}


function playerRotate(dir) {
    let distance = 1;
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            player.pos.x = pos > arena[0].length / 2 ? pos - 2 : pos + 1;
            player.pos.y -= distance;
            return;
        }
    }
}




function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

tombolKanan.addEventListener("click", fKanan);
tombolKiri.addEventListener("click", fKiri);
Rotasi.addEventListener("click", fAtas);
tombolBawah.addEventListener("click", fBawah);

let Pausee = document.querySelector(".bi-pause-circle-fill");
let Playy = document.querySelector(".bi-play-circle-fill");
let buttonPausetoPlay = document.querySelector(".playe");




let timer;

document.addEventListener('keydown', (event) => {
    if (isPaused) return;
    if (event.keyCode === 37 || event.keyCode === 65) {
        playerMove(-1); KiriKananBawah.play();
    } else if (event.keyCode === 39 || event.keyCode == 68) {
        playerMove(1); KiriKananBawah.play();
    } else if (event.keyCode === 40 || event.keyCode == 83) {
        playerDrop(); KiriKananBawah.play();
    } else if (event.keyCode === 81 || event.keyCode === 32) {
    if (timer) {
    return;
    }
        timer = setTimeout(() => {
        timer = null;
    }, 1000);
        event.keyCode === 81 ? playerRotate(-1) : playerRotate(1);
        Muter.play();
    }
    });

    document.addEventListener('keyup', () => {
    clearTimeout(timer);
    timer = null;
});

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
let isPaused = false;

buttonPausetoPlay.addEventListener("click", ()=>{
    if(isPaused){
        isPaused = false;
        buttonPausetoPlay.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`
    } else{
        isPaused = true;
        buttonPausetoPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`

    }
})

function update(time = 0) {
    if (isPaused) {
        requestAnimationFrame(update);
        document.querySelector(".Pauses").style.display = "block";
        return;
    } else {
        document.querySelector(".Pauses").style.display = "none";

    }

    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
        Turun.play();
    }

    draw();
    requestAnimationFrame(update);
}

document.addEventListener("keydown", event => {
    
    if (event.keyCode === 80) {
        isPaused = !isPaused;

    }

});

// <i class="bi bi-play-circle-fill"></i>





const CekScore = (s)=>{
    if (s >= 900) {
        dropInterval = 900;
    } else if(s >= 1800){
        dropInterval = 800;
        
    } else if(s >= 2700){
        dropInterval = 700;
        
    } else if(s >= 3600){
        dropInterval = 600;

    } else if(s >= 4500){
        dropInterval = 500;

    }else if(s >= 5400){
        dropInterval = 400;

    }else if(s >= 6300){
        dropInterval = 300;

    }else if(s >= 7200){
        dropInterval = 200;

    }else if(s >= 8100){
        dropInterval = 100;

    }
}
function updateScore() {
    // CekScore(player.score);
    document.getElementById('score').innerText = player.score;

    if (!localStorage.getItem("Best2")) {
        localStorage.setItem("Best2", "0");
    } else {
        document.getElementById("Best_Score").innerText = localStorage.getItem("Best2");
    }

    let bestScore = parseInt(localStorage.getItem("Best2"));
    if (player.score !== null) {
        if (player.score > bestScore) {
            localStorage.setItem("Best2", player.score.toString());
        }
    } else {
        localStorage.setItem("Best2", "0");
    }
}


const colors = [
    null, 
    'red',
    'blue',
    'violet',
    'lime',
    '#ffff00',
    'orange',
    'pink',
];

const arena = creatMatrix(12, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
}


function fKanan(){
    if (isPaused) return;
    if(event) {
        playerMove(1); 
        KiriKananBawah.play();
        

    }
}
function fKiri(){
    if (isPaused) return;
    if(event) {
        playerMove(-1); 
        KiriKananBawah.play();
    }
}
function fAtas(){
    if (isPaused) return;
    if(event) {
        playerRotate(-1); 
        Muter.play();
    }
    
}
function fBawah(){
    if (isPaused) return;
    if(event) {
        playerDrop(); KiriKananBawah.play();
        
        
    }
}




setInterval(function(){
    updateScore();

}, 10)
playerReset();
updateScore();
update();





// musik program
var musik = new Audio();
musik.src="Tetris Backsound.mp3"
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
    