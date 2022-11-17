<!-- action-docs-description -->

## Description

Sanitizes given variable for use as K8S resource and/or subdomain

<!-- action-docs-description -->

## Example Usage

```yaml
name: Sanitize Variable
on:
  - push

jobs:
  clean-variable:
    name: Sanitize Variable
    runs-on: ubuntu-latest

    steps:
      - name: Sanitize Variable
        id: sanitized
        uses: lockerstock/kubernetes-actions/clean-variable@main
        with:
          variable: ${{ github.ref_name }}
```

<!-- action-docs-inputs -->

## Inputs

| parameter | description          | required | default |
| --------- | -------------------- | -------- | ------- |
| variable  | Variable to sanitize | `true`   |         |

<!-- action-docs-inputs -->

<!-- action-docs-outputs -->

## Outputs

| parameter | description        |
| --------- | ------------------ |
| variable  | Sanitized variable |

<!-- action-docs-outputs -->

<!-- action-docs-runs -->

## Runs

This action is a `composite` action.

<!-- action-docs-runs -->
