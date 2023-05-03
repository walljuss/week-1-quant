import "./App.css";
import { getTasks } from "./serverMethods";
import { useEffect, useState } from "react";
import { Weather } from "./Weather/Weather";
import { NewTask } from "./NewTask/NewTask";
import { Tasks } from "./Tasks/Tasks";
import { SearchTasks } from "./SearchTasks/SearchTasks";

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
			<div className="searchContainer">
				<SearchTasks />
				<NewTask setDataUpdate={setDataUpdate} />
			</div>
			<Tasks tasks={tasks} setTasks={setTasks} setDataUpdate={setDataUpdate} />
		</div>
	);
}

export default App;
