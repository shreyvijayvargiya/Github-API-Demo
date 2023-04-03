import React from "react";
import { AiFillGithub } from "react-icons/ai";

const Navbar = () => {
	return (
		<div className="w-full bg-gray-100 p-4 border-b border-gray-200">
			<div className="flex justify-start items-center my-4 underline">
				<AiFillGithub size={24} />
				<a href="/" className="text-blue-700">
					facebook/react
				</a>
			</div>
		</div>
	);
};
export default Navbar;
