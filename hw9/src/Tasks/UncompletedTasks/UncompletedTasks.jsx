import { TaskItem } from "../TaskItem/TaskItem";
import React from "react";
import { NewTask } from "../../NewTask/NewTask";
import { useSelector } from "react-redux";
import { selectTasks } from "../../features/taskSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const UncompletedTasks = (props) => {
	const tasks = useSelector(selectTasks);
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState("");

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
		if (searchValue) {
			navigate(`/tasks/search-term/${searchValue}`);
		}
	};

	useEffect(() => {
		if (searchValue === "") {
			navigate(`/tasks/`);
		}
	}, [searchValue, navigate]);

	let filteredTasks = [];
	if (tasks.length > 0) {
		filteredTasks = tasks.filter((task) =>
			task.title.toLowerCase().includes(searchValue.toLowerCase())
		);
	}

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
									return <TaskItem task={task} key={task.id} />;
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
