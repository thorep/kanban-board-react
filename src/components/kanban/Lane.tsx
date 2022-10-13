import React, { useContext, useEffect, useRef } from "react";
import { getPosition } from "../../utils/getPositions";
import BoardContext from "./BoardContext";
import Task2 from "./Task";
import { IContext, ILaneProps, TTask } from "./types";

const Lane = ({
	style,
	title,
	dataKey,
	onDragOverStyle,
	children,
}: ILaneProps) => {
	const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
	const { lanes, taskArray, collisions } = useContext(BoardContext) as IContext;
	useEffect(() => {
		const dimensions = getPosition(ref);
		lanes.set(dataKey, dimensions);
	}, []);
	console.log(dataKey);
	return (
		<div
			ref={ref}
			style={{
				...style,
				...(collisions[dataKey] ? onDragOverStyle : null),
			}}
		>
			{title}

			{taskArray
				.filter((task) => task.dataKey === dataKey)
				.map((task: TTask) => {
					return (
						<Task2 key={task.id} task={task}>
							{children(task)}
						</Task2>
					);
				})}
		</div>
	);
};

export default React.memo(Lane);
