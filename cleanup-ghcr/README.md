<!-- action-docs-description -->
## Description

Processes through all GitHub Container Registry images to determine which images to delete from the registry to cleanup unused and old images-.


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

    permissions:
      contents: read
      packages: write

    steps:
      - uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Cleanup GitHub Container Registry
        uses: lockerstock/github-actions/cleanup-ghcr@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          tags_to_keep: |
            staging
            latest
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `true` |  |
| container_owner | Owner of container repository | `false` | ${{ github.repository_owner }} |
| github_repository | Name of GitHub repository of differs from the Container Registry Repository. Used to check for git tags within the code repository | `false` | ${{ github.event.repository.name }} |
| container_repository | Container Registry Repository | `false` | ${{ github.event.repository.name }} |
| duration_to_keep | Duration of time to keep old images | `false` | 30d |
| keep_git_tags | Boolean flag indicating that container tags matching git tags should be kept | `false` | true |
| tags_to_keep | CSV list of container tags to explicitly keep | `false` |  |
| delete_concurrently | Boolean flag to conditionally delete version candidates concurrently. Only turn this on if the expected number of delete candidates is small, otherwise the GitHub API will rate limit the action and cause it to fail with an error. | `false` | false |
| dry_run | Boolean flag to run the action dryly on not delete an container versions. Will also print container information for all found delete candidates. Used during implementation to make sure rules satisfy needs. | `false` | false |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->

<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.


<!-- action-docs-runs -->
