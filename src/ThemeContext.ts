import { createContext } from "react";
import type { ContextValue } from "./types";

export const emptyFn = () => {};

export const ThemeContext = createContext<ContextValue>({
	displayTheme: "light",
	theme: "no-preference",
	setTheme: emptyFn,
});
