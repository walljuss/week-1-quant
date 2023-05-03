/*
	- newTask component is basically a "form" which accepts a new task data
	- newTask component is not shown when app is first executed as => display: none;
	- only shown (switches to display: flex) when newTask button is pressed 
	- when new task form is submitted or cancelled => (display: none) 
*/

import { Task } from "./interfaces";
import { addTask } from "./serverMethods";
import {
	createDiv,
	createInput,
	createButton,
	createForm,
	createLabel,
} from "./components";
import "./newTask.css";

export function addNewTask(renderFunction: () => void): HTMLDivElement {
	// main div of add new task pop up
	const formContainer = createDiv("taskAddMain");
	const mainForm = createForm("mainForm");

	// parts of main div
	const taskHeader = createDiv("tagHeader");
	const taskType = createDiv("taskType");
	const taskCancelSubmitBtns = createDiv("ifsubmit");

	// text and input field for task text
	const taskTextH2 = document.createElement("h2");
	taskTextH2.innerHTML = "Add New Task";

	// text input fields
	const textInputLabel = createLabel("taskText", "textInputLabel");
	const inputText = createInput("text", "taskText", "textClass");
	inputText.placeholder = "Task Title";
	inputText.addEventListener("input", function () {
		if (inputText.value == "") {
			submitBtn.className = "inactiveBtn";
		} else {
			submitBtn.className = "activeBtn";
		}
	});

	textInputLabel.appendChild(inputText);
	taskHeader.appendChild(taskTextH2);
	taskHeader.appendChild(textInputLabel);
	mainForm.appendChild(taskHeader);

	// radio buttons for task type
	const taskRadios = createTaskRadios();
	taskType.append(taskRadios);

	// date input with label
	const dateLabel = createDateInput();
	taskType.appendChild(dateLabel);
	mainForm.appendChild(taskType);

	// cancel or submit buttons
	const cancelBtn = createButton("cancelBtn");
	cancelBtn.innerHTML = "Cancel";

	// cancel button event
	cancelBtn.addEventListener("click", (event) => {
		formCancel(event, inputText);
	});

	// submit button create
	const submitBtn = createButton("submitBtn");
	submitBtn.innerHTML = "Add Task";

	// new task submit event
	mainForm.addEventListener("submit", (event) => {
		event.preventDefault();
		formSubmit(event, inputText, renderFunction);
	});

	// buttons are added to divs etc.
	taskCancelSubmitBtns.append(cancelBtn, submitBtn);
	mainForm.appendChild(taskCancelSubmitBtns);
	formContainer.appendChild(mainForm);
	formContainer.id = "popup";
	formContainer.style.display = "none";

	return formContainer;
}

function formCancel(event: Event, inputText: HTMLInputElement) {
	event.preventDefault();
	inputText.value = "";
	const popup = document.getElementById("popup");
	if (popup) {
		popup.style.display = "none";
	}
}

function createTaskRadios(): HTMLDivElement {
	const taskInfo: HTMLDivElement = createDiv("taskRadios");
	//task type with checkboxes
	const taskTypes: string[] = ["health", "work", "home", "other"];
	taskTypes.forEach((item: string) => {
		const label: HTMLLabelElement = createLabel(item, "taskInputTag");
		label.innerHTML = item;
		const inputRadio: HTMLInputElement = createInput(
			"radio",
			item,
			"typeCheckbox"
		);
		inputRadio.name = "type";
		inputRadio.checked = true;
		taskInfo.appendChild(inputRadio);
		taskInfo.appendChild(label);
	});
	return taskInfo;
}

function createDateInput(): HTMLLabelElement {
	const dateLabel = createLabel("dateInput", "dateInput");
	const dateInput = createInput(
		"date",
		"dateInput",
		"dateClass"
	) as HTMLInputElement;
	dateInput.valueAsDate = new Date();
	dateLabel.appendChild(dateInput);
	return dateLabel;
}

function formSubmit(
	event: Event,
	inputText: HTMLInputElement,
	renderFunction: () => void
): void {
	event.preventDefault();
	const newTask: Task = {} as Task;
	newTask.id = generateId();

	function generateId(): string {
		const timestamp = Date.now().toString(16);
		const randomString = Math.floor(Math.random() * 16).toString(16);
		return `${timestamp}${randomString}`;
	}

	newTask.title = inputText.value;
	const radioButtons =
		document.querySelectorAll<HTMLInputElement>('input[name="type"]');
	radioButtons.forEach((button) => {
		if (button.checked) {
			newTask.type = document.querySelector(
				`label[for="${button.id}"]`
			)!.textContent!;
		}
	});

	const dateInput = document.getElementById("dateInput");
	newTask.date = new Date((dateInput as HTMLInputElement).value);
	newTask.isCompleted = false;
	addTask(newTask).then((data) => {
		const popup = document.getElementById("popup")!;
		popup.style.display = "none";
		inputText.value = "";
		renderFunction();
	});
}
