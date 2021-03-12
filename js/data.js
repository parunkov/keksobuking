'use strict';

(function() {
	function randomElement (array) {
		var randomNumber = Math.round(Math.random() * (array.length - 1));
		var elementSave = array[randomNumber];
		array.splice(randomNumber, 1);
		return elementSave;
	}

	function randomElementRepeat (array) {
		var randomNumber = Math.round(Math.random() * (array.length - 1));
		var elementSave = array[randomNumber];
		return elementSave;
	}

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1)); 
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	var OFFERS_VALUE = 8;

	var offersAuthorAvatar = [];
	for (var i = 0; i < OFFERS_VALUE; i++) {
		offersAuthorAvatar[i] = 'img/avatars/user0' + (i + 1) +'.png';
	}
//console.log(offersAuthorAvatar);

var mapPins = document.querySelector('.map__pins');
var mapPinsWidth = mapPins.offsetWidth;
//console.log(mapPinsWidth);

var OFFERS_TITLE = [
'Большая уютная квартира',
'Маленькая неуютная квартира',
'Огромный прекрасный дворец',
'Маленький ужасный дворец',
'Красивый гостевой домик',
'Некрасивый негостеприимный домик',
'Уютное бунгало далеко от моря',
'Неуютное бунгало по колено в воде'
];

var offersPrice = [];
for (var i = 0; i < OFFERS_VALUE; i++) {
	offersPrice[i] = 1000 + Math.round(Math.random() * 999000);
}
//console.log(offersPrice);

var OFFERS_TYPE = [
'palace',
'flat',
'house',
'bungalo'
];
var OFFERS_ROOMS = [1, 2, 3, 4, 5];

var offersGuests = [];
for (var i = 0; i < OFFERS_VALUE; i++) {
	offersGuests[i] = 1 + Math.round(Math.random() * 19);
}

var OFFERS_CHECKIN = [
'12:00',
'13:00',
'14:00'
];
var OFFERS_CHECKOUT = [
'12:00',
'13:00',
'14:00'
];
var OFFERS_FEATURES = [
'wifi',
'dishwasher',
'parking',
'washer',
'elevator',
'conditioner'
];
var OFFERS_PHOTO = [
'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var offersPinX = [];
for (var i = 0; i < OFFERS_VALUE; i++) {
	offersPinX[i] = Math.round(Math.random() * mapPinsWidth);
}
//console.log(mapPinsWidth);
//console.log(offersPinX);

var offersPinY = [];
for (var i = 0; i < OFFERS_VALUE; i++) {
	offersPinY[i] = 203 + Math.round(Math.random() * 500);
}
//console.log(offersPinY);
function createOfferElement() {

	var x = randomElement(offersPinX);
	var y = randomElement(offersPinY);
	//console.log(x);
	//console.log(y);
	
	var element = {

		author: {
			avatar: randomElement(offersAuthorAvatar)
		},

		offer: {
			title: randomElement(OFFERS_TITLE),
			address: x + ', ' + y,
			price: randomElement(offersPrice),
			type: randomElementRepeat(OFFERS_TYPE),
			rooms: randomElementRepeat(OFFERS_ROOMS),
			guests: randomElement(offersGuests),
			checkin: randomElementRepeat(OFFERS_CHECKIN),
			checkout: randomElementRepeat(OFFERS_CHECKOUT),
			features: shuffle(OFFERS_FEATURES).slice(0, 1 + Math.round(Math.random() * (OFFERS_FEATURES.length - 1))),
			deskription: '',
			photos: shuffle(OFFERS_PHOTO).slice(0, 3)		
		},

		location: {
			x: x,
			y: y
		}
	}
	//console.log(element.author);
	return element;
}


var offers = [];
for (var i = 0; i < OFFERS_VALUE; i++) {

	offers[i] = createOfferElement();
	//console.log(offers[i]);
}

var map = document.querySelector('.map');

window.data = {
	mapPinsWidth: mapPinsWidth,
	OFFERS_VALUE: OFFERS_VALUE,
	offers: offers,
	map: map
};

})();