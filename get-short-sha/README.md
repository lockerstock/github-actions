<!-- action-docs-description -->
## Description

Truncates the commit sha to the first 7 digits


<!-- action-docs-description -->

## Example Usage

```yaml
name: Get Short Sha
on:
  - push

jobs:
  get-short-sha:
    name: Get Short Sha
    runs-on: ubuntu-latest

    steps:
      - name: Short Sha
        id: short
        uses: alehechka-io/kubernetes-actions/get-short-sha@main
        shell: bash

      - name: 'Short Sha: ${{ steps.short.outputs.short_sha }}'
        run: echo "${{ steps.short.outputs.short_sha }}"
```

<!-- action-docs-inputs -->

<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| short_sha | Shortened Sha |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
