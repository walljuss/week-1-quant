interface Task {
	id: string;
	title: string;
	type: string;
	date: Date;
	isCompleted: boolean;
}

interface WeatherData {
	coord: {
		lon: number;
		lat: number;
	};
	current: {
		temp_c: number;
		condition: {
			icon: URL;
		};
	};
	location: {
		name: string;
	};
}

export { Task, WeatherData };
