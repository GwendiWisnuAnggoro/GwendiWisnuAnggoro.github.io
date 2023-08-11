class AmbilData {
  constructor(sheetId, nameRows, callback) {
    this.result = [];

    setTimeout(() => {
      this.GetData(sheetId.toString(), nameRows.toString(), callback);
    }, 500);
  }

  GetData(id, nama, callback) {
    const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq=SELECT%20${nama}`;
    fetch(url)
      .then((res) => res.text())
      .then((result) => {
        const json = JSON.parse(result.substr(47).slice(0, -2));
        const rows = json.table.rows;
        const data = [];

        rows.forEach((e, i) => {
          const dataObject = {
            value: e.c[0].v,
            rows: i + 1,
          };
          data.push(dataObject);
        });

        this.result = data;

        if (callback && typeof callback === 'function') {
          callback(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}




class EditValues {
  constructor(column, row, newValue) {
    this.edit(column, row, newValue);
  }

  async edit(column, row, value) {
    // Convert column letter to column index (A=1, B=2, etc.)
    var columnIndex = column.toUpperCase().charCodeAt(0) - 64;

    var url = "https://script.google.com/macros/s/AKfycbwsXz9OZLMjQ1Vy_CtTgJGW2zDUmjSir_TuZ0M2y9shSLwciQz7X4eX26tL1d5QXUbYWg/exec";

    var data = {
      column: columnIndex,
      row: parseInt(row),
      newValue: value
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'no-cors', // Change from 'no-cors' to 'cors'
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        console.log("Cell value updated!");
        console.log(response);
      } else {
        console.error("Error updating cell value:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating cell value:", error);
    }
  }
}

  