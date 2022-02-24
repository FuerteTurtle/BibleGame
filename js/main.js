class Datum {
    constructor(quote = "", isBible = null, source = "", context = "") {
        this.quote = quote;
        this.isBible = isBible;
        this.source = source;
        this.context = context;
    }
}
$(window).ready(httpGetAsync(myURL, parseText));

const interpret = XState.interpret;
const createMachine = XState.createMachine;

const gameMachine = createMachine({
    id: 'game',
    initial: 'front',
    states: {
        front: {
            on: {
                CHOICE: { target: 'back', actions: ['updateBack', 'flipCard'] }
            }
        },
        back: {
            on: {
                NEXT: { target: 'front', actions: ['updateFront', 'flipCard'] },
                END: 'end'
            }
        },
        end: { on: { RESTART: 'front' } }
    }
},
    {
        actions: {
            updateBack: (context, event) => {
                if (event.choice == currentCard.isBible) {
                    // display right back
                    $(".card-back").removeClass("back-incorrect");
                    $(".card-back").addClass("back-correct");
                    $("#back-title").html("CORRECT");
                    $("#source").html(currentCard.source);
                    $("#context").html(currentCard.context);
                }
                else {
                    // display wrong back
                    $(".card-back").removeClass("back-correct");
                    $(".card-back").addClass("back-incorrect");
                    $("#back-title").html("WRONG");
                    $("#source").html(currentCard.source);
                    $("#context").html(currentCard.context);
                }
            },
            flipCard: () => {
                if ($("#card-wrapper").hasClass("flip")) {
                    $("#card-wrapper").removeClass("flip");
                }
                else {
                    $("#card-wrapper").addClass("flip");
                }
            },
            updateFront: (context, event) => {
                currentCard = event.myShuffledCards.next().value;
                if(currentCard == undefined){
                    console.log("end of game");
                }
                $(".card-front").html(currentCard.quote);
            },
        }
    });
const gameService = interpret(gameMachine);
let shuffledCards = [];
let currentCard = {};

function playGame(dataArray) {
    shuffledCards = shuffle(dataArray);
    gameService.start();
    currentCard = shuffledCards.next().value;
    $(".card-front").html(currentCard.quote);
    $(".blasphemy").click(choice(false, currentCard));
    $(".bible").click(choice(true, currentCard));
    $(".card-back").click(next(shuffledCards));
}

function choice(isCurrBible) {
    return function (e) {
        gameService.send("CHOICE", { choice: isCurrBible});
    }
}

function next(myShuffledCards) {
    return function (e) {
        gameService.send("NEXT", { myShuffledCards: myShuffledCards })
    }

}

function* shuffle(array) {
    var i = array.length;
    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }
}
