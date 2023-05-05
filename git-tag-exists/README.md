<!-- action-docs-description -->
## Description

Checks if given tags exist within a repository. Can optionally terminate with an error if not found.


<!-- action-docs-description -->

## Example Usage

```yaml
name: Git Tag Exists
on:
  - push

jobs:
  git-tag-exists:
    name: Git Tag Exists
    runs-on: ubuntu-latest

    steps:
      - name: Git Tag Exist
        id: tag
        uses: ./git-tag-exists
        with:
          tag: does-not-exist

      - name: 'Tag Exists: ${{ steps.tag.outputs.exists }}'
        run: echo "${{ steps.tag.outputs.exists }}"
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| repository | Name of repository to check for given tag. | `false` | ${{ github.event.repository.name }} |
| owner | Owner of repository | `false` | ${{ github.repository_owner }} |
| tag | Tag to search for | `true` |  |
| error_on_not_found | Boolean flag to have action terminate with error if the tag is not found | `false` | false |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| exists | Boolean value indicating whether or not the provided tag was found. |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.


<!-- action-docs-runs -->
