import React, {
	Children,
	cloneElement,
	isValidElement,
	ReactNode,
	useState,
} from "react";
import BoardContext from "./BoardContext";
import { IBoardProps } from "./types";

const Board = ({ tasks, updateTask, children }: IBoardProps) => {
	const childrenArray = Children.toArray(children);
	const [collisions, setCollisions] = useState({});
	const [lanes] = useState(new Map());
	return (
		<BoardContext.Provider
			value={{
				updateTask: updateTask,
				lanes: lanes,
				taskArray: tasks,
				collisions: collisions,
				setCollisions: setCollisions,
			}}
		>
			{Children.map(childrenArray, (child: ReactNode) => {
				if (isValidElement(child)) {
					return cloneElement(child);
				}
				return null;
			})}
		</BoardContext.Provider>
	);
};

export default React.memo(Board);
