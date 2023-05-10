async function addTask(newTask) {
	try {
		const response = await fetch("http://localhost:3004/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTask),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Unable to add task");
	}
}

async function updateTask(id, updatedTask) {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTask),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function deleteTask(id) {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export { deleteTask, updateTask, addTask };
