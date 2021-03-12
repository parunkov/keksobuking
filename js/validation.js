'use strict';

(function() {
	var typeLiving = document.querySelector('#type');
	var price = document.querySelector('#price');
	//console.log(typeLiving.value);

	var onTypeLivingClick = function(evt) {
		evt.preventDefault();
		//console.log(22);
		if (typeLiving.value === 'flat') {
			price.setAttribute('min', '1000');
			price.setAttribute('placeholder', '1000');
		} else if (typeLiving.value === 'bungalo') {			
			price.setAttribute('min', '0');
			price.setAttribute('placeholder', '0');
		} else if (typeLiving.value === 'house') {			
			price.setAttribute('min', '5000');
			price.setAttribute('placeholder', '5000');
		} else if (typeLiving.value === 'palace') {			
			price.setAttribute('min', '10000');
			price.setAttribute('placeholder', '10000');
		} else  {			
			price.setAttribute('min', '0');
			price.setAttribute('placeholder', '5000');
		};
	};

	typeLiving.addEventListener('click', onTypeLivingClick);
	typeLiving.addEventListener('blur', onTypeLivingClick);

	var address = document.querySelector('#address');

	address.addEventListener('keydown', function(evt) {
		evt.preventDefault();
	});

	var timein = document.querySelector('#timein');
	var timeout = document.querySelector('#timeout');
	
	timein.addEventListener('change', function(evt) {
		timeout.value = timein.value;
	});
	timeout.addEventListener('change', function(evt) {
		timein.value = timeout.value;
	});

	var roomNumber = document.querySelector('#room_number');
	var capacity = document.querySelector('#capacity');
	var capacityItems = capacity.querySelectorAll('option');
	//console.log(capacityItems);

	var onRoomNumberChange = function() {
		console.log(roomNumber.value);
		for (var i = 0; i < capacityItems.length; i++) {
			capacityItems[i].removeAttribute('disabled');
		};
		if (roomNumber.value == 1) {
			capacity.value = 1;	
			capacityItems[0].setAttribute('disabled', '');
			capacityItems[1].setAttribute('disabled', '');
			capacityItems[3].setAttribute('disabled', '');
		} else if (roomNumber.value == 2) {
			capacity.value = 2;	
			capacityItems[0].setAttribute('disabled', '');	
			capacityItems[3].setAttribute('disabled', '');
		} else if (roomNumber.value == 3) {	
			capacity.value = 3;				
			capacityItems[3].setAttribute('disabled', '');
		} else if (roomNumber.value == 100) {
			capacity.value = 0;				
			capacityItems[0].setAttribute('disabled', '');
			capacityItems[1].setAttribute('disabled', '');
			capacityItems[2].setAttribute('disabled', '');
		}
	};

	roomNumber.addEventListener('change', onRoomNumberChange);
})();