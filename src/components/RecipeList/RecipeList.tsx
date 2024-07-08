import React, { useState, useEffect, useRef } from "react";
import { fetchRecipes, fetchRecipeById } from "../../api";
import { Modal, Button } from "antd";
import "./RecipeList.css";

const RecipeList: React.FC = () => {
	const [recipes, setRecipes] = useState<any[]>([]);
	const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);
	const [pageSize] = useState(10);
	const loader = useRef(null);

	useEffect(() => {
		const getRecipes = async () => {
			try {
				const data = await fetchRecipes(pageIndex, pageSize);
				if (Array.isArray(data)) {
					setRecipes((prevRecipes) => [...prevRecipes, ...data]);
				} else {
					console.error("Data is not an array:", data);
				}
			} catch (error) {
				console.error("Failed to fetch recipes:", error);
			}
		};
		getRecipes();
	}, [pageIndex, pageSize]);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setPageIndex((prevPageIndex) => prevPageIndex + 1);
			}
		});
		if (loader.current) {
			observer.observe(loader.current);
		}
		return () => {
			if (loader.current) {
				observer.unobserve(loader.current);
			}
		};
	}, []);

	const showModal = async (recipeId: string) => {
		try {
			const data = await fetchRecipeById(recipeId);
			setSelectedRecipe(data);
			setIsModalVisible(true);
		} catch (error) {
			console.error("Failed to fetch recipe details:", error);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<div className="recipe-list">
			{recipes.map((recipe, index) => (
				<div key={index} className="recipe-item">
					<h2>{recipe.name}</h2>
					<img
						src={recipe.imageUrl}
						alt={recipe.name}
						className="recipe-image"
					/>
					<p>
						<strong>Description:</strong> {recipe.description}
					</p>
					<Button
						type="primary"
						onClick={() => showModal(recipe.recipeId)}
					>
						More details
					</Button>
				</div>
			))}
			<div ref={loader} />
			{selectedRecipe && (
				<Modal
					title={selectedRecipe.name}
					open={isModalVisible}
					footer={
						<Button type="primary" onClick={handleCancel}>
							Return
						</Button>
					}
					onCancel={handleCancel}
				>
					<p>
						<strong>Description:</strong>{" "}
						{selectedRecipe.description}
					</p>
					<p>
						<strong>Ingredients:</strong>{" "}
						{selectedRecipe.ingredients.join(", ")}
					</p>
					<p>
						<strong>Directions:</strong>
					</p>
					<ul>
						{selectedRecipe.directions.map(
							(direction: string, index: number) => (
								<li key={index}>{direction}</li>
							)
						)}
					</ul>
					{selectedRecipe.additions1 &&
						selectedRecipe.additions1.length > 0 && (
							<>
								<p>
									<strong>Additions 1:</strong>{" "}
									{selectedRecipe.additions1.join(", ")}
								</p>
							</>
						)}
					{selectedRecipe.additions2 &&
						selectedRecipe.additions2.length > 0 && (
							<>
								<p>
									<strong>Additions 2:</strong>{" "}
									{selectedRecipe.additions2.join(", ")}
								</p>
							</>
						)}
					{selectedRecipe.additions3 &&
						selectedRecipe.additions3.length > 0 && (
							<>
								<p>
									<strong>Additions 3:</strong>{" "}
									{selectedRecipe.additions3.join(", ")}
								</p>
							</>
						)}
					{selectedRecipe.cookTime && (
						<p>
							<strong>Cook Time:</strong>{" "}
							{selectedRecipe.cookTime}
						</p>
					)}
					{selectedRecipe.makingAmount && (
						<p>
							<strong>Making Amount:</strong>{" "}
							{selectedRecipe.makingAmount}
						</p>
					)}
					{selectedRecipe.prepTime && (
						<p>
							<strong>Prep Time:</strong>{" "}
							{selectedRecipe.prepTime}
						</p>
					)}
					{selectedRecipe.tips && selectedRecipe.tips.length > 0 && (
						<p>
							<strong>Tips:</strong>{" "}
							{selectedRecipe.tips.join(", ")}
						</p>
					)}
					{selectedRecipe.totalTime && (
						<p>
							<strong>Total Time:</strong>{" "}
							{selectedRecipe.totalTime}
						</p>
					)}
				</Modal>
			)}
		</div>
	);
};

export default RecipeList;
