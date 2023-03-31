import React from "react";
import { Navbar, Footer } from "modules";

const Body = ({ children }) => {
	return (
		<div>
			<Navbar />
			<div className="w-full h-screen p-10 text-center">{children}</div>
		</div>
	);
};
export default Body;
