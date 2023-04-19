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

	async function renderServerTasks() {
		getTasks().then((data) => {
			taskList = createTaskList(data, "allTasksDiv", renderApp);
			searchInputRun(data);
		});
	}

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

	function App() {
		//header Todo with weather
		const rootDiv = document.getElementById("functional-example");
		rootDiv.innerHTML = "";
		const taskDiv = document.createElement("div");
		taskDiv.className = "taskDiv";
		headerDiv = headerTodo(renderApp);
		taskDiv.appendChild(headerDiv);
		rootDiv.appendChild(taskDiv);
		renderServerTasks();
	}

	function weatherApp() {
		const weatherContainer = document.getElementById("weather");
		const weatherData = weatherDiv();
		weatherContainer.append(weatherData);
		weatherRender("weatherLocation", "weatherTemp", "weatherImg");
	}

	/**
	 * Render the app.
	 * On change whole app is re-rendered.
	 */
	function renderApp() {
		App();
	}

	renderApp();
	weatherApp();
})();
