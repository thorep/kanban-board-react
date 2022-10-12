import React, { useRef, useState } from "react";
import Column from "./Column";
import { IKanbanProps, TLanes } from "./types";

const collisionStyle = {
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
  onTopOfColumnStyle = collisionStyle,
  tasks,
  columns,
  taskRender,
  laneStyle = defaultLaneStyle,
}) => {
  const lanes = useRef<TLanes>(new Map([]));
  const ref = useRef();
  console.log(ref.current);
  const [collisions, setCollisions] = useState({});
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
            onTopOfColumnStyle={onTopOfColumnStyle}
            collisions={collisions}
            setCollisions={setCollisions}
            taskRender={taskRender}
            key={column.dataKey}
            column={column}
            lanes={lanes}
            laneStyle={laneStyle}
            tasks={tasks.filter((task) => task.dataKey === column.dataKey)}
          />
        );
      })}
    </div>
  );
};

export default Kanban;
