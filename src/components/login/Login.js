import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "./medical.json";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ErrorText from "../../layout/custom/ErrorText";
import { PulseLoader } from "react-spinners";

function Login() {
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleLogin = async (data) => {
		setLoading(true);
		try {
			const response = await axios.post(
				// `http://192.168.0.89/xcel-medical-backend/api/auth/login`,
				`${process.env.REACT_APP_API_URL}/api/auth/login`,
				data
			);
			if (response.status === 200) {
				setLoading(false);
				localStorage.setItem("xcelToken", response.data.access_token);
				window.location = "/sliders";
			}
		} catch (err) {
			console.log(err);
			if (err.response?.status === 403);
			toast.error("Invalid Credentials", {
				duration: 60000,
			});
			setLoading(false);
		}
	};

	return (
		<div className="bg-gradient-to-b from-sky-500 to-indigo-500 h-screen flex items-center justify-center">
			<div className="bg-[#ffffff99] w-4/5 flex rounded-lg backdrop-blur-3xl lg:w-[800px]">
				<div className="hidden md:flex items-center justify-center p-8">
					<Lottie
						animationData={animationData}
						style={{ height: "350px", minWidth: "320px" }}
					/>
				</div>
				<div className="min-h-96 bg-white flex flex-col items-center rounded-lg w-full">
					{/* <p className="font-bold text-xl text-center p-4 md:text-4xl md:p-8">
						Xcel Medical Centre
					</p> */}
					<img src="/xcel.svg" alt="logo" className="w-[200px]" />
					<form className="w-full" onSubmit={handleSubmit(handleLogin)}>
						<p className="font-bold text-xl text-center p-4 md:text-2xl">
							Login
						</p>
						<div className="w-full px-4 py-2">
							<label> Username: </label>
							<input
								type="text"
								placeholder="Insert your Username"
								className="input input-bordered w-full"
								{...register("username", { required: "Username is required" })}
							/>
							<ErrorText>{errors.username?.message}</ErrorText>
						</div>
						<div className="w-full px-4 py-2">
							<label> Password: </label>
							<input
								type="password"
								placeholder="Type here"
								className="input input-bordered w-full"
								{...register("password", {
									required: "Password is required",
								})}
							/>
							<ErrorText>{errors.password?.message}</ErrorText>
						</div>

						<button
							type="submit"
							className="btn btn-secondary my-8 mx-auto block text-white"
						>
							{loading ? <PulseLoader color="#fff" /> : "Login"}
						</button>
					</form>
				</div>
			</div>
			<Toaster />
		</div>
	);
}

export default Login;
