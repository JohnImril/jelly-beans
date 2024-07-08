import React, { useState, useEffect, useRef } from "react";
import { fetchMilestones, fetchMilestoneById } from "../../api";
import { Modal, Button } from "antd";
import "./MilestoneList.css";

const MilestoneList: React.FC = () => {
	const [milestones, setMilestones] = useState<any[]>([]);
	const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);
	const [pageSize] = useState(10);
	const loader = useRef(null);

	useEffect(() => {
		const getMilestones = async () => {
			try {
				const data = await fetchMilestones(pageIndex, pageSize);
				if (Array.isArray(data)) {
					setMilestones((prevMilestones) => [
						...prevMilestones,
						...data,
					]);
				} else {
					console.error("Data is not an array:", data);
				}
			} catch (error) {
				console.error("Failed to fetch milestones:", error);
			}
		};
		getMilestones();
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

	const showModal = async (milestoneId: string) => {
		try {
			const data = await fetchMilestoneById(milestoneId);
			setSelectedMilestone(data);
			setIsModalVisible(true);
		} catch (error) {
			console.error("Failed to fetch milestone details:", error);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<div className="milestone-list">
			{milestones.map((milestone, index) => (
				<div key={index} className="milestone-item">
					<h2>{milestone.year}</h2>
					<p>{milestone.description}</p>
					<Button
						type="primary"
						onClick={() => showModal(milestone.mileStoneId)}
					>
						More details
					</Button>
				</div>
			))}
			<div ref={loader} />
			{selectedMilestone && (
				<Modal
					title={`Milestone of ${selectedMilestone.year}`}
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
						{selectedMilestone.description}
					</p>
					<p>
						<strong>Year:</strong> {selectedMilestone.year}
					</p>
				</Modal>
			)}
		</div>
	);
};

export default MilestoneList;
