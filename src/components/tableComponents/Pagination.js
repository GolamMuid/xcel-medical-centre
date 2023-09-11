import React from "react";
import {
	BsFillSkipStartFill,
	BsFillSkipBackwardFill,
	BsFillSkipEndFill,
	BsFillSkipForwardFill,
} from "react-icons/bs";

function Pagination(props) {
	return (
		<div className="pagination-container sm: flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
			<div>
				Showing
				<b> {props.page.length}</b> out of <b>{props.data.length}</b> entries
			</div>

			<div className="gotopage">
				<span>Go to Page: </span>
				<input
					type="number"
					defaultValue={props.pageIndex + 1}
					onChange={(e) => {
						const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
						props.gotoPage(pageNumber);
					}}
					className="w-24"
				/>
			</div>

			<div className="flex gap-2">
				<button
					className="btn btn-sm bg-secondary text-white"
					onClick={() => props.gotoPage(0)}
					disabled={!props.canPreviousPage}
				>
					<BsFillSkipBackwardFill className="button-icon" />
				</button>
				<button
					className="btn btn-sm bg-secondary text-white"
					onClick={() => props.previousPage()}
					disabled={!props.canPreviousPage}
				>
					<BsFillSkipStartFill className="button-icon" />
				</button>
				<button
					className="btn btn-sm bg-secondary text-white"
					onClick={() => props.nextPage()}
					disabled={!props.canNextPage}
				>
					<BsFillSkipEndFill className="button-icon" />
				</button>
				<button
					className="btn btn-sm bg-secondary text-white"
					onClick={() => props.gotoPage(props.pageCount - 1)}
					disabled={!props.canNextPage}
				>
					<BsFillSkipForwardFill className="button-icon" />
				</button>
			</div>
		</div>
	);
}

export default Pagination;
