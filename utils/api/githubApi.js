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
}