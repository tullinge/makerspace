const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const wikiEntry = path.resolve(`./src/templates/wiki-entry.tsx`)

    const result = await graphql(`
    {
        allMarkdownRemark {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                }
            }
        }
    }
  `)

    if (result.errors) {
        reporter.panicOnBuild(`There was an error loading markdown`, result.errors)
        return
    }

    const posts = result.data.allMarkdownRemark.nodes

    posts.forEach(post => {

        createPage({
            path: `${post.fields.slug}`,
            component: wikiEntry,
            context: {
                slug: post.fields.slug
            }
        })
    })
}

function categoryFromPath(path) {
    return path.match(/^\/(.+)\/.+/)[1]
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const filePath = createFilePath({ node, getNode })
        const slug = `/wiki${filePath}`
        const category = categoryFromPath(filePath)

        createNodeField({
            name: `slug`,
            node,
            value: slug
        })

        createNodeField({
            name: `category`,
            node,
            value: category
        })
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error

    createTypes(`
        type MarkdownRemark implements Node {
            frontmatter: Frontmatter,
            fields: Fields
        }

        type Frontmatter {
            title: String    
          }
          type Fields {
            slug: String,
            category: String
          }
    `)
}
