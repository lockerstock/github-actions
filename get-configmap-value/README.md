<!-- action-docs-description -->
## Description

Retrieves a variable from a ConfigMap in Kubernetes cluster


<!-- action-docs-description -->

## Example Usage

```yaml
name: Get ConfigMap value
on:
  - push

jobs:
  get-configmap-value:
    name: Get ConfigMap value
    runs-on: self-hosted

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Get ConfigMap
        id: config_map
        uses: lockerstock/github-actions/get-configmap-value@main
        with:
          config_map: 'my-configmap'
          variable: 'my-variable'
        env:
          VARIABLE: example.com

      - name: 'Value: ${{ steps.config_map.outputs.value }}'
        run: echo "${{ steps.config_map.outputs.value }}"
```

> Any variable supplied to `env` will be substituted into the returned value via `envsubst`

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| variable | Variable in the ConfigMap "data" to retrieve | `true` |  |
| namespace | Namespace of ConfigMap | `false` | default |
| config_map | Name of ConfigMap | `true` |  |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| value | Value found in ConfigMap |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
