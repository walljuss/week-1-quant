import React from "react";
import delImg from "../assets/shape.png";
import { formatDate } from "./utils";
import { deleteTask, updateTask } from "../serverMethods";

async function handleDeleteTask(id) {
	await deleteTask(id);
}

async function handleUpdateTask(id, updatedTask) {
	const data = await updateTask(id, updatedTask);
	setTasks((prevTasks) =>
		prevTasks.map((task) => (task.id === id ? data : task))
	);
}

export const TaskItem = (props) => {
	return (
		<div className="taskItem">
			<CheckboxContainer
				task={props.task}
				setDataUpdate={props.setDataUpdate}
			/>
			<TaskInfoContainer task={props.task} />
			<DelTask id={props.task.id} setDataUpdate={props.setDataUpdate} />
		</div>
	);
};

const CheckboxContainer = (props) => {
	const { task, setDataUpdate } = props;
	const handleChange = () => {
		task.isCompleted = !task.isCompleted;
		updateTask(task.id, task);
		setDataUpdate();
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

const TaskInfoContainer = (props) => {
	return (
		<div className="taskInfo">
			<p className="headerMedium">{props.task.title}</p>
			<div className="taskTypeAndDate">
				<p className={`taskTagType ${props.task.type}Class`}>
					{props.task.type}
				</p>
				<p className="taskDate">{formatDate(props.task.date)}</p>
			</div>
		</div>
	);
};

const DelTask = (props) => {
	const taskId = props.id;
	const handleClick = () => {
		handleDeleteTask(taskId);
		props.setDataUpdate();
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
