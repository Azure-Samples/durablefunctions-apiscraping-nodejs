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
    // retrieves the organization name from the Orchestrator function
    var organizationName = input;

    var finalResult = [];
    let page = 1;
    do {
        // invoke the API to retrieve the list of repositories of a specific organization
        var result = await octokit.repos.getForOrg({
            org: organizationName,
            type: "public",
            page: page
        });
        page++;
        // merge the paged results inside a single array
        finalResult = finalResult.concat(result.data);
    }
    while (result.data.length !== 0)
    return finalResult;
};