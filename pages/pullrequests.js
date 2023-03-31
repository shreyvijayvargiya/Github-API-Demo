import React from "react";
import Head from "next/head";
import { PullRequestsComponent } from "components";

const PullRequestsPage = () => {
	return (
		<div>
			<Head>
				<title>Pull Requests</title>
			</Head>
			<PullRequestsComponent />
		</div>
	);
};
export default PullRequestsPage;
