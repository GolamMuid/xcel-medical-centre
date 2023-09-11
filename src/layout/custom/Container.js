import React from "react";

function Container({ children }) {
	return (
		<div className="p-4 max-w-[1200px] m-auto lg:p-0 lg:py-4"> {children} </div>
	);
}

export default Container;
