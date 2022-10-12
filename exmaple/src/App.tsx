import { Kanban } from "kanban-board-react";
import React, { useState } from "react";
import "./App.css";

const tasksData: any[] = [
	{ someData: "test", someData2: "test", dataKey: "todo", id: 1 },
	{ someData: "test", someData2: "test", dataKey: "complete", id: 2 },
	{ someData: "test", someData2: "test", dataKey: "todo", id: 3 },
	{ someData: "test", someData2: "test", dataKey: "todo", id: 4 },
];

const columnsData: any[] = [
	{ name: "Todo", dataKey: "todo" },
	{ name: "Doing", dataKey: "doing" },
	{ name: "QA", dataKey: "qa" },
	{ name: "Completed", dataKey: "complete" },
];

function App() {
	const [items, setItems] = useState<any[]>(tasksData);

	const updateTask = (result: { task: any; columnDataKey: string }) => {
		const index = items.findIndex((item) => item.id === result.task.id);
		items[index].dataKey = result.columnDataKey;
		const newArray = [...items];
		setItems(newArray);
	};

	return (
		<div>
			<div className="App">
				<Kanban
					updateTask={updateTask}
					style={styles}
					tasks={items}
					columns={columnsData}
					taskRender={(task: any) => {
						return <Item task={task} />;
					}}
				/>
			</div>
		</div>
	);
}

const collisionStyle: React.CSSProperties = {
	backgroundColor: "rgba(0, 0, 0, 0.1)",
	transition: "background-color 300ms ease",
};

const laneStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	height: "100vh",
	width: "100%",
	overflowX: "hidden",
};

const styles = {
	onDragOver: collisionStyle,
	column: laneStyle,
};

const Item = ({ task }: { task: any }) => {
	return (
		<div className="item" style={{ width: "250px" }}>
			<div className="id">#{task.id}</div>
			<div className="test">
				<div className="taskTitle">{task.id}</div>
				<div>{task.someData}</div>
			</div>
		</div>
	);
};

export default App;
