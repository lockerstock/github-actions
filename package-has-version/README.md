<!-- action-docs-description -->
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
        uses: lockerstock/github-actions/get-short-sha@main

      - name: 'Short Sha: ${{ steps.short.outputs.short_sha }}'
        run: echo "${{ steps.short.outputs.short_sha }}"
```

<!-- action-docs-inputs -->
<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
<!-- action-docs-outputs -->

<!-- action-docs-runs -->
<!-- action-docs-runs -->
