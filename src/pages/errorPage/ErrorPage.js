import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<div className="text-center">
			<h1 className="text-red-700 font-bold text-8xl m-20">404 Error</h1>
			<h2 className="font-bold text-4xl m-20">Page Not Found</h2>
			<Link to="/">
				<button className="btn text-white text-xl">Back To Home</button>
			</Link>
		</div>
	);
};

export default ErrorPage;
