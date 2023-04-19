function addNewTask(renderFunction) {
	//main div of add new task pop up
	const mainDiv = createElem("div", "taskAddMain");
	const mainForm = createElem("form", "mainForm");

	//parts of main div
	const taskHeader = createElem("div", "tagHeader");
	const taskType = createElem("div", "taskType");
	const taskCancelSubmitBtns = createElem("div", "ifsubmit");

	//text and input field for task text
	const taskTextH2 = document.createElement("h2");
	taskTextH2.innerHTML = "Add New Task";

	//text input fields
	const textInputLabel = createLabel("taskText");
	textInputLabel.className = "textInputLabel";
	const inputText = createInput("text", "taskText");
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

	//radio buttons for task type
	const taskRadios = createTaskRadios();
	taskType.append(taskRadios);

	//date input with label
	const dateLabel = createDateInput();
	taskType.appendChild(dateLabel);
	mainForm.appendChild(taskType);

	//cancel or submit buttons
	const cancelBtn = document.createElement("button");
	cancelBtn.innerHTML = "Cancel";
	cancelBtn.className = "cancelBtn";

	//cancel button event
	cancelBtn.addEventListener("click", (event) => {
		formCancel(event, inputText);
	});

	//submit button create
	const submitBtn = document.createElement("button");
	submitBtn.innerHTML = "Add Task";
	submitBtn.className = "submitBtn";

	//new task submit event
	mainForm.addEventListener("submit", (event) => {
		formSubmit(event, inputText, mainForm, renderFunction);
	});

	//buttons are added to divs etc.
	taskCancelSubmitBtns.append(cancelBtn, submitBtn);
	mainForm.appendChild(taskCancelSubmitBtns);
	mainForm.onsubmit;
	mainDiv.appendChild(mainForm);
	mainDiv.id = "popup";
	mainDiv.style.display = "none";

	return mainDiv;
}

//when cancel button is pressed this event is executed
function formCancel(event, inputText) {
	event.preventDefault();
	inputText.value = "";
	const popup = document.getElementById("popup");
	popup.style.display = "none";
}

//radio buttons of task types, health, home etc.
function createTaskRadios() {
	const taskInfo = document.createElement("div");
	taskInfo.className = "taskRadios";
	//task type with checkboxes
	const taskTypes = ["health", "work", "home", "other"];
	taskTypes.forEach((item) => {
		const label = createLabel(item, "taskInputTag");
		label.innerHTML = item;
		const inputRadio = createInput("radio", item, "typeCheckbox");
		inputRadio.name = "type";
		inputRadio.checked = true;
		taskInfo.appendChild(inputRadio);
		taskInfo.appendChild(label);
	});
	return taskInfo;
}

function createDateInput() {
	const dateLabel = createLabel("dateInput");
	dateLabel.className = "dateInput";
	const dateInput = createInput("date", "dateInput");
	dateInput.valueAsDate = new Date();
	dateLabel.appendChild(dateInput);
	return dateLabel;
}

//when addnewtask form is submitted
function formSubmit(event, inputText, mainForm, renderFunction) {
	event.preventDefault();
	const inputRadio = document.querySelector(".taskInputTag");
	const newTask = {};
	newTask.id = generateId();
	function generateId() {
		const timestamp = Date.now().toString(16);
		const randomString = Math.floor(Math.random() * 16).toString(16);
		return `${timestamp}${randomString}`;
	}

	newTask.title = inputText.value;
	const radioButtons = document.querySelectorAll('input[name="type"]');
	let selectedValue;
	radioButtons.forEach((button) => {
		if (button.checked) {
			selectedValue = button.value;
			newTask.type = document.querySelector(
				`label[for="${button.id}"]`
			).textContent;
		}
	});
	newTask.date = new Date(dateInput.value);
	newTask.isCompleted = false;
	addTask(newTask).then((data) => {
		const popup = document.getElementById("popup");
		popup.style.display = "none";
		mainForm.reset();
		renderFunction();
	});
	const popup = document.getElementById("popup");
	popup.style.display = "none";
	mainForm.reset();
	renderFunction();
}

//element create function
function createElem(tagname, tagclass) {
	const elem = document.createElement(tagname);
	if (tagclass) {
		elem.className = tagclass;
	}

	return elem;
}

//label create function for input labels
function createLabel(labelfor, labelclass) {
	const labelMain = document.createElement("label");
	labelMain.setAttribute("for", labelfor);
	labelMain.className = labelclass;
	return labelMain;
}

//input create functions
function createInput(inputType, inputId, inputClass) {
	const inputMain = document.createElement("input");
	inputMain.type = inputType;
	if (inputId) {
		inputMain.id = inputId;
		inputMain.setAttribute("name", inputId);
	}
	if (inputClass) {
		inputMain.className = inputClass;
	}
	inputMain.required = true;
	return inputMain;
}
