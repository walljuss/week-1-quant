import { TaskItem } from "../TaskItem/TaskItem";
import React from "react";
import { useSelector } from "react-redux";
import { selectTasks } from "../../features/taskSlice";

export const CompletedTasks = () => {
	const tasks = useSelector(selectTasks);

	return (
		<div className="completeTasksContainer">
			<p className="headerLarge">Complete Tasks</p>
			<div className="completeTaskList">
				{tasks.length > 0 ? (
					<div className="allTaskList">
						{tasks.map((task) => {
							if (task.isCompleted) {
								return <TaskItem task={task} key={task.id} />;
							}
						})}
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
