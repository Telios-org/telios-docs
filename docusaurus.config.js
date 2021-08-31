module.exports = {
  title: 'Telios',
  tagline: 'Encrypted peer to peer email',
  url: 'https://docs.telios.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Telios', // Usually your GitHub org/user name.
  projectName: 'Telios', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Telios',
      logo: {
        alt: 'Telios',
        src: 'img/telios_logo.svg',
        href: 'https://telios.io/'
      },
      items: [
        {
          to: 'docs/intro',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'left',
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left'
        },
        {
          href: 'https://github.com/Telios-org',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Telios Technologies, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/Telios-org/telios-docs/blob/master',
        },
        blog: {
          showReadingTime: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
