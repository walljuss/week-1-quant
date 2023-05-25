import { TaskItem } from "../TaskItem/TaskItem";
import React from "react";

export const CompletedTasks = (props) => {
	const { tasks, setDataUpdate } = props;

	return (
		<div className="completeTasksContainer">
			<p className="headerLarge">Complete Tasks</p>
			<div className="completeTaskList">
				{tasks.length > 0 ? (
					<div className="allTaskList">
						{tasks.map((task) => {
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
	);
};
