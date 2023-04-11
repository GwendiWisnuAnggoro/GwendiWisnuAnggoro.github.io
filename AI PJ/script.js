

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


const OpenAI = (cari) => {
  fetch('https://admin11.pythonanywhere.com/gpt3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: cari.toLowerCase() })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      Bicara(data);
    })
    .catch(error => {
      console.error(error);
      Bicara("Mohon Maaf server kami sepertinya sedang mengalami eror, silahkan mencoba lagi lain hari, Trimakasih");
    });
}


Bicara("Halo, Perkenalkan nama saya PJ. Ada yang bisa saya bantu?.");
let leher = document.querySelector(".leher")

recognition.addEventListener("end", ()=>{
  recognition.stop();
  leher.innerHTML = `<i class="bi bi-mic-mute-fill"></i>`;
  

})
leher.addEventListener("click", ()=>{
  recognition.start();
  leher.innerHTML = `<i class="bi bi-mic-fill"></i>`;

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
    let command = text.toLowerCase().replace("hitung", "").trim();

    if (command.includes("logaritma")) {
      command = command.replace("logaritma", "").trim();
      command = command.toLowerCase().replace(",", "").trim();
      
      let arrayKata = command.split(" ");
      
      let result = 0;
      let basis = 0;
      let argument = 0;
      let basisFound = false;
      
      for (let i = 0; i < arrayKata.length; i++) {
        if (arrayKata[i] === "logaritma") {
          if (i > 0 && !isNaN(parseFloat(arrayKata[i - 1]))) {
            basis = parseFloat(arrayKata[i - 1]);
            basisFound = true;
          }
          if (i < arrayKata.length - 1 && !isNaN(parseFloat(arrayKata[i + 1]))) {
            argument = parseFloat(arrayKata[i + 1]);
          }
          if (basisFound && basis !== 1 && argument > 0) {
            result += Math.log(argument) / Math.log(basis);
            basisFound = false;
          }
        } else if (!isNaN(parseFloat(arrayKata[i]))) {
          result += parseFloat(arrayKata[i]);
        } else if (arrayKata[i] === "dikali") {
          if (i < arrayKata.length - 1 && !isNaN(parseFloat(arrayKata[i + 1]))) {
            result *= parseFloat(arrayKata[i + 1]);
          }
        } else if (arrayKata[i] === "kali") {
          if (i < arrayKata.length - 1 && !isNaN(parseFloat(arrayKata[i + 1]))) {
            result *= parseFloat(arrayKata[i + 1]);
          }
        } else if (arrayKata[i] === "*") {
          if (i < arrayKata.length - 1 && !isNaN(parseFloat(arrayKata[i + 1]))) {
            result *= parseFloat(arrayKata[i + 1]);
          }
        }
      }
      
      console.log("[+]" + result);
      Bicara("Hasil perhitungan adalah " + result);
      
    } else {
      let result = 0;
      
      if (command.includes("dikali") || command.includes("kali") || command.includes("*")) {
        result = 1;
      }
      
      let arrayKata = command.split(" ");
      
      for (let i = 0; i < arrayKata.length; i++) {
        if (!isNaN(parseFloat(arrayKata[i]))) {
          if (i === 0) {
            result = parseFloat(arrayKata[i]);
          } else if (arrayKata[i - 1] === "ditambah") {
            result += parseFloat(arrayKata[i]);
          } else if (arrayKata[i - 1] === "+") {
            result += parseFloat(arrayKata[i]);
          } else if (arrayKata[i - 1] === "dikurang") {
            result -= parseFloat(arrayKata[i]);
          } else if (arrayKata[i - 1] === "-") {
            result -= parseFloat(arrayKata[i]);
          }  else if (arrayKata[i - 1] === "dibagi") {
            result /= parseFloat(arrayKata[i]);
          } else if (arrayKata[i - 1] === "/") {
            result /= parseFloat(arrayKata[i]);
          } else if (arrayKata[i - 1] === "dikali") {
            result *= parseFloat(arrayKata[i]);
          } else if (arrayKata[i - 1] === "kali") {
            result = parseFloat(arrayKata[i]);
          } else if (arrayKata[i - 1] === "") {
            result *= parseFloat(arrayKata[i]);
          }
        }
      }
      console.log("[+]" + result);
      Bicara("Hasil perhitungan adalah " + result);
    }
  }
  else if (text.toLowerCase() == "jam" || text.toLowerCase() == "waktu") {
    let waktu = new Date();
    let jam = waktu.getHours();
    let menit = waktu.getMinutes();

   if(menit == 30){
    Bicara("Sekarang Pukul Setengah " + (jam+1));
   } else if(menit == 15){
    Bicara("Sekarang Pukul " + jam + " Lebih Seper Empat");
   } else if(menit == 45){
    Bicara("Sekarang Pukul " + (jam+1) + " Kurang Seper Empat");
   }
    else if(menit > 00){
     Bicara("Sekarang Pukul " + jam + "lebih" + menit + "menit, waktu Indonesia Barat.");

   }
    
    if(jam < 10){
      document.querySelector(".hasilJam").innerText = "0"+jam + ":" + menit;
      
    } 
    else if(menit < 10){
      document.querySelector(".hasilJam").innerText = jam + ":" +"0"+ menit;
      
    } else if(jam < 10 && menit < 10){
      document.querySelector(".hasilJam").innerText = "0"+jam + ":" +"0"+ menit;
      
    }
    else{
      
      document.querySelector(".hasilJam").innerText = jam + ":" + menit;
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
  else if(text.toLowerCase().includes("lihat tulisan")){
    Bicara("Silahkan klik layar kamera atau klik tombol space untuk saya melihat gambar");

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
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL("image/png");
      processImage(image);
      Bicara("Mendeteksi tulisan mohon tunggu")
    }
    
    video.addEventListener("click", takePicture);
    
    document.addEventListener('keydown', function(event) {
      if (event.code === 'Space') {
        takePicture();
      }
    });
    
    function processImage(image) {
      // Pra-pemrosesan gambar
      const img = new Image();
      img.src = image;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const threshold = 127;
        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          const newValue = v < threshold ? 0 : 255;
          imageData.data[i] = newValue;
          imageData.data[i + 1] = newValue;
          imageData.data[i + 2] = newValue;
        }
        ctx.putImageData(imageData, 0, 0);
        const processedImage = canvas.toDataURL("image/png");
        // Menggunakan Tesseract.js untuk mengenali tulisan
        Tesseract.recognize(processedImage, 'ind')
          .then(({ data: { text } }) => {
            // Post-processing pada hasil OCR
            const sentences = text.split(". ");
            const filteredSentences = sentences.filter(sentence => sentence.length > 1);
            const recognizedText = filteredSentences.join(". ");
            if (recognizedText) {
              console.log(recognizedText);
              Bicara("Tulisan yang saya baca adalah "+ recognizedText.toString());
            }
          });
      };
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
