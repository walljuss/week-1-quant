async function weatherData(latitude = 41.716667, longitude = 44.783333) {
	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/current.json?key=ea376ee683f24996929230809231704&q=${latitude},${longitude}&aqi=yes`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error("Failed to load weather data");
	}
}

async function getGeoLocation() {
	try {
		const position = await new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			} else {
				reject("Geolocation is not supported by this browser.");
			}
		});
		return {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		};
	} catch (error) {
		return null;
	}
}
