import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/templates.css"

const ProjetoTemplate = ({ data, location }) => {
  const projeto = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={projeto.frontmatter.title}
        description={projeto.frontmatter.description}
      />
      <article className="template-container">
        <header className="template-header">
          <h1 className="template-title">{projeto.frontmatter.title}</h1>
          <div className="template-meta">
            <span>{new Date(projeto.frontmatter.date).toLocaleDateString("pt-BR")}</span>
            {projeto.frontmatter.category && (
              <span>• {projeto.frontmatter.category}</span>
            )}
          </div>
          {projeto.frontmatter.tech && (
            <div className="tech-badges">
              {projeto.frontmatter.tech.map((tech, index) => (
                <span key={index} className="tech-badge">{tech}</span>
              ))}
            </div>
          )}
        </header>
        <div className="template-content" dangerouslySetInnerHTML={{ __html: projeto.html }} />
        <Link to="/" className="back-link">← Voltar para Home</Link>
      </article>
    </Layout>
  )
}

export default ProjetoTemplate

export const pageQuery = graphql`
  query ProjetoBySlug($id: String!) {
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
        tech
      }
    }
  }
`

