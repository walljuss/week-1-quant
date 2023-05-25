import React from "react";
import delImg from "../assets/shape.png";
import { formatDate } from "../utils";
import { deleteTask, updateTask } from "../../serverMethods";
import { useState } from "react";

async function handleDeleteTask(id) {
	await deleteTask(id);
}

const TaskList = (props) => {
	const { tasks, setDataUpdate } = props;

	const [searchValue, setSearchValue] = useState("");

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
	};

	const filteredTasks = tasks.filter(
		(task) =>
			!task.isComplete &&
			task.title.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<>
			<SearchTask
				searchValue={searchValue}
				handleSearchChange={handleSearchChange}
			/>
			<div className="completeTasksContainer">
				<p className="headerLarge">Complete Tasks</p>
				<div className="completeTaskList">
					{filteredTasks.length > 0 ? (
						<div className="allTaskList">
							{filteredTasks.map((task) => {
								if (task.isCompleted) {
									return (
										<TaskItem
											task={task}
											key={task.id}
											setDataUpdate={setDataUpdate}
										/>
									);
								}
							})}
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
};

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
