<!-- action-docs-description -->
## Description

Cleans up resources deployed to feature branch upon branch deletion


<!-- action-docs-description -->

## Example Usage

```yaml
name: Cleanup Deleted Branch
on:
  - delete

jobs:
  cleanup-deleted-branch:
    name: Cleanup Deleted Branch
    runs-on: self-hosted

    steps:
      - name: Cleanup Deleted Branch
        id: environment
        uses: lockerstock/github-actions/cleanup-deleted-branch@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| wait | Flag to have Helm deploy wait for resources to finish deploying | `false` | false |
| timeout | Sets time to wait for Kubernetes operations | `false` | 5m0s |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->

<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
