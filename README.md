# Kanban Board React
A simple package for creating columns and items. Items can be dragged and dropped into columns. The package uses zero dependencies.

## Usage

```javascript

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

  const updateTask = (collisionResult: any) => {
    const index = items.findIndex((item) => item.id === collisionResult.task.id);
    items[index].dataKey = collisionResult.columnDataKey;
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

```

## Props:
#### tasks
An array of objects. Each object must contain dataKey (this key must also be present in the column dataset) and an id.
#### columns
An array of objects.
Must contain a name key for the column name and a dataKey (this dataKey matches the task dataKey)
#### onTopOfColumnStyle
A style object for styles when a task is dragged over a column.
#### laneStyle
A style object for the lane styles.
#### updateTask
A function that will be run when a task is dropped on top of a lane.
The fuction is run with a parameter containing the task and the columnDataKey.
result.task
result.columnDataKey
#### taskRender
A function that retuns a jsx element. The function gets passed the task.