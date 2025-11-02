import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/templates.css"

const NoticiaTemplate = ({ data, location }) => {
  const noticia = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={noticia.frontmatter.title}
        description={noticia.frontmatter.description}
      />
      <article className="template-container">
        <header className="template-header">
          <h1 className="template-title">{noticia.frontmatter.title}</h1>
          <div className="template-meta">
            <span>{new Date(noticia.frontmatter.date).toLocaleDateString("pt-BR")}</span>
            {noticia.frontmatter.category && (
              <span>• {noticia.frontmatter.category}</span>
            )}
          </div>
        </header>
        <div className="template-content" dangerouslySetInnerHTML={{ __html: noticia.html }} />
        <Link to="/" className="back-link">← Voltar para Home</Link>
      </article>
    </Layout>
  )
}

export default NoticiaTemplate

export const pageQuery = graphql`
  query NoticiaBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        description
        category
      }
    }
  }
`

