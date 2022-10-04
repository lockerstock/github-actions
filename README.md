# gha-kubernetes

Various GHA workflows packaged as workflow_call events.

### Automatically Updating Docs

Currently using the [action-docs](https://github.com/npalm/action-docs) CLI tool to programmatically generate README docs from `action.yaml` files.

Install `node_modules` with:

```bash
npm install
```

Then run the `generate-docs` script with:

```bash
npm run docs
```
