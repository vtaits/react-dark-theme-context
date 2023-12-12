import { expect, test } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import * as lib from "./index";
import { useTheme } from "./useTheme";

test("correct exports", () => {
	expect(lib.ThemeProvider).toBe(ThemeProvider);
	expect(lib.useTheme).toBe(useTheme);
});
