(function () {
	let tasks = JSON.parse(localStorage.getItem("tasks"));

	if (!tasks) {
		tasks = [
			{
				id: 1,
				text: "To do sth",
				type: "health",
				date: new Date(),
				complete: true,
			},
			{
				id: 2,
				text: "not to do sth",
				type: "work",
				date: new Date(),
				complete: false,
			},
			{
				id: 3,
				text: "Completed",
				type: "work",
				date: new Date(),
				complete: true,
			},
			{
				id: 4,
				text: "not to do sth",
				type: "work",
				date: new Date(),
				complete: false,
			},
		];
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	/**
	 * Global application state
	 * @template T
	 * @param {T} initialValue
	 * @returns {[T, function(T): void]}
	 */
	// function useState(initialValue) {
	// 	state = state || initialValue;

	// 	function setValue(newValue) {
	// 		state = newValue;
	// 		renderApp();
	// 	}

	// 	return [state, setValue];
	// }

	//the search input field
	function searchInput() {
		const searchInput = document.createElement("input");
		searchInput.className = "searchInput";
		searchInput.type = "text";
		searchInput.placeholder = "Search Task";
		const taskDiv = document.getElementById("root");
		return searchInput;
	}

	//renders tasks when search input is entered/removed/deleted
	function renderTasks(tasks, input) {
		const filteredTasks = tasks.filter((task) => {
			return (
				!task.complete &&
				task.text.toLowerCase().includes(input.value.toLowerCase())
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

	//sorting tasks array according to objects
	function taskSort() {
		tasks.sort((a, b) => {
			date1 = new Date(a.date);
			date2 = new Date(b.date);
			return date1 - date2;
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

	// Create a function to generate the task list, argument is tasks array
	function createTaskList(tasksList) {
		const divAllTasks = document.createElement("div");
		divAllTasks.className = "AllTasks";
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
		taskSort();
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
			taskText.innerHTML = task.text;
			const taskMis = document.createElement("div");
			taskMis.className = "taskExtraInfo";
			const taskTag = document.createElement("p");
			taskTag.className = "taskTag";
			taskTag.innerHTML = task.type;
			const taskDate = document.createElement("p");
			taskDate.className = "taskDate";
			taskDate.innerHTML = formatDate(task.date);

			if (task.complete == false) {
				checkbox.className = "ifComplete";
				checkbox.addEventListener("change", function (event) {
					task.complete = true;
					localStorage.setItem("tasks", JSON.stringify(tasks));
					renderApp();
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
					const taskId = event.target.parentElement.parentElement.id;
					tasks = tasks.filter((item) => item.id !== task.id);
					localStorage.setItem("tasks", JSON.stringify(tasks));
					renderApp();
				});

				delDiv.appendChild(img);
				taskItemContainer.append(delDiv);
				divIncomplete.appendChild(taskItemContainer);
			} else if (task.complete == true) {
				checkbox.className = "ifComplete";
				checkbox.addEventListener("change", function (event) {
					task.complete = false;
					localStorage.setItem("tasks", JSON.stringify(tasks));
					renderApp();
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
		return divAllTasks;
	}

	/**
	 * Functional component for the list
	 * @param items {string[]}
	 * @returns {HTMLElement} - List element
	 */
	// function List({ items }) {
	// 	const listItems = items.map((item) => `<li>${item}</li>`).join("");
	// 	const ul = document.createElement("ul");
	// 	ul.innerHTML = listItems;
	// 	return ul;
	// }

	/**
	 * Button component
	 * @param text {string}
	 * @param onClick {function}
	 * @returns {HTMLButtonElement} - Button element
	 */
	function Button({ text, onClick }) {
		const button = document.createElement("button");
		button.innerHTML = text;
		button.onclick = onClick;
		return button;
	}

	/**
	 * App container
	 * @returns {HTMLDivElement} - The app container
	 */

	function App() {
		// const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

		// function addItem() {
		// 	setItems([...items, `Item ${items.length + 1}`]);
		// }

		//the header todo list
		const h1 = document.createElement("h1");
		h1.innerHTML = "To Do List";

		//searchinput with new task button
		const searchButton = document.createElement("div");
		searchButton.className = "searchButton";
		const searchDiv = searchInput();
		const button = Button({
			text: "+ New Task",
			onClick: function () {
				const displaySwitch = document.getElementById("popup");
				displaySwitch.style.display = "flex";
			},
		});
		button.className = "newTaskButton";
		searchButton.append(searchDiv, button);

		const taskDiv = document.createElement("div");

		tasks = JSON.parse(localStorage.getItem("tasks"));
		const taskList = createTaskList(tasks);

		taskDiv.append(h1, searchButton, taskList);
		taskDiv.className = "taskDiv";
		return taskDiv;
	}

	/**
	 * Render the app.
	 * On change whole app is re-rendered.
	 */
	function renderApp() {
		//the task list is shown in functional example
		const appContainer = document.getElementById("functional-example");
		appContainer.innerHTML = "";
		appContainer.append(App());

		//new task adding modal is added to root, (popup)
		const popupContainer = document.getElementById("root");
		popupContainer.innerHTML = "";
		const popUp = addNewTask(tasks, renderApp);
		popupContainer.appendChild(popUp);

		//after all divs are rendered, the search input is executed
		const searchInp = document.querySelector(".searchInput");
		searchInp.addEventListener("input", function () {
			if (searchInp.value === "") {
				const taskListDivs = document.querySelectorAll(".taskItemRendered");
				taskListDivs.forEach((taskDiv) => {
					taskDiv.style.display = "flex";
				});
			} else {
				renderTasks(tasks, searchInp);
			}
		});
	}

	renderApp();
})();
