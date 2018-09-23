/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { kebabCase } = require('lodash')
const { uniq } = require('ramda')

const defaultBuildPath = (page, prefix) => (page > 1 ? `${prefix}/${page}` : `/${prefix}`)

const createPaginatedPages = ({
  edges,
  createPage,
  component,
  limit = 10,
  prefix = '',
  buildPath = defaultBuildPath,
  context = {}
}) => {
  edges
    .map((edge, index) => index % limit === 0 && edges.slice(index, index + limit))
    .filter(group => group)
    .forEach((group, index, groups) =>
      createPage({
        path: buildPath(index + 1, prefix),
        component,
        context: {
          ...context,
          group,
          prefix,
          page: index + 1,
          pageTotal: groups.length,
          itemTotal: edges.length
        }
      })
    )
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const IndexTemplate = path.resolve('src/templates/IndexTemplate.tsx')
  const TagTemplate = path.resolve('src/templates/TagTemplate.tsx')
  const SingleTemplate = path.resolve('src/templates/SingleTemplate.tsx')

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              path
              tags
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const edges = result.data.allMarkdownRemark.edges

    // Create single content pages:
    edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: SingleTemplate
      })
    })

    // Create full content list:
    createPaginatedPages({
      edges,
      createPage,
      component: IndexTemplate,
      limit: 10,
      prefix: 'all'
    })

    // Create content lists by tag:
    const tags = uniq(edges.reduce((acc, { node }) => [...acc, ...node.frontmatter.tags], []))

    tags.forEach(tag => {
      const slug = kebabCase(tag)

      createPaginatedPages({
        edges: edges.filter(({ node }) => node.frontmatter.tags.includes(tag)),
        createPage,
        component: TagTemplate,
        limit: 10,
        prefix: `tags/${slug}`,
        context: {
          slug,
          tag
        }
      })
    })
  })
}
