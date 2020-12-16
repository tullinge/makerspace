import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import css from "./wiki-menu.module.css"
import useWindowDimensions from "../hooks/useWindowDimensions"

function uniques(arr) {
  return arr.filter((v, i) => arr.indexOf(v) === i)
}

export default () => {
  const [open, setOpen] = React.useState(false)
  const windowDimensions = useWindowDimensions()
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

  // TODO: This could and should probably be computed at build time instead of in this component. 
  const categories = uniques(nodes.map((node) => node.fields.category))

  return <>
  <p>{windowDimensions.innerWidth}</p>
    <FontAwesomeIcon
      icon={faBars}
      style={{ display: windowDimensions.innerWidth < 688 ? 'block' : 'none' }}
      className={css.hamburger}
      size="2x"
      onClick={() => setOpen(!open)}
    />
    <aside
      className={css.aside}
      style={{
        position: windowDimensions.innerWidth < 688 ? 'fixed' : 'inherit',
        visibility: windowDimensions.innerWidth < 688 && !open ? 'hidden' : 'visible'
      }}
    >
      <input type="text" className={css.input} />
      <div>
        <Link to={'/'}><h5 className={css.category + ' ' + css.homeLink }>Hem</h5></Link>
      </div>
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
  </>
}
