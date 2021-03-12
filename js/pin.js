'use strict';

(function() {
	var map = window.data.map;
	var renderCard = window.card.renderCard;
	var mapFiltersContainer = window.card.mapFiltersContainer;

	
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

window.pin = {
	renderPin: renderPin,
	fragment: fragment,
	mapPins: mapPins
};

})();