import React from "react";

export const ColumnFilter = ({ column }) => {
	const { filterValue, setFilter } = column;

	return (
		<span>
			<input
				value={filterValue || ""}
				onChange={(e) => setFilter(e.target.value)}
				className="input input-bordered input-sm w-full px-2 column-filter"
			/>
		</span>
	);
};
