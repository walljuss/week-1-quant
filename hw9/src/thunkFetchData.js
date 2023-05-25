import { createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:3004/tasks/";
// Async thunk action to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Unable to fetch tasks");
	}
});
