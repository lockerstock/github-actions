<!-- action-docs-description -->
## Description

Deletes all inactive GitHub deployments from a given environment.


<!-- action-docs-description -->

## Example Usage

It is recommended to run this action as a cronjob so you can regularly cleanup old deployments.

It is also possible to run as a PR closing action, but often times not required to run that frequently.

```yaml
name: Cleanup Repository Resources

on:
  workflow_dispatch:
  schedule:
    - cron: 15 6 5 * * # 6:15AM UTC on 5th day of every month (1:15AM CDT/12:15AM CST)

jobs:
  deployment-cleanup:
    runs-on: ubuntu-latest
    name: Cleanup Inactive Deployments

    strategy:
      matrix:
        environment:
          - development
          - staging
          - production

    steps:
      - uses: lockerstock/delete-inactive-deployments@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          environment: ${{ matrix.environment }}
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| environment | Environment to delete inactive deployments from. | `true` |  |
| token | GITHUB_TOKEN | `true` |  |
| ref | Specific ref to delete deployments from. Leaving blank will delete all deployments for given environment. | `false` |  |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->

<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.


<!-- action-docs-runs -->
