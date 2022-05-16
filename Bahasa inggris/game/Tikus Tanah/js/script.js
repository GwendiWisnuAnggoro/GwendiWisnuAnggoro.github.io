let TKPukul = new Audio();
TKPukul.src="../../mp3/Tikus Kena Pukul.mp3";
 

const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop'); 

let tanahSebelumnya;
let selesai;
let skor; 

function randomTanah(tanah) { 
    const t = Math.floor(Math.random() * tanah.length); 
    const tRandom = tanah[t]; 
    if (tRandom == tanahSebelumnya) { 
        randomTanah(tanah); 
    } 
    tanahSebelumnya = tRandom; 
    return tRandom;
} 
function randomWaktu(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
} 
function munculkanTikus() { 
    const tRandom = randomTanah(tanah); 
    const wRandom = randomWaktu(300, 1000); 
    tRandom.classList.add('muncul'); 
    
    setTimeout(() => { tRandom.classList.remove('muncul'); 
    if (!selesai) { munculkanTikus(); } }, wRandom);
} 
function mulai() { 
    selesai = false; 
    skor = 0; 
    papanSkor.textContent = 0; 
    munculkanTikus(); 
    setTimeout(() => { 
        selesai = true; 
    }, 10000);
} 
function pukul() { 
    skor++; 
    this.parentNode.classList.remove('muncul'); 
    TKPukul.play(); papanSkor.textContent = skor;
} 
    tikus.forEach(t => { 
        t.addEventListener('click', pukul);
    });

    // musik program
 var musik = new Audio();
 musik.src="../../mp3/Backsound Wake A Mole.mp3"
 musik.loop=true;
 musik.pause();
 
     function mulaiAudio(){
         var play=document.getElementById('play');
 
         play.addEventListener('click',fplay);
 
         function fplay(){
             if(musik.paused){
                 musik.play();
                 play.style.background="url(../img/PlaySong.png)";
             }else{
                 musik.pause();
                 play.style.background="url(../img/StopSong.png)";
             }
         }
     }
 
 window.addEventListener('load', mulaiAudio)
//  