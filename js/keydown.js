'use strict';

(function() {

	var ENTER_KEYCODE = 13;
	var labelAvatarInput = document.querySelector('.notice__photo label');
	var avatar = document.querySelector('#avatar');
	// console.log(avatar);

	function onLabelClick(input, label) {
		// console.log('!!!');
		var onKeyDown = function(evt) {
			// console.log('key');
					if (evt.keyCode === ENTER_KEYCODE) {
						input.click();
						// console.log('click');
					}
				}
		label.addEventListener('focus', function() {
			// console.log('focus');
			document.addEventListener('keydown', onKeyDown);
			// console.log('ok ' + input.value);
		});
		label.addEventListener('blur', function() {
			document.removeEventListener('keydown', onKeyDown);
		});
	}

	var features = document.querySelector('.notice__form .features');
	var featuresInputs = features.querySelectorAll('input');
	var featuresLabels = features.querySelectorAll('label');
	// console.log(featuresInputs);
	// console.log(featuresLabels);

	onLabelClick(avatar, labelAvatarInput);
	for (let i = 0; i < featuresInputs.length; i++) {
		// console.log(featuresInputs[i]);
		// console.log(featuresLabels[i]);
		onLabelClick(featuresInputs[i], featuresLabels[i]);
	}
	// console.log(features);
	// var wifi = features.querySelector('#feature-wifi');
	// console.log(wifi);
	// var wifiLabel = features.querySelector('.feature--wifi');
	// console.log(wifiLabel);
	// wifiLabel.addEventListener('focus', function() {
	// 	console.log('focus!!');
	// });
	
	// onLabelClick(wifi, wifiLabel);
	var images = document.querySelector('#images');
	var imagesLabel = document.querySelector('.form__photo-container label');
	onLabelClick(images, imagesLabel);
})();