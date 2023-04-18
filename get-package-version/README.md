<!-- action-docs-description -->
## Description

Get a viable package version based on provided input.


<!-- action-docs-description -->

## Example Usage

```yaml
name: Get Package Version
on:
  - push

jobs:
  get-package-version:
    name: Get Package Version
    runs-on: ubuntu-latest

    steps:
      - name: Get Package Version
        id: version
        uses: lockerstock/github-actions/get-package-version@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          package_name: github-actions/nginx
          package_version_constraint: '>=0.1.0 <1'
          timestamp_constraint: '${{ github.event.head_commit.timestamp }}'

      - name: 'Outputs'
        run: |
          echo "Package Exists ${{ steps.constrained.outputs.package_exists }}"
          echo "Version Exists ${{ steps.constrained.outputs.version_exists }}"
          echo "Version: ${{ steps.constrained.outputs.version }}"
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| package_name | Name of package in package or container registry. Will default in code to the name of current repository. | `false` |  |
| package_owner | Package owner | `false` | ${{ github.repository_owner }} |
| package_type | Type of package within package registry | `false` | container |
| package_version_constraint | Provided version constraints to search the package for. See [specification](https://github.com/npm/node-semver#versions) on possible constraints. | `false` | latest |
| timestamp_constraint | Provided timestamp constraint to restrict ranged semver constraints to. Providing this input allows version constraints such as `latest` only find versions that were released prior to the timestamp. Will only constrain by timestamp if provided. | `false` |  |
| error_on_not_found | Boolean flag to have action terminate with error if the package is not found or if a version is not located for given constraint. | `false` | true |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| package_exists | Boolean value indicating whether or not the package exists within the organization. |
| version_exists | Boolean value indicating whether or not the provided version constraint was able to find a matching version in the package. |
| version | The actual version string that matched the provided version constraint. |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.


<!-- action-docs-runs -->
