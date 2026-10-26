import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
import useLocalStorageState from "use-local-storage-state";
import { usePrefersColorScheme } from "use-prefers-color-scheme";
import { LOCAL_STORAGE_KEY } from "./constants.js";
import { ThemeContext } from "./ThemeContext.js";

/**
 * @import { ReactNode } from "react"
 * @import { ContextValue, DisplayTheme, ThemeType } from "./types.js"
 */

/**
 * @typedef {Object} ThemeProviderProps
 * @property {string} [localStorageKey] The key of local storage to save the selected theme
 * @property {ThemeType} [defaultTheme] Theme setted by default. Can be `no-preference` for automatical detection
 * @property {DisplayTheme} [defaultDisplayTheme] Theme displayed by default
 * @property {ReactNode} [children]
 */

/**
 * @param {ThemeProviderProps} props
 */
export function ThemeProvider({
	children = undefined,
	defaultDisplayTheme = "light",
	defaultTheme = "no-preference",
	localStorageKey = LOCAL_STORAGE_KEY,
}) {
	const prefersColorScheme = usePrefersColorScheme();

	const [theme, setTheme] = useLocalStorageState(localStorageKey, {
		defaultValue: defaultTheme,
	});

	/** @type {DisplayTheme} */
	const displayTheme =
		theme === "no-preference"
			? prefersColorScheme === "no-preference"
				? defaultDisplayTheme
				: prefersColorScheme
			: theme;

	const contextValue = useMemo(
		() =>
			/** @type {ContextValue} */ ({
				displayTheme,
				setTheme,
				theme,
			}),
		[displayTheme, setTheme, theme],
	);

	return jsx(ThemeContext.Provider, {
		value: contextValue,
		children,
	});
}
