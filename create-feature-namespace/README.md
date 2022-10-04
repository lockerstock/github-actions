<!-- action-docs-description -->
## Description

Creates a feature branch Namespace with proper labels to allow replication of resources


<!-- action-docs-description -->

## Example Usage

```yaml
name: Create Feature Namespace
on:
  - pull_request

jobs:
  create-feature-namespace:
    name: Create Feature Namespace
    runs-on: self-hosted

    steps:
      - name: Create Feature Namespace
        id: namespace
        uses: alehechka-io/kubernetes-actions/create-feature-namespace@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| namespace | Namespace to deploy Helm chart. If not provided, will be calculated from action trigger | `false` |  |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| namespace | Prepared namespace |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
