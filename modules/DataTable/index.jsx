import React, { useState } from "react";
import { grey, green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import {
	Table,
	TableBody,
	TableHead,
	Paper,
	IconButton,
	TableContainer,
	TableRow,
	Chip,
	Pagination,
	Select,
	MenuItem,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
	AiOutlinePullRequest,
	AiOutlineDownCircle,
} from "react-icons/ai";
import { AiOutlineUpCircle } from "react-icons/ai";
import LabelsFilter from "../LabelsFilter";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		color: theme.palette.common.black,
		fontWeight: "bold",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(() => ({
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const DataTable = ({ rows, removePagination, showLabelFilter }) => {
	const initialData = rows.slice(0, 5);
	const [data, setData] = useState(initialData);
	const [activeId, setActiveId] = useState("");
	const [filter, setFilter] = useState(0);

	const handlePagination = (e, pageNumber) => {
		const updatedRows = rows?.slice(
			Number(pageNumber) * 5,
			Number(pageNumber) * 5 + 5
		);
		setData(updatedRows);
	};

	const statusSelect = (e) => {
		const val = e.target.value;
		setFilter(val);
	};


	return (
		<div>
			<div className="flex justify-end items-center w-full gap-4 p-4">
				{showLabelFilter && <LabelsFilter data={data} setData={setData} />}
				<Select
					labelId="status-select"
					id="status-select"
					value={filter}
					label="status"
					size="small"
					onChange={statusSelect}
				>
					<MenuItem value={0}>All</MenuItem>
					<MenuItem value={10}>Open</MenuItem>
					<MenuItem value={20}>Draft</MenuItem>
				</Select>
			</div>
			<br />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Toggle</StyledTableCell>
							<StyledTableCell>D/O</StyledTableCell>
							<StyledTableCell align="left">Title</StyledTableCell>
							<StyledTableCell align="left">Created date </StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.filter((item) => {
								if (filter === 10) {
									return !item.draft;
								} else if (filter === 20) {
									return item.draft;
								} else {
									return item;
								}
							})
							.map((row) => {
								const date = new Date(row.created_at);
								return (
									<>
										<StyledTableRow key={row.id}>
											<StyledTableCell>
												{activeId === row.id ? (
													<IconButton onClick={() => setActiveId("")}>
														<AiOutlineDownCircle size={18} />
													</IconButton>
												) : (
													<IconButton onClick={() => setActiveId(row.id)}>
														<AiOutlineUpCircle size={18} />
													</IconButton>
												)}
											</StyledTableCell>
											<StyledTableCell>
												<AiOutlinePullRequest
													color={row.draft ? grey[500] : green[500]}
												/>
											</StyledTableCell>
											<StyledTableCell align="left">
												{row.title}{" "}
												{row.labels.map((item) => (
													<Chip
														label={item.name}
														key={item.id}
														color="primary"
														size="small"
													/>
												))}
											</StyledTableCell>
											<StyledTableCell align="left">
												{date.getDate() +
													"/" +
													date.getMonth() +
													"/" +
													date.getFullYear()}
											</StyledTableCell>
										</StyledTableRow>
										{activeId === row.id && (
											<StyledTableCell colSpan={4}>
												<div className="w-full my-4 p-4">
													<p className="text-semibold text-xl">Comment</p>
													{row.body}
												</div>
											</StyledTableCell>
										)}
									</>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			{removePagination ? null : (
				<div className="flex justify-center items-center p-4">
					<Pagination count={6} onChange={handlePagination} />
				</div>
			)}
		</div>
	);
};
export default DataTable;
