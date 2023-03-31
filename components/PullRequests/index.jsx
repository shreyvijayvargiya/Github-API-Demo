import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { fetchLatestPRs } from "utils/api/githubApi";
import { DataTable } from "modules";
import { AiFillGithub } from "react-icons/ai";

const PullRequestsComponent = () => {
	const [data, setData] = useState();

	const getPRs = async () => {
		const prs = await fetchLatestPRs();
		setData(prs);
	};

	React.useEffect(() => {
		getPRs();
	}, []);

	return (
		<div>
			<div className="flex justify-start gap-1 items-center my-4">
				<AiFillGithub size={24} />
				<p>Facebook/react/pullrequests</p>
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
export default PullRequestsComponent;
