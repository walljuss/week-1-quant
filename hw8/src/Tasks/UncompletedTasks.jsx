import { TaskItem } from "./TaskItem";
import React from "react";
import { NewTask } from "../NewTask/NewTask";

export const UncompletedTasks = (props) => {
	const { tasks, setDataUpdate } = props;

	const [searchValue, setSearchValue] = useState("");

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
	};

	const filteredTasks = tasks.filter((task) =>
		task.title.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<>
			<div className="searchContainer">
				<SearchTasks
					handleSearchChange={handleSearchChange}
					searchValue={searchValue}
				/>
				<NewTask {...props} />
			</div>

			<div className="allTasksContainer">
				<p className="headerLarge">All Tasks</p>
				<div className="allTaskList">
					{tasks.length > 0 ? (
						<div className="allTaskList">
							{filteredTasks.map((task) => {
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
		</>
	);
};

import { useState } from "react";

const SearchTasks = (props) => {
	const { searchValue, handleSearchChange } = props;
	return (
		<div className="inputSearchContainer">
			<input
				type="text"
				id="searchTasks"
				name="searchTasks"
				className="searchInput"
				required=""
				placeholder="Search Task"
				value={searchValue}
				onChange={handleSearchChange}
			/>
		</div>
	);
};
