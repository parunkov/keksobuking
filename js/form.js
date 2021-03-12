'use strict';

(function() {
	var mapPinsWidth = window.data.mapPinsWidth;
	var map = window.data.map;
	var OFFERS_VALUE = window.data.OFFERS_VALUE;
	var renderPin = window.pin.renderPin;
	var fragment = window.pin.fragment;
	//var offers = window.data.offers;
	var mapPins = window.pin.mapPins;
	var renderCard = window.card.renderCard;
	var offers = [];
	var errorDiv = document.querySelector('.error');
	var clickFlag = false;
	var closePopup = function(evt) {
		errorDiv.classList.add('hidden');
		clickFlag = true;
	};


	// console.log(22);
	// console.log(offers);

	var onDataLoad = function(data) {
	//console.log(data);
	offers = data;
	// console.log(44);
	// console.log(offers);
	window.form.offers = offers;
};
var onDataError = function(message) {
	if (message) {
		console.error(message);
		errorDiv.setAttribute('style', 'color: red; border: 2px solid red;');
	}
	var ESC_KEYCODE = 27;
	// var errorDiv = document.querySelector('.error');
	// var clickFlag = false;
	errorDiv.classList.remove('hidden');
	errorDiv.textContent = message;
	// var closePopup = function(evt) {
	// 	errorDiv.classList.add('hidden');
	// 	clickFlag = true;
	// };

	var onClick = function(evt) {
		evt.preventDefault();
		if (evt.target != errorDiv) {
			closePopup();
		};
	};
	var onEscPress = function(evt) {
		if (evt.keyCode === ESC_KEYCODE) {
			closePopup();
		};
	};
	document.addEventListener('click', onClick);
	document.addEventListener('keydown', onEscPress);
	document.addEventListener('click', function() {
		if (clickFlag) {
			document.removeEventListener('click', onClick);
			document.removeEventListener('keydown', onEscPress);
		};
	});
};

// console.log(33);
// console.log(window.backend.load);
window.backend.load(onDataLoad, onDataError);
// console.log(55);
// console.log(offers);	

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



var viewPins = function() {
	//console.log(offers.length);
	
	for (var i = 0; i < offers.length; i++) {
		fragment.appendChild(renderPin(offers[i]));		
	};
	//console.log(event.pageX);
	//console.log(event.pageY);
	mapPins.appendChild(fragment);
	
};
if (offers != []) {
	//console.log(99);
 	mapPinMain.addEventListener('mouseup', setNoticeFormActive);
	mapPinMain.addEventListener('mouseup', viewPins);
};

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
	var mainPinX = (coords.x + PIN_MAIN_WIDTH / 2 - 13);
	var mainPinY = (coords.y + PIN_MAIN_HEIGHT - PIN_MAIN_WIDTH / 2 + 20);
	// addressInput.setAttribute('value', (coords.x + PIN_MAIN_WIDTH / 2 - 13) +  ', ' + (coords.y + PIN_MAIN_HEIGHT - PIN_MAIN_WIDTH / 2 + 20));
	addressInput.setAttribute('value', mainPinX +  ', ' + mainPinY);
		//console.log('!!!');
		// console.log('!!!' + addressInput.value);
		window.form.mainPinX = mainPinX;
		window.form.mainPinY = mainPinY;
		// console.log(window.form.mainPinX);
	}

	mapPinMain.addEventListener('mouseup', writeAddress);

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

var resetForm = function() {
	noticeForm.reset();
	var uploadPhoto = document.querySelector('.upload-photo');
	var photos = uploadPhoto.querySelectorAll('img');
	for (let i = 0; i < photos.length; i++) {
		photos[i].remove();
	}
	window.avatar.savedFiles = undefined;
	window.form.filesClear = true;

	map.classList.add('map--faded');
	noticeForm.classList.add('notice__form--disabled');
	for (var i = 0; i < noticeFormFieldsets.length; i++) {
		noticeFormFieldsets[i].setAttribute('disabled', '');
	};

	var pins = document.querySelectorAll('.map__pin');
	// console.log(pins);
	pins[0].setAttribute('style', 'left: 50%; top: 375px');
	addressInput.setAttribute('value', '');
	for (let i = 1; i < pins.length; i++) {
		pins[i].remove();
	}
	// console.log('clear');
}

var onDataSave = function(data) {
	resetForm();
	onDataError();
	errorDiv.textContent = 'Объявление отправлено';
	errorDiv.setAttribute('style', 'color: green; border: 2px solid green;');
		
};

noticeForm.addEventListener('submit', function(evt) {
	var formData = new FormData(noticeForm);
	// console.log(formData);
	
	// for(let [name, value] of formData) {
	// 	console.log(`${name} = ${value}`);		
	// };
	if (formData.has('photo')) {
		var photos = formData.get('photo');
		// console.log(photos);
		formData.delete('photo');
	}
	// console.log(formData.has('photo'));

	// console.log(window.avatar.savedFiles);

	if (window.avatar.savedFiles) {
		// console.log(window.avatar.savedFiles);
		for (let i = 0; i < window.avatar.savedFiles.length; i++) {
			formData.append('photo', window.avatar.savedFiles[i]);
		}
	}

	for(let [name, value] of formData) {
		console.log(`${name} = ${value}`);		
	};

	window.backend.save(formData, onDataSave, onDataError);
	console.log('sava');
	console.log(closePopup);
	setTimeout(closePopup, 5000);
	evt.preventDefault();
});

var resetBtn = document.querySelector('.form__reset');
resetBtn.addEventListener('click', function() {
	resetForm();
});

window.form = {
	pinMain: mapPinMain
}

})();