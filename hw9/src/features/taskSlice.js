import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../thunkFetchData";

const url = "http://localhost:3004/tasks/";
const tasksSlice = createSlice({
	name: "tasks",
	initialState: {
		tasks: [],
		isServerDown: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		const fetchTasksFulfilledHandler = (state, action) => {
			state.tasks = action.payload;
			state.isServerDown = false;
		};

		const fetchTasksRejectedHandler = (state) => {
			state.isServerDown = true;
		};

		builder
			.addCase(fetchTasks.fulfilled, fetchTasksFulfilledHandler)
			.addCase(fetchTasks.rejected, fetchTasksRejectedHandler);
	},
});

export const { setRerender } = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.tasks;
export const selectIsServerDown = (state) => state.tasks.isServerDown;

export default tasksSlice.reducer;
