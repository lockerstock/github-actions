<!-- action-docs-description -->
## Description

Auto Release action based on new CHANGELOG entry version


<!-- action-docs-description -->

## Example Usage

```yaml
name: Auto Release from CHANGELOG
on:
  push:
    branches:
      - main
    paths:
      - CHANGELOG.md

jobs:
  changelog-autorelease:
    name: Auto Release from CHANGELOG
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Auto Release from CHANGELOG
        id: changelog
        uses: lockerstock/github-actions/autoreleaser@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          changelog_path: CHANGELOG.md
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `true` |  |
| tag | Optional tag version to search for in the CHANGELOG. This can be used if prior steps determine which version needs released. If the provided input does not exist in the CHANGELOG, this action will fail. If this input is not provided, then the latest entry in the CHANGELOG will be retrieved. | `false` |  |
| tag_prefix | Optional prefix string to apply to tag during creation. | `false` |  |
| tag_suffix | Optional suffix string to apply to tag during creation. | `false` |  |
| changelog_path | Path to CHANGELOG file within repository | `false` | CHANGELOG.md |
| artifacts | An optional set of paths representing artifacts to upload to the release. This may be a single path or a comma delimited list of paths (or globs). | `false` |  |
| replace_artifacts | Indicates if existing release artifacts should be replaced. | `false` | true |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| changelog_version | Latest as-is CHANGELOG version entry or version matching inputted tag. |
| prepared_version | Latest prefix/suffix prepared CHANGELOG version entry. |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
