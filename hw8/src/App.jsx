import "./App.css";
import { getTasks } from "./serverMethods";
import { useEffect, useState } from "react";
import { Weather } from "./Weather/Weather";
import { NewTask } from "./NewTask/NewTask";
import { Tasks } from "./Tasks/Tasks";

function App() {
	const [tasks, setTasks] = useState([]);
	const [newData, setNewData] = useState(0);
	const setDataUpdate = () => {
		setNewData(!newData);
	};

	useEffect(() => {
		async function fetchData() {
			const data = await getTasks();
			setTasks(data);
		}
		fetchData();
	}, [newData]);

	return (
		<div className="main">
			<h1>To Do List</h1>
			<Weather />
			<Tasks tasks={tasks} setDataUpdate={setDataUpdate} />
		</div>
	);
}

export default App;
