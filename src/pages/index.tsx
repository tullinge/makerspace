import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(
    graphql`query {
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
    }`)
  
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Välkommen hit!</h1>
      <p>Här hittar du massor av hjälp för ditt skapande.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      {data.allMarkdownRemark.nodes.map((node, i) => (
        <div key={i}>
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </div>
      ))}
      {/* <Link to="/page-2/">Go to page 2</Link> <br /> */}
      {/* <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
    </Layout>
  )
}

export default IndexPage
