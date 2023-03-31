import React, { useState } from "react";
import {
	Tabs,
	Tab,
	Box,
	Typography,
	CircularProgress,
	Button,
} from "@mui/material";
import { fetchLatestIssues, fetchLatestPRs } from "utils/api/githubApi";
import { DataTable } from "modules";
import router from "next/router";

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

const HomeComponent = () => {
	const [value, setValue] = React.useState(0);
	const [data, setData] = useState({
		pullrequests: [],
		issues: [],
	});

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const getPrsIssuesLists = async () => {
		const PRs = await fetchLatestPRs();
		const issues = await fetchLatestIssues();
		setData({
			pullrequests: PRs,
			issues: issues,
		});
	};

	React.useEffect(() => {
		getPrsIssuesLists();
	}, []);

	return (
		<div>
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
						{data.pullrequests && data.pullrequests.length > 0 ? (
							<DataTable rows={data.pullrequests} removePagination />
						) : (
							<CircularProgress size={18} />
						)}
						<br />
						<Button
							color="primary"
							variant="contained"
							size="small"
							onClick={() => router.push("/pullrequests")}
						>
							View all
						</Button>
					</TabPanel>
					<TabPanel value={value} index={1}>
						{data.issues && data.issues.length > 0 ? (
							<DataTable rows={data.issues} removePagination />
						) : (
							<CircularProgress size={18} />
						)}
						<br />
						<Button
							color="primary"
							variant="contained"
							size="small"
							onClick={() => router.push("/issues")}
						>
							View all
						</Button>
					</TabPanel>
				</Box>
			</div>
		</div>
	);
};
export default HomeComponent;
