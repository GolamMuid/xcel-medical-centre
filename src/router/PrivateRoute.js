import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
	const token = localStorage.getItem("xcelToken");
	let location = useLocation();
	if (token) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute;

// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// function AdminRoute({ children, ...rest }) {
// 	const token = localStorage.getItem("RxAccessToken");
// 	const role = localStorage.getItem("RxRole");
// 	let location = useLocation();
// 	if (token && role === "admin") {
// 		return children;
// 	} else if (token && role !== "admin") {
// 		<Navigate to="/access-denied" state={{ from: location }} />;
// 	}
// 	return <Navigate to="/login" state={{ from: location }} />;
// }

// export default AdminRoute;
