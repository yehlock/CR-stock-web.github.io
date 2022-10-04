import * as path from "./path.mjs"

const column = ["年度/月份", "當月營收", "月增率", "去年同期營收", "年增率", "當月累計營收", "去年累計營收", "年增率"]
let input = document.getElementById("input_symbol");
var response;

input.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btnSearch").click();
        input.value = "";
    }
})

document.getElementById("btnIndex").onclick=() =>{
    window.location.href = path.indexURL
}

document.getElementById("btnSearch").onclick = async function fet(symbol) {
    document.title = "Rev " + symbol
    try {
        document.getElementById("h1").textContent = "讀取中";
        document.getElementById("btnSearch").disabled = true;
        symbol = document.getElementById("input_symbol").value;
        console.log("symbol = " + symbol);
        document.title = "Rev " + symbol;

        let url = path.serverURL;

        const response = await getData(url,symbol);
        console.log(response);
        //let a = doucument.getElementById("h1");
        response.json().then(data => {
            //console.log(data);
            //console.log(typeof(data));
            var json;
            if(typeof(data)==typeof("String"))
                json = JSON.parse(data);
            else
                json = data;

            if (json["name"] != "")
                document.getElementById("h1").textContent = json["name"] + " " + json["symbol"];
            else
                document.getElementById("h1").textContent = "Something Error";

            createTable(json);
        });
    } catch(e) {
        document.getElementById("h1").textContent = "Server is Down";
        console.log(e);
    }
    document.getElementById("btnSearch").disabled = false;
}

function  getData(url,symbol){
    response =  fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: `{"symbol":"${symbol}"}`,
    });
    return response;
}

function createTable(data) {
    let oldTable = document.getElementById("table")
    if (oldTable != null)
        document.getElementById("table").remove();
    let table = document.createElement("table");
    let tr;

    // create title
    tr = document.createElement("tr");
    for (let cl in column) {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(column[cl]));
        tr.appendChild(th);
    }

    table.appendChild(tr);
    let list = data["data"]

    for (let i in list) {
        let td;
        tr = document.createElement("tr");
        for (let j in list[i]) {
            td = document.createElement("td")
            if (list[i][j] === null) td.appendChild(document.createTextNode("-"))
            else if (list[i]["mg"] == list[i][j] || list[i]["yg"] == list[i][j] || list[i]["tyg"] == list[i][j]) {
                td.appendChild(document.createTextNode(list[i][j].toFixed(2) + "%"))
            } else {
                td.appendChild(document.createTextNode(list[i][j].toLocaleString('en-US')))
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    //doucument.getElementById("loading").remove();
    document.body.appendChild(table).setAttribute("id", "table")
    table.setAttribute("border", "5")
    table.setAttribute("align", "center")
}