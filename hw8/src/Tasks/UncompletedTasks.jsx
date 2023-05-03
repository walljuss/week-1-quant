import { TaskItem } from "./TaskItem";
import React from "react";

export const UncompletedTasks = (props) => {
	const { tasks, setDataUpdate } = props;
	return (
		<div className="allTasksContainer">
			<p className="headerLarge">All Tasks</p>
			<div className="allTaskList">
				{tasks.length > 0 ? (
					<div className="allTaskList">
						{tasks.map((task) => {
							if (!task.isCompleted) {
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
