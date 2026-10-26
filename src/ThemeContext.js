import { createContext } from "react";

/**
 * @import { ContextValue } from "./types.js"
 */

export const emptyFn = () => {};

export const ThemeContext = createContext(
	/** @type {ContextValue} */ ({
		displayTheme: "light",
		theme: "no-preference",
		setTheme: emptyFn,
	}),
);
