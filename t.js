input = document.getElementById("input_symbol")

        input.addEventListener("keypress",event =>{
            if(event.key==="Enter"){
                event.preventDefault();
                //doucument.body.appendChild(doucument.createElement("text").createTextNode("Loadiing").setAttribute("id","loading"));
                document.getElementById("button1").click();
                input.value = "";
            }
        })

        document.getElementById("button1").onclick = async function fet(symbol)
        {
            document.title = "Rev "+ symbol
            try{
                document.getElementById("h1").textContent = "讀取中";
                document.getElementById("button1").disabled = true;
                symbol = document.getElementById("input_symbol").value;
                //symbol = '2330'
                console.log("symbol = "+symbol);
                document.title = "Rev "+ symbol
                //url = "https://localhost:7203/Revenue";
                url = "https://stocksserver20220929144022.azurewebsites.net/Revenue"
                //console.log(symbol);
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: `{
                        "symbol":"${symbol}"
                        }
                        `,
                });

                response.json().then(data => {
                    //console.log("get response");
                    console.log(data);
                    var jsonStr = JSON.parse(data)
                    if(jsonStr["name"]!="")
                        document.getElementById("h1").textContent = jsonStr["name"] +" "+ jsonStr["symbol"];
                    else
                        document.getElementById("h1").textContent = "Something Error"
                        console.log(data["responseMessage"]); 
                    //console.log(typeof(jsonStr));
                    createTable(jsonStr);
                });

            }catch{
                document.getElementById("h1").textContent = "Server is Down"
                document.getElementById("button1").disabled = false;
            }
            //console.log(typeof(symbol.length));
            //if(!Object.keys(symbol).length === 0) symbol = "2330";
            
            column = ["年度/月份","當月營收","月增率","去年同期營收","年增率","當月累計營收","去年累計營收","年增率"]

            function createTable(data){
                oldTable = document.getElementById("table")
                if(oldTable != null)
                    document.getElementById("table").remove();
                let table = document.createElement("table");
                let tr; 

                // create title
                tr = document.createElement("tr");
                for(let cl in column){
                    let th = document.createElement("th");
                    th.appendChild(document.createTextNode(column[cl]));
                    tr.appendChild(th);
                }

                
                table.appendChild(tr);
                let list = data["data"]
                
                for(let i in list){
                    let td;
                    tr = document.createElement("tr");
                    for(j in list[i]){
                        td = document.createElement("td")
                        if(list[i][j] === null) td.appendChild(document.createTextNode("-"))
                        else if(list[i]["mg"] == list[i][j] || list[i]["yg"] == list[i][j] || list[i]["tyg"] == list[i][j]){
                            td.appendChild(document.createTextNode(list[i][j].toFixed(2)+"%"))
                        }else{
                            td.appendChild(document.createTextNode(list[i][j].toLocaleString('en-US')))
                        }
                        tr.appendChild(td);
                    }
                    table.appendChild(tr);
                }
                //doucument.getElementById("loading").remove();
                document.body.appendChild(table).setAttribute("id","table")
                table.setAttribute("border","5")
                table.setAttribute("align","center")
                document.getElementById("button1").disabled = false;
            }
        }