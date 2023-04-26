function createDiv(divClass: string): HTMLDivElement {
	const divContainer = document.createElement("div");
	divContainer.className = divClass;
	return divContainer;
}

function createImg(imgClass: string): HTMLImageElement {
	const imgContainer = document.createElement("img");
	imgContainer.className = imgClass;
	return imgContainer;
}

function createParagraph(pClass: string): HTMLParagraphElement {
	const pContainer = document.createElement("p");
	pContainer.className = pClass;
	return pContainer;
}

function createButton(buttonClass: string): HTMLButtonElement {
	const button = document.createElement("button");
	button.className = buttonClass;
	return button;
}

function createSpan(spanClass: string): HTMLSpanElement {
	const spanContainer = document.createElement("span");
	spanContainer.className = spanClass;
	return spanContainer;
}

function createForm(formClass: string): HTMLFormElement {
	const formContainer = document.createElement("form");
	formContainer.className = formClass;
	return formContainer;
}

/**
 *
 * @param {string} labelFor - for attribute of label
 * @returns label html element
 */
function createLabel(labelFor: string, labelClass: string): HTMLLabelElement {
	const labelContainer = document.createElement("label");
	labelContainer.setAttribute("for", labelFor);
	labelContainer.className = labelClass;
	return labelContainer;
}

/**
 *
 * @param {string} inputType - required argument
 * @param {string} inputId - if argument with 'noId' is passed input won't contain any id
 * @param {string} inputClass - if argument with 'noClass' is passed no class is applied
 * @returns html input tag
 */
function createInput(
	inputType: string,
	inputId: string,
	inputClass: string
): HTMLInputElement {
	const inputContainer = document.createElement("input");
	inputContainer.type = inputType;
	if (inputId !== "noId") {
		inputContainer.id = inputId;
		inputContainer.setAttribute("name", inputId);
	}
	if (inputClass !== "noClass") {
		inputContainer.className = inputClass;
	}
	inputContainer.required = true;
	return inputContainer;
}

export {
	createDiv,
	createButton,
	createInput,
	createLabel,
	createParagraph,
	createImg,
	createSpan,
	createForm,
};
