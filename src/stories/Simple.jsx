import { useTheme } from "../index.js";

/**
 * @import { ThemeType } from "../index.js"
 */

/** @type {readonly ThemeType[]} */
const themes = ["no-preference", "light", "dark"];

export function Simple() {
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
