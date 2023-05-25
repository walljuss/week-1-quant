import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "./thunkFetchData";
import { selectIsServerDown } from "./features/taskSlice";
import { useState } from "react";
import { Tasks } from "./Tasks/Tasks";
import Weather from "./Weather/Weather";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		dispatch(fetchTasks())
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.error("Failed to fetch tasks:", error);
			});
	}, []);

	const isServerDown = useSelector(selectIsServerDown);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isServerDown) {
		return (
			<>
				<div className="main">
					<h1> To Do App</h1>
					<Weather />
					<div>Server is down. Unable to fetch data</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Router>
				<div className="main">
					<h1> To Do App</h1>
					<Weather />
					<Tasks />
				</div>
			</Router>
		</>
	);
}

export default App;
