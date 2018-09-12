---
services: functions
platforms: nodejs
author: MaximRouiller
---

# Retrieve opened issue count on GitHub with Azure Durable Functions

## Build

The project requires the latest version of the [Azure Functions CLI](https://github.com/Azure/azure-functions-core-tools).

It can be installed by running the following code:

```bash
npn i -g azure-functions-core-tools@core --unsafe-perm true
```

More [installation options](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?WT.mc_id=durablejs-sample-marouill) are also available.

## Running the Sample

### Pre-requisite

* GitHub Personal Access Token
  * [How to create a Personal Access Token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
* [Azure Functions Tooling](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?WT.mc_id=durablejs-sample-marouill)
* [Visual Studio Code](https://code.visualstudio.com/download?WT.mc_id=durablejs-sample-marouill) (optional)
  * [Azure Functions Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) for debugging
* Azure Subscription (if running on Azure)
  * [Get a free Azure Trial Subscription](https://azure.microsoft.com/free/?WT.mc_id=durablejs-sample-marouill)

### Locally

Change the `GitHubToken` value in `local.settings.json` to match your GitHub Personal Access Token created previously in the pre-requisite.

To ensure that everything is configured properly run the following commands within the `FanOutFanInCrawler` folder.

```bash
func extensions install
npm install
```

Once the dependencies has been installed, you can either run it from VS Code by running `code .` and hitting F5 on your keyboard. If you want to run it from the command line, you can run it with the following command within the `FanOutFanInCrawler` folder.

```bash
func host start
```

### On Azure

To deploy components on Azure you will require to [install](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&WT.mc_id=durablejs-sample-marouill) and [login](https://docs.microsoft.com/cli/azure/authenticate-azure-cli?view=azure-cli-latest&WT.mc_id=durablejs-sample-marouill) with the Azure CLI.

First, you will need to provision the service. Look into the `provision.ps1` file provided to familiarize yourself with the resources we are going to create.

Then you can execute the file with the previously generated GitHub.

```powershell
.\provision.ps1 -githubToken <TOKEN> -resourceGroup <ResourceGroupName> -storageName <StorageAccountName> -functionName <FunctionName>
```

If you do not have PowerShell installed, you can simply take the commands within the file and run it manually.

# Contribute

You can contribute to this sample by following [the guidelines](/CONTRIBUTE.md).

# Resources

* [Azure Functions Documentation](https://docs.microsoft.com/azure/azure-functions/?WT.mc_id=durablejs-sample-marouill)
* [Introduction to Azure Functions](https://docs.microsoft.com/azure/azure-functions/functions-overview?WT.mc_id=durablejs-sample-marouill)
* [Durable Functions overview](https://docs.microsoft.com/azure/azure-functions/durable-functions-overview?WT.mc_id=durablejs-sample-marouill)
* Durable Functions pattern used in this sample
  * [Chaining](https://docs.microsoft.com/azure/azure-functions/durable-functions-sequence?WT.mc_id=durablejs-sample-marouill)
  * [Fan-out/fan-in](https://docs.microsoft.com/azure/azure-functions/durable-functions-cloud-backup?WT.mc_id=durablejs-sample-marouill)