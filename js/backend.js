'use strict';

(function() {
	var URL_DATA = 'https://js.dump.academy/keksobooking/data';
	var load = function(onLoad, onError) {
		var xlr = new XMLHttpRequest();
		xlr.responseType = 'json';
		xlr.open('GET', URL_DATA);
		xlr.addEventListener('load', function() {
			onLoad(xlr.response);
			var error;
			switch (xlr.status) {
				case 200:
					onLoad(xlr.response);
					break;
				case 400:
					error = 'Неверные данные';
					break;
				case 404:
					error = 'Страница не найдена';
					break;
				default:
					error = 'Статус ответа' + xlr.status + xlr.statusText;
			};
			if (error) {
				onError(error);
			};
		});
		xlr.send();
	};

	var URL_SAVE = 'https://js.dump.academy/keksobooking';
	var saveForm = function(data, onLoad, onError) {
		var xlr = new XMLHttpRequest();
		xlr.responseType = 'json';
		xlr.addEventListener('load', function() {
			onLoad(xlr.response);
			var error;
			switch (xlr.status) {
				case 200:
					onLoad(xlr.response);
					break;
				case 400:
					error = 'Неверные данные';
					break;
				case 404:
					error = 'Страница не найдена';
					break;
				default:
					error = 'Статус ответа: ' + xlr.status + ' ' + xlr.statusText;
			}
			if (error) {
				onError(error);
			}			
		});
		xlr.open('POST', URL_SAVE);
		xlr.send(data);
	};

	window.backend = {
		load: load,
		save: saveForm
	};
	// console.log(window.baskend.load);
})();