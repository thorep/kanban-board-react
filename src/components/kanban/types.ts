// import { RefObject } from "react";

import React, { RefObject } from "react";

export interface IColumn {
  name: string;
  dataKey: string;
}

export interface ITask {
  dataKey: string;
  id: number;
  [key: string]: any;
}

export interface IKanbanProps {
  tasks: ITask[];
  updateTask: (task: ITask, column: IColumn) => void;
  onTopOfColumnStyle?: any;
  columns: IColumn[];
  taskRender: ITaskRender;
  laneStyle?: React.CSSProperties;
}

export interface IColumnProps {
  updateTask: any;
  onTopOfColumnStyle: any;
  column: IColumn;
  tasks: ITask[];
  lanes: React.MutableRefObject<TLanes>;
  setCollisions: any;
  collisions: any;
  taskRender: ITaskRender;
  laneStyle: React.CSSProperties;
}

export interface dimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ITaskRender {
  (task: ITask): JSX.Element;
}

export interface ITaskProps {
  column: IColumn;
  lanes: RefObject<TLanes>;
  task: ITask;
  updateTask: any;
  setCollisions: any;
  children: any;
}

export type TLanes = Map<string, dimensions>;
