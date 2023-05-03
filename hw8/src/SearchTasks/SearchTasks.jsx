import React from "react";
import "./SearchTasks.css";

function SearchTasks(props) {
	return (
		<div className="inputSearchContainer">
			<input
				type="text"
				id="searchTasks"
				name="searchTasks"
				className="searchInput"
				required
				placeholder="Search Task"
			/>
		</div>
	);
}

export { SearchTasks };
