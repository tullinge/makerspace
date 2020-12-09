import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export default ({ data }) => {

    return (
        <Layout>
            <SEO title={data.markdownRemark.frontmatter.title}/>
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            <div 
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
        </Layout>
    )
}

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`
