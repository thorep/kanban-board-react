import React from "react";

export interface ITaskProps {
	task: any;
	children: React.ReactNode;
}

export interface IContext {
	lanes: TLanes;
	taskArray: TTask[];
	collisions: any;
	setCollisions?: any;
	updateTask: TUpdateTask;
}

type TLanes = Map<string, TDimensions>;

type TUpdateTask = (data: { task: any; laneDataKey: string }) => void;

type TDimensions = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export type TTask = {
	dataKey: string;
	[key: string]: any;
};
export interface ILaneProps {
	style: React.CSSProperties;
	onDragOverStyle: React.CSSProperties;
	title: string;
	dataKey: string;
	children: any;
}
export interface IBoardProps {
	tasks: any[];
	updateTask: any;
	children: React.ReactNode | React.ReactNode[];
}
