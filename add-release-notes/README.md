<!-- action-docs-description -->
## Description

Adds provided text to the end of the release notes for a given release.


<!-- action-docs-description -->

## Example Usage

```yaml

```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `true` |  |
| owner | Owner of released repository | `false` | ${{ github.repository_owner }} |
| repository | Repository of release | `false` | ${{ github.event.repository.name }} |
| tag | Tag of release | `false` | ${{ github.ref_name }} |
| title | Unique title to populate in release notes as comment to target automatically added notes in subsequent runs. | `true` |  |
| body | Body of text to append to release | `true` |  |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->

<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.


<!-- action-docs-runs -->