function addNewTask(taskContainer, renderFunction) {
	//main div of add new task pop up
	const mainDiv = createTag("div", "taskAddMain");
	const mainForm = createTag("form", "mainForm");

	//parts of main div
	const taskHeader = createTag("div", "tagHeader");
	const taskProps = createTag("div", "taskType");
	const taskBtns = createTag("div", "ifsubmit");

	//text and input field for task text
	const taskInputText = document.createElement("h2");
	taskInputText.innerHTML = "Add New Task";

	const textInputLabel = createLabel("taskInputText");
	textInputLabel.className = "textInputLabel";
	const inputText = createInput("text", "taskInputText");
	inputText.placeholder = "Task Title";
	inputText.addEventListener("input", function () {
		if (inputText.value == "") {
			submitBtn.className = "inactiveBtn";
		} else {
			submitBtn.className = "activeBtn";
		}
	});

	textInputLabel.appendChild(inputText);
	taskHeader.appendChild(taskInputText);

	taskHeader.appendChild(textInputLabel);
	mainForm.appendChild(taskHeader);

	const taskMis = document.createElement("div");
	taskMis.className = "taskRadios";
	//task type with checkboxes
	const taskPropsTexts = ["health", "work", "home", "other"];
	taskPropsTexts.forEach((item) => {
		const label = createLabel(item, "taskInputTag");
		label.innerHTML = item;
		const inputRadio = createInput("radio", item, "typeCheckbox");
		inputRadio.name = "type";
		inputRadio.checked = true;
		taskMis.appendChild(inputRadio);
		taskMis.appendChild(label);
	});
	taskProps.append(taskMis);

	//date input field
	const dateLabel = createLabel("dateInput");
	dateLabel.className = "dateInput";
	const dateInput = createInput("date", "dateInput");
	dateInput.valueAsDate = new Date();
	dateLabel.appendChild(dateInput);
	taskProps.appendChild(dateLabel);
	mainForm.appendChild(taskProps);

	//cancel or submit
	const cancelBtn = document.createElement("button");
	cancelBtn.innerHTML = "Cancel";
	cancelBtn.className = "cancelBtn";

	cancelBtn.addEventListener("click", function (event) {
		event.preventDefault();
		inputText.value = "";
		const popup = document.getElementById("popup");
		popup.style.display = "none";
	});
	const submitBtn = document.createElement("button");
	submitBtn.innerHTML = "Add Task";
	submitBtn.className = "submitBtn";

	mainForm.addEventListener("submit", function (event) {
		event.preventDefault();
		const inputRadio = document.querySelector(".taskInputTag");
		const newTask = {};
		newTask.id = generateId();
		function generateId() {
			const timestamp = Date.now().toString(16);
			const randomString = Math.floor(Math.random() * 16).toString(16);
			return `${timestamp}${randomString}`;
		}

		newTask.text = inputText.value;

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
		newTask.complete = false;
		taskContainer.push(newTask);
		localStorage.setItem("tasks", JSON.stringify(taskContainer));
		const popup = document.getElementById("popup");
		popup.style.display = "none";
		mainForm.reset();
		renderFunction();
	});

	taskBtns.append(cancelBtn, submitBtn);
	mainForm.appendChild(taskBtns);
	mainForm.onsubmit;
	mainDiv.appendChild(mainForm);
	mainDiv.id = "popup";
	mainDiv.style.display = "none";

	return mainDiv;
}

function createTag(tagname, tagclass) {
	const elem = document.createElement(tagname);
	if (tagclass) {
		elem.className = tagclass;
	}

	return elem;
}

function createLabel(labelfor, labelclass) {
	const labelMain = document.createElement("label");
	labelMain.setAttribute("for", labelfor);
	labelMain.className = labelclass;
	return labelMain;
}

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
