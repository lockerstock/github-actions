<!-- action-docs-description -->
## Description

Prepares and installs a Helm chart to determined Namespace


<!-- action-docs-description -->

> Currently supports OCI and Repository hosted Helm charts. However, this action does not make the determination and if both are provided, then both will be deployed in sequential order from OCI to Repository.

## Example Usage

```yaml
name: Helm Deploy
on:
  - pull_request

jobs:
  deploy:
    name: Helm Deploy
    runs-on: self-hosted

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Helm deploy
        id: deploy
        uses: lockerstock/github-actions/deploy-helm@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          chart_path: deploy-helm/charts/example
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| actor | GitHub Access User to use alongside above token | `false` | ${{ github.actor }} |
| chart_path | Path to Helm chart | `false` | deployments/helm/${{ github.event.repository.name }} |
| image_tag | Tag of Docker image | `false` | latest |
| namespace | Namespace to deploy Helm chart. If not provided, will be calculated from action trigger | `false` |  |
| wait | Flag to have Helm deploy wait for resources to finish deploying | `false` | false |
| wait_for_jobs | Flag to have Helm deploy wait for Jobs to finish running | `false` | false |
| timeout | Sets time to wait for Kubernetes operations | `false` | 5m0s |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| namespace | Name of Namespace that was deployed to. |
| chart_version | Version of the Helm chart that was deployed |
| hostname | Hostname provided to deployed Helm chart |
| environment | Environment used to deploy Helm chart |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
