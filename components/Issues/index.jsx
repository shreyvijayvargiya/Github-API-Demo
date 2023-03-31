import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { fetchLatestIssues } from "utils/api/githubApi";
import { DataTable } from "modules";
import { AiFillGithub } from "react-icons/ai";

const IssuesComponent = () => {
	const [data, setData] = useState();

	const getPRs = async () => {
		const issues = await fetchLatestIssues();
		setData(issues);
	};

	React.useEffect(() => {
		getPRs();
	}, []);

	return (
		<div>
			<div className="flex justify-start gap-1 items-center my-4">
				<AiFillGithub size={24} />
				<p>Facebook/react/issues</p>
			</div>
			<hr />
			<div className="p-8">
				<Box sx={{ width: "100%" }}>
					{data && data.length > 0 ? (
						<DataTable rows={data} />
					) : (
						<CircularProgress size={18} />
					)}
				</Box>
			</div>
		</div>
	);
};
export default IssuesComponent;
