import "./Weather.css";
import { useEffect, useState } from "react";
import { getGeolocation, weatherData } from "./serverWeather";

const Weather = () => {
	const [location, setLocation] = useState(null);
	const [weather, setWeather] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const position = await getGeolocation();
			setLocation(position);
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			// if location is null weatherData function runs without parameters, as default parameters are Tbilisi
			// else location lat or long are used as parameters
			const data = location
				? await weatherData(location.latitude, location.longitude)
				: await weatherData();
			setWeather(data);
			setIsLoading(false);
		}
		fetchData();
	}, [location]);

	if (isLoading === true) {
		return <div className="weatherContainer">Loading</div>;
	}

	return (
		<div className="weatherContainer">
			<img src={weather.current.condition.icon} alt="" />
			<div className="weatherInfo">
				<span className="weatherTemperature">{weather.current.temp_c}</span>
				<span className="weatherLocation">{weather.location.name}</span>
			</div>
		</div>
	);
};

export { Weather };
