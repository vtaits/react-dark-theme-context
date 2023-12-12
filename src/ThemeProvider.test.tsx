import { create } from "react-test-engine-vitest";
import useLocalStorageState from "use-local-storage-state";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ThemeContext } from "./ThemeContext";
import { ThemeProvider } from "./ThemeProvider";
import { LOCAL_STORAGE_KEY } from "./constants";

vi.mock("use-local-storage-state");
vi.mock("use-prefers-color-scheme");

const additionalLocalStorageStateParams = {
	isPersistent: true,
	removeItem: vi.fn(),
};

const setTheme = vi.fn();

const render = create(
	ThemeProvider,
	{
		children: <div className="test" />,
	},
	{
		queries: {
			child: {
				component: "div",
				className: "test",
			},

			contextProvider: {
				component: ThemeContext.Provider,
			},
		},

		hooks: {
			usePrefersColorScheme,
			useLocalStorageState,
		},

		hookOrder: ["usePrefersColorScheme", "useLocalStorageState"],

		hookDefaultValues: {
			usePrefersColorScheme: "no-preference",
			useLocalStorageState: [
				"no-preference",
				setTheme,
				additionalLocalStorageStateParams,
			],
		},

		properties: {
			contextValue: ["contextProvider", "value"],
		},
	},
);

afterEach(() => {
	vi.clearAllMocks();
});

describe("useLocalStorageState", () => {
	describe.each([
		[undefined, LOCAL_STORAGE_KEY],
		["customKey", "customKey"],
	])("local storage key = %s", (localStorageKey, providedLocalStorageKey) => {
		describe.each([
			[undefined, "no-preference"],
			["no-preference", "no-preference"],
			["light", "light"],
			["dark", "dark"],
		] as const)("default theme = %s", (defaultTheme, providedDefaultTheme) => {
			test("call with correct arguments", () => {
				const engine = render({
					defaultTheme,
					localStorageKey,
				});

				expect(engine.getHookArguments("useLocalStorageState")).toEqual([
					providedLocalStorageKey,
					{
						defaultValue: providedDefaultTheme,
					},
				]);
			});
		});
	});
});

describe("displayTheme", () => {
	test.each([
		["no-preference", "no-preference", undefined, "light"],
		["no-preference", "no-preference", "light", "light"],
		["no-preference", "no-preference", "dark", "dark"],
		["no-preference", "light", "dark", "light"],
		["dark", "light", "dark", "dark"],
	] as const)(
		"theme = %s, prefered theme = %s, default display theme = %s, result theme = %s",
		(theme, prefersColorScheme, defaultDisplayTheme, resultTheme) => {
			const engine = render(
				{
					defaultDisplayTheme,
				},
				{
					usePrefersColorScheme: prefersColorScheme,
					useLocalStorageState: [
						theme,
						setTheme,
						additionalLocalStorageStateParams,
					],
				},
			);

			expect(engine.getProperty("contextValue")).toHaveProperty(
				"displayTheme",
				resultTheme,
			);
		},
	);
});

describe("context values", () => {
	test.each([["no-preference"], ["light"], ["dark"]] as const)(
		"theme = %s",
		(theme) => {
			const engine = render(
				{},
				{
					useLocalStorageState: [
						theme,
						setTheme,
						additionalLocalStorageStateParams,
					],
				},
			);

			expect(engine.getProperty("contextValue")).toHaveProperty("theme", theme);
			expect(engine.getProperty("contextValue")).toHaveProperty(
				"setTheme",
				setTheme,
			);
		},
	);
});

test("render children", () => {
	const engine = render({});

	expect(engine.accessors.child.get()).toBeTruthy();
});
