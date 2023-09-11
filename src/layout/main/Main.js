import React from "react";
import { Outlet } from "react-router-dom";
import NavSidebar from "../adminLayout/NavSidebar"

function Main({ children }) {
	return (
		<>
			<NavSidebar>
				{children}
				<Outlet />
			</NavSidebar>
		</>
	);
}

export default Main;
