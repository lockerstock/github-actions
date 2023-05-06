<!-- action-docs-description -->

## Description

Checks the CHANGELOG for either new version entry or an updated entry to the "Unreleased" section.

<!-- action-docs-description -->

## Example Usage

```yaml

```

<!-- action-docs-inputs -->

## Inputs

| parameter      | description                                                             | required | default                                       |
| -------------- | ----------------------------------------------------------------------- | -------- | --------------------------------------------- |
| token          | GITHUB_TOKEN to access the GitHub API if the repository is private      | `false`  |                                               |
| default_branch | Default branch to compare the "Unreleased" section of the CHANGELOG to. | `false`  | ${{ github.event.repository.default_branch }} |
| tag_prefix     | Optional prefix string to apply to tag search                           | `false`  |                                               |
| tag_suffix     | Optional suffix string to apply to tag search                           | `false`  |                                               |
| changelog_path | Path to CHANGELOG file within repository                                | `false`  | CHANGELOG.md                                  |

<!-- action-docs-inputs -->

<!-- action-docs-outputs -->

## Outputs

| parameter                | description                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------- |
| has_changed              | Boolean output indicating whether the CHANGELOG file has changed                        |
| has_new_version          | Boolean output indicating whether a new, untagged version was found in the CHANGELOG    |
| has_unreleased           | Boolean output indicating whether the "Unreleased" section of the CHANGELOG has changed |
| changelog_latest_version | Latest as-is CHANGELOG version entry.                                                   |
| prepared_latest_version  | Latest prefix/suffix prepared CHANGELOG version entry.                                  |
| latest_version_entry     | The contents of the latest CHANGELOG version entry                                      |
| current_unreleased_entry | The contents of the current "Unreleased" section in the CHANGELOG                       |
| default_unreleased_entry | The contents of the default branch "Unreleased" section in the CHANGELOG                |

<!-- action-docs-outputs -->

<!-- action-docs-runs -->

## Runs

This action is a `composite` action.

<!-- action-docs-runs -->
