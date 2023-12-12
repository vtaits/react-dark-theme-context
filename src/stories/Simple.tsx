import type { ReactElement } from "react";
import { type ThemeType, useTheme } from "..";

const themes: readonly ThemeType[] = ["no-preference", "light", "dark"];

export function Simple(): ReactElement {
	const { displayTheme, setTheme, theme } = useTheme();

	return (
		<div
			style={{
				height: "100vh",
				backgroundColor: displayTheme === "dark" ? "#000" : "#fff",
				color: displayTheme === "dark" ? "#fff" : "#000",
			}}
		>
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
		</div>
	);
}
