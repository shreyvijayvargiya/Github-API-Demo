import React from "react";
import router from "next/router";
import { AiFillGithub } from "react-icons/ai";

const Navbar = () => {
	const pathname = router.query.pathname;

	return (
		<div className="w-full bg-gray-100 p-4 border-b border-gray-200">
			<div className="flex justify-start items-center my-4 underline">
				<AiFillGithub size={24} />
				<a href="/" className="text-blue-700">
					facebook/react
				</a>
				{
					(pathname,
					(
						<a href="/facebook/react/query" className="text-blue-700">
							{pathname}
						</a>
					))
				}
			</div>
		</div>
	);
};
export default Navbar;
