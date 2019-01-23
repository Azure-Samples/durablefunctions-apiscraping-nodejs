const df = require('durable-functions')
var storage = require('azure-storage')

module.exports = async (context) => {
  // `input` here is retrieved from the Orchestrator function `callActivity` input parameter
  var input = context.bindings.input;
  
  // create the table service for Blob Storage
  var tableService = storage.createTableService(
    process.env['AzureWebJobsStorage']
  )

  // create the table if it doesn't exist already.
  tableService.createTableIfNotExists('Repositories', error => {
    if (error) {
      console.error(error)
      return
    }
    // creates a batch of operation to be executed
    var batch = new storage.TableBatch()
    for (var i = 0; i < input.length; i++) {
      var repository = input[i]

      // Creates an operation to add the repository to Table Storage
      batch.insertOrReplaceEntity({
        PartitionKey: { _: 'Default' },
        RowKey: { _: repository.id.toString() },
        OpenedIssues: { _: repository.openedIssues },
        RepositoryName: { _: repository.name }
      })
    }
    // execute the batch of operations
    tableService.executeBatch('Repositories', batch, error => {
      if (error) {
        console.error(error)
      }
    })
  })
}
