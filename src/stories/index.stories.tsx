import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "..";
import { Simple } from "./Simple";

const meta: Meta<typeof ThemeProvider> = {
	title: "react-dark-theme-context",
	component: ThemeProvider,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

export const SimpleStory: Story = {
	name: "Simple",
	args: {},
	render: (props) => (
		<ThemeProvider {...props}>
			<Simple />
		</ThemeProvider>
	),
};
