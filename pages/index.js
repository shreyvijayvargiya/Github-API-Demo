import React from "react";
import { HomeComponent } from "components";
import Head from "next/head";

const HomePage = () => {
	return (
		<div>
			<Head>
				<title>Github API Demo</title>
			</Head>
			<HomeComponent />
		</div>
	);
};
export default HomePage;
