<!-- action-docs-description -->
## Description

Automatically updates the most recent deployment with proper status


<!-- action-docs-description -->

## Example Usage

### Update/Create Deployment

```yaml
name: Deployment Status
on:
  pull_request:
  push:
    branches:
      - main

jobs:
  deployment:
    name: Deployment Status
    runs-on: ubuntu-latest

    steps:
      - name: Start Deployment
        id: deployment
        uses: lockerstock/github-actions/deployment-status@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          step: start
          environment: ${{ steps.env.outputs.environment }}

      # deployment steps...

      - name: Finish Deployment
        uses: lockerstock/github-actions/deployment-status@main
        if: always()
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          deployment_id: ${{ steps.deployment.outputs.deployment_id }}
          step: finish
          env_url: https://example.com
          environment: ${{ steps.env.outputs.environment }}
```

### Deactivate Deployment

```yaml
name: Cleanup Deleted Branch
on:
  - delete

jobs:
  cleanup-deleted-branch:
    name: Cleanup Deleted Branch
    runs-on: ubuntu-latest

    steps:
      - name: Deactivate Deployment
        uses: lockerstock/github-actions/deployment-status@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          step: deactivate-env
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| deployment_id | Deployment ID of previous deployment to update | `false` |  |
| environment | Environment of Deployment | `false` | development |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| step | One of 'start', 'finish', 'deactivate-env', or 'delete-env' | `true` |  |
| status | The deployment status (for `finish` only) | `false` | ${{ job.status }} |
| env_url | The environment URL (for `finish` only) | `false` |  |
| auto_inactive | Whether to mark existing deployments as inactive if a deployment succeeds (for `finish` only) | `false` | false |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| deployment_id | Deployment ID of deployment updated or created |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
