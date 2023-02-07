

if(!'speechSynthesis' in window){
  alert("Maaf Fitur Ini Tidak suport di Browsermu!!");
}
// lambaiKiri
// lambaiKanan
// idle
const A_LambaiKanan = document.querySelector(".tanganKanan"),
A_LambaiKiri = document.querySelector(".tanganKiri"),
A_Idle = document.querySelector(".robot");




// A_LambaiKanan.classList.add("lambaiKanan");

// A_Idle.classList.remove("lambaiKanan");

// A_LambaiKiri.classList.add("lambaiKiri");

// A_Idle.classList.remove("lambaiKiri");

A_Idle.classList.add("idle");

// A_Idle.classList.remove("idle");



// Menggunakan fungsi untuk memutar teks
// speak("Halo, ini adalah contoh teks yang akan diubah menjadi suara menggunakan Responsive Voice API.");


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


if (!'speechSynthesis' in window) {
  alert("Browsermu tidak suport dengan fitur yang ada, Mohon cari brawser lain atau mungkin Browsermu perlu di Update.")
} 
if(!"SpeechRecognition" in window){
  alert("Browsermu tidak suport dengan fitur yang ada, Mohon cari brawser lain atau mungkin Browsermu perlu di Update.")
}
if(!"SpeechRecognition" in window && 'speechSynthesis' in window){
  alert("Browsermu tidak suport dengan fitur yang ada, Mohon cari brawser lain atau mungkin Browsermu perlu di Update.")
}
// mengatur mode kontinyu dan batas waktu 3 detik
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.timeout = 3000;

// mengatur bahasa menjadi Indonesia
recognition.lang = "id-ID";


