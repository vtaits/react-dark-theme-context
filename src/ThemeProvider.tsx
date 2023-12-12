import {
	type PropsWithChildren,
	type ReactElement,
	useCallback,
	useMemo,
} from "react";
import useLocalStorageState from "use-local-storage-state";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { ThemeContext } from "./ThemeContext";
import { LOCAL_STORAGE_KEY } from "./constants";
import type { ContextValue, DisplayTheme, ThemeType } from "./types";

type ThemeProviderProps = Readonly<
	PropsWithChildren<{
		/**
		 * The key of local storage to save the selected theme
		 */
		localStorageKey?: string;
		/**
		 * Theme setted by default. Can be `no-preference` for automatical detection
		 */
		defaultTheme?: ThemeType;
		/**
		 * Theme displayed by default
		 */
		defaultDisplayTheme?: DisplayTheme;
	}>
>;

export function ThemeProvider({
	children = undefined,
	defaultDisplayTheme = "light",
	defaultTheme = "no-preference",
	localStorageKey = LOCAL_STORAGE_KEY,
}: ThemeProviderProps): ReactElement {
	const prefersColorScheme = usePrefersColorScheme();

	const [theme, setTheme] = useLocalStorageState(localStorageKey, {
		defaultValue: defaultTheme,
	});

	const displayTheme: DisplayTheme =
		theme === "no-preference"
			? prefersColorScheme === "no-preference"
				? defaultDisplayTheme
				: prefersColorScheme
			: theme;

	const contextValue = useMemo<ContextValue>(
		() => ({
			displayTheme,
			setTheme,
			theme,
		}),
		[displayTheme, setTheme, theme],
	);

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}
