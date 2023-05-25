import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "./thunk";

function TaskList() {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks.tasks);

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	const handleDeleteTask = (taskId) => {
		dispatch(deleteTask(taskId));
	};

	return (
		<div>
			<h2>Completed Tasks</h2>
			{tasks
				.filter((task) => task.isCompleted)
				.map((task) => (
					<div key={task.id}>
						<input type="checkbox" checked readOnly />
						{task.title}
						<button onClick={() => handleDeleteTask(task.id)}>Delete</button>
					</div>
				))}

			<h2>Incompleted Tasks</h2>
			{tasks
				.filter((task) => !task.isCompleted)
				.map((task) => (
					<div key={task.id}>
						<input type="checkbox" />
						{task.title}
						<button onClick={() => handleDelete(task.id)}>Delete</button>
					</div>
				))}
		</div>
	);
}

export default TaskList;
