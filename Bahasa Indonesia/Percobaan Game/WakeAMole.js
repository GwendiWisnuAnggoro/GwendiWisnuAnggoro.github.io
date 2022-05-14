const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const Scoree = document.querySelector('.Skor')


let TanahSebelumnya;
let Rampung = false;
let Score = 0;

function RandomTanah(tanah){
    const t = Math.floor(Math.random() * tanah.length);
    const tRandom = tanah[t];
    if(tRandom == TanahSebelumnya){
        RandomTanah(tanah);
    }
    TanahSebelumnya = tRandom;

    return tRandom;
}

function RandomWaktuJedul(min,max){
    return Math.round(Math.random() * (max-min)+min);
}

function munculkanTikus(){
    const tRandom = RandomTanah(tanah);
    const wRandom = RandomWaktuJedul(300, 1000);
    tRandom.classList.add('muncul');
    setTimeout(() => {
        tRandom.classList.remove('muncul');
       if(!Rampung){
        munculkanTikus();
       }
    }, wRandom);
}

function Play(){
    munculkanTikus();
    setTimeout(() => {
        Rampung = true;
    }, 10000);
}


function Pukul() {
    Score++;
   Scoree.textContent = Score;
}


tikus.forEach(m => {
    m.addEventListener('click', function(){
        console.log(this);
    });
});