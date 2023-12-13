import usePrefersColorScheme from "use-prefers-color-scheme";

export type ThemeType = ReturnType<typeof usePrefersColorScheme>;

export type DisplayTheme = "dark" | "light";

export type ContextValue = Readonly<{
	/**
	 * Theme that currently displayed
	 */
	displayTheme: DisplayTheme;
	/**
	 * Theme that currently setted. Can be `no-preference` for automatical detection
	 */
	theme: ThemeType;
	/**
	 * Theme change function
	 */
	setTheme: (nextTheme: ThemeType) => void;
}>;
