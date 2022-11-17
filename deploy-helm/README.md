<!-- action-docs-description -->
## Description

Prepares and installs a Helm chart to determined Namespace


<!-- action-docs-description -->

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
        uses: lockerstock/kubernetes-actions/deploy-helm
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          chart_path: deploy-helm/charts/example
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| chart_path | Path to Helm chart | `false` | deploy/helm/${{ github.event.repository.name }} |
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
