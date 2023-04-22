(function () {
	/**
	 * Global application state
	 * @template T
	 * @param {T} initialValue
	 * @returns {[T, function(T): void]}
	 */
	// function useState(initialValue) {
	// 	state = state || initialValue;

	// 	function setValue(newValue) {
	// 		state = newValue;
	// 		renderApp();
	// 	}

	// 	return [state, setValue];
	// }

	//renders data on tasks div
	async function renderServerTasks() {
		getTasks().then((data) => {
			renderTasksList(data, renderApp);
			//search tasks input
			const searchDiv = document.querySelector(".inputSearchContainer");
			searchDiv.innerHTML = "";
			const searchInput = searchInputCreate();
			searchDiv.appendChild(searchInput);
			searchInputRun(data);
		});
	}

	//renders weather data
	async function weatherRender(location, temp, imgIcon) {
		const weatherLoc = document.querySelector(`.${location}`);
		const weatherTemp = document.querySelector(`.${temp}`);
		const imgWeather = document.querySelector(`.${imgIcon}`);
		getGeoLocation().then((data) => {
			if (data == null) {
				weatherData().then((data) => {
					weatherTemp.innerHTML = `${data.current.temp_c}&deg;C`;
					weatherLoc.innerHTML = data.location.name;
					imgWeather.src = `http:${data.current.condition.icon}`;
				});
			} else {
				weatherData(data.latitude, data.longitude).then((data) => {
					weatherTemp.innerHTML = `${data.current.temp_c}&deg;C`;
					weatherLoc.innerHTML = data.location.name;
					imgWeather.src = `http:${data.current.condition.icon}`;
				});
			}
		});
	}

	//rendering of parts which does not need re rendering
	function staticPartRender() {
		mainContainer = document.getElementById("functional-example");
		mainDiv = mainContainerCreate(renderApp);
		mainContainer.append(mainDiv);
	}

	//todo app
	// function App() {
	// 	//header Todo with weather
	// 	renderServerTasks();
	// }

	//
	function weatherApp() {
		const weatherContainer = document.getElementById("weather");
		const weatherData = weatherDivCreate();
		weatherContainer.append(weatherData);
		weatherRender("weatherLocation", "weatherTemp", "weatherImg");
	}

	/**
	 * Render the app.
	 * On change whole app is re-rendered.
	 */
	function renderApp() {
		renderServerTasks();
	}

	staticPartRender();
	weatherApp();
	renderApp();
})();
