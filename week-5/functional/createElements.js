//main container is where all todo app related div is located
function mainContainerCreate(renderFunction) {
	//main div which contain header, search input, tasks list
	const mainDiv = document.createElement("div");
	mainDiv.classList = "main";

	//To Do App header
	const headerDiv = document.createElement("div");
	headerDiv.classList = "header";
	const h1 = document.createElement("h1");
	h1.innerHTML = "To Do List";
	headerDiv.append(h1);

	//searchDiv with new Button
	const searchDiv = searchDivCreate(renderFunction);

	//tasks container
	const tasksDiv = tasksDivCreate();

	mainDiv.append(headerDiv, searchDiv, tasksDiv);

	return mainDiv;
}

function tasksDivCreate() {
	//tasks part
	const tasksDiv = document.createElement("div");
	tasksDiv.classList = "tasksDiv";

	//allTasks
	const allTasks = document.createElement("div");
	allTasks.classList = "allTasks";

	//CompleteTasks
	const completeTasks = document.createElement("div");
	completeTasks.classList = "completeTasks";

	tasksDiv.append(allTasks, completeTasks);
	return tasksDiv;
}

//the input related to new task is added to root div with display:none
function addNewTaskDivToRoot(renderFunction) {
	const popupContainer = document.getElementById("root");
	popupContainer.innerHTML = "";
	const popUp = addNewTask(renderFunction);
	popupContainer.appendChild(popUp);
}

//search Div contains search input and add new task button
function searchDivCreate(renderFunction) {
	const searchDiv = document.createElement("div");
	searchDiv.className = "searchDiv";

	const textInputSearch = document.createElement("div");
	textInputSearch.className = "inputSearchContainer";
	//add new task div is added to root but with display: none;
	addNewTaskDivToRoot(renderFunction);

	//button for new task addition
	const newTaskButton = addNewTaskButtonCreate();

	//both searchInput and newtaskbutton added to searchDiv
	searchDiv.append(textInputSearch, newTaskButton);

	return searchDiv;
}

//new task button
function addNewTaskButtonCreate() {
	const button = Button({
		text: "+ New Task",
		onClick: function () {
			const displaySwitch = document.getElementById("popup");
			displaySwitch.style.display = "flex";
		},
	});
	button.className = "newTaskButton";
	return button;
}

//weather visual part of the app
function weatherDivCreate() {
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

//the search input field
function searchInputCreate() {
	const searchInput = document.createElement("input");
	searchInput.className = "searchInput";
	searchInput.type = "text";
	searchInput.placeholder = "Search Task";
	return searchInput;
}
