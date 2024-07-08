const BASE_URL = "https://jellybellywikiapi.onrender.com/api";

export const fetchBeans = async (pageIndex: number, pageSize: number) => {
	const response = await fetch(
		`${BASE_URL}/beans?pageIndex=${pageIndex}&pageSize=${pageSize}`
	);
	const data = await response.json();
	return data.items; // Возвращаем массив фасолей из items
};

export const fetchBeanById = async (id: string) => {
	const response = await fetch(`${BASE_URL}/beans/${id}`);
	return response.json();
};

export const fetchFacts = async (pageIndex: number, pageSize: number) => {
	const response = await fetch(
		`${BASE_URL}/facts?pageIndex=${pageIndex}&pageSize=${pageSize}`
	);
	const data = await response.json();
	return data.items; // Возвращаем массив фактов из items
};

export const fetchFactById = async (id: string) => {
	const response = await fetch(`${BASE_URL}/facts/${id}`);
	return response.json();
};

export const fetchRecipes = async (pageIndex: number, pageSize: number) => {
	const response = await fetch(
		`${BASE_URL}/recipes?pageIndex=${pageIndex}&pageSize=${pageSize}`
	);
	const data = await response.json();
	return data.items; // Возвращаем массив рецептов из items
};

export const fetchRecipeById = async (id: string) => {
	const response = await fetch(`${BASE_URL}/recipes/${id}`);
	return response.json();
};

export const fetchCombinations = async (
	pageIndex: number,
	pageSize: number
) => {
	const response = await fetch(
		`${BASE_URL}/combinations?pageIndex=${pageIndex}&pageSize=${pageSize}`
	);
	const data = await response.json();
	return data.items; // Возвращаем массив комбинаций из items
};

export const fetchCombinationById = async (id: string) => {
	const response = await fetch(`${BASE_URL}/combinations/${id}`);
	return response.json();
};

export const fetchMilestones = async (pageIndex: number, pageSize: number) => {
	const response = await fetch(
		`${BASE_URL}/mileStones?pageIndex=${pageIndex}&pageSize=${pageSize}`
	);
	const data = await response.json();
	return data.items; // Возвращаем массив этапов из items
};

export const fetchMilestoneById = async (id: string) => {
	const response = await fetch(`${BASE_URL}/mileStones/${id}`);
	return response.json();
};
