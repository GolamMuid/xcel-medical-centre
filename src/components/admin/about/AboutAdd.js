import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorText from "../../../layout/custom/ErrorText";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-hot-toast";

function AboutAdd({ aboutAdd, setAboutAdd, refetch }) {
	const [loading, setLoading] = useState(false);

	const handleClose = (e) => {
		e.preventDefault();
		setAboutAdd(false);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/set-about`,
				data
			);
			if (response.status === 200) {
				setLoading(false);
				toast.success("About Added Successfully");
				reset();
				refetch();
				setAboutAdd(false);
			}
		} catch (err) {
			console.log(err);
			toast.error("Something went wrong, Try again");
			setLoading(false);
		}
	};

	return (
		<div>
			<input
				type="checkbox"
				id="supplier-add"
				className="modal-toggle"
				checked={aboutAdd}
				onChange={(e) =>
					e.target.checked ? setAboutAdd(false) : setAboutAdd(true)
				}
			/>
			<div className="modal" id="my-modal-2">
				<div className="modal-box">
					<label
						htmlFor="department-add"
						className="btn btn-sm btn-secondary btn-circle absolute right-4 top-4 text-white"
						onClick={() => setAboutAdd(false)}
					>
						✕
					</label>
					<h3 className="font-bold text-2xl text-center text-secondary">
						Add About
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
								<textarea
									className="textarea textarea-bordered w-full min-h-[160px]"
									{...register("description", {
										required: "Description is required",
									})}
								/>
								<ErrorText>{errors.description?.message}</ErrorText>
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

export default AboutAdd;
