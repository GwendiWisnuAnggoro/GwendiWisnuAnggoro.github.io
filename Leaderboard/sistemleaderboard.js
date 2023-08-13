const sheetID = "1r2jRdE6NGe34rony-5twk7kHDUfUN5OtdieNVEp9anc";
const btn = document.getElementById("switch");
const task_box = document.querySelector(".task-box");
const task_menu = document.querySelector(".task-menu");
const Max_Value = 5;
const gameTitles = {
    Tetris: "Tetris",
    Snake: "Snake"
};

let btn_switch = false;

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
                updateUI();
            }
        });
    });
}

function updateUI() {
    btn.removeAttribute("disabled");
    const currentGameTitle = btn_switch ? gameTitles.Snake : gameTitles.Tetris;
    btn.textContent = `Switch ${btn_switch ? gameTitles.Tetris :  gameTitles.Snake}`; // Change button text accordingly
    task_menu.textContent = `${currentGameTitle} Value:`;
    btn.classList.remove("disabled");
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

function switchGameView(codeName, codeScore) {
    btn_switch = !btn_switch;
    updateUI();
    updateDisplay(codeName, codeScore);
}

btn.addEventListener("click", () => {
    if (btn_switch) {
        switchGameView("H", "I"); // Switch to Snake
    } else {
        switchGameView("F", "G"); // Switch to Tetris
    }
});

// Initial content setup
switchGameView("F", "G"); // Start with Snake game
