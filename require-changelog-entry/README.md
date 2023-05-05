<!-- action-docs-description -->
<!-- action-docs-description -->

Logic path:
- Retrieve latest changelog entry via https://github.com/mindsers/changelog-reader-action (set validation_depth to 1, and leave version blank)
- Check tags of repo for matching version, if no matching version is found, all is good and return cleanly
- if matching version is found, this means that this is not a new version
- Checkout the default branch of the repo and use https://github.com/mindsers/changelog-reader-action to pull the "Unreleased" entry of both
- If the description is the different, all is good and return cleanly
- If the description is the same as the default branch version, then no changes have been made and return with an error

## Example Usage

```yaml

```

<!-- action-docs-inputs -->
<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
<!-- action-docs-outputs -->

<!-- action-docs-runs -->
<!-- action-docs-runs -->
