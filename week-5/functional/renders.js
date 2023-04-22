//renders tasks when search input is entered/removed/deleted
function renderTasksDuringSearch(tasks, input) {
	const filteredTasks = tasks.filter((task) => {
		return (
			!task.isCompleted &&
			task.title.toLowerCase().includes(input.value.toLowerCase())
		);
	});
	tasks.forEach((task) => {
		if (filteredTasks.indexOf(task) == -1) {
			const taskId = task.id;
			const divDisplay = document.getElementById(taskId);
			divDisplay.style.display = "none";
		}
	});
}

// Create a function to generate the task list, argument is tasks array, container
function renderTasksList(tasksList, renderFunction) {
	taskSort(tasksList);
	const allTasks = document.querySelector(".allTasks");
	const completeTasks = document.querySelector(".completeTasks");
	allTasks.innerHTML = "";
	completeTasks.innerHTML = "";
	//add All Tasks text
	const h1All = document.createElement("h1");
	h1All.innerHTML = "All Tasks";
	allTasks.appendChild(h1All);
	//add Complete Tasks text
	const h1Compl = document.createElement("h1");
	h1Compl.innerHTML = "Complete Tasks";
	completeTasks.appendChild(h1Compl);
	//each task is rendered
	tasksList.forEach((task) => {
		taskItemRender(task, allTasks, completeTasks, renderFunction);
	});
}

//each task item render
function taskItemRender(task, allTaskDiv, completeTaskDiv, renderFunction) {
	const taskItemContainer = createTaskItemContainer(task);
	if (task.isCompleted == false) {
		const checkboxCol = createCheckboxColumn(task, renderFunction);
		const taskInfo = createTaskInfo(task);
		const delDiv = createDeleteDiv(renderFunction);
		taskItemContainer.append(checkboxCol, taskInfo, delDiv);
		allTaskDiv.append(taskItemContainer);
	} else if (task.isCompleted == true) {
		const checkboxCol = createCheckboxColumn(task, renderFunction);
		const taskInfo = createTaskInfo(task);
		taskItemContainer.append(checkboxCol, taskInfo);
		completeTaskDiv.append(taskItemContainer);
	}
}

function createTaskItemContainer(task) {
	const taskItemContainer = document.createElement("div");
	taskItemContainer.className = "taskItem";
	taskItemContainer.id = task.id;
	return taskItemContainer;
}

//
function createCheckboxColumn(task, renderFunction) {
	const checkboxCol = document.createElement("div");
	const checkbox = createCheckbox(task);
	checkbox.addEventListener("change", function (event) {
		event.preventDefault();
		if (task.isCompleted == false) {
			task.isCompleted = true;
		} else {
			task.isCompleted = false;
		}
		updateTask(task.id, task).then(() => {
			renderFunction();
		});
	});
	checkboxCol.appendChild(checkbox);
	return checkboxCol;
}

//create a taskinfo div which contains task title, type and date
function createTaskInfo(task) {
	const taskInfo = document.createElement("div");
	taskInfo.className = "taskInfo";
	const taskText = document.createElement("h2");
	taskText.innerHTML = task.title;
	const taskTypeAndDate = document.createElement("div");
	taskTypeAndDate.className = "taskTypeAndDate";
	const taskTagType = document.createElement("p");
	taskTagType.className = "taskTagType";
	taskTagType.innerHTML = task.type;
	taskTagType.classList.add(`${task.type}Class`);
	const taskDate = document.createElement("p");
	taskDate.className = "taskDate";
	taskDate.innerHTML = formatDate(task.date);
	taskTypeAndDate.append(taskTagType, taskDate);
	taskInfo.appendChild(taskText);
	taskInfo.append(taskTypeAndDate);
	return taskInfo;
}

//create a chechbox for a task item
function createCheckbox(task) {
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.className = "isCompleted";
	checkbox.checked = task.isCompleted;
	return checkbox;
}

//create the delete icon for a task
function createDeleteDiv(renderFunction) {
	const delDiv = document.createElement("div");
	delDiv.className = "deleteDiv";
	const img = document.createElement("img");
	img.src = "./media/Shape.png";
	img.className = "delButton";
	img.addEventListener("click", function (e) {
		e.preventDefault();
		const taskId = e.target.parentElement.parentElement.id;
		deleteTask(taskId).then(() => {
			renderFunction();
		});
	});
	delDiv.appendChild(img);
	return delDiv;
}

//search Input function execution
function searchInputRun(data) {
	if (data !== null) {
		const searchDiv = document.querySelector(".searchInput");
		searchDiv.addEventListener("input", function () {
			if (searchDiv.value === "") {
				const taskListDivs = document.querySelectorAll(".taskItem");
				taskListDivs.forEach((item) => {
					item.style.display = "flex";
				});
			} else {
				renderTasksDuringSearch(data, searchDiv);
			}
		});
	}
}
