'use strict';

(function() {
	var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

	var fileCooser = document.querySelector('#avatar');

	var prewiew = document.querySelector('.notice__preview img');
	// console.log(prewiew);
	var addListenerFlag = [];
	var dragOver;
	var dragFlag = true;
	var imageCooser = document.querySelector('#images');
	var uploadPhoto = document.querySelector('.upload-photo');
	var savedFiles = [];
	var sortedFiles = [];
	var renderPreviw = function(file) {
		var img = document.createElement('img');
		uploadPhoto.appendChild(img);
		img.setAttribute('height', '120');
		img.setAttribute('style', 'margin-right: 5px');
		img.setAttribute('draggable', 'true');
		img.setAttribute('ondragover', 'return false');
		img.src = URL.createObjectURL(file);
	}
	var clearPreviw = function() {
		var previwPhotos = uploadPhoto.querySelectorAll('img');
		for (let i = 0; i < previwPhotos.length; i++) {
			previwPhotos[i].remove();
		}
	}
	var dragElement;
	var dragOver;
	var dragFlag = true;		
	// console.log(photos.length);	

	function sort () {
		var photos = uploadPhoto.querySelectorAll('img');
		for (let i = 0; i < photos.length; i++) {
			photos[i].addEventListener('dragstart', function() {
				// console.log(i + ' drag');
			});
			photos[i].addEventListener('drop', function(evt) {
				evt.preventDefault();
				// console.log(i + ' drop');
				dragOver = i;
				dragFlag = true;
			});
			photos[i].addEventListener('dragleave', function() {
				dragFlag = false;
				// console.log('!!');
			});
			photos[i].addEventListener('dragend', function() {
				// console.log(i + ' ' + dragOver + ' end ');
				// console.log(savedFiles[i].name + ' ' + savedFiles[dragOver].name);
				if (dragFlag) {
					sortedFiles = savedFiles.slice();
					sortedFiles[i] = savedFiles[dragOver];
					sortedFiles[dragOver] = savedFiles[i];
					// console.log(sortedFiles);
					for (let i = 0; i < sortedFiles.length; i++) {
						photos[i].src = URL.createObjectURL(sortedFiles[i]);
					}				
					savedFiles = sortedFiles.slice();
					window.avatar.savedFiles = savedFiles;
				}
				// console.log(savedFiles);					
			});
		}
	};

	
	fileCooser.addEventListener('change', function() {
		var file = fileCooser.files[0];
		var fileName = file.name.toLowerCase();

		var matches = FILE_TYPES.some(function (it) {
			return fileName.endsWith(it);
		});

		if (matches) {
			var reader = new FileReader();

			reader.addEventListener('load', function() {
				prewiew.src = reader.result;
				// console.log(prewiew);
			});

			reader.readAsDataURL(file);			
		}
	});
	
	imageCooser.addEventListener('change', function() {

		if (window.form.filesClear) {
			savedFiles = [];
			window.form.filesClear = false;
		}
		// console.log(imageCooser.files);
		for (var i = 0; i < imageCooser.files.length; i++) {
			var file = imageCooser.files[i];
			// console.log(file);
			var fileName = file.name.toLowerCase();
			var matches = FILE_TYPES.some(function (it) {
				return fileName.endsWith(it);
			});
		// console.log(matches);
		if (matches) {			
			savedFiles.push(file);	
			// console.log(savedFiles);
			window.avatar = {
				savedFiles: savedFiles
			}
		}
	}

	// console.log(savedFiles);
	clearPreviw();
	for (let i = 0; i < savedFiles.length; i++) {
		renderPreviw(savedFiles[i]);
	}

	sort();	

});

})();