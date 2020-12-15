import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import css from "./wiki-menu.module.css"

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

    return <aside className={css.aside}>
        {categories.map((category, j) => {
            return <div>
                <h5 key={j} className={css.category}>{category}</h5>
                {
                    <ul className={css.list}>
                        {nodes
                            .filter(n => n.fields.category === category)
                            .map((n, i) =>
                                <li key={i}>
                                    <Link to={n.fields.slug} className={css.link}>
                                        {n.frontmatter.title}
                                    </Link></li>)}
                    </ul>
                }
            </div>
        })}
    </aside>
}
