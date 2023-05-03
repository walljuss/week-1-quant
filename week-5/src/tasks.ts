import { getTasks, deleteTask, updateTask } from "./serverMethods";
import { taskSort, formatDate } from "./utils";
import { createDiv, createParagraph, createImg } from "./components";
import { searchInputRun } from "./header";
import { Task } from "./interfaces";
import imgSource from "./media/shape.png";
import "./tasks.css";

/**
 * @description function gets "tasks data" from server
 * "tasks data" is rendered
 * "tasks data" is attached to search input element, as search will be done using "tasks data"
 */
async function tasksComponent(): Promise<void> {
	tasksContainerRender();
	getTasks().then((data: Task[]) => {
		renderTasksList(data, tasksComponent);
		searchInputRun(data);
	});
}

/**
 * @description tasks data array is separated into task items and rendered in tasks container
 * */
function renderTasksList(tasksList: Task[], renderFunction: () => void): void {
	taskSort(tasksList);
	const allTasks = document.querySelector(".allTaskList") as HTMLDivElement;
	const completeTasks = document.querySelector(
		".completeTaskList"
	) as HTMLDivElement;
	allTasks.innerHTML = "";
	completeTasks.innerHTML = "";

	//each task is rendered
	tasksList.forEach((task) => {
		taskItemRender(task, allTasks, completeTasks, renderFunction);
	});
}

//each task item render
function taskItemRender(
	task: Task,
	allTaskDiv: HTMLDivElement,
	completeTaskDiv: HTMLDivElement,
	renderFunction: () => void
): void {
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

function createTaskItemContainer(task: Task): HTMLDivElement {
	const taskItemContainer = createDiv("taskItem");
	taskItemContainer.id = task.id;
	return taskItemContainer;
}

function createCheckboxColumn(
	task: Task,
	renderFunction: () => void
): HTMLDivElement {
	const checkboxCol = createDiv("chechboxContainer");
	const checkbox = createCheckbox(task);
	checkbox.addEventListener("change", function (event: Event) {
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

/**
 *
 * @description taskinfo container for: task title, type and date
 */
function createTaskInfo(task: Task): HTMLDivElement {
	const taskInfo = createDiv("taskInfo");
	const taskText = createParagraph("headerMedium");
	taskText.innerHTML = task.title;

	const taskTypeAndDate = createDiv("taskTypeAndDate");
	const taskTagType = createParagraph("taskTagType");
	taskTagType.innerHTML = task.type;
	taskTagType.classList.add(`${task.type}Class`);

	const taskDate = createParagraph("taskDate");
	taskDate.innerHTML = formatDate(task.date);

	taskTypeAndDate.append(taskTagType, taskDate);
	taskInfo.appendChild(taskText);
	taskInfo.append(taskTypeAndDate);

	return taskInfo;
}

function createCheckbox(task: Task): HTMLInputElement {
	const checkbox: HTMLInputElement = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.className = "isCompleted";
	checkbox.checked = task.isCompleted;
	return checkbox;
}

function createDeleteDiv(renderFunction: () => void): HTMLDivElement {
	const delDiv = createDiv("deleteDiv");
	const img = createImg("delButton");
	img.src = imgSource;
	img.addEventListener("click", function (e) {
		e.preventDefault();
		const taskId = (e.target as HTMLElement).parentElement?.parentElement?.id;
		if (taskId) {
			deleteTask(taskId).then(() => {
				renderFunction();
			});
		}
	});
	delDiv.appendChild(img);
	return delDiv;
}
/**
 *
 * @description function returns a container for specifically tasks with 'All Tasks'
 * and 'Complete tasks' parts
 */
function tasksContainerRender(): void {
	const mainContainer = document.querySelector(".main") as HTMLElement;

	// tasks part
	const tasksContainer =
		(document.querySelector(".tasksContainer") as HTMLDivElement | null) ||
		createDiv("tasksContainer");

	const allTasks =
		document.querySelector(".allTasksContainer") ||
		createDiv("allTasksContainer");
	const completeTasks =
		document.querySelector(".completeTasksContainer") ||
		createDiv("completeTasksContainer");

	allTasks.innerHTML = "";
	completeTasks.innerHTML = "";

	// add All Tasks header
	const h1All = createParagraph("headerLarge");
	h1All.innerHTML = "All Tasks";

	// add Complete Tasks header
	const h1Compl = createParagraph("headerLarge");
	h1Compl.innerHTML = "Complete Tasks";

	const allTaskList = createDiv("allTaskList");
	const completeTaskList = createDiv("completeTaskList");
	allTasks.append(h1All, allTaskList);
	completeTasks.append(h1Compl, completeTaskList);

	tasksContainer.append(allTasks, completeTasks);
	mainContainer.appendChild(tasksContainer);
}

/**
 * @description function responsible for the rendering of tasks container when search is done
 * user searches for specific tasks:
 => tasks which does not match the search input => display: none;
 => tasks which match => displayed as it is
 */
function renderTasksDuringSearch(tasks: Task[], input: HTMLInputElement): void {
	const filteredTasks = tasks.filter((task) => {
		return (
			!task.isCompleted &&
			task.title.toLowerCase().includes(input.value.toLowerCase())
		);
	});
	tasks.forEach((task) => {
		if (filteredTasks.indexOf(task) == -1) {
			const taskId = task.id;
			const divDisplay = document.getElementById(taskId) as HTMLDivElement;
			divDisplay.style.display = "none";
		} else {
			const taskId = task.id;
			const divDisplay = document.getElementById(taskId) as HTMLDivElement;
			divDisplay.style.display = "flex";
		}
	});
}

export { tasksComponent, renderTasksDuringSearch, tasksContainerRender };
