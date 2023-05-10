import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/taskSlice";
import thunk from "redux-thunk";

// Create the store
const store = configureStore({
	reducer: {
		tasks: tasksReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export { store };
