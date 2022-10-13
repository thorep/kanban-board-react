import { Board, Lane } from "kanban-board-react";
import React, { useState } from "react";
import "./App.css";

const tasksData: any[] = [
	{ someData: "test", someData2: "test", dataKey: "todo", id: 1 },
	{ someData: "test", someData2: "test", dataKey: "complete", id: 2 },
	{ someData: "test", someData2: "test", dataKey: "doing", id: 3 },
	{ someData: "test", someData2: "test", dataKey: "qa", id: 4 },
	{ someData: "test", someData2: "test", dataKey: "todo", id: 5 },
];

function App() {
	const [items, setItems] = useState<any[]>(tasksData);

	const updateTask = (result: { task: any; laneDataKey: string }) => {
		const index = items.findIndex((item) => item.id === result.task.id);
		items[index].dataKey = result.laneDataKey;
		const newArray = [...items];
		setItems(newArray);
	};
	return (
		<div style={{ marginTop: "10px" }}>
			<Board tasks={items} updateTask={updateTask}>
				<div style={boardStyle}>
					<Lane
						style={laneStyle}
						id={1}
						title={"Todo"}
						dataKey={"todo"}
						onDragOverStyle={onDragOverStyle}
					>
						{(task: any) => {
							return <Task task={task} />;
						}}
					</Lane>
					<Lane
						style={laneStyle}
						id={1}
						title={"Doing"}
						dataKey={"doing"}
						onDragOverStyle={onDragOverStyle}
					>
						{(task: any) => {
							return <Task task={task} />;
						}}
					</Lane>
					<Lane
						style={laneStyle}
						id={1}
						title={"QA"}
						dataKey={"qa"}
						onDragOverStyle={onDragOverStyle}
					>
						{(task: any) => {
							return <Task task={task} />;
						}}
					</Lane>
					<Lane
						style={laneStyle}
						id={1}
						title={"Complete"}
						dataKey={"complete"}
						onDragOverStyle={onDragOverStyle}
					>
						{(task: any) => {
							return <Task task={task} />;
						}}
					</Lane>
				</div>
			</Board>
		</div>
	);
}

const Task = ({ task }: { task: any }) => {
	return (
		<div style={taskStyle}>
			<div>{task.someData}</div>
			<div></div>
		</div>
	);
};

const boardStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-around",
};

const taskStyle: React.CSSProperties = {
	color: "black",
	minHeight: "9rem",
	width: "250px",
	margin: "1rem 0 1rem 0",
	background: "rgba(255,255,255,0.2)",
	borderRadius: "1px",
	backdropFilter: "blur(5px)",
	WebkitBackdropFilter: "blur(5px)",
};

const onDragOverStyle: React.CSSProperties = {
	backgroundColor: "rgba(255, 255, 255, 0.2)",
	transition: "background-color 300ms ease",
};

const laneStyle: React.CSSProperties = {
	backgroundColor: "rgba(0,0,0,0.2)",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	height: "100vh",
	width: "300px",
	overflowX: "hidden",
};

export default App;
