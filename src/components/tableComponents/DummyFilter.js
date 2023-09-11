import React from "react";

export const DummyFilter = ({ column }) => {
	const { filterValue, setFilter } = column;

	return (
		<span>
			<input
				disabled
				value={filterValue || ""}
				onChange={(e) => setFilter(e.target.value)}
				className="input-sm bg-stone-100 w-10 px-2"
			/>
		</span>
	);
};
