import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

function uniques(arr) {
    return arr.filter((v, i) => arr.indexOf(v) === i)
}

export default () => {
    const { allMarkdownRemark: { nodes } } = useStaticQuery(
        graphql`query {
          allMarkdownRemark {
            nodes {
              fields {
                slug
                category
              }
              frontmatter {
                title
              }
            }
          }
        }`)

    const categories = uniques(nodes.map((node) => node.fields.category))

    return <aside
        style={{
            width: '260px',
            padding: `0 1.0875rem 1.45rem`,
        }}
    >
        {categories.map((category, j) => {
            return <div>
                <h5
                    key={j}
                    style={{
                        textTransform: 'uppercase',
                    }}
                >
                    {category}
                </h5>
                {
                    <ul>
                        {nodes
                            .filter(n => n.fields.category === category)
                            .map((n, i) => 
                            <li
                                key={i}
                                style={{
                                    listStyle: 'none'
                                }}
                            >
                                <Link
                                    to={n.fields.slug}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }}
                                >
                                    {n.frontmatter.title}
                                </Link></li>)}
                    </ul>
                }
            </div>
        })}
    </aside>
}
