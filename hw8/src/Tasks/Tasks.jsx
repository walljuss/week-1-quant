import { UncompletedTasks } from "./UncompletedTasks";
import { CompletedTasks } from "./CompletedTasks";
import "./Tasks.css";

const Tasks = (props) => {
	if (props.tasks == []) {
		return <></>;
	}
	return (
		<div className="tasksContainer">
			<UncompletedTasks {...props} />
			<CompletedTasks {...props} />
		</div>
	);
};

export { Tasks };
