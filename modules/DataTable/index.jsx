import React, { useState } from "react";
import { grey, green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import {
	Table,
	TableBody,
	TableHead,
	Paper,
	TableContainer,
	TableRow,
	Chip,
	Pagination,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { AiOutlinePullRequest } from "react-icons/ai";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		color: theme.palette.common.black,
		fontWeight: "bold",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const DataTable = ({ rows }) => {
	const initialData = rows.slice(0, 5);
	const [data, setData] = useState(initialData);

	const handlePagination = (e, pageNumber) => {
		const updatedRows = rows?.slice(Number(pageNumber) * 5, Number(pageNumber) * 5 + 5);
		setData(updatedRows);
	};

	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>D/O</StyledTableCell>
							<StyledTableCell align="left">Title</StyledTableCell>
							<StyledTableCell align="left">Created date</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => {
							const date = new Date(row.created_at);
							return (
								<StyledTableRow key={row.id}>
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
									<StyledTableCell align="left"></StyledTableCell>
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<div className="flex justify-center items-center p-4">
				<Pagination count={6} onChange={handlePagination} />
			</div>
		</div>
	);
};
export default DataTable;
