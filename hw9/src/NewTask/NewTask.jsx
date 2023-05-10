import React from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import "./NewTask.css";
import { useState } from "react";

export const NewTask = () => {
	const [isFormActive, setIsFormActive] = useState(false);

	const handleClick = () => {
		setIsFormActive(true);
	};
	return (
		<>
			<button className="newTaskButton" onClick={handleClick}>
				+New Task
			</button>
			{isFormActive && <NewTaskForm setIsFormActive={setIsFormActive} />}
		</>
	);
};
