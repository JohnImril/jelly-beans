import React, { useState, useEffect, useRef } from "react";
import { fetchFacts, fetchFactById } from "../../api";
import { Modal, Button } from "antd";
import "./FactList.css";

const FactList: React.FC = () => {
	const [facts, setFacts] = useState<any[]>([]);
	const [selectedFact, setSelectedFact] = useState<any>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);
	const [pageSize] = useState(10);
	const loader = useRef(null);

	useEffect(() => {
		const getFacts = async () => {
			try {
				const data = await fetchFacts(pageIndex, pageSize);
				if (Array.isArray(data)) {
					setFacts((prevFacts) => [...prevFacts, ...data]);
				} else {
					console.error("Data is not an array:", data);
				}
			} catch (error) {
				console.error("Failed to fetch facts:", error);
			}
		};
		getFacts();
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

	const showModal = async (factId: string) => {
		try {
			const data = await fetchFactById(factId);
			setSelectedFact(data);
			setIsModalVisible(true);
		} catch (error) {
			console.error("Failed to fetch fact details:", error);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<div className="fact-list">
			{facts.map((fact, index) => (
				<div key={index} className="fact-item">
					<h2>{fact.title}</h2>
					<p>{fact.description}</p>
					<Button
						type="primary"
						onClick={() => showModal(fact.factId)}
					>
						More details
					</Button>
				</div>
			))}
			<div ref={loader} />
			{selectedFact && (
				<Modal
					title={selectedFact.title}
					open={isModalVisible}
					onCancel={handleCancel}
					footer={
						<Button type="primary" onClick={handleCancel}>
							Return
						</Button>
					}
				>
					<p>{selectedFact.description}</p>
				</Modal>
			)}
		</div>
	);
};

export default FactList;
