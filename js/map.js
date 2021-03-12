//file map.js
'use strict';

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
//console.log(offers);

var map = document.querySelector('.map');
//map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('template')
	.content
	.querySelector('.map__pin');

var mapPins = document.querySelector('.map__pins');

//console.log(offers[1].location.x);

var PIN_WIDH = 46;
var PIN_HEIGHT = 64;

var renderPin = function (pin) {

	var pinElement = mapPinTemplate.cloneNode(true);
	var pinStyle = 'left: ' + (pin.location.x - PIN_WIDH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
	pinElement.setAttribute('style', pinStyle);
	//console.log(pinStyle);

	var pinImg = pinElement.querySelector('img');
	pinImg.setAttribute('src', pin.author.avatar);
	pinImg.setAttribute('alt', pin.offer.title);
	//console.log(pinImg);

	pinElement.addEventListener('click', function() {
		var popupCard = document.querySelector('.map__card');
		if (popupCard) {
			popupCard.parentNode.removeChild(popupCard);
		};
		fragment.appendChild(renderCard(pin));
		//console.log(fragment);
		map.insertBefore(fragment, mapFiltersContainer);
	});

	return pinElement;
}

var fragment = document.createDocumentFragment();
/*for (var i = 0; i < OFFERS_VALUE; i++) {
	fragment.appendChild(renderPin(offers[i]));
}*/
//console.log(fragment);
//mapPins.appendChild(fragment);

var mapCardTemplate = document.querySelector('template')
	.content
	.querySelector('.map__card');

var renderCard = function (card) {

	var cardElement = mapCardTemplate.cloneNode(true);
	cardElement.querySelector('h3').textContent = card.offer.title;
	//console.log(cardElement.querySelector('h3'));
	cardElement.querySelector('small').textContent = 'Tōkyō-to, Chiyoda-ku, Ichibanchō, ' + card.offer.address;
	cardElement.querySelector('.popup__price').textContent = card.offer.price + '₽/ночь';

	if (card.offer.type == 'flat') {
		cardElement.querySelector('h4').textContent = 'Квартира'
	} else if (card.offer.type == 'bungalo') {
		cardElement.querySelector('h4').textContent = 'Бунгало'
	} else if (card.offer.type == 'house') {
		cardElement.querySelector('h4').textContent = 'Дом'
	} else if (card.offer.type == 'palace') {
		cardElement.querySelector('h4').textContent = 'Дворец'
	} else {
		cardElement.querySelector('h4').textContent = ' - '
	}
	
	cardElement.querySelectorAll('p')[2].textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
	cardElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;

	var liFeature = cardElement.querySelectorAll('.feature');
	for (var j = 0; j < liFeature.length; j++) {
		liFeature[j].setAttribute('class', '');
	}
	for (var k = 0; k < card.offer.features.length; k++) {
		liFeature[k].classList.add('feature');
		var featureItem = 'feature--' + card.offer.features[k];
		liFeature[k].classList.add(featureItem);
	}

	cardElement.querySelectorAll('p')[4].textContent = card.offer.deskription;

	var popupPictures = cardElement.querySelector('.popup__pictures');
	//console.log(popupPictures);
	var popupPicturesLi = popupPictures.querySelector('li');
	//console.log(popupPicturesLi);
	//console.log(card.offer.photos.length);
	for (var i = 0; i < (card.offer.photos.length - 1); i++) {
		popupPictures.appendChild(popupPicturesLi.cloneNode(true));		
	}
	popupPicturesLi = popupPictures.querySelectorAll('li');
	for (var i = 0; i < card.offer.photos.length; i++) {
		popupPicturesLi[i].querySelector('img').setAttribute('src', card.offer.photos[i]);
	}

	cardElement.querySelector('img').setAttribute('src', card.author.avatar);

	//console.log(cardElement);
	return cardElement;

};


/*for (var i = 0; i < OFFERS_VALUE; i++) {
	fragment.appendChild(renderCard(offers[i]));
}*/
//console.log(fragment);

//map.appendChild(fragment);

var mapFiltersContainer = map.querySelector('.map__filters-container');
//console.log(mapFiltersContainer);

//map.insertBefore(fragment, mapFiltersContainer);

//part 04

var noticeForm = document.querySelector('.notice__form');
var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
//console.log(noticeFormFieldsets);

for (var i = 0; i < noticeFormFieldsets.length; i++) {
	noticeFormFieldsets[i].setAttribute('disabled', '');
};

var mapPinMain = document.querySelector('.map__pin--main');

var setNoticeFormActive = function() {
	//console.log('mouseup');
	map.classList.remove('map--faded');
	noticeForm.classList.remove('notice__form--disabled');
	for (var i = 0; i < noticeFormFieldsets.length; i++) {
		noticeFormFieldsets[i].removeAttribute('disabled');
	};
};

mapPinMain.addEventListener('mouseup', setNoticeFormActive);

var viewPins = function() {
	
	for (var i = 0; i < OFFERS_VALUE; i++) {
		fragment.appendChild(renderPin(offers[i]));		
	};
	//console.log(event.pageX);
	//console.log(event.pageY);
	mapPins.appendChild(fragment);
	
};

mapPinMain.addEventListener('mouseup', viewPins);

var PIN_MAIN_WIDTH = 62;
var PIN_MAIN_HEIGHT = 84;
var PIN_MAIN_X = mapPinsWidth / 2;
var PIN_MAIN_Y = 375;
//console.log(PIN_MAIN_X);

var coords = {
	x: PIN_MAIN_X,
	y: PIN_MAIN_Y
};

var addressInput = document.querySelector('#address');
addressInput.setAttribute('value', 'PIN_MAIN_X, PIN_MAIN_Y');

var writeAddress = function(evt) {
	addressInput.setAttribute('value', (coords.x + PIN_MAIN_WIDTH / 2 - 13) +  ', ' + (coords.y + PIN_MAIN_HEIGHT - PIN_MAIN_WIDTH / 2 + 20));
		//console.log('!!!');
		//console.log('!!!' + addressInput.value);
}

mapPinMain.addEventListener('mouseup', writeAddress);

//part 05

var onMouseDown = function(evt) {
	evt.preventDefault();

	var startCoords = {
		x: evt.clientX,
		y: evt.clientY
	};

	var onMouseMove = function(moveEvt) {
		moveEvt.preventDefault();

		var shift = {
			x: startCoords.x - moveEvt.clientX,
			y: startCoords.y - moveEvt.clientY
		};

		startCoords = {
			x: moveEvt.clientX,
			y: moveEvt.clientY
		};

		var mapPinMainTop = (mapPinMain.offsetTop - shift.y);
		var mapPinMainLeft = (mapPinMain.offsetLeft - shift.x);
		if (mapPinMainTop < 130) {
			mapPinMainTop = 130;
		};
		if (mapPinMainTop > 630) {
			mapPinMainTop = 630;
		};
		if (mapPinMainLeft < 0) {
			mapPinMainLeft = 0;
		};
		if (mapPinMainLeft > mapPinsWidth) {
			mapPinMainLeft = mapPinsWidth;
		};
		//console.log(mapPinMain.offsetTop, mapPinMain.offsetLeft);

		mapPinMain.style.left = mapPinMainLeft + 'px';
		mapPinMain.style.top = mapPinMainTop + 'px';

		var mapPinMainCoords = {
			x: mapPinMainLeft,
			y: mapPinMainTop
		};

		//console.log(mapPinMainCoords);

		return mapPinMainCoords;

	};

	var onMouseUp = function(upEvt) {
		coords = onMouseMove(upEvt);
		writeAddress(upEvt);
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
		//console.log(coords.x);
		//return coords;
	};

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
	
};

mapPinMain.addEventListener('mousedown', onMouseDown);
