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
let quote = `Do not think that I came to bring peace on earth.
             I did not come to bring peace but a sword.
             For I have come to ‘set a man against his father, a daughter against her mother...;
             and ‘a man’s enemies will be those of his own household.’
             He who loves father or mother more than Me is not worthy of Me.
             And he who loves son or daughter more than Me is not worthy of Me.`;
let myDatum = new Datum(quote, isBible = true, source = "Matthew 10:34-37", context = "Jesus out here wildin'");
$(window).ready(updateCurrentCard(myDatum));
$(window).ready($(".blasphemy").click(checkAnswer(false, myDatum)));
$(window).ready($(".bible").click(checkAnswer(true, myDatum)));
function updateCurrentCard(datum) {
    $(".card-front").html(datum.quote);
    $("#source").html(datum.source);
    $("#context").html(datum.context);
    if (datum.isBible) {
        $("#explanation").html("This verse is in the bible");
    }
    else {
        $("#explanation").html("This isn't from the bible");
    }
}

function checkAnswer(isBibleChoice, datum) {
    return function (e) {
        if (isBibleChoice == datum.isBible) {
            flipCard(true, datum);
        }
        else {
            flipCard(false, datum);
        }
    }
}

function flipCard(myBool) {
    if (myBool) {
        console.log("correct choice, flipping card true");
        $(".card-back").removeClass("back-incorrect");
        $(".card-back").addClass("back-correct");
        $(".card-back>h1").html("CORRECT")
        $(".card-wrapper").addClass("flip");
    }
    else {
        console.log("incorrect choice, flipping card false");
        $(".card-back").removeClass("back-correct");
        $(".card-back").addClass("back-incorrect");
        $(".card-back>h1").html("WRONG")
        $(".card-wrapper").addClass("flip");
    }

}