<!-- action-docs-description -->
## Description

Prepares Docker image tags for [docker/build-push-action](https://github.com/docker/build-push-action)


<!-- action-docs-description -->

## Example Usage

```yaml
name: Docker Deploy
on:
  - push

jobs:
  deploy:
    name: Docker Deploy
    runs-on: self-hosted

    steps:
      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Get Docker Tags
        id: docker
        uses:
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v3
        with:
          push: true
          tags: ${{ steps.docker.outputs.tags }}
```

> Any variable supplied to `env` will be substituted into the returned value via `envsubst`

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | GITHUB_TOKEN to access the GitHub API if the repository is private | `false` |  |
| registry | Registry domain that image should be pushed to. | `false` | ghcr.io |
| image_repo | Repo of Docker image | `false` | ${{ github.repository }} |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| image_name | Full image name used. |
| image_tag | Image tag used. |
| tags | Tags to input into [docker/build-push-action](https://github.com/docker/build-push-action) |
| environment | Environment used to determine image tags |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
