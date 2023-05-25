function formatDate(date) {
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

export { formatDate };
