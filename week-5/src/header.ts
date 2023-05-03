import { addNewTask } from "./newTask";
import {
	createDiv,
	createParagraph,
	createButton,
	createInput,
} from "./components";
import { tasksComponent, renderTasksDuringSearch } from "./tasks";
import "./header.css";
import { Task } from "./interfaces";

/**
 * @description headerComponent is a component responsible
 * for header text, search tasks input, and new task button
 */
function headerComponent(): void {
	headerContainers(tasksComponent);
}

/**
 *
 * @description function appends headerText and search input containers to main container
 */
function headerContainers(renderFunction: () => void): void {
	// main div which contain header, search input, tasks list
	const mainDiv: HTMLElement = document.querySelector(".main");

	// To Do App header
	const headerDiv: HTMLElement = createDiv("header");
	const h1: HTMLElement = createParagraph("headerExtraLarge");
	h1.innerHTML = "To Do List";
	headerDiv.append(h1);

	// searchDiv with new Button
	const searchContainer: HTMLElement = searchContainerCreate(renderFunction);

	mainDiv.append(headerDiv, searchContainer);
}

/**
 *
 * @description form that is used for adding new task is added to root div
 * but with display: none, whenever the +New Task button is pressed display:flex;
 */
function addNewTaskComponentToRoot(renderFunction: () => void): void {
	const popupContainer = document.getElementById("root");
	const popUp = addNewTask(renderFunction);
	popupContainer.appendChild(popUp);
}

/**
 *
 * @description function return a searchContainer located in header part of the app;
 * this container contains seachinput and a newTask button
 */
function searchContainerCreate(renderFunction: () => void): HTMLDivElement {
	const searchContainer: HTMLDivElement = createDiv("searchContainer");
	const textInputSearch: HTMLDivElement = createDiv("inputSearchContainer");

	searchContainer.innerHTML = "";
	const searchInput: HTMLInputElement = searchInputCreate();
	textInputSearch.appendChild(searchInput);

	// add new task div is added to root but with display: none;
	addNewTaskComponentToRoot(renderFunction);

	// button for new task addition
	const newTaskButton: HTMLButtonElement = addNewTaskButtonCreate();

	// both searchInput and newtaskbutton added to searchDiv
	searchContainer.append(textInputSearch, newTaskButton);
	return searchContainer;
}

/**
 *
 * @description function returns a newTask button, when pressed the form for accepting
 * new task is shown (display:none => display: flex)
 */
function addNewTaskButtonCreate(): HTMLButtonElement {
	const button = createButton("newTaskButton");
	button.innerHTML = "+ New Task";
	button.addEventListener("click", () => {
		const displaySwitch = document.getElementById("popup");
		displaySwitch.style.display = "flex";
	});
	return button;
}

/**
 *
 * @description function is is basically attaches data to search input, search is done using the data argument(data is array of tasks)
 */
function searchInputRun(tasks: Task[]): void {
	const searchContainer = document.querySelector(
		".searchInput"
	) as HTMLInputElement;
	searchContainer.addEventListener("input", function () {
		if (searchContainer.value === "") {
			const taskListDivs = document.querySelectorAll(".taskItem");
			taskListDivs.forEach((item: HTMLElement) => {
				item.style.display = "flex";
			});
		} else {
			renderTasksDuringSearch(tasks, searchContainer); // value.trim()?
		}
	});
}

/**
 *
 * @returns input(type:text) html element which is used for searching tasks
 */
function searchInputCreate(): HTMLInputElement {
	const searchInput = createInput(
		"text",
		"searchTasks",
		"searchInput"
	) as HTMLInputElement;
	searchInput.type = "text";
	searchInput.placeholder = "Search Task";
	return searchInput;
}

export { searchInputCreate, searchInputRun, headerComponent };
