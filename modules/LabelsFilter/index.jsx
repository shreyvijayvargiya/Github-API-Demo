import React, { useEffect, useState } from "react";
import { getRepoLabels } from "utils/api/githubApi";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";

const LabelsFilter = ({ data, setData }) => {
	const [labels, setLabels] = useState([]);
	const [labelFilter, setLabelFilter] = React.useState([]);

	const filterLabels = React.useCallback(async () => {
		const repoLabels = await getRepoLabels();
		setLabels(repoLabels);
	}, [labels]);

	React.useEffect(() => {
		filterLabels();
	}, []);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setLabelFilter(value);
		let filteredData = [];
		data.forEach((row) => {
			row.labels.forEach((label) => {
				if (label.name === value) {
					filteredData.push(row);
				} else {
					return null;
				}
			});
		});
		setData(filteredData);
	};
	return (
		<div>
			<FormControl>
				<InputLabel id="select-label">Filter label</InputLabel>
				<Select
					labelId="select-label"
					id="select-label"
					size="small"
					value={labelFilter}
					onChange={handleChange}
				>
					{labels.map(({ name }) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};
export default LabelsFilter;
