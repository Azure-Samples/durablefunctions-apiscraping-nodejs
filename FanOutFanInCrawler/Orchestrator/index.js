const df = require("durable-functions");

module.exports = df(function* (context) {
    // retrieves the organization name from the Orchestrator_HttpStart function
    var organizationName = context.df.getInput();
    // retrieves the list of repositories for an organization by invoking a separate Activity Function.
    var repositories = yield context.df.callActivityAsync("GetAllRepositoriesForOrganization", organizationName);

    // Creates an array of task to store the result of each functions
    var output = [];
    for (var i = 0; i < repositories.length; i++) {
        // Starting a `GetOpenedIssues` activity WITHOUT `yield`
        // This will starts Activity Functions in parallel instead of sequentially.
        output.push(context.df.callActivityAsync("GetOpenedIssues", repositories[i]));
    }

    // Wait for all Activity Functions to complete execution
    const results = yield context.df.Task.all(output);

    // Send the list to an Activity Function to save them to Blob Storage.
    yield context.df.callActivityAsync("SaveRepositories", results);

    return context.instanceId;
});