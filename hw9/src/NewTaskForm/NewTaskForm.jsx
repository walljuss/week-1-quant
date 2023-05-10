import React from "react";
import "./NewTaskForm.css";
import { fetchTasks } from "../thunkFetchData";
import { addTask } from "../serverMethods";
import { useDispatch } from "react-redux";

const NewTaskForm = ({ setIsFormActive }) => {
	return (
		<div className="taskAddMain" id="popup">
			<TaskForm setIsFormActive={setIsFormActive} />
		</div>
	);
};

const TaskForm = ({ setIsFormActive }) => {
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newTask = Object.fromEntries(formData);
		newTask.isCompleted = false;
		addTask(newTask);
		dispatch(fetchTasks());
		setIsFormActive(false);
	};

	return (
		<form onSubmit={handleSubmit} className="mainForm">
			<TaskHeader />
			<TaskType />
			<TaskSubmit setIsFormActive={setIsFormActive} />
		</form>
	);
};

const TaskHeader = () => {
	return (
		<div className="tagHeader">
			<h2>Add New Task</h2>
			<label htmlFor="taskText" className="textInputLabel">
				<input
					type="text"
					id="titleInput"
					name="title"
					className="textClass"
					placeholder="Task Title"
					required
				/>
			</label>
		</div>
	);
};

const TaskType = () => {
	return (
		<div className="taskType">
			<TaskRadios />
			<label htmlFor="dateInput" className="dateInput">
				<input
					type="date"
					id="dateInput"
					name="date"
					className="dateClass"
					required
					defaultValue={new Date()}
				/>
			</label>
		</div>
	);
};

const TaskRadios = () => {
	return (
		<div className="taskRadios">
			<input
				type="radio"
				id="health"
				name="type"
				className="typeCheckbox"
				value="health"
				defaultChecked
			/>
			<label htmlFor="health" className="taskInputTag">
				health
			</label>
			<input
				type="radio"
				id="work"
				name="type"
				className="typeCheckbox"
				value="work"
			/>
			<label htmlFor="work" className="taskInputTag">
				work
			</label>
			<input
				type="radio"
				id="home"
				name="type"
				className="typeCheckbox"
				value="home"
			/>
			<label htmlFor="home" className="taskInputTag">
				home
			</label>
			<input
				type="radio"
				id="other"
				name="type"
				className="typeCheckbox"
				value="other"
			/>
			<label htmlFor="other" className="taskInputTag">
				other
			</label>
		</div>
	);
};

function TaskSubmit({ setIsFormActive }) {
	const handleCancel = () => {
		setIsFormActive(false);
	};
	return (
		<div className="taskSubmit">
			<button type="button" className="cancelBtn" onClick={handleCancel}>
				Cancel
			</button>
			<button type="submit" className="submitBtn">
				Add Task
			</button>
		</div>
	);
}

export default NewTaskForm;
