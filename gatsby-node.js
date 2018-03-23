/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { kebabCase } = require('lodash')
const { uniq } = require('ramda')

const getPageIndex = index => (index === 0 ? '' : index + 1)

const defaultBuildPath = (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`

const createPaginatedPages = ({
  edges,
  createPage,
  template,
  length = 10,
  prefix = '',
  buildPath = defaultBuildPath,
  context = {}
}) => {
  edges
    .map((edge, index) => index % length === 0 && edges.slice(index, index + length))
    .filter(group => group)
    .forEach((group, index, groups) => {
      const pageIndex = getPageIndex(index)
      return createPage({
        path: buildPath(pageIndex, prefix),
        component: path.resolve(template),
        context: {
          ...context,
          group,
          prefix,
          page: index + 1,
          pageTotal: groups.length,
          itemTotal: edges.length
        }
      })
    })
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

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
      template: 'src/templates/IndexTemplate.tsx',
      length: 10,
      prefix: 'all'
    })

    // Create content lists by tag:
    const tags = uniq(edges.reduce((acc, { node }) => [
      ...acc,
      ...node.frontmatter.tags
    ], []))

    tags.forEach(tag => {
      const slug = kebabCase(tag)

      createPaginatedPages({
        edges,
        createPage,
        template: 'src/templates/TagTemplate.tsx',
        length: 10,
        prefix: `tags/${slug}`,
        context: {
          slug,
          tag
        }
      })
    })
  })
}
