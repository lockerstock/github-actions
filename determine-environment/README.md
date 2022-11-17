<!-- action-docs-description -->
## Description

Based on trigger event and ref, will determine which environment to use for deployment.


<!-- action-docs-description -->

## Example Usage

```yaml
name: Determine Environment
on:
  - push

jobs:
  determine-environment:
    name: Determine Environment
    runs-on: ubuntu-latest

    steps:
      - name: Get Environment
        id: environment
        uses: lockerstock/kubernetes-actions/determine-environment@main
        with:
          token: ${{ inputs.token }}
          production_variable: 'prod'
          staging_variable: 'stage'
          development_variable: 'dev'

      - name: 'Environment: ${{ steps.environment.outputs.environment }}'
        run: echo "${{ steps.environment.outputs.environment }}"

      - name: 'Variable: ${{ steps.environment.outputs.variable }}'
        run: echo "${{ steps.environment.outputs.variable }}"
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| production_variable | Variable to be returned if environment is determined to be "production" | `false` |  |
| staging_variable | Variable to be returned if environment is determined to be "staging" | `false` |  |
| development_variable | Variable to be returned if environment is determined to be "development" | `false` |  |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| environment | Determined Environment |
| variable | Determined environment variable |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.


<!-- action-docs-runs -->
