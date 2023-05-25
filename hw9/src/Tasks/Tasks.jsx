import { UncompletedTasks } from "./UncompletedTasks/UncompletedTasks";
import { CompletedTasks } from "./CompletedTasks/CompletedTasks";
import "./Tasks.css";
import { useSelector } from "react-redux";
import { selectTasks } from "../features/taskSlice";

const Tasks = () => {
	const tasks = useSelector(selectTasks);
	// if (tasks == []) {
	// 	return <></>;
	// }
	return (
		<div className="tasksContainer">
			<UncompletedTasks />
			<CompletedTasks />
		</div>
	);
};

export { Tasks };
