import { Task, WeatherData } from "./interfaces";

async function getTasks(): Promise<Task[]> {
	try {
		const response = await fetch("http://localhost:3004/tasks");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

async function addTask(newTask: Task): Promise<Task> {
	try {
		const response = await fetch("http://localhost:3004/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTask),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Unable to add task");
	}
}

async function updateTask(id: string, updatedTask: Task): Promise<Task> {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTask),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function deleteTask(id: string): Promise<Task> {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

async function weatherData(
	latitude: number = 41.716667,
	longitude: number = 44.783333
): Promise<WeatherData> {
	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/current.json?key=ea376ee683f24996929230809231704&q=${latitude},${longitude}&aqi=yes`
		);
		const data: WeatherData = await response.json();
		return data;
	} catch (error) {
		throw new Error("Failed to load weather data");
	}
}

async function getGeolocation(): Promise<{
	latitude: number;
	longitude: number;
} | null> {
	try {
		const position = await new Promise<GeolocationPosition>(
			(resolve, reject) => {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(resolve, reject);
				} else {
					reject("Geolocation is not supported by this browser.");
				}
			}
		);
		return {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		};
	} catch (error) {
		return null;
	}
}

export {
	getTasks,
	deleteTask,
	updateTask,
	addTask,
	weatherData,
	getGeolocation,
};
