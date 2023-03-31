import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, CircularProgress } from "@mui/material";
import { fetchLatestIssues, fetchLatestPRs } from "utils/api/githubApi";
import { DataTable } from "modules";
import { AiFillGithub } from "react-icons/ai";

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const Home = () => {
	const [value, setValue] = React.useState(0);
	const [data, setData] = useState({
		pullrequests: [],
		issues: [],
	});

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const getPRs = async () => {
		const PRs = await fetchLatestPRs();
		const issues = await fetchLatestIssues();
		setData({
			pullrequests: PRs,
			issues: issues,
		});
	};

	console.log(data);
	React.useEffect(() => {
		getPRs();
	}, []);

	return (
		<div>
			<div className="flex justify-start gap-1 items-center my-4">
				<AiFillGithub size={24} />
				<p>Facebook/react</p>
			</div>
			<hr />
			<div className="p-8">
				<Box sx={{ width: "100%" }}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							<Tab label="Pull Requests" {...a11yProps(0)} />
							<Tab label="Issues" {...a11yProps(1)} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						{data.pullrequestsl && data.pullrequests.length > 0 ? (
							<CircularProgress size={18} />
						) : (
							<DataTable rows={data.pullrequests} />
						)}
					</TabPanel>
					<TabPanel value={value} index={1}>
						{/* <DataTable /> */}
						Issues
					</TabPanel>
				</Box>
			</div>
		</div>
	);
};
export default Home;
