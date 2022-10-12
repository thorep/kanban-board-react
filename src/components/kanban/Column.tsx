import React, { useEffect, useRef } from "react";
import Task from "./Task";
import { IColumnProps } from "./types";

const Column = ({
	updateTask,
	onTopOfColumnStyle,
	collisions,
	setCollisions,
	column,
	tasks,
	lanes,
	taskRender,
	laneStyle,
}: IColumnProps) => {
	const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
	const getPosition = (ref: React.MutableRefObject<HTMLInputElement>) => {
		const x: number = ref.current.offsetLeft;
		const y: number = ref.current.offsetTop;
		return {
			x,
			y,
			width: ref.current.offsetWidth,
			height: ref.current.offsetHeight,
		};
	};

	useEffect(() => {
		const dimensions = getPosition(ref);
		lanes.current.set(column.dataKey, dimensions);
	}, [column.dataKey, lanes]);

	return (
		<div
			ref={ref}
			style={{
				...laneStyle,
				...(collisions[column.dataKey] ? onTopOfColumnStyle : null),
			}}
		>
			{column.name}
			{tasks.map((task) => {
				return (
					<Task
						column={column}
						updateTask={updateTask}
						task={task}
						lanes={lanes}
						key={task.id}
						setCollisions={setCollisions}
					>
						{React.createElement(taskRender, task)}
					</Task>
				);
			})}
		</div>
	);
};

export default Column;
