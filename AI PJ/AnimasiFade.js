// let el = document.querySelector(".hologram");
// let durasiAnimasiMasuk = 1000;
// let durasiAnimasiKeluar = 1000;




// setTimeout(()=>{
//     fadeIn(el, durasiAnimasiMasuk);
// }, 1000)

// setTimeout(()=>{
//     fadeOut(el, durasiAnimasiKeluar);
// }, 2000)
// // fadeOut(el, durasiAnimasiKeluar);
// // Menyembunyikan elemen dengan durasi animasi yang ditentukan
// function fadeOut(el, duration) {
//     var start = null;
//     el.style.opacity = 0.5;
  
//     function step(timestamp) {
//       if (!start) start = timestamp;
//       var progress = timestamp - start;
//       el.style.opacity = 1 - Math.min(progress / duration, 0.5);
//       if (progress < duration) {
//         requestAnimationFrame(step);
//       } else {
//         el.style.display = "none";
//       }
//     }
//     requestAnimationFrame(step);
//   }
  
//   // Menampilkan elemen dengan durasi animasi yang ditentukan
//   function fadeIn(el, duration, display) {
//     var start = null;
//     el.style.opacity = 0.5;
//     el.style.display = display || "block";
  
//     function step(timestamp) {
//       if (!start) start = timestamp;
//       var progress = timestamp - start;
//       el.style.opacity = Math.min(progress / duration, 0.5);
//       if (progress < duration) {
//         requestAnimationFrame(step);
//       }
//     }
//     requestAnimationFrame(step);
//   }
  