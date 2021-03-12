'use strict';
(function() {

	var ENTER_KEYCODE = 13;
	var DEBOUNCE_INTERVAL = 500;
	var lastTimeout;
	var debounce = function(fun) {		
		// console.log(lastTimeout);
		if (lastTimeout) {
			window.clearTimeout(lastTimeout);
			// console.log('!!!');
		};
		lastTimeout = window.setTimeout(function() {
			// console.log('?????');
			lastTimeout = 0;
			fun();
		}, DEBOUNCE_INTERVAL);
		// console.log(lastTimeout);
	};


	var housingType = document.querySelector('#housing-type');
	var housingPrice = document.querySelector('#housing-price');
	var housingRooms = document.querySelector('#housing-rooms');
	var housinGuests = document.querySelector('#housing-guests');
	var wifi = document.querySelector('#filter-wifi');
	var dishwasher = document.querySelector('#filter-dishwasher');
	var parking = document.querySelector('#filter-parking');
	var washer = document.querySelector('#filter-washer');
	var elevator = document.querySelector('#filter-elevator');
	var conditioner = document.querySelector('#filter-conditioner');	

	var updatePins = function(off) {
		var pins = document.querySelectorAll('.map__pin');
		var PINS_VALUE = 5;
		// console.log(pins);
		for (var i = 1; i < pins.length; i++) {
			pins[i].parentNode.removeChild(pins[i]);
		}
		var offLength; 
		if (off.length < PINS_VALUE) {
			offLength = off.length;
		} else {
			offLength = PINS_VALUE;
		}
		for (var i = 0; i < offLength; i++) {
			window.pin.fragment.appendChild(window.pin.renderPin(off[i]));		
		};
	
		window.pin.mapPins.appendChild(window.pin.fragment);		
	};

	var onChangeFilter = function(offers) {
			// console.log(housingType.value);
			// console.log(housingPrice.value);
			// console.log(typeof(housingRooms.value));
			// console.log(housinGuests.value);
			// console.log(wifi.checked);
			// console.log(window.filter.offers);

			var offersFiltered = offers.filter(function(off) {
				if (housingType.value !== 'any') {
					return off.offer.type === housingType.value;
				} else {
					return true;
				}				
			}).filter(function(off) {
				var offPrice;
				if (off.offer.price < 10000) {
					offPrice = 'low';
				} else if (off.offer.price > 50000) {
					offPrice = 'high';
				} else {
					offPrice = 'middle';
				}
				if (housingPrice.value !== 'any') {
					return offPrice === housingPrice.value;
				} else {
					return true;
				}				

			}).filter(function(off) {
				if (housingRooms.value !== 'any') {
					return off.offer.rooms == housingRooms.value;
				} else {
					return true;
				}
			}).filter(function(off) {
				if (housinGuests.value !== 'any') {
					return off.offer.guests == housinGuests.value;
				} else {
					return true;
				}
			}).filter(function(off) {
				if (wifi.checked) {
					for (var i = 0; i < off.offer.features.length; i++) {
						if (off.offer.features[i] === 'wifi') {
							return true;
						}
					}
				} else {
					return true;
				}				
			}).filter(function(off) {
				if (dishwasher.checked) {
					for (var i = 0; i < off.offer.features.length; i++) {
						if (off.offer.features[i] === 'dishwasher') {
							return true;
						}
					}
				} else {
					return true;
				}				
			}).filter(function(off) {
				if (parking.checked) {
					for (var i = 0; i < off.offer.features.length; i++) {
						if (off.offer.features[i] === 'parking') {
							return true;
						}
					}
				} else {
					return true;
				}				
			}).filter(function(off) {
				if (washer.checked) {
					for (var i = 0; i < off.offer.features.length; i++) {
						if (off.offer.features[i] === 'washer') {
							return true;
						}
					}
				} else {
					return true;
				}				
			}).filter(function(off) {
				if (elevator.checked) {
					for (var i = 0; i < off.offer.features.length; i++) {
						if (off.offer.features[i] === 'elevator') {
							return true;
						}
					}
				} else {
					return true;
				}				
			}).filter(function(off) {
				if (conditioner.checked) {
					for (var i = 0; i < off.offer.features.length; i++) {
						if (off.offer.features[i] === 'conditioner') {
							return true;
						}
					}
				} else {
					return true;
				}				
			});
			// console.log(offers);
			// console.log(offersFiltered);			
			return offersFiltered;
		}

	var onClick = function(evt) {
		// console.log(window.form.offers);
		// console.log(window.form.mainPinX);
		// console.log(window.form.mainPinY);

		var mainPinX = window.form.mainPinX;
		var mainPinY = window.form.mainPinY;
		var offers = window.form.offers;

		var dist = function(x, y) {
			return Math.sqrt(Math.pow(x - mainPinX, 2) + Math.pow(y - mainPinY, 2));
		};

		for (var i = 0; i < offers.length; i++) {
			offers[i].dist = dist(offers[i].location.x, offers[i].location.y);
		}

		// console.log(offers);

		offers.sort(function(left, right) {
			return left.dist - right.dist;
		});

		// console.log(offers);
		
		updatePins(offers);		

		var onChangePins = function() {
			var offersFiltered = onChangeFilter(offers);
			updatePins(offersFiltered);
		}

		var onChange = function() {
			debounce(onChangePins);
			var mapCard = document.querySelector('.map__card');
			if (mapCard) {
				mapCard.classList.add('hidden');
			}
		}		

		housingType.addEventListener('change', onChange);
		housingPrice.addEventListener('change', onChange);
		housingRooms.addEventListener('change', onChange);
		housinGuests.addEventListener('change', onChange);
		wifi.addEventListener('change', onChange);
		dishwasher.addEventListener('change', onChange);
		parking.addEventListener('change', onChange);
		washer.addEventListener('change', onChange);
		elevator.addEventListener('change', onChange);
		conditioner.addEventListener('change', onChange);
		keyOptionsListen(onChange);
	};

	var onLoad = function(evt) {

		window.form.pinMain.addEventListener('click', onClick);
		
	}
	window.backend.load(onLoad);

	var mapFilters = document.querySelector('.map__filters-container');

	var featureWifi = mapFilters.querySelector('.feature--wifi');
	var featureDishwasher = mapFilters.querySelector('.feature--dishwasher');
	var featureParking = mapFilters.querySelector('.feature--parking');
	var featureWasher = mapFilters.querySelector('.feature--washer');
	var featureElevator = mapFilters.querySelector('.feature--elevator');
	var featureConditioner = mapFilters.querySelector('.feature--conditioner');

	function keyListen(input, label, change) {
		var checkFlag = true;

		var onKeyDown = function(evt) {
					if (evt.keyCode === ENTER_KEYCODE) {
						// console.log('checked');
						if (checkFlag) {
							// console.log('checked');
							// console.log(input);
							input.setAttribute('checked', '');
							change();
						} else {
							// console.log('unchecked');
							// console.log(input);
							input.removeAttribute('checked');
							change();
						}
						checkFlag = !checkFlag;
						// console.log(checkFlag);			
					}
				}
		label.addEventListener('focus', function() {		
			document.addEventListener('keydown', onKeyDown);
			// console.log('ok ' + input.value);
		});
		label.addEventListener('blur', function() {
			document.removeEventListener('keydown', onKeyDown);
			// console.log('done ' + input.value);
		});
	}

	function keyOptionsListen (change) {
		keyListen(wifi, featureWifi, change);
		// console.log(wifi);
		keyListen(dishwasher, featureDishwasher, change);
		keyListen(parking, featureParking, change);
		keyListen(washer, featureWasher, change);
		keyListen(elevator, featureElevator, change);
		keyListen(conditioner, featureConditioner, change);
	}


})();