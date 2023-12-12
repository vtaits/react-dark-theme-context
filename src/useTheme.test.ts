import { useContext } from "react";
import { expect, test, vi } from "vitest";
import { ThemeContext } from "./ThemeContext";
import { useTheme } from "./useTheme";

vi.mock("react");

test("call `useContext` and return the result", () => {
	const result = "__RESULT__";

	vi.mocked(useContext).mockReturnValue(result);

	const themeResult = useTheme();

	expect(themeResult).toBe(result);

	expect(useContext).toHaveBeenCalledTimes(1);
	expect(useContext).toHaveBeenCalledWith(ThemeContext);
});
