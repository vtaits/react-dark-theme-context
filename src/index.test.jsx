import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { usePrefersColorScheme } from "use-prefers-color-scheme";
import { afterEach, expect, test, vi } from "vitest";
import { ThemeProvider, useTheme } from "./index.js";

/**
 * @import { ThemeType } from "./index.js"
 */

vi.mock("use-prefers-color-scheme", () => ({
	usePrefersColorScheme: vi.fn(() => "no-preference"),
}));

/** @type {readonly ThemeType[]} */
const themes = ["no-preference", "light", "dark"];

afterEach(() => {
	vi.clearAllMocks();
	cleanup();
});

function TestComponent() {
	const { displayTheme, setTheme, theme } = useTheme();

	return (
		<>
			{themes.map((value) => (
				<p key={value}>
					<label>
						<input
							type="radio"
							name="theme"
							value={value}
							checked={theme === value}
							onChange={() => {
								setTheme(value);
							}}
						/>

						{value}
					</label>
				</p>
			))}

			<div data-testid="result">
				theme: {theme}, display: {displayTheme}
			</div>
		</>
	);
}

test("default parameters", () => {
	render(
		<ThemeProvider localStorageKey="test1">
			<TestComponent />
		</ThemeProvider>,
	);

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: no-preference, display: light",
	);

	act(() => {
		fireEvent.click(screen.getByRole("radio", { name: /light/i }));
	});

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: light, display: light",
	);

	act(() => {
		fireEvent.click(screen.getByRole("radio", { name: /dark/i }));
	});

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: dark, display: dark",
	);

	act(() => {
		fireEvent.click(screen.getByRole("radio", { name: /no-preference/i }));
	});

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: no-preference, display: light",
	);
});

test("custom parameters", async () => {
	render(
		<ThemeProvider
			defaultTheme="light"
			defaultDisplayTheme="dark"
			localStorageKey="test2"
		>
			<TestComponent />
		</ThemeProvider>,
	);

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: light, display: light",
	);

	act(() => {
		fireEvent.click(screen.getByRole("radio", { name: /dark/i }));
	});

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: dark, display: dark",
	);

	act(() => {
		fireEvent.click(screen.getByRole("radio", { name: /no-preference/i }));
	});

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: no-preference, display: dark",
	);

	act(() => {
		fireEvent.click(screen.getByRole("radio", { name: /light/i }));
	});

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: light, display: light",
	);
});

test("use prefered browser scheme", async () => {
	vi.mocked(usePrefersColorScheme).mockReturnValue("dark");

	render(
		<ThemeProvider defaultTheme="light" localStorageKey="test2">
			<TestComponent />
		</ThemeProvider>,
	);

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: light, display: light",
	);

	act(() => {
		fireEvent.click(screen.getByRole("radio", { name: /dark/i }));
	});

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: dark, display: dark",
	);

	act(() => {
		fireEvent.click(screen.getByRole("radio", { name: /no-preference/i }));
	});

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: no-preference, display: dark",
	);

	act(() => {
		fireEvent.click(screen.getByRole("radio", { name: /light/i }));
	});

	expect(screen.getByTestId("result")).toHaveProperty(
		"textContent",
		"theme: light, display: light",
	);
});
