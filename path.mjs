let indexURL;
let revenueURL;
let profileURL;
let serverRevenueURL;
let serverProfileURL;
//      local
if(window.location.href.includes("127.0.0.1")){
    console.log(window.location.href);
    indexURL = "http://127.0.0.1:5500/index.html";
    revenueURL = "http://127.0.0.1:5500/Revenue.html";
    profileURL = "http://127.0.0.1:5500/profile.html";
    serverRevenueURL = "https://localhost:7203/Revenue";
    serverProfileURL = "https://localhost:7203/Profile";
}
else{
    //     github
    console.log(window.location.href);
    indexURL = "https://yehlock.github.io/CR-stock-web.github.io/";
    revenueURL = "https://yehlock.github.io/CR-stock-web.github.io/Revenue";
    profileURL = "https://yehlock.github.io/CR-stock-web.github.io/profile";
    serverRevenueURL = "https://stocksserver20220929144022.azurewebsites.net/Revenue";
    serverProfileURL = "https://stocksserver20220929144022.azurewebsites.net/Profile";
}



export {indexURL, revenueURL, profileURL, serverRevenueURL, serverProfileURL}