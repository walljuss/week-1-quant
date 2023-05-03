import { createDiv } from "./components";
import { weatherComponent } from "./weather";
import { headerComponent } from "./header";
import { tasksComponent } from "./tasks";
import "./App.css";

(function () {
	const rootContainer = document.getElementById("root");
	rootContainer.innerHTML = "";
	const mainContainer = createDiv("main");
	rootContainer.append(mainContainer);

	headerComponent();
	weatherComponent();
	tasksComponent();
})();
