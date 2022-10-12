import { Kanban } from "kanban-board-react";
import React, { useState } from "react";
import "./App.css";

const tasksData: any[] = [
  { t: "test", navn: "navn", dataKey: "todo", id: 1 },
  { t: "test", navn: "navn", dataKey: "todo", id: 2 },
  { t: "test", navn: "navn", dataKey: "todo", id: 3 },
  { t: "test", navn: "navn", dataKey: "todo", id: 4 },
];

const columnsData: any[] = [
  { name: "Todo", dataKey: "todo" },
  { name: "Doing", dataKey: "doing" },
  { name: "QA", dataKey: "qa" },
  { name: "Completed", dataKey: "complete" },
];

function App() {
  const [items, setItems] = useState<any[]>(tasksData);

  const updateTask = (result: any) => {
    const index = items.findIndex((item) => item.id === result.task.id);
    items[index].dataKey = result.columnDataKey;
    const newArray = [...items];
    setItems(newArray);
  };

  return (
    <div>
      <div className="App">
        <Kanban
          updateTask={updateTask}
          tasks={items}
          columns={columnsData}
          onTopOfColumnStyle={collisionStyle}
          laneStyle={defaultLaneStyle}
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

const defaultLaneStyle: React.CSSProperties = {
  backgroundColor: "red",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  width: "100%",
  overflowX: "hidden",
};

const Item = ({ task }: { task: any }) => {
  return (
    <div className="item" style={{ width: "250px" }}>
      <span style={{ color: "red" }}>HEI</span>
      <div className="id">#{task.id}</div>
      <div className="test">
        <div className="taskTitle">{task.id}</div>
        <div>{task.navn}</div>
      </div>
    </div>
  );
};

export default App;
