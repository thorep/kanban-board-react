import React, { useCallback, useEffect, useRef, useState } from "react";
import { ITask, ITaskProps, TCollisions } from "./types";

const Task = ({
	updateTask,
	setCollisions,
	task,
	lanes,
	children,
}: ITaskProps) => {
	const [style, setStyle] = useState<React.CSSProperties>({});
	const diffXY = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const isDragging = useRef<boolean>(false);
	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const collisionResult = useRef<{ task: ITask; columnDataKey: string }>();
	const [taskDimensions] = useState({ width: 0, height: 0 });

	const onMouseMove = useCallback((e: MouseEvent) => {
		const left = e.clientX - diffXY.current.x;
		const top = e.clientY - diffXY.current.y;
		checkForCollision(left);
		setStyle({
			top: top,
			left: left,
			position: "absolute",
			width: taskDimensions.width,
			zIndex: "9999",
		});
	}, []);

	const onMouseDown = useCallback((e: React.MouseEvent) => {
		pauseEvent(e);
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
		isDragging.current = true;
		diffXY.current.x = e.clientX - e.currentTarget.getBoundingClientRect().left;
		diffXY.current.y = e.clientY - e.currentTarget.getBoundingClientRect().top;
	}, []);

	const onMouseUp = useCallback(() => {
		if (!collisionResult.current) return;
		updateTask(collisionResult.current);
		setStyle({});
		setCollisions({});
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onMouseUp);
	}, []);

	const pauseEvent = (e: React.MouseEvent) => {
		if (e.stopPropagation) e.stopPropagation();
		if (e.preventDefault) e.preventDefault();
		return false;
	};

	const checkForCollision = (taskX: number) => {
		if (!lanes.current) return;
		const collisions: TCollisions = {};
		lanes.current.forEach((lane, key) => {
			if (!ref.current) return;
			const taskWidth = ref.current.offsetWidth;
			if (
				taskX + taskWidth / 2 > lane.x &&
				taskX + taskWidth / 2 < lane.x + lane.width
			) {
				if (key === task.dataKey) {
					setCollisions({});
					return;
				}
				collisionResult.current = { task: task, columnDataKey: key };
				collisions[key] = true;
				setCollisions(collisions);
			}
		});
	};

	useEffect(() => {
		if (!ref.current) return;
		taskDimensions.height = ref.current.offsetHeight;
		taskDimensions.width = ref.current.offsetWidth;
	}, []);

	return (
		<div onMouseDown={onMouseDown} style={style} ref={ref}>
			{children}
		</div>
	);
};

export default Task;
