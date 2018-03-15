/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { kebabCase } = require('lodash')
const { uniq } = require('ramda')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const ContentTemplate = path.resolve('src/templates/ContentTemplate.tsx')
  const TagTemplate = path.resolve('src/templates/TagTemplate.tsx')

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const items = result.data.allMarkdownRemark.edges

    // Create content pages:
    items.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: ContentTemplate
      })
    })

    // Create tag pages:

    const tags = uniq(items.reduce((acc, { node }) => [
      ...acc,
      ...node.frontmatter.tags
    ], []))

    tags.forEach(tag => {
      createPage({
        path: `/tags/${kebabCase(tag)}/`,
        component: TagTemplate,
        context: { tag }
      })
    })
  })
}
