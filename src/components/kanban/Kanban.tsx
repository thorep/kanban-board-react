import React, { useRef, useState } from "react";
import Column from "./Column";
import { ICollisions, IKanbanProps, TLanes } from "./types";

const collisionStyle: React.CSSProperties = {
	backgroundColor: "rgba(0, 0, 0, 0.1)",
	transition: "background-color 300ms ease",
};

const defaultLaneStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	height: "100vh",
	width: "100%",
	overflowX: "hidden",
};

const Kanban: React.FC<IKanbanProps> = ({
	updateTask,
	style = { onDragOver: collisionStyle, column: defaultLaneStyle },
	tasks,
	columns,
	taskRender,
}) => {
	const lanes = useRef<TLanes>(new Map([]));
	const [collisions, setCollisions] = useState<ICollisions>({});
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			{columns.map((column) => {
				return (
					<Column
						updateTask={updateTask}
						onTopOfColumnStyle={style.onDragOver}
						collisions={collisions}
						setCollisions={setCollisions}
						taskRender={taskRender}
						key={column.dataKey}
						column={column}
						lanes={lanes}
						laneStyle={style.column}
						tasks={tasks.filter((task) => task.dataKey === column.dataKey)}
					/>
				);
			})}
		</div>
	);
};

export default Kanban;
