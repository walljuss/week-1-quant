import React from "react";
import delImg from "../assets/shape.png";
import { formatDate } from "../utils";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../thunkFetchData";
import { deleteTask, updateTask } from "../../serverMethods";

//task component
export const TaskItem = ({ task }) => {
	return (
		<div className="taskItem">
			<CheckboxContainer task={task} />
			<TaskInfoContainer task={task} />
			<DelTask task={task} />
		</div>
	);
};

const CheckboxContainer = ({ task }) => {
	const newTask = { ...task };
	const dispatch = useDispatch();
	const handleChange = () => {
		newTask.isCompleted = !newTask.isCompleted;
		updateTask(newTask.id, newTask);
		dispatch(fetchTasks());
	};
	return (
		<div className="checkboxContainer">
			<input
				type="checkbox"
				className="isCompleted"
				checked={task.isCompleted}
				onChange={handleChange}
			/>
		</div>
	);
};

const TaskInfoContainer = ({ task }) => {
	return (
		<div className="taskInfo">
			<p className="headerMedium">{task.title}</p>
			<div className="taskTypeAndDate">
				<p className={`taskTagType ${task.type}Class`}>{task.type}</p>
				<p className="taskDate">{formatDate(task.date)}</p>
			</div>
		</div>
	);
};

const DelTask = ({ task }) => {
	const taskId = task.id;
	const dispatch = useDispatch();
	const handleClick = () => {
		deleteTask(taskId);
		dispatch(fetchTasks());
	};
	return (
		<div className="deleteTaskContainer">
			<img
				className="delButton"
				src={delImg}
				alt="Delete"
				onClick={handleClick}
			/>
		</div>
	);
};
