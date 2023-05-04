import "./App.css";
import { getTasks } from "./serverMethods";
import { useEffect, useState } from "react";
import { Weather } from "./Weather/Weather";
import { Tasks } from "./Tasks/Tasks";

function App() {
	const [tasks, setTasks] = useState([]);
	const [newData, setNewData] = useState(0);
	const setDataUpdate = () => {
		setNewData(!newData);
	};

	const [isServerDown, setIsServerDown] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("http://localhost:3004/tasks");
				const data = await response.json();
				setTasks(data);
				setIsServerDown(false);
			} catch (error) {
				console.error(error);
				setIsServerDown(true);
			}
		}
		fetchData();
	}, [newData]);

	return (
		<div className="main">
			<h1>To Do List</h1>
			<Weather />
			{!isServerDown && <Tasks tasks={tasks} setDataUpdate={setDataUpdate} />}
			{isServerDown && (
				<>
					<h1 style={{ color: "red", fontSize: "24px" }}>
						Server is down please try again later
					</h1>
				</>
			)}
		</div>
	);
}

export default App;
