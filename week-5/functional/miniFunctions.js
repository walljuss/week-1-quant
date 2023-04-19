//sorting tasks array according to objects
function taskSort(tasks) {
	tasks.sort((a, b) => {
		const date1 = new Date(a.timestamp);
		const date2 = new Date(b.timestamp);
		return date1.getTime() - date2.getTime();
	});
}

function Button({ text, onClick }) {
	const button = document.createElement("button");
	button.innerHTML = text;
	button.onclick = onClick;
	return button;
}

//renders tasks when search input is entered/removed/deleted
function renderTasks(tasks, input) {
	const filteredTasks = tasks.filter((task) => {
		return (
			!task.complete &&
			task.title.toLowerCase().includes(input.value.toLowerCase())
		);
	});
	tasks.forEach((task) => {
		if (filteredTasks.indexOf(task) == -1 && !task.complete) {
			const taskId = task.id;
			const divDisplay = document.getElementById(taskId);
			divDisplay.style.display = "none";
		}
	});
}

//formats the date so that will show date as either yesterday, today, tomorrow or
//as day month
function formatDate(date) {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);

	dateNew = new Date(date);

	if (dateNew.toDateString() === today.toDateString()) {
		return "Today";
	} else if (dateNew.toDateString() === yesterday.toDateString()) {
		return "Yesterday";
	} else if (dateNew.toDateString() === tomorrow.toDateString()) {
		return "Tomorrow";
	} else {
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const dayName = days[dateNew.getDay()];
		const nameMonth = dateNew.toLocaleString("default", { month: "short" });
		const dayMonth = dateNew.getDate();
		return `${dayName}, ${dayMonth} ${nameMonth}`;
	}
}

//the search input field
function searchInput() {
	const searchInput = document.createElement("input");
	searchInput.className = "searchInput";
	searchInput.type = "text";
	searchInput.placeholder = "Search Task";
	const taskDiv = document.getElementById("root");
	return searchInput;
}

// Create a function to generate the task list, argument is tasks array, container, and renderFunction
function createTaskList(tasksList, container, renderFunction) {
	const divAllTasks = document.querySelector(`.${container}`);
	divAllTasks.innerHTML = "";
	divIncomplete = document.createElement("div");
	divIncomplete.className = "incompleteTasks";
	divComplete = document.createElement("div");
	divComplete.className = "divComplete";
	const allTaskText = document.createElement("h2");
	allTaskText.innerHTML = "All Tasks";
	const CompleteText = document.createElement("h2");
	CompleteText.innerHTML = "Completed Tasks";
	divIncomplete.appendChild(allTaskText);
	divComplete.appendChild(CompleteText);
	taskSort(tasksList);
	tasksList.forEach((task) => {
		//task container
		const taskItemContainer = document.createElement("div");
		taskItemContainer.className = "taskItemRendered";
		taskItemContainer.id = task.id;
		//chechbox column
		const checkboxCol = document.createElement("div");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		//task related info, name, type, date
		const taskInfo = document.createElement("div");
		taskInfo.className = "taskInfo";
		const taskText = document.createElement("h2");
		taskText.innerHTML = task.title;
		const taskMis = document.createElement("div");
		taskMis.className = "taskExtraInfo";
		const taskTag = document.createElement("p");
		taskTag.className = "taskTag";
		taskTag.innerHTML = task.type;
		const taskDate = document.createElement("p");
		taskDate.className = "taskDate";
		taskDate.innerHTML = formatDate(task.date);
		if (task.isCompleted == false) {
			checkbox.className = "ifComplete";
			checkbox.addEventListener("change", function (event) {
				task.isCompleted = true;
				updateTask(task.id, task).then(() => {
					renderFunction();
				});
			});
			checkboxCol.appendChild(checkbox);
			taskItemContainer.appendChild(checkboxCol);
			taskInfo.appendChild(taskText);
			taskTag.classList.add(`${task.type}Class`);
			taskMis.append(taskTag, taskDate);
			taskInfo.append(taskMis);
			taskItemContainer.appendChild(taskInfo);

			const delDiv = document.createElement("div");
			delDiv.className = "deleteDiv";
			const img = document.createElement("img");
			img.src = "./media/Shape.png";
			img.className = "delButton";
			img.addEventListener("click", function (event) {
				event.preventDefault();
				const taskId = event.target.parentElement.parentElement.id;
				deleteTask(taskId);
				renderFunction();
			});

			delDiv.appendChild(img);
			taskItemContainer.append(delDiv);
			divIncomplete.appendChild(taskItemContainer);
		} else if (task.isCompleted == true) {
			checkbox.className = "ifComplete";
			checkbox.addEventListener("change", function (event) {
				task.isCompleted = false;
				updateTask(task.id, task).then(() => {
					renderFunction();
				});
			});
			checkbox.checked = true;
			checkboxCol.appendChild(checkbox);
			taskItemContainer.appendChild(checkboxCol);
			taskInfo.appendChild(taskText);
			taskMis.append(taskTag, taskDate);
			taskInfo.append(taskMis);
			taskItemContainer.appendChild(taskInfo);

			divComplete.appendChild(taskItemContainer);
		}
	});
	divAllTasks.append(divIncomplete, divComplete);
}

function searchInputRun(data) {
	const searchDiv = document.querySelector(".searchInput");
	searchDiv.addEventListener("input", function () {
		if (searchDiv.value === "") {
			const taskListDivs = document.querySelectorAll(".taskItemRendered");
			taskListDivs.forEach((item) => {
				item.style.display = "flex";
			});
		} else {
			renderTasks(data, searchDiv);
		}
	});
}

function weatherDiv() {
	//weather visual part of the app
	const weatherContainer = document.createElement("div");
	weatherContainer.className = "weatherDiv";
	const weatherImg = document.createElement("img");
	weatherImg.className = "weatherImg";
	const weatherInfo = document.createElement("div");
	weatherInfo.className = "weatherInfo";
	const weatherLocation = document.createElement("span");
	weatherLocation.className = "weatherLocation";
	const weatherTemp = document.createElement("span");
	weatherTemp.className = "weatherTemp";
	weatherInfo.append(weatherTemp, weatherLocation);
	weatherContainer.append(weatherImg, weatherInfo);
	return weatherContainer;
}

function headerTodo(renderFunction) {
	//the header todo list
	const taskDiv = document.createElement("div");
	const headerToDo = document.createElement("div");
	headerToDo.className = "headerToDo";
	const h1 = document.createElement("h1");
	h1.innerHTML = "To Do List";

	//searchinput with new task button
	const searchButton = document.createElement("div");
	searchButton.className = "searchButton";
	const searchDiv = searchInput();

	//temporary
	const popupContainer = document.getElementById("root");
	popupContainer.innerHTML = "";
	const popUp = addNewTask(renderFunction);
	popupContainer.appendChild(popUp);

	const button = Button({
		text: "+ New Task",
		onClick: function () {
			const displaySwitch = document.getElementById("popup");
			displaySwitch.style.display = "flex";
		},
	});

	button.className = "newTaskButton";
	searchButton.append(searchDiv, button);
	headerToDo.append(h1);
	taskDiv.append(headerToDo, searchButton);
	const taskListDiv = document.createElement("div");
	taskListDiv.className = "allTasksDiv";
	taskDiv.append(taskListDiv);
	return taskDiv;
}
