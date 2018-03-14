module.exports = {
  siteMetadata: {
    title: '@goblindegook/gatsby-starter-typescript'
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: 'markdown-pages'
      }
    },
    'gatsby-transformer-remark'
  ]
}
