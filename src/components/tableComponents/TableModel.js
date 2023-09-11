import React from "react";
import {
	TiArrowSortedDown,
	TiArrowSortedUp,
	TiArrowUnsorted,
} from "react-icons/ti";

function TableModel(props) {
	return (
		<div className="w-full rounded-md bg-white p-2">
			<table className="data-table w-full" {...props.getTableProps()}>
				<thead className="bg-stone-100">
					{props.headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()} className="border">
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()} className="p-2">
									<div
										className="flex items-center justify-center gap-4"
										{...column.getSortByToggleProps()}
									>
										<span>{column.render("Header")}</span>
										<span className="sort-icon">
											{column.isSorted ? (
												column.isSortedDesc ? (
													<TiArrowSortedDown />
												) : (
													<TiArrowSortedUp />
												)
											) : (
												<TiArrowUnsorted />
											)}
										</span>
									</div>
									<div>{column.canFilter ? column.render("Filter") : null}</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...props.getTableBodyProps()}>
					{props.page.map((row) => {
						props.prepareRow(row);
						return (
							<tr
								{...row.getRowProps()}
								className={`border hover:bg-primary  ${
									row.isSelected ? "bg-primary" : "even:bg-[#F6F6F6]"
								}`}
								onClick={() => {
									row.toggleRowSelected();
								}}
							>
								{row.cells.map((cell) => {
									return (
										<td
											{...cell.getCellProps()}
											className="px-4 py-2 text-center"
										>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default TableModel;
