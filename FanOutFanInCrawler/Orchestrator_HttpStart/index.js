const uuid = require('uuid/v4');

module.exports = function (context, req, starter) {
    var id = uuid();
    
    // Function input comes from the request content.
    context.bindings.starter = [{
        FunctionName: "Orchestrator",
        Input: "Nuget",
        InstanceId: id
    }];
    
    context.done(null);
};