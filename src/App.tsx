import React, { useState } from "react";
import { Tabs } from "antd";

import BeanList from "./pages/BeanList/BeanList";
import FactList from "./pages/FactList/FactList";
import RecipeList from "./pages/RecipeList/RecipeList";
import CombinationList from "./pages/CombinationList/CombinationList";
import MilestoneList from "./pages/MilestoneList/MilestoneList";

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
