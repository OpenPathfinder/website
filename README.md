# OpenJS Security Program Standards

This Standard is designed to serve as an achievable minimum security baseline for OpenJS Foundation Project maintainers. More plainly said, this is intended to be used as an easily digested and actioned security checklist.

## Website

This website is built using [Docusaurus 2](https://docusaurus.io/) and [generator-fast-documentation](https://github.com/UlisesGascon/generator-fast-documentation)

### Installation

```
$ npm i
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Manage releases

- Check [standard-version docs](https://github.com/conventional-changelog/standard-version)

### Manage git Hooks

- Check [Husky docs](https://github.com/typicode/husky)

## Manage Changes


### Update the compliance checks

1. Go to [Actions: Sync and update Compliance Checks](https://github.com/secure-dashboards/openjs-security-program-standards/actions/workflows/sync_checks.yml) and run the action manually from the `main` branch. [how-to](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow)
2. This will generate a PR with the title `[AUTO] Sync with dashboard database` and it will assign it to you ([direct access](https://github.com/secure-dashboards/openjs-security-program-standards/pulls?q=sort%3Aupdated-desc+is%3Apr+is%3Aopen++%5BAUTO%5D+Sync+with+dashboard+database+)). Please review the content and merge it when you feel ready.

### Update the website

Once you have updated the items, you can update the website by running the following commands:

```bash
npm run populate-details
npm run populate-implementations
```

This will autopolulate the details and implementations sections of the website, respectively. Note that this will modify the folders `docs/details` and `docs/implementations` so make sure to commit the changes.

