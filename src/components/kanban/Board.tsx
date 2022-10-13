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

	return (
		<BoardContext.Provider
			value={{
				updateTask: updateTask,
				lanes: new Map(),
				taskArray: tasks,
				collisions: collisions,
				setCollisions: setCollisions,
			}}
		>
			{Children.map(childrenArray, (child: ReactNode) => {
				if (isValidElement(child)) {
					return cloneElement(child, {});
				}
				return null;
			})}
		</BoardContext.Provider>
	);
};

export default Board;
