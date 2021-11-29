import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Header } from "../Components/Header";

export default {
  title: "Header",
  component: Header,
} as ComponentMeta<typeof Header>;

export const AppHeader: ComponentStory<typeof Header> = () => <Header />;
