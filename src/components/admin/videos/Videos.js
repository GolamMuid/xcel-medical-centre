import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import {
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from "react-table";
import { GlobalFilter } from "../../tableComponents/GlobalFilter";
import TableModel from "../../tableComponents/TableModel";
import Pagination from "../../tableComponents/Pagination";
import { Toaster } from "react-hot-toast";
import VideosAdd from "./VideosAdd";
import VideosEdit from "./VideosEdit";

function Videos() {
	const [videosAdd, setVideosAdd] = useState(false);
	const [videosEdit, setVideosEdit] = useState(false);

	const [selectedRowData, setSelectedRowData] = useState({});
	const COLUMNS = [
		{
			Header: "SL",
			accessor: "serial",
			Filter: false,
			Cell: ({ row, flatRows }) => {
				return flatRows.indexOf(row) + 1;
			},
		},
		{
			Header: "Title",
			accessor: "title",
			Filter: false,
		},
		{
			Header: "Youtube link",
			accessor: "videoUrlLink",
			Filter: false,
		},
		{
			Header: "Thumbnail",
			accessor: "videoImage",
			Cell: (row) => (
				<div className="flex justify-center ">
					<img className="h-12" src={row.row.original.videoImage} alt="" />
				</div>
			),
			Filter: false,
			disableSortBy: true,
		},
		{
			Header: "Active Status",
			accessor: "activeStatus",
			Filter: false,
			Cell: ({ row }) => {
				if (row.original.activeStatus === "Y") {
					return <div className="badge badge-success">Active</div>;
				} else {
					return <div className="badge badge-error">Inactive</div>;
				}
			},
		},
		{
			Header: "Edit",
			accessor: "edit",
			Filter: false,
			disableSortBy: true,
			Cell: (row) => (
				<button
					className="btn btn-secondary btn-xs bg-white text-secondary border-none hover:text-white m-auto block"
					onClick={() => editData(row.row.original)}
				>
					{<FaEdit />}
				</button>
			),
		},
	];

	const editData = (rowData) => {
		setSelectedRowData(rowData);
		setVideosEdit(true);
	};

	const {
		isLoading,
		data: videosData = [],
		refetch,
	} = useQuery({
		queryKey: ["videosData"],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/get-all-videos`
			);
			const fetchedData = await res;
			const data = await fetchedData.data;
			return data;
		},
	});

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => videosData, [videosData]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canPreviousPage,
		canNextPage,
		prepareRow,
		gotoPage,
		pageCount,
		setPageSize,
		allColumns,
		getToggleHideAllColumnsProps,
		state,
		setGlobalFilter,
	} = useTable(
		{ columns, data },
		useGlobalFilter,
		useFilters,
		useSortBy,
		usePagination,
		useRowSelect
	);
	const { globalFilter } = state;
	const { pageIndex, pageSize } = state;

	return (
		<>
			{isLoading ? (
				<FadeLoader className="mx-auto my-20" color="#2C3E63" height={30} />
			) : (
				<div>
					<div className="search-export-container flex flex-col gap-4 px-2 pb-4 md:flex-row items-center">
						<div className="flex items-center gap-1">
							<div>Show: </div>
							<select
								value={pageSize}
								onChange={(e) => setPageSize(Number(e.target.value))}
							>
								<option value={10}> 10 </option>
								<option value={20}> 20 </option>
								<option value={50}> 50 </option>
								<option value={100}> 100 </option>
								<option value={data.length}> All </option>
							</select>
						</div>
						{/* <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-sm bg-secondary text-white font-normal flex w-32 gap-2"
          >
            <MdVisibility /> Visibility
          </label>
          <div
            tabIndex={0}
            className="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content"
          >
            <div className="card-body">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  {...getToggleHideAllColumnsProps()}
                />
                Check All
              </label>
              {allColumns.map((column) => (
                <div key={column.id}>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      {...column.getToggleHiddenProps()}
                    />
                    {" " + column.Header}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div> */}
						{/* <div className="dropdown hidden md:flex">
          <label
            tabIndex={0}
            className="btn btn-sm bg-secondary text-white font-normal w-28 flex gap-2"
          >
            <BiExport /> Export
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu mt-8 shadow bg-base-100 rounded-md w-auto"
          >
            <li onClick={() => window.print()}>
              <Link>PDF</Link>
            </li>
            <li>
              <DownloadTableExcel
                filename="Supplier Data"
                sheet="suppliers"
                currentTableRef={tableRef.current}
              >
                Excel
              </DownloadTableExcel>
            </li>
          </ul>
        </div> */}
						<div className="w-full">
							<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
						</div>
						<button
							className="btn btn-sm btn-secondary text-white"
							onClick={() => setVideosAdd(true)}
						>
							+ Add
						</button>
						{/* <div className="flex items-center justify-between w-full md:hidden">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-sm bg-secondary text-white font-normal w-28 flex gap-3"
            >
              <BiExport /> Export
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu shadow bg-base-100 rounded-md w-auto"
            >
              <li onClick={() => window.print()}>
                <Link>PDF</Link>
              </li>
              <li>
                <DownloadTableExcel
                  filename="Supplier Data"
                  sheet="suppliers"
                  currentTableRef={tableRef.current}
                >
                  Excel
                </DownloadTableExcel>
              </li>
            </ul>
          </div>
          
        </div> */}
						{/* <button
          className="btn btn-sm bg-secondary text-white hidden md:flex"
          onClick={() => setRequisitionAdd(true)}
        >
          + Add
        </button> */}
					</div>
					<div>
						<div className="max-w-full overflow-x-auto sm:overflow-y-auto">
							<TableModel
								getTableProps={getTableProps}
								headerGroups={headerGroups}
								getTableBodyProps={getTableBodyProps}
								page={page}
								prepareRow={prepareRow}
							/>
						</div>
						<div className="m-4 mb-0">
							<Pagination
								page={page}
								data={data}
								pageIndex={pageIndex}
								gotoPage={gotoPage}
								canPreviousPage={canPreviousPage}
								previousPage={previousPage}
								nextPage={nextPage}
								canNextPage={canNextPage}
								pageCount={pageCount}
							/>
						</div>
					</div>
					<Toaster />
					<VideosAdd
						videosAdd={videosAdd}
						setVideosAdd={setVideosAdd}
						refetch={refetch}
					/>

					<VideosEdit
						videosEdit={videosEdit}
						setVideosEdit={setVideosEdit}
						selectedRowData={selectedRowData}
						setSelectedRowData={setSelectedRowData}
						refetch={refetch}
					/>
				</div>
			)}
		</>
	);
}

export default Videos;
