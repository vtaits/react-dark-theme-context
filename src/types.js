/**
 * @typedef {"dark" | "light" | "no-preference"} ThemeType
 */

/**
 * @typedef {"dark" | "light"} DisplayTheme
 */

/**
 * @typedef {Object} ContextValue
 * @property {DisplayTheme} displayTheme Theme that currently displayed
 * @property {ThemeType} theme Theme that currently setted. Can be `no-preference` for automatical detection
 * @property {(nextTheme: ThemeType) => void} setTheme Theme change function
 */

export {};
