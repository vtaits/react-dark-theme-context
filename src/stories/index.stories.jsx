import { ThemeProvider } from "../index.js";
import { Simple } from "./Simple.jsx";

/**
 * @import { Meta, StoryObj } from "@storybook/react"
 */

/** @type {Meta<typeof ThemeProvider>} */
const meta = {
	title: "react-dark-theme-context",
	component: ThemeProvider,
	tags: ["autodocs"],
};

export default meta;

/**
 * @typedef {StoryObj<typeof ThemeProvider>} Story
 */

/** @type {Story} */
export const SimpleStory = {
	name: "Simple",
	args: {},
	render: (props) => (
		<ThemeProvider {...props}>
			<Simple />
		</ThemeProvider>
	),
};
