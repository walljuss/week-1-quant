/*
	weather component is all to do with weather data: location, temperature, and an icon related to temperature/location
*/

import { createDiv, createImg, createSpan } from "./components";
import { getGeolocation, weatherData } from "./serverMethods";
import "./weather.css";

/**
 * @description function responsible for weather: temperature, weather icon, location;
 */
function weatherComponent(): void {
	const weatherContainer: HTMLElement | null = document.getElementById("root");
	const weatherData: HTMLElement = weatherContainerCreate();
	weatherContainer.append(weatherData);
	weatherRender("weatherLocation", "weatherTemperature", "weatherImg");
}

/**
 *
 * @description create a container for weather data: temperature, icon, location
 * @returns html div element
 */
function weatherContainerCreate(): HTMLDivElement {
	const weatherContainer: HTMLDivElement = createDiv("weatherContainer");
	const weatherImg: HTMLImageElement = createImg("weatherImg");
	const weatherInfo: HTMLDivElement = createDiv("weatherInfo");
	const weatherLocation: HTMLSpanElement = createSpan("weatherLocation");
	const weatherTemperature: HTMLSpanElement = createSpan("weatherTemperature");
	weatherInfo.append(weatherTemperature, weatherLocation);
	weatherContainer.append(weatherImg, weatherInfo);
	return weatherContainer;
}

/**
 * @description uses weatherAPI to get the weather data
 * @param {className} locationContainer - the class selector of a location data container
 * @param {className} temperatureContainer - the class selector of a temperature data container
 * @param {className} imgIconContainer - the class selector of a image container
 */
async function weatherRender(
	locationContainer: string,
	temperatureContainer: string,
	imgIconContainer: string
): Promise<void> {
	const weatherLoc = document.querySelector(
		`.${locationContainer}`
	) as HTMLElement;
	const weatherTemp = document.querySelector(
		`.${temperatureContainer}`
	) as HTMLElement;
	const imgWeather = document.querySelector(
		`.${imgIconContainer}`
	) as HTMLImageElement;

	try {
		const geolocation = await getGeolocation();
		if (geolocation == null) {
			const data = await weatherData();
			weatherTemp.innerHTML = `${data.current.temp_c}&deg;C`;
			weatherLoc.innerHTML = data.location.name;
			imgWeather.src = `http:${data.current.condition.icon}`;
		} else {
			const data = await weatherData(
				geolocation.latitude,
				geolocation.longitude
			);
			weatherTemp.innerHTML = `${data.current.temp_c}&deg;C`;
			weatherLoc.innerHTML = data.location.name;
			imgWeather.src = `http:${data.current.condition.icon}`;
		}
	} catch (error) {
		console.error(error);
	}
}

export { weatherComponent };
