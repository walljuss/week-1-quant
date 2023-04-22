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
