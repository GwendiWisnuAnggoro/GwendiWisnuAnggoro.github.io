const sheetID = "1r2jRdE6NGe34rony-5twk7kHDUfUN5OtdieNVEp9anc";
const btn = document.getElementById("switch");
let btn_switch = true;
const task_box = document.querySelector(".task-box");
const Max_Value = 5;

function tampilkanTask(nomor, nama, score) {
    task_box.innerHTML += `
        <li class="task">
            <h1>${nomor}</h1>
            <p>${nama}</p>
            <p>${score} ♛</p>
        </li>
    `;
}

function fetchDataAndDisplay(codeName, codeScore, index) {
    new AmbilData(sheetID, codeName, (dataName) => {
        new AmbilData(sheetID, codeScore, (dataScore) => {
            let value_name = dataName[index].value;
            let value_score = dataScore[index].value;
            tampilkanTask(index + 1, value_name, value_score);
            if (task_box.querySelectorAll(".task").length === Max_Value) {
                btn.removeAttribute("disabled");
                btn.textContent = "Tetris"; // Ganti teks tombol
                btn.classList.remove("disabled");
            }
        });
    });
}

function updateDisplay(codeName, codeScore) {
    task_box.innerHTML = "";
    btn.setAttribute("disabled", "true"); // Menonaktifkan tombol
    btn.textContent = "Loading..."; // Ganti teks tombol
    btn.classList.add("disabled"); // Tambahkan kelas "disable"
    for (let i = 0; i < Max_Value; i++) {
        fetchDataAndDisplay(codeName, codeScore, i);
    }
}

function switchToTetrisView() {
    btn.textContent = "Tetris";
    updateDisplay("H", "I");
}

function switchToSnakeView() {
    btn.textContent = "Snake";
    updateDisplay("F", "G");
}

btn.addEventListener("click", () => {
    if (btn_switch) {
        switchToTetrisView();
    } else {
        switchToSnakeView();
    }
    btn_switch = !btn_switch;
});

// Inisialisasi konten awal
switchToSnakeView();
