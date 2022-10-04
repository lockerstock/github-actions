<!-- action-docs-description -->
## Description

Prepares Namespace name and can optionally retrieve the JSON output of the Namespace configuration


<!-- action-docs-description -->

## Example Usage

```yaml
name: Get Namespace
on:
  - push

jobs:
  get-namespace:
    name: Get Namespace
    runs-on: self-hosted

    steps:
      - name: Get Namespace
        id: namespace
        uses: alehechka-io/kubernetes-actions/get-namespace@main
        with:
          token: ${{ inputs.token }}
          get_namespace: 'true'
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| namespace | Custom Namespace value to use if applicable | `false` |  |
| get_namespace | Flag to optionally retrieve the Namespace JSON (kubectl needs to be available and authorized prior) | `false` | false |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| name | Prepared namespace |
| json | Namespace JSON output |
| exists | Boolean flag determining whether or not the Namespace exists |
| ref | Action Trigger agnostic ref |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
