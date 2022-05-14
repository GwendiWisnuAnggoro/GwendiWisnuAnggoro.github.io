const canvas = document.getElementById("tetris");
const ctx = canvas.getContext('2d');

const scale = 20;


ctx.scale(20, 20);

const tWidth = canvas.width / scale;
const tHeight = canvas.height / scale;

const pieces = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [2, 2],
        [2, 2],
    ],
    [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 1],
    ],
    [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0],
    ],
    [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
    ],
    [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
    ],
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
    ],
];

const colors = [null, 'red', 'blue', 'lime', 'yellow', 'pink', 'orange', 'violet'];

const arena = [];

let rand;

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    color: null
}

rand = Math.floor(Math.random() * pieces.length);
player.matrix = pieces[rand];
player.color = colors[rand+1];

function drawMatrix(matrix, x, y) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j])
            ctx.fillRect(x + j, y + i, 1, 1);
        }
    }
}


function rotateMatrix(matrix, dir){
    let newMatrix = [];

    for (let i in matrix)
    newMatrix.push([]);

    if (dir === 1) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[1].length; j++) {
                newMatrix[j][matrix.length -  i - 1] = matrix[i][j];
            }
        }
    }else {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[1].length; j++) {
                newMatrix[matrix.length - j - 1][i] = matrix[1][j];
                
            }
        }

    }

    return newMatrix;
}

function collides(player, arena) {
    for (let i = 0; i < player.matrix.length; i++) {
        for(let j = 0; j < player.matrix[i].length; j++) {
            if (player.matrix[i][j] && arena[player.pos.y + i + 1][player.pos.x + j + 1])
            return 1;
        }
    }

    return 0;
}


function mergeArena(matrix, x, y){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            arena[y+i+1][x+j+1] = arena[y+i+1][x+j+1] || matrix[i][j];

        }
    }
}

function clearBlocks() {
    for (let i = 1; i < arena.length-2; i++) {
        let clear = 1;

        for (let j = 1; j < arena[i].length-1; j++) {
            if (!arena[i][j])
            clear = 0;
        }

        if (clear) {
            let r = new Array(tWidth).fill(0);
            r.push(1);
            r.unshift(1);

            arena.splice(i, 1);
            arena.splice(1, 0, r);
        }
    }
}

function drawArena(){
    for(let i= 1; i < arena.length-2; i++) {
        for(let j = 1; j < arena[i].length-1; j++) {
            if (arena[i][j]){
            ctx.fillStyle = colors[arena[i][j]];
            ctx.fillRect(j-1, i-1, 1, 1);
            }
        }
    
    }    
}


function initArena() {
    const r = new Array(tWidth + 2).fill(1);
    arena.push(r);

    for (let i = 0; i < tHeight; i++) {
        let row = new Array(tWidth).fill(0);
        row.push(1);
        row.unshift(1);

        arena.push(row);
    }

    arena.push(r);
    arena.push(r);
}

let interval = 1000;
let LastTime = 0;
let count = 0;

function update(time = 0) {

    const dt = time - LastTime;
    LastTime = time;
    count += dt;


    if (count >= interval) {
        player.pos.y++;
        count = 0;
    }

    if (collides(player, arena)){
        mergeArena(player.matrix, player.pos.x, player.pos.y-1);
        clearBlocks();

        player.pos.y = 0;
        player.pos.x = 0;

        rand = Math.floor(Math.random() * pieces.length);
        player.matrix = pieces[rand];
        player.color = colors[rand+1];

        interval = 1000;
    }

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawArena();
    ctx.fillStyle =player.color;
    drawMatrix(player.matrix, player.pos.x, player.pos.y);

    requestAnimationFrame(update);
}

document.body.addEventListener('keydown', event => {
    if(event.keyCode === 37 || event.keyCode == 65) {
        player.pos.x--;
        if (collides(player, arena))
        player.pos.x++;
    } else if(event.keyCode === 39 || event.keyCode == 68) {
        player.pos.x++;
        if (collides(player, arena))
        player.pos.x--;
    } else if(event.keyCode == 40 || event.keyCode == 83) {
        player.pos.y++;
        count = 0;
    } else if (event.keyCode === 81) {
        player.matrix = rotateMatrix(player.matrix, 1);
        if (collides(player, arena))
        player.matrix = rotateMatrix(player.matrix, -1);
    }else if (event.keyCode === 32) {
        interval = 1;
    }
});


initArena();
update();