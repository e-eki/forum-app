'use strict';

// получить изображение для фона в зависимотси от времени суток
export function getBackgroundImage() {
	debugger;
	const hours = new Date().getHours();

	let backgroundImage;

	if (hours > 6 && hours < 20) {
		backgroundImage = "url('/images/kola_day.jpg')";
	}
	else if (hours > 20 && hours < 1) {
		backgroundImage = "url('/images/kola_starlight_night.jpg')";
	}
	else {
		backgroundImage = "url('/images/kola_northern_lights.jpg')";
	}

	return backgroundImage;
}
