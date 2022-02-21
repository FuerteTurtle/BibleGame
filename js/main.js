class Datum {
    constructor(quote = "", isBible = null, source = "", context = "") {
        this.quote = quote;
        this.isBible = isBible;
        this.source = source;
        this.context = context;
    }
}
const SPREADSHEET_ID = "1H-ZamZf4-GGu1TV2e8sqlv_VtnA0sWaFh92j_naraqQ";
const SHEET_ID = 0;
const API_KEY = "AIzaSyD17uZ-RUn-vYdJfJqqFhJw-Oiibmtlffc";
let currentCardisBible = false;

let quote = `Do not think that I came to bring peace on earth.
             I did not come to bring peace but a sword.
             For I have come to ‘set a man against his father, a daughter against her mother,
             and a daughter-in-law against her mother-in-law’;
             and ‘a man’s enemies will be those of his own household.’
             He who loves father or mother more than Me is not worthy of Me.
             And he who loves son or daughter more than Me is not worthy of Me.`;
let myDatum = new Datum(quote,isBible=true,source="Matthew 10:34-37");
$(window).ready(updateCurrentCard(myDatum));

function updateCurrentCard(datum){
    $(".card-front").html(datum.quote);
    currentCardisBible = datum.isBible;
}