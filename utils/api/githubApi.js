import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export const fetchLatestPRs = async () => {
	const data = await octokit.rest.pulls.list({
		owner: "facebook",
		repo: "react",
	});
	return data.data;
};

export const fetchLatestIssues = async() => {
  const data = await octokit.issues.listForRepo({
		owner: "facebook",
		repo: "react",
	});
  return data.data;
};

export const getRepoLabels = async() => {
	const labels = await octokit.issues.listLabelsForRepo({
		owner: "facebook",
		repo: "react",
	});
	return labels.data;
}
export const getLabel = async(name) => {
	const repos = await octokit.issues.getLabel({
		owner: "facebook",
		repo: "react",
		name: name
	});
	return repos.data;
}