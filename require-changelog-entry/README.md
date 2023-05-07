<!-- action-docs-description -->
## Description

Checks the CHANGELOG for either new version entry or an updated entry to the "Unreleased" section.


<!-- action-docs-description -->

## Example Usage

```yaml
name: Require Changelog Entry
on:
  - pull_request

jobs:
  require-changelog-entry:
    name: Require Changelog Entry
    runs-on: ubuntu-latest

    steps:
      - name: Require Changelog Entry
        id: changelog
        uses: lockerstock/github-actions/require-changelog-entry@main
        with:
          token: ${{ secret.GITHUB_TOKEN }}
          changelog_path: CHANGELOG.md

      - name: 'Error if no Changelog entry'
        if: steps.changelog.outputs.has_new_version == 'false' && steps.changelog.outputs.has_unreleased == 'false'
        run: |
          echo "::error file=CHANGELOG.md::No Changelog entry created."
          error 1
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `true` |  |
| default_branch | Default branch to compare the "Unreleased" section of the CHANGELOG to. | `false` | ${{ github.event.repository.default_branch }} |
| tag_prefix | Optional prefix string to apply to tag search | `false` |  |
| tag_suffix | Optional suffix string to apply to tag search | `false` |  |
| changelog_path | Path to CHANGELOG file within repository | `false` | CHANGELOG.md |
| error_on_missing | Boolean flag to have this action terminate with error when a new version and new Unreleased entry are not found. | `false` | false |
| error_message | Error message to print when a new version and new Unreleased entry are not found. Will be applied as an error to the given CHANGELOG path. | `false` | It is required via GitHub Action workflow that this CHANGELOG has a new version or new Unreleased entry. |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| has_changed | Boolean output indicating whether the CHANGELOG file has changed |
| has_new_version | Boolean output indicating whether a new, untagged version was found in the CHANGELOG |
| changelog_version_exists | Boolean flag indicating whether the latest CHANGELOG version exists as a git tag. |
| has_unreleased | Boolean output indicating whether the "Unreleased" section of the CHANGELOG has changed |
| changelog_latest_version | Latest as-is CHANGELOG version entry. |
| prepared_latest_version | Latest prefix/suffix prepared CHANGELOG version entry. |
| latest_version_entry | The contents of the latest CHANGELOG version entry |
| current_unreleased_entry | The contents of the current "Unreleased" section in the CHANGELOG |
| default_unreleased_entry | The contents of the default branch "Unreleased" section in the CHANGELOG |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
