const sheetID = "1r2jRdE6NGe34rony-5twk7kHDUfUN5OtdieNVEp9anc";
const btn = document.getElementById("switch");
let btn_switch = false;
const task_box = document.querySelector(".task-box");
const task_menu = document.querySelector(".task-menu");
const Max_Value = 5;
const TetrisTulisan = "Tetris";
const SnakeTulisan = "Snake";

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
                btn.textContent = btn_switch ? SnakeTulisan : TetrisTulisan;
                task_menu.textContent = `${btn_switch ? SnakeTulisan : TetrisTulisan} Value:`;
                btn.classList.remove("disabled");
            }
        });
    });
}

function updateDisplay(codeName, codeScore) {
    task_box.innerHTML = "";
    btn.setAttribute("disabled", "true");
    btn.textContent = "Loading...";
    task_menu.textContent = "Loading...";
    btn.classList.add("disabled");
    for (let i = 0; i < Max_Value; i++) {
        fetchDataAndDisplay(codeName, codeScore, i);
    }
}

function switchToTetrisView() {
    btn.textContent = TetrisTulisan;
    updateDisplay("H", "I");
}

function switchToSnakeView() {
    btn.textContent = SnakeTulisan;
    updateDisplay("F", "G");
}

btn.addEventListener("click", () => {
    btn_switch = !btn_switch;
    if (btn_switch) {
        switchToSnakeView();
    } else {
        switchToTetrisView();
    }
});

// Inisialisasi konten awal
if (btn_switch) {
    switchToSnakeView();
} else {
    switchToTetrisView();
}