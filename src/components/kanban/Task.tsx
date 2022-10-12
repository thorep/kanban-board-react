import React, { useCallback, useEffect, useRef, useState } from "react";
import { ITask, ITaskProps } from "./types";

const Task = ({ updateTask, setCollisions, task, lanes, children }: ITaskProps) => {
  const [style, setStyle] = useState({});
  const diffXY = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDragging = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
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
    console.log("Mouse up");
    console.log(collisionResult);
    console.log("Mouse up");
    updateTask(collisionResult.current);
    setStyle({});
    setCollisions({});
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, []);

  const pauseEvent = (e: any) => {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  };

  const checkForCollision = (taskX: any) => {
    const collisions: any = {};
    lanes.current!.forEach((lane: any, key: any) => {
      if (!ref.current) return;
      const taskWidth = ref.current.offsetWidth;
      if (taskX + taskWidth / 2 > lane.x && taskX + taskWidth / 2 < lane.x + lane.width) {
        if (key === task.dataKey) {
          setCollisions({});
          // taskKey.current = key;
          return;
        }
        collisionResult.current = { task: task, columnDataKey: key };
        collisions[key] = true;
        setCollisions(collisions);
        // taskKey.current = key;
      } else {
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
