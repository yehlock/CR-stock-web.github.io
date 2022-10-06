"use strict"
import * as path from "./path.mjs"

let search = true;
$("#input_symbol").on("keypress",e=>{
    if (e.key === "Enter" && search == true) {
        e.preventDefault();
        $("#btnSearch").click();
        $("#input_symbol").val("");
}});


let getData = () => {
    $("#btnSearch").prop({disabled:true});
    search = false
    let symbol = $("#input_symbol").val();
    let resquest = {symbol:symbol}
    $("#h1").text("Loading")
    let data = sessionStorage.getItem(symbol)
    data = JSON.stringify(data)
    console.log(data);
    if(data == "null"){
        console.log("fromServer");
        $.ajax({
            type:"POST",
            url:path.serverProfileURL,
            success:()=>{console.log("success");},
            data:JSON.stringify(resquest),
            contentType:'application/json'
        }).done(res => {
            let json = JSON.parse(res)
            console.log(json)
            $("#h1").text(json.name + " " + json.symbol)
            sessionStorage.setItem(json.symbol,res)
            setValue(json.symbol,json.data)
        })
        .fail(()=>$("#h1").text("Fail"))
        .always(()=>{
            $("#btnSearch").prop({disabled:false})
            search = true
        })
    }else{
        let json = JSON.parse(data);
        json = JSON.parse(json);
        console.log("from session storge");
        $("#h1").text(json.name + " " + json.symbol);
        setValue(json.symbol,json.data);
        $("#btnSearch").prop({disabled:false})
        search = true
    }  
}

let setValue = (symbol,data) => {
    $(".info").text("-");
    //debugger
    if(data!=null)
    {
        $("#symbol").text(symbol);
        $("#belongingGroup").text(data.belongingGroup);
        $("#chairman").text(data.chairman);
        $("#president").text(data.president);
        $("#estDate").text(new Date(data.estDate).toLocaleDateString('zh-TW'));
        $("#listedDate").text(new Date(data.listedDate).toLocaleDateString('zh-TW'));
        $("#shareCapital").text(data.shareCapital.toLocaleString('zh-TW'));
        $("#outstandingShare").text(data.outstandingShare.toLocaleString('zh-TW'));
        $("#marketValue").text(data.marketValue.toLocaleString('zh-TW'));
        $("#cnptHdgShare").text(data.cnptHdgShare+"%");
        $("#spokesperson").text(data.spokesperson);
        $("#actingSpokesperson").text(data.actingSpokesperson);
        $("#tel").text(formatPhone(data.tel));
        $("#fax").text(formatPhone(data.fax));
        $("#website").attr("href",data.website).text(data.website);
        $("#email").text(data.email);
        $("#agent").text(data.agent);
        $("#accounting").text(data.accounting);
        $("#address").text(data.address);
        $("#market").text("上市");
        $("#intro").text(data.intro);
    }
}
    
let formatPhone = (num) =>{
    let numStr = num.toString();
    let dict = numStr.charAt(0);
    let centreLen = 3;
    let centre = "";
    let last = "";
    for(let i=4;i>0;i--)
    {
        last += numStr.charAt(numStr.length-i);
    }
    if(numStr.length>8) centreLen = 4
    for(let i=4+centreLen;i>4;i--){
        centre += numStr.charAt(numStr.length-i);
    }
    return "(0" + dict + ")" + centre +"-" + last;
}


$("#btnSearch").on("click", getData);
$("#btnIndex").on("click", () => window.location.href = path.indexURL)

