const df = require("durable-functions");
const octokit = require('@octokit/rest')({
    headers: {
        'user-agent': 'FanOutFanInCrawler'
    }
});
octokit.authenticate({
    type: 'token',
    token: process.env["GitHubToken"]
});

module.exports = async function (context, input) {
    // `input` here is retrieved from the Orchestrator function `callActivityAsync` input parameter

    let page = 1
    let issueCount = 0;

    do {
        // retrieves a list of open issues from a specific repository
        var result = await octokit.issues.getForRepo({
            owner: input.owner.login,
            repo: input.name,
            state: 'open',
            per_page: 100,
            page: page
        });
        page++;
        // aggregate the result
        issueCount += result.data.length;
    }
    while (result.data.length !== 0)

    // returns an object with the count of opened issues for a specific repository
    return {id: input.id, openedIssues: issueCount, name: input.name };
};