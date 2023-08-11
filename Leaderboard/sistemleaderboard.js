const sheetID = "1r2jRdE6NGe34rony-5twk7kHDUfUN5OtdieNVEp9anc";
const btn = document.getElementById("switch");
let btn_switch = true;
const task_box = document.querySelector(".task-box");
const Max_Value = 5;

for(let i = 0; i < Max_Value; i++){
    new AmbilData(sheetID, "F", (data)=>{
        let value_name = data[i].value;
        new AmbilData(sheetID, "G", (data)=>{
            let value_score = data[i].value;
            task_box.innerHTML += `
            <li class="task">
                <h1>${i+1}</h1>
                <p>${value_name}</p>
                <p>${value_score} ♛</p>
            </li>
            `
        })
    })

}

btn.addEventListener("click", ()=>{
    if (btn_switch) {
        task_box.innerHTML = ""
        let code_name = "H";
        let code_score = "I";
        btn.textContent = "Tetris";
        
        for(let i = 0; i < Max_Value; i++){
            new AmbilData(sheetID, code_name, (data)=>{
                let value_name = data[i].value;
                new AmbilData(sheetID, code_score, (data)=>{
                    let value_score = data[i].value;
                    task_box.innerHTML += `
                    <li class="task">
                        <h1>${i+1}</h1>
                        <p>${value_name}</p>
                        <p>${value_score} ♛</p>
                    </li>
                    `
                })
            })

        }

    } else {
        task_box.innerHTML = ""
        let code_name = "F",
        code_score = "G"
        btn.textContent = "Snake";
        for(let i = 0; i < Max_Value; i++){
            new AmbilData(sheetID, code_name, (data)=>{
                let value_name = data[i].value;
                new AmbilData(sheetID, code_score, (data)=>{
                    let value_score = data[i].value;
                    task_box.innerHTML += `
                    <li class="task">
                        <h1>${i+1}</h1>
                        <p>${value_name}</p>
                        <p>${value_score} ♛</p>
                    </li>
                    `
                })
            })

        }
        
    }
      btn_switch = !btn_switch;
})