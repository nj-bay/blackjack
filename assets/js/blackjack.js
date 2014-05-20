$(function () {

	
	document.getElementById('btn-hit').style.display = "none";
	document.getElementById('btn-stand').style.display = "none";

	if (initGame()) {
		$("#btn-new").click(function () {
			console.log('Enter New Game')
			newGame();
		});
	} else {

		document.getElementById('btn-new').style.display = "none";
		return;
	}

});

function initGame() {

	
	var initErrors = new Array();
	var errorMessage = "";
	if (!Modernizr.localstorage) { 
		initErrors.push('Local storage not available!');
	}
	if (typeof Mustache === 'undefined') {
		initErrors.push('Mustache not available'); 
	}

	if (initErrors.length > 0) {
		errorMessage += "Houston, we have a problem! ";
		errorMessage += "("+ initErrors.join() + ")";
		displayStatusMessage(errorMessage);
		return false;
	} else {
		displayStatusMessage('Ready to Play? CLick "New Game" to start...');
		return true;
	}
}

function displayStatusMessage(msg) {

	document.getElementById("status").innerHTML = msg;
}

function newGame() {
	getShoe(2);
	dealHand();
	displayDealerHand(false);
	displayPlayerHand();
	document.getElementById('btn-hit').style.display = "block";
	document.getElementById('btn-stand').style.display = "block";
	document.getElementById('btn-new').style.display = "none";
	printShoe(JSON.parse(localStorage.getItem('shoe')));

}

function getShoe(decks) {
	var shoe = [];
	while (decks > 0) {
		deck = getDeck();
		for(var i = 0; i < deck.length; i++) {
			shoe.push(deck[i]);
		}

		decks--;
	}
	
	shoe = shuffle(shoe); 
	localStorage.setItem('shoe', JSON.stringify(shoe));
}

function getDeck() {

	var deck = [];
	var card = {};
	var suits = ['H', 'C', 'D', 'S'];
	var faces = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
	
	for (var s in suits) {
		for (var f in faces) {
			card = {'face': faces[f], 'suit': suits[s]};
			deck.push(card);
			console.log("creating object and appending to deck: " + JSON.stringify(card));
		}
	}
	return deck; 
}

function shuffle(o) {
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i, 10), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function printShoe(shoe) {
	for (var i = 0; i < shoe.length; i++) {
		console.log("item: " + JSON.stringify(shoe[i]));
	}
}

function dealCard() {

	var shoe = JSON.parse(localStorage.getItem('shoe'));
	
	card = shoe.splice(0,1)[0];

	alert(JSON.stringify(card));
	
	var cardValue = 0;

	if ($.isNumeric(card['face'])) {
		cardValue = card['face'];
	} else if (String(card['face']) === 'J') {
		cardValue = 10;
	} else if (String(card['face']) === 'Q') {
		cardValue = 10;
	} else if (String(card['face']) === 'K') {
		cardValue = 10;
	} else if (String(card['face']) === 'A') {
		cardValue = 1;
	}

	var imageNum = 0;

	if ($.isNumeric(card['face'])) {
		imageNum = card['face'];
	}

	if (card['face'] == 'J') {
		imageNum = 11;
	}

	if (card['face'] == 'Q') {
		imageNum = 12;
	}

	if (card['face'] == 'K') {
		imageNum = 13; 
	}

	if (card['face'] == 'A') {
		imageNum = 1;
	}	


	var cardImage = card['suit'].toLowerCase() + pad(imageNum, 2) + '.png';

	localStorage.setItem('shoe', JSON.stringify(shoe));

	var response = {"image": cardImage, "value": cardValue};

	alert(JSON.stringify(response));

	return response;

}

function dealHand() {
	var dealerHand = [dealCard(), dealCard()];
	var playerHand = [dealCard(), dealCard()];

	localStorage.setItem('dealerHand', JSON.stringify(dealerHand));
	localStorage.setItem('playerHand', JSON.stringify(playerHand));
} 

function displayDealerHand(reveal) {
	var dealerHand = JSON.parse(localStorage.getItem('dealerHand'));
	var hand;

	if (reveal) {
		hand = {'cards': dealerHand};
	} else {
		hand = {'cards': dealerHand[0], 'back': true};
	}

	console.log(JSON.stringify(hand));

	var template = $('#tpl-hand').html();
	var html = Mustache.render(template, hand);
	document.getElementById('dealer-hand').innerHTML = html; 

}

function displayPlayerHand() {


	var hand = JSON.parse(localStorage.getItem('playerHand'));
	var template = $('#tpl-hand').html();
	var html = Mustache.render(template, hand);
	document.getElementById('player-hand').innerHTML = html; 

}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}






