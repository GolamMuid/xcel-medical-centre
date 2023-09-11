import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorText from "../../../layout/custom/ErrorText";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-hot-toast";

function ServiceAdd({ serviceAdd, setServiceAdd, refetch }) {
	const [loading, setLoading] = useState(false);

	const [image, setImage] = useState(null);
	const [imageData, setImageData] = useState(null);

	const handleImageUpload = (event) => {
		const uploadedImage = event.target.files[0];
		console.log(uploadedImage);
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setImage(reader.result);
			}
		};

		if (uploadedImage) {
			reader.readAsDataURL(uploadedImage);
			setImageData(uploadedImage);
		}
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event) => {
		event.preventDefault();
		const uploadedImage = event.dataTransfer.files[0];
		// setImageData(uploadedImage);
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setImage(reader.result);
			}
		};

		if (uploadedImage) {
			reader.readAsDataURL(uploadedImage);
			setImageData(uploadedImage);
		}
	};

	const handleClose = (e) => {
		e.preventDefault();
		setServiceAdd(false);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = async (data) => {
		if (imageData === null) {
			return toast.error("Please select an image");
		}

		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("serviceImage", imageData);

		setLoading(true);
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/set-service`,
				formData
			);
			if (response.status === 200) {
				setLoading(false);
				toast.success("Service Added Successfully");
				reset();
				refetch();
				setImage(null);
				setImageData(null);
				setServiceAdd(false);
			}
		} catch (err) {
			toast.error("Something went wrong, Try again");
			setLoading(false);
		}
	};

	return (
		<div>
			<input
				type="checkbox"
				className="modal-toggle"
				checked={serviceAdd}
				onChange={(e) =>
					e.target.checked ? setServiceAdd(false) : setServiceAdd(true)
				}
			/>
			<div className="modal" id="my-modal-2">
				<div className="modal-box">
					<label
						className="btn btn-sm btn-secondary btn-circle absolute right-4 top-4 text-white"
						onClick={() => setServiceAdd(false)}
					>
						✕
					</label>
					<h3 className="font-bold text-2xl text-center text-secondary">
						Add Service
					</h3>
					<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
						<div className="py-4">
							<div className="mb-2">
								<label> Title : </label>
								<br />
								<input
									className="input input-bordered w-full p-2"
									{...register("title", {
										required: "Title is required",
									})}
								/>
								<ErrorText>{errors.title?.message}</ErrorText>
							</div>

							<div className="mb-2">
								<label> Description : </label>
								<br />
								<input
									className="input input-bordered w-full p-2"
									{...register("description")}
								/>
							</div>

							<div
								className="col-span-2 md:col-span-1 max-mdrder-first"
								onDragOver={handleDragOver}
								onDrop={handleDrop}
							>
								<div className="border-dashed border-2 border-gray-400 rounded-lg p-4 mt-4 flex flex-col items-center">
									<label> Upload Service Image</label>
									<div className="flex flex-col items-center mt-2">
										<div>
											<img
												src={image || "/default.png"}
												alt="Thumb"
												className="h-16"
											/>
										</div>
										<p className="text-sm font-bold text-slate-700 my-1">
											Drag &amp; Drop
										</p>
										<input
											type="file"
											accept="image/*"
											onChange={handleImageUpload}
											className="hidden"
											id="serviceAdd"
											name="image"
											// {...register("image", {
											// 	required: "Please select an image",
											// })}
										/>
										<label
											htmlFor="serviceAdd"
											className="cursor-pointer btn-secondary py-1 px-4 rounded-lg text-sm  text-white"
										>
											Upload
										</label>
										{/* <ErrorText>{errors.image?.message}</ErrorText> */}
									</div>
								</div>
							</div>
						</div>
						<div className="modal-action">
							<button
								className="btn btn-sm btn-error text-white"
								onClick={(e) => handleClose(e)}
							>
								close
							</button>
							<button
								type="submit"
								className="btn btn-sm btn-success text-white"
							>
								{loading ? <PulseLoader color="#fff" size={10} /> : "Add"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ServiceAdd;
