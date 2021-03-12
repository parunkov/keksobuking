'use strict';

(function() {
	var map = window.data.map;

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

	var ESC_KEYCODE = 27;
	var closeCard = cardElement.querySelector('.popup__close');
	closeCard.addEventListener('click', function() {
		cardElement.classList.add('hidden');
	});
	document.addEventListener('keydown', function(evt) {
		if (evt.keyCode === ESC_KEYCODE) {
			cardElement.classList.add('hidden');
		}
	});

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

window.card = {
	renderCard: renderCard,
	mapFiltersContainer: mapFiltersContainer
};

})();