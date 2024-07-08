import React, { useState } from "react";
import { Tabs } from "antd";

import BeanList from "./components/BeanList/BeanList";
import FactList from "./components/FactList/FactList";
import RecipeList from "./components/RecipeList/RecipeList";
import CombinationList from "./components/CombinationList/CombinationList";
import MilestoneList from "./components/MilestoneList/MilestoneList";

import "antd/dist/reset.css";

const App: React.FC = () => {
	const [activeKey, setActiveKey] = useState("1");

	const handleTabChange = (key: string) => {
		setActiveKey(key);
	};

	const items = [
		{
			key: "1",
			label: "Beans",
			children: <BeanList />,
		},
		{
			key: "2",
			label: "Facts",
			children: <FactList />,
		},
		{
			key: "3",
			label: "Recipes",
			children: <RecipeList />,
		},
		{
			key: "4",
			label: "Combinations",
			children: <CombinationList />,
		},
		{
			key: "5",
			label: "Milestones",
			children: <MilestoneList />,
		},
	];

	return (
		<Tabs
			activeKey={activeKey}
			centered
			onChange={handleTabChange}
			items={items}
		/>
	);
};

export default App;
