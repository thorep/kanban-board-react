import { createContext } from "react";
import { IContext } from "./types";
const BoardContext = createContext<IContext | null>(null);

export default BoardContext;
