const SPREADSHEET_ID = "1H-ZamZf4-GGu1TV2e8sqlv_VtnA0sWaFh92j_naraqQ";
const SHEET_ID = 1;
const API_KEY = "AIzaSyD17uZ-RUn-vYdJfJqqFhJw-Oiibmtlffc"
const RANGE = "A2:D"
const myURL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet${SHEET_ID}!${RANGE}?key=${API_KEY}`;
// const devURL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet${SHEET_ID}!${RANGE}?key=${PRIV_API_KEY}`

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

let dataArray = []

function parseText(e) {
    let response = JSON.parse(e);
    response.values.forEach(line => {
        dataArray.push(createDatum(line))
    });
    playGame(dataArray);
}

//parse helper functions

function checkIsBible(answer){
    if(answer == "Yes"){
        return true;
    }
    else return false;
}

function getContext(answer){
    if(answer == "%" || answer == ""){
        return ""
    }
    else{
        return answer;
    }
}

function createDatum(line){
    return new Datum(line[0],checkIsBible(line[1]),line[2],getContext(line[3]))
}