let mathRegex = /\d+([+-/*]\d+),./;
const Bicara = (kata)=>{

const utterance = new SpeechSynthesisUtterance(kata);
const synth = window.speechSynthesis;
utterance.lang = 'id';
synth.speak(utterance);
if(kata){
  console.log("Kata = True")
} else if(kata == ""){
  console.log("Kata = False")

}

}

// Download Youtube
let downloadYT = document.querySelector(".download-yt");
downloadYT.addEventListener("click", KirimDataKeServer)
function KirimDataKeServer(){
let link = document.querySelector(".link").value,
format = document.querySelector('input[name="format"]:checked').value;
Download(link, format);

}


const OpenAI = (cari)=>{
fetch('https://admin11.pythonanywhere.com/gpt3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: cari.toLowerCase() })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        Bicara(data);
      })
      .catch(error => {
        console.error(error);
      });
}
Bicara("Halo, Perkenalkan nama saya PJ. Ada yang bisa saya bantu?.");
let mic = document.querySelector(".bi");
let leher = document.querySelector(".leher")
recognition.addEventListener('end', ()=>{
leher.innerHTML = `<i class="bi bi-mic-mute-fill"></i>`

})

mic.addEventListener("click", ()=> {
  recognition.start();
  leher.innerHTML = `<i class="bi bi-mic-fill"></i>`
})

const TanyaJawab = (text)=>{

text = text.replace(".", "");
console.log(text);
if (text.toLowerCase() == "buka kalender"){
    // membuka kalender
    window.open("https://calendar.google.com/");
    

    // membuat objek SpeechSynthesis
    

    // mengubah teks menjadi suara dengan logat bahasa Indonesia
    // speech.lang = "id";
    // speech.text = "Kalender telah dibuka";

    // // memainkan suara
    // speechSynthesis.speak(speech);
   
    Bicara("Kalender telah dibuka");

  }
  else if (text.toLowerCase().includes("hitung") || text.toLowerCase().includes("itung")) {
    console.log("hitung")
    // get the calculation command from the recognized text
    let command = text.toLowerCase().replace("hitung", "").trim();


    
    if (command.includes("logaritma")) {
      // Hapus kata "logaritma" dari string ekspresi matematika
      command = command.replace("logaritma", "").trim();
      command = command.toLowerCase().replace(",", "").trim();
                    // Memisahkan input menjadi array kata
      let arrayKata = command.split(" ");
      let log_1 = arrayKata[0];
      let log_2 = arrayKata[2];
      if(log_1 && log_2){
        let result = Math.log(log_2) / Math.log(log_1);
        console.log("[+]" + result);

        // speech.lang = "id";
        // speech.text = "Hasil perhitungan adalah " + result;
        
        // // play the speech
        // speechSynthesis.speak(speech);
       
        Bicara("Hasil perhitungan adalah " + result);
        
        document.getElementById("result").innerText = result;
      }



      // Evaluasi ekspresi matematika menggunakan fungsi eval() dan Math.log()
      let result = Math.log(eval(command));

      // console.log(result);
      // // Tampilkan hasil perhitungan logaritma
      // speech.lang = "id";
      // speech.text = "Hasil perhitungan adalah " + result;

     
      Bicara("Hasil perhitungan adalah " + result);

      
      // play the speech
      // speechSynthesis.speak(speech);
      document.getElementById("result").innerText = result;
      
      // display the calculation result in text
  }
    // try to evaluate the calculation command
      // evaluate the calculation command
      let result = eval(command);
      
      // create a SpeechSynthesis object
      
      // // convert the text to speech using Indonesian accent
      // speech.lang = "id";
      // speech.text = "Hasil perhitungan adalah " + result;
      
      // // play the speech
      // speechSynthesis.speak(speech);
     
      Bicara("Hasil perhitungan adalah " + result);
      
      document.getElementById("result").innerText = result;
      // display the calculation result in text
    }
  else if (text.toLowerCase() == "putar lagu dari youtube") {
    // ask the user for the song title using speech recognition
    let hasil = prompt ("Masukkan judul lagu yang ingin Anda putar:");
    hasil.replace("https://youtu.be/", "").trim()

    // get the song title from the user's speech
    let songTitle = hasil;
    
    // create an iframe element
    let iframeElement = document.createElement("iframe");
    
    // set the iframe's source to the YouTube video's URL with the song title
    iframeElement.setAttribute("src", "https://youtu.be/" + songTitle);
    
    // add the iframe to the page
    document.body.appendChild(iframeElement);
    
    // create a SpeechSynthesis objec
    
    // convert the text to speech using Indonesian accent
    // speech.lang = "id";
    // speech.text = "Lagu dari YouTube sedang diputar";
    
    // // play the speech
    // speechSynthesis.speak(speech);
   
    Bicara("Lagu dari YouTube sedang diputar");
    
    // display a message indicating that the YouTube song is playing
    // document.getElementById("result").innerText = "Lagu dari YouTube sedang diputar";
  } 
  else if (text.toLowerCase() == "jam" || text.toLowerCase() == "waktu") {
    // get the current time
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    
    // create a SpeechSynthesis objec
    
    // convert the text to speech using Indonesian accent
    // speech.lang = "id";
    // speech.text = "Sekarang jam " + hours + ":" + minutes;
   if(minutes == 30){
    Bicara("Sekarang Pukul Setengah " + (hours+1));
   } else if(minutes == 15){
    Bicara("Sekarang Pukul " + hours + " Lebih Seper Empat");
   } else if(minutes == 45){
    Bicara("Sekarang Pukul " + (hours+1) + " Kurang Seper Empat");
   }
    else if(minutes > 00){
     Bicara("Sekarang Pukul " + hours + "lebih" + minutes + "menit, waktu Indonesia Barat.");

   }
    // play the speech
    // speechSynthesis.speak(speech);
    
    
    // display the current time in text
    if(hours < 10){
      document.querySelector(".hasilJam").innerText = "0"+hours + ":" + minutes;
      
    } 
    else if(minutes < 10){
      document.querySelector(".hasilJam").innerText = hours + ":" +"0"+ minutes;
      
    } else if(hours < 10 && minutes < 10){
      document.querySelector(".hasilJam").innerText = "0"+hours + ":" +"0"+ minutes;
      
    }
    else{
      
      document.querySelector(".hasilJam").innerText = hours + ":" + minutes;
    }
  
    document.querySelector(".jawaban").style.display = "block";
    
    setTimeout(()=>{
      document.querySelector(".jawaban").style.display = "none";

    }, 15000);
  } else if(text.toLowerCase().includes("lambai") || text.toLowerCase().includes("lambaikan tangan")){
    A_LambaiKanan.classList.add("lambaiKanan");
    A_LambaiKiri.classList.add("lambaiKiri");
    A_Idle.classList.remove("idle");

    Bicara("Ok, siap")
    setTimeout(()=>{
      A_LambaiKanan.classList.remove("lambaiKanan");
      A_LambaiKiri.classList.remove("lambaiKiri");
      A_Idle.classList.add("idle");
    }, 6000)

  }else if(text.toLowerCase().includes("trimakasih") || text.toLowerCase().includes("trima kasih") || text.toLowerCase().includes("terima kasih") || text.toLowerCase().includes("terimakasih")){
    Bicara("Trimakasih kembali, jangan ragu untuk bertanya lagi !!.");
  } else if(text.toLowerCase().includes("namamu") || text.toLowerCase().includes("nama mu") || text.toLowerCase().includes("nama kamu") || text.toLowerCase().includes("namakamu")){
    Bicara("Nama saya PJ. senang bisa mengenalimu, ada yang bisa saya bantu?.");
  }else if (text.toLowerCase().includes("kan") && !text.toLowerCase().includes("kedipkan") || text.toLowerCase().includes("kah")){
    OpenAI(text)
  } 
  // else if(text.toLowerCase().includes("unduh dari youtube")){
  //       Bicara("Silahkan Masukkan Link Youtube di colom yang sudah di sediakan dan pilih formatnya.");
  //       document.querySelector(".link-tombol").style.display = "block";
  //       document.querySelector("#DownloadYT").style.display = "block";
  // }
  else if(text.toLowerCase().includes("lihat tulisan")){
    Bicara("Silahkan klik layar kamera atau klik tombol space")
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const constraints = {
          video: { facingMode: "environment" }
        };
        
        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
              video.play();
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            };
            document.body.appendChild(video);
          })
          .catch(err => {
            console.error(err);
          });
        
        function takePicture() {
          ctx.drawImage(video, 0, 0);
          const image = canvas.toDataURL("image/png");
          processImage(image);
        }
        
        video.addEventListener("click", takePicture);
        document.addEventListener('keydown', function(event) {
          if (event.code === 'Space') {
            takePicture()
          }
        });
        
        function processImage(image) {
          Tesseract.recognize(
              image,
              'ind',
              { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
              const sentences = text.split(". ");
              const filteredSentences = sentences.filter(sentence => sentence.length > 1);
              const recognizedText = filteredSentences.join(". ");
              if (recognizedText) {
                console.log(recognizedText);
                Bicara(recognizedText);
              }
          })
        }
    
  }else{
          console.log("Bingung")
          Bicara("Saya tidak mengerti apa maksudmu, bisa di ulangi lagi?.");
          
      }

}



// Function
recognition.onresult = (event)=>{
   // mendapatkan teks yang dideteksi
let kata = event.results[0][0].transcript;
TanyaJawab(kata);
}

// Metode












  // download
   





// Traslate API
// const res = await fetch("https://libretranslate.com/translate", {
// 	method: "POST",
// 	body: JSON.stringify({
// 		q: "Hello!",
// 		source: "en",
// 		target: "es"
// 	}),
// 	headers: { "Content-Type": "application/json" }
// });

// console.log(await res.json());
