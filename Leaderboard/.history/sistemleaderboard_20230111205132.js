// var admin = new XMLHttpRequest();
// admin.open('GET', 'Scores.js', true);
// admin.onreadystatechange = function() {
//   if (admin.readyState === 4 && admin.status === 200) {
//     console.log(admin.responseText);
//   }
// };
// admin.send();

// membaca File & Tambahkan
var xhr = new XMLHttpRequest();
xhr.open('GET', 'Scores.js', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
};
xhr.send();


// // Memasukkan Score
// function bacaScoreSnake(){
//     const admin = new FileReader();
//     admin.readAsText(localStorage.getItem("Best"));
//     bacaFile();
// }
