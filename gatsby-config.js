/* eslint-disable @typescript-eslint/camelcase */
const gatsbyRemarkPlugins = [
  'gatsby-plugin-typegen',
  {
    resolve: 'gatsby-remark-smartypants',
    options: {
      dashes: 'oldschool'
    }
  },
  {
    resolve: 'gatsby-remark-prismjs',
    options: {
      classPrefix: 'language-',
      inlineCodeMarker: {
        tsx: 'tsx'
      },
      aliases: {}
    }
  },
  {
    resolve: 'gatsby-remark-images',
    options: {
      maxWidth: 1200
    }
  },
  {
    resolve: 'gatsby-remark-copy-linked-files',
    options: {}
  }
]

module.exports = {
  siteMetadata: {
    title: 'TypeScript Gatsby Starter',
    author: 'Luís Rodrigues',
    description: 'A Gatsby starter using TypeScript.',
    siteUrl: 'https://goblindegook-gatsby-starter-typescript.netlify.com'
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/typography',
        omitGoogleFont: true
      }
    },
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'content',
        path: `${__dirname}/content`
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#ff5700',
        showSpinner: false
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: gatsbyRemarkPlugins
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins
      }
    },
    {
      resolve: 'gatsby-plugin-lunr',
      options: {
        languages: [
          {
            name: 'en',
            filterNodes: node => !node.frontmatter || node.frontmatter.draft !== true,
            customEntries: [
              {
                title: 'Another Page',
                content: 'Welcome to page 2',
                path: '/another-page/'
              }
            ]
          }
        ],
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'path', store: true },
          { name: 'content' },
          { name: 'tags' }
        ],
        resolvers: {
          Mdx: {
            title: node => node.frontmatter.title,
            path: node => node.frontmatter.path,
            content: node => node.rawBody,
            tags: node => node.frontmatter.tags
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        /**
         * no need to specify the other options, since they will be merged with this
         */
        feeds: [
          {
            title: 'Feed',
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(({ node }) => {
                return {
                  ...node.frontmatter,
                  description: node.excerpt,
                  url: site.siteMetadata.siteUrl + node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + node.frontmatter.path,
                  custom_elements: [{ 'content:encoded': node.html }]
                }
              })
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      frontmatter {
                        path
                        title
                        date
                      }
                      excerpt
                      html
                    }
                  }
                }
              }
            `,
            output: 'rss.xml'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-typescript',
        short_name: 'GatsbyTS',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'minimal-ui',
        icons: [
          {
            // Everything in /static will be copied to an equivalent
            // directory in /public during development and build, so
            // assuming your favicons are in /static/favicon,
            // you can reference them here
            src: '/favicon/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicon/512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify'
  ]
}
