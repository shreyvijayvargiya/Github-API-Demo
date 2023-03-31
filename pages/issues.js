import { IssuesComponent } from "components";
import Head from "next/head";
import React from "react";

const IssuesPage = () => {
	return (
		<div>
      <Head>
        <title>Issues</title>
      </Head>
			<IssuesComponent />
		</div>
	);
};
export default IssuesPage;
