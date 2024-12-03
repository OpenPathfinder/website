// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpenJS Security Program Standards',
  tagline: 'This Standard is designed to serve as an achievable minimum security baseline for OpenJS Foundation Project maintainers. More plainly said, this is intended to be used as an easily digested and actioned security checklist.',
  url: 'https://openjs-security-program-standards.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',
  favicon: 'img/favicon.ico',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: undefined
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'OpenJS Security Program Standards',
        logo: {
          alt: 'Logo',
          src: 'img/logo.png'
          // srcDark: 'img/logo_dark.png'
        },
        items: [
          {
            href: 'https://github.com/secure-dashboards/openjs-security-program-standards',
            label: 'Repository',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        copyright: 'Copyright © OpenJS Foundation. All rights reserved.'
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
}

module.exports = config
