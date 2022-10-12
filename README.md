# Kanban Board React
A simple package for creating columns and items. Items can be dragged and dropped into columns. The package uses zero dependencies.

## Usage

```javascript

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
					style={styles}
					updateTask={updateTask}
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


```

## Props:
#### tasks
An array of objects. Each object must contain dataKey (this key must also be present in the column dataset) and an id.
#### columns
An array of objects.
Must contain a name key for the column name and a dataKey (this dataKey matches the task dataKey)
#### style
A object with two keys, onDragover and column.
onDragOver styles are used when an items is dragged over a lane.
column is the lane styling.

#### updateTask
A function that will be run when a task is dropped on top of a lane.
The fuction is run with a parameter containing the task and the columnDataKey.
result.task
result.columnDataKey
#### taskRender
A function that retuns a jsx element. The function gets passed the task.