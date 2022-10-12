// import { RefObject } from "react";

import React, { RefObject } from "react";

export interface IKanbanProps {
	style?: IStyles;
	tasks: ITask[];
	updateTask: TUpdateTask;
	columns: IColumn[];
	taskRender: ITaskRender;
}
export interface IColumn {
	name: string;
	dataKey: string;
}

export interface ITask {
	dataKey: string;
	id: number;
	[key: string]: unknown;
}

export interface IStyles {
	onDragOver: React.CSSProperties;
	column: React.CSSProperties;
}

export interface IColumnProps {
	updateTask: TUpdateTask;
	onTopOfColumnStyle: React.CSSProperties;
	column: IColumn;
	tasks: ITask[];
	lanes: React.MutableRefObject<TLanes>;
	setCollisions: React.Dispatch<React.SetStateAction<ICollisions>>;
	collisions: TCollisions;
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

export interface ICollisions {
	[key: string]: boolean;
}

export interface ITaskProps {
	column: IColumn;
	lanes: RefObject<TLanes>;
	task: ITask;
	updateTask: TUpdateTask;
	setCollisions: React.Dispatch<React.SetStateAction<ICollisions>>;
	children: JSX.Element;
}

export type TCollisions = {
	[key: string]: boolean;
};

type TUpdateTask = (data: { task: ITask; columnDataKey: string }) => void;

export type TLanes = Map<string, dimensions>;
