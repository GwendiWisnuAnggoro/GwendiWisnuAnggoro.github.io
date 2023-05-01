  let url = document.getElementById("url"),
  toogle_useImage = document.getElementById("useImage"),
  qrmode = document.getElementById("qrmode"),
  buatqr = document.getElementById("buatqr"),
  download = document.getElementById("download"),
  canvas = document.getElementById("canvas"),
  resize_logo = document.getElementById("size_logo"),
  select_images = document.getElementById("select_images"),
  select_gambar = document.getElementById("select_gambar"),
  input_color_1_qr = document.getElementById("input_color_1")
  input_color_2_qr = document.getElementById("input_color_2"),
  custem_color_qr = document.getElementById("custem_color_qr"),
  input_color_singgle = document.getElementById("input_color_singgle");

// QR code Generator
let generate = {
    width: 300,
    height: 300,
    type: "svg",
    data: "",
    image: "",
    dotsOptions: {
        color: "#000000",
        type: "square",
        gradient:{
          "type": "linear",
          "colorStops": [
            {
              "offset": 0,
              "color": "#000000"
            },
            {
              "offset": 1,
              "color": "#000000"              
            }
          ]
        }
      },
    backgroundOptions: {
        color: "rgb(255, 255, 255)",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0,
      imageSize : 0.4,
    }
};

generate.data = url.value
generate.image = ""


// Buat url
buatqr.addEventListener("click", ()=>{
  link = url.value

  // ambil value qr mode 
  let qr_mode = qrmode.value
  generate.dotsOptions.type = qr_mode

  if(link == ""){
    alert("Input tidak boleh kosong !!")
    generate.data = w
  }
  generate.data = link
  
  viewsQR()
})

// ambil url image user
select_gambar.addEventListener("change", ambil_img)

function ambil_img(){
  let imageFile = select_gambar.files[0]
  let img = new FileReader()
  
  img.onload = ()=>{
    generate.image = img.result
    localStorage.setItem("gambar", img.result)
    select_images.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 0 1 1 0V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.354 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V11h-1v3.293l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
    </svg>
    Ganti Logo
    `
    viewsQR()
  }
  
  if(imageFile){
    img.readAsDataURL(imageFile)
  } else {
    generate.image = null
    viewsQR()
  }
}


// toogle fungsi
toogle_useImage.addEventListener("change", function (){
  def = this.checked ? true : false
  img = def ? "block" : "none"
  select_images.style.display = img
  resize_logo.style.display = img
  if(!def){
    delete generate.image
    viewsQR()
  } else {
    generate.image = localStorage.getItem("gambar")
    viewsQR()
  }
})


// resize logo
resize_logo.addEventListener("input", ()=>{
  generate.imageOptions.imageSize = resize_logo.value / 100
  viewsQR()
})

// cek user keluar atau refrest halaman
this.addEventListener("beforeunload", ()=>{
  generate.image = localStorage.removeItem("gambar")
})


// toogle color costem 
custem_color_qr.addEventListener("change", function() {
  if(this.checked){
    document.querySelector(".custem_color_qr_").style.display = "block"
  } else {
    document.querySelector(".custem_color_qr_").style.display = "none"
  }
  
})

// toogle color gradiend 
document.getElementById("custem_gradient_qr").addEventListener("change", function (){
  if(this.checked){
    document.querySelector(".gradients").style.display = "flex"
    document.querySelector(".singgle").style.display = "none"
  } else {
    document.querySelector(".gradients").style.display = "none"
    document.querySelector(".singgle").style.display = "block"
  }
})

// Ubah Warna QR Gradient
document.querySelector(".color_1").style.background = input_color_1_qr.value = "#000000"
document.querySelector(".color_2").style.background = input_color_2_qr.value = "#000000"
input_color_1_qr.addEventListener("input", ()=>{
  document.querySelector(".color_1").style.background = input_color_1_qr.value
  generate.dotsOptions.gradient.colorStops[0].color = input_color_1_qr.value
  viewsQR()
})

input_color_2_qr.addEventListener("input", ()=>{
  document.querySelector(".color_2").style.background = input_color_2_qr.value
  generate.dotsOptions.gradient.colorStops[1].color = input_color_2_qr.value
  viewsQR()
})

// ubah warna qr singgle warna
document.querySelector(".color_singgle").style.background = input_color_singgle.value = "#000000"
input_color_singgle.addEventListener("input", ()=>{
  document.querySelector(".color_singgle").style.background = input_color_singgle.value
  generate.dotsOptions.gradient.colorStops[0].color = input_color_singgle.value
  generate.dotsOptions.gradient.colorStops[1].color = input_color_singgle.value
  viewsQR()
})

// tampilkan image
let GenerateQR

viewsQR()


function viewsQR(){
  GenerateQR = new QRCodeStyling(generate)
  canvas.innerHTML = ""
  GenerateQR.append(canvas)
}

// download qr
let calender = new Date(),
tanggal = calender.getDate(),
bulan = calender.getMonth() + 1,
tahun = calender.getFullYear() 
download.addEventListener("click", ()=>{
  GenerateQR.download({ name: `${tanggal}-${bulan}-${tahun}_${Math.random(0, 100)}`, extension: "png" });
})
