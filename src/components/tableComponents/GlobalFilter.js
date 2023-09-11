import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
	return (
		<div className="global-Filter">
			<input
				className="input input-sm input-bordered w-full"
				value={filter || ""}
				onChange={(e) => setFilter(e.target.value)}
				placeholder="Search"
			/>
		</div>
	);
};
