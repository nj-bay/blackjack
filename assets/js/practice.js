function initGame() {


}

function displayStatusMessage(


	)


console.log builds every time it loads
an Array of OBjects, each has a number, suit, and value


/////////////////////

function buildDeck() {

var deck = [];
    card = {};
    suits = ['c','d', 'h', 's'];
    for (var i = 2; i < 15; i++) {

    	//determines the value of the card
    card.number = i;
    if (i < 11) {
    	card.value = i;
    } else if (i >= 11 && i <=13) {
    	card value = 10;   	
    } else {
    	card.value = 11;
    }
    	//Determine the suit of the card

    	for (var j = 0; j < suits.length; j++) {
    		card.suit = suits[j];

    		deck.push(card);
    	}

    }
    return deck;


}

$(document).ready(function() {
	deck = buildDeck();
	console.log(deck);
});









if (typeof Mustache === 'undefined') {console.log('no facial hair'); }
no facial hair

if (!Modernizr.localstorage) { console.log('No storage for you!');}