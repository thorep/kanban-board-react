import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import BoardContext from "./BoardContext";
import { IContext, ITaskProps, TTask } from "./types";

const Task = ({ task, children }: ITaskProps) => {
	const { lanes, setCollisions, updateTask } = useContext(
		BoardContext
	) as IContext;
	const diffXY = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const [style, setStyle] = useState<React.CSSProperties>({});
	const [taskDimensions] = useState({ width: 0, height: 0 });
	const collisionResult = useRef<{ task: TTask; laneDataKey: string }>();
	const ref = useRef<HTMLDivElement>(null);

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

	const onMouseUp = useCallback(() => {
		console.log("On mouse up");
		if (!collisionResult.current) return;
		console.log("After");
		updateTask(collisionResult.current);
		setStyle({});
		setCollisions({});
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onMouseUp);
	}, []);

	const onMouseDown = useCallback((e: React.MouseEvent) => {
		pauseEvent(e);
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
		diffXY.current.x = e.clientX - e.currentTarget.getBoundingClientRect().left;
		diffXY.current.y = e.clientY - e.currentTarget.getBoundingClientRect().top;
	}, []);

	const checkForCollision = (taskX: number) => {
		// if (!ref.current) return;
		const collisions = {};
		lanes.forEach((lane, key) => {
			if (!ref.current) return;
			const taskWidth = ref.current.offsetWidth;
			if (
				taskX + taskWidth / 2 > lane.x &&
				taskX + taskWidth / 2 < lane.x + lane.width
			) {
				collisionResult.current = { task: task, laneDataKey: key };

				if (key === task.dataKey) {
					setCollisions({});
					return;
				}
				collisions[key] = true;
				setCollisions(collisions);
			}
		});
	};

	const pauseEvent = (e: React.MouseEvent) => {
		if (e.stopPropagation) e.stopPropagation();
		if (e.preventDefault) e.preventDefault();
		return false;
	};

	useEffect(() => {
		if (!ref.current) return;
		taskDimensions.height = ref.current.offsetHeight;
		taskDimensions.width = ref.current.offsetWidth;
	}, [ref.current]);

	return (
		<div onMouseDown={onMouseDown} ref={ref} style={style}>
			{children}
		</div>
	);
};

export default React.memo(Task);
