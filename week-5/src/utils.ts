import { Task } from "./interfaces";

function taskSort(tasks: Task[]): void {
	tasks.sort((a: Task, b: Task) => {
		const date1: Date = new Date(a.date);
		const date2: Date = new Date(b.date);
		return date1.getTime() - date2.getTime();
	});
}

function formatDate(date: Date): string {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);

	let dateNew = new Date(date);

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

export { taskSort, formatDate };
