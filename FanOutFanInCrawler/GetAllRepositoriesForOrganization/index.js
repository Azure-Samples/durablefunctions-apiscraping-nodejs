const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  userAgent: 'FanOutFanInCrawler',
  auth: `token ${process.env['GitHubToken']}`
});

module.exports = async function (context) {
  // retrieves the organization name from the Orchestrator function
  var organizationName = context.bindings.input;

  var finalResult = []
  let page = 1
  do {
    // invoke the API to retrieve the list of repositories of a specific organization
    var result = await octokit.repos.listForOrg({
      org: organizationName,
      type: 'public',
      page: page
    })
    page++
    // merge the paged results inside a single array
    finalResult = finalResult.concat(result.data)
  } while (result.data.length !== 0)

  context.done(null, finalResult);
}
