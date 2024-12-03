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


### Update the items

1. Go to https://docs.google.com/spreadsheets/d/1GwIsAudAn89xv9DAbr1HUaY4KEVBsYfg--_1cW0uIB0/edit?gid=0#gid=0
2. Update the items
3. Download the sheet as HTML
4. Replace the content of `data/standards.html` with the new content
5. Run the script `npm run extract-standards` to extract the items from the HTML and update the `data/standards.json` file

### Update the website

Once you have updated the items, you can update the website by running the following commands:

```bash
npm run populate-details
npm run populate-implementations
```

This will autopolulate the details and implementations sections of the website, respectively. Note that this will modify the folders `docs/details` and `docs/implementations` so make sure to commit the changes.

