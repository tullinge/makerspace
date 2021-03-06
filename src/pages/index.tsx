import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Tullinge Makerspace Wiki</h1>
      <h2>WORK IN PROGRESS</h2>
      <p>Här hittar du massor av hjälp för ditt skapande.</p>
      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
      {/* <Link to="/page-2/">Go to page 2</Link> <br /> */}
      {/* <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
    </Layout>
  )
}

export default IndexPage
