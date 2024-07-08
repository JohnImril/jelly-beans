import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "antd";

import { fetchCombinations, fetchCombinationById } from "../../api";

import "./CombinationList.css";

const CombinationList: React.FC = () => {
	const [combinations, setCombinations] = useState<any[]>([]);
	const [selectedCombination, setSelectedCombination] = useState<any>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);
	const [pageSize] = useState(10);
	const loader = useRef(null);

	useEffect(() => {
		const getCombinations = async () => {
			try {
				const data = await fetchCombinations(pageIndex, pageSize);
				if (Array.isArray(data)) {
					setCombinations((prevCombinations) => [
						...prevCombinations,
						...data,
					]);
				} else {
					console.error("Data is not an array:", data);
				}
			} catch (error) {
				console.error("Failed to fetch combinations:", error);
			}
		};
		getCombinations();
	}, [pageIndex, pageSize]);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setPageIndex((prevPageIndex) => prevPageIndex + 1);
			}
		});
		const currentLoader = loader.current;
		if (currentLoader) {
			observer.observe(currentLoader);
		}
		return () => {
			if (currentLoader) {
				observer.unobserve(currentLoader);
			}
		};
	}, []);

	const showModal = async (combinationId: string) => {
		try {
			const data = await fetchCombinationById(combinationId);
			setSelectedCombination(data);
			setIsModalVisible(true);
		} catch (error) {
			console.error("Failed to fetch combination details:", error);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const filterTags = (tags: string[]) => {
		return tags.filter((tag) => tag !== "+").join(", ");
	};

	return (
		<div className="combination-list">
			{combinations.map((combination, index) => (
				<div key={index} className="combination-item">
					<h2>{combination.name}</h2>
					<p>
						<strong>Tags:</strong> {filterTags(combination.tag)}
					</p>
					<Button
						type="primary"
						onClick={() => showModal(combination.combinationId)}
					>
						More details
					</Button>
				</div>
			))}
			<div ref={loader} />
			{selectedCombination && (
				<Modal
					title={selectedCombination.name}
					open={isModalVisible}
					footer={
						<Button type="primary" onClick={handleCancel}>
							Return
						</Button>
					}
					onCancel={handleCancel}
				>
					<p>
						<strong>Name:</strong> {selectedCombination.name}
					</p>
					<p>
						<strong>Tags:</strong>{" "}
						{filterTags(selectedCombination.tag)}
					</p>
				</Modal>
			)}
		</div>
	);
};

export default CombinationList;
