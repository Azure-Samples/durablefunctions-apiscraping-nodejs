const df = require("durable-functions");
module.exports = async function(context) {  
  
  const client = df.getClient(context);
  const instanceId = await client.startNew('Orchestrator',  undefined, 'Nuget');

  context.log(`Started orchestration with ID = '${instanceId}'.`);

  return client.createCheckStatusResponse(context.bindingData.req, instanceId);
}
