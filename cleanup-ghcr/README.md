<!-- action-docs-description -->
## Description

Processes through all GitHub Container Registry images to determine which images to delete from the registry to cleanup unused and old images.


<!-- action-docs-description -->

## Example Usage

```yaml
name: Cleanup GitHub Container Registry
on:
  workflow_dispatch:
  schedule:
    - cron: 15 6 5 * * # 6:15AM UTC on 5th day of every month (1:15AM CDT/12:15AM CST)

jobs:
  cleanup-ghcr:
    name: Cleanup GitHub Container Registry
    runs-on: ubuntu-latest

    steps:
      - name: Cleanup GitHub Container Registry
        uses: lockerstock/github-actions/cleanup-ghcr
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `true` |  |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->

<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.


<!-- action-docs-runs -->
