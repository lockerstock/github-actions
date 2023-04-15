<!-- action-docs-description -->
## Description

Adds provided text to the end of the release notes for a given release.


<!-- action-docs-description -->

## Example Usage

```yaml
name: Add Release Notes
on:
  push:
    tags:
      - 'v[0-9]+.[0-9]+.[0-9]+'

jobs:
  add-release-notes:
    name: Add Release Notes
    runs-on: ubuntu-latest

    steps:
      - name: Add Release Notes
        uses: lockerstock/github-actions/add-release-notes@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          title: 'Deployment Instructions'
          body: |
            ### Deployments Instructions
            - Do the thing
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
