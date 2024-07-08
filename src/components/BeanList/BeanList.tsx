import React, { useState, useEffect, useRef } from "react";
import { fetchBeans, fetchBeanById } from "../../api";
import { Modal, Button } from "antd";
import "./BeanList.css";

const BeanList: React.FC = () => {
	const [beans, setBeans] = useState<any[]>([]);
	const [selectedBean, setSelectedBean] = useState<any>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);
	const [pageSize] = useState(10);
	const loader = useRef(null);

	useEffect(() => {
		const getBeans = async () => {
			try {
				const data = await fetchBeans(pageIndex, pageSize);
				if (Array.isArray(data)) {
					setBeans((prevBeans) => [...prevBeans, ...data]);
				} else {
					console.error("Data is not an array:", data);
				}
			} catch (error) {
				console.error("Failed to fetch beans:", error);
			}
		};
		getBeans();
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

	const showModal = async (beanId: string) => {
		try {
			const data = await fetchBeanById(beanId);
			setSelectedBean(data);
			setIsModalVisible(true);
		} catch (error) {
			console.error("Failed to fetch bean details:", error);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<div className="bean-list">
			{beans.map((bean, index) => (
				<div key={index} className="bean-item">
					<h2>{bean.flavorName}</h2>
					<img
						src={bean.imageUrl}
						alt={bean.flavorName}
						className="bean-image"
					/>
					<p>
						<strong>Description:</strong> {bean.description}
					</p>
					<p>
						<strong>Color Group:</strong> {bean.colorGroup}
					</p>
					<p>
						<strong>Gluten Free:</strong>{" "}
						{bean.glutenFree ? "Yes" : "No"}
					</p>
					<p>
						<strong>Ingredients:</strong>{" "}
						{bean.ingredients.join(", ")}
					</p>
					<Button
						type="primary"
						onClick={() => showModal(bean.beanId)}
					>
						More details
					</Button>
				</div>
			))}
			<div ref={loader} />
			{selectedBean && (
				<Modal
					title={selectedBean.flavorName}
					open={isModalVisible}
					onCancel={handleCancel}
					footer={
						<Button type="primary" onClick={handleCancel}>
							Return
						</Button>
					}
				>
					<img
						src={selectedBean.imageUrl}
						alt={selectedBean.flavorName}
						className="bean-image"
					/>
					<p>
						<strong>Description:</strong> {selectedBean.description}
					</p>
					<p>
						<strong>Color Group:</strong> {selectedBean.colorGroup}
					</p>
					<p>
						<strong>Gluten Free:</strong>{" "}
						{selectedBean.glutenFree ? "Yes" : "No"}
					</p>
					<p>
						<strong>Ingredients:</strong>{" "}
						{selectedBean.ingredients.join(", ")}
					</p>
					<p>
						<strong>Groups:</strong>{" "}
						{selectedBean.groupName.join(", ")}
					</p>
				</Modal>
			)}
		</div>
	);
};

export default BeanList;
