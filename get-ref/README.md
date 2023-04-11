<!-- action-docs-description -->

<!-- action-docs-description -->

## Example Usage

```yaml
name: Get Ref
on:
  - push

jobs:
  get-ref:
    name: Get Ref
    runs-on: ubuntu-latest

    steps:
      - name: Get Ref
        id: ref
        uses: lockerstock/github-actions/get-ref@main
```

<!-- action-docs-inputs -->

## Inputs

| parameter  | description              | required | default |
| ---------- | ------------------------ | -------- | ------- |
| custom_ref | Custom Ref Name Override | `false`  |         |

<!-- action-docs-inputs -->

<!-- action-docs-outputs -->

## Outputs

| parameter | description                |
| --------- | -------------------------- |
| name      | Ref Name of triggering ref |

<!-- action-docs-outputs -->

<!-- action-docs-runs -->

## Runs

This action is a `composite` action.

<!-- action-docs-runs -->
