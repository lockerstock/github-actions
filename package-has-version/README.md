<!-- action-docs-description -->
## Description

Uses GitHub API to check if a provided version exists as a tag within a given package or container registry


<!-- action-docs-description -->

## Example Usage

```yaml
name: Get Short Sha
on:
  - push

jobs:
  package-has-version:
    name: Package Has Version
    runs-on: ubuntu-latest

    steps:
      - name: Check if package has version
        id: existing
        uses: lockerstock/github-actions/package-has-version@main
        with:
          token: ${{ secret.GITHUB_TOKEN }}
          package_name: github-actions/nginx
          package_version: latest

      - name: 'Existing Image and Version Results'
        run: |
          echo "Package Exists ${{ steps.existing.outputs.package_exists }}"
          echo "Version Exists ${{ steps.existing.outputs.version_exists }}"
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| package_name | Name of package in package or container registry. Will default in code to the name of current repository. | `false` |  |
| package_owner | Package owner | `false` | ${{ github.repository_owner }} |
| package_type | Type of package within package registry | `false` | container |
| package_version | Provided version to search the package for. | `false` | latest |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| package_exists | Boolean value indicating whether or not the package exists within the organization. |
| version_exists | Boolean value indicating whether or not the provided version exists as a tag within the package. |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.


<!-- action-docs-runs -->
