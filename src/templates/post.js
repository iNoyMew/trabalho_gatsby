import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/templates.css"

const PostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <article className="template-container">
        <header className="template-header">
          <h1 className="template-title">{post.frontmatter.title}</h1>
          <div className="template-meta">
            <span>{new Date(post.frontmatter.date).toLocaleDateString("pt-BR")}</span>
            {post.frontmatter.category && (
              <span>• {post.frontmatter.category}</span>
            )}
          </div>
          {post.frontmatter.preco && (
            <div className="template-price">
              {post.frontmatter.preco}
            </div>
          )}
        </header>
        <div className="template-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        <Link to="/" className="back-link">← Voltar para Home</Link>
      </article>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($id: String!) {
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
        preco
      }
    }
  }
`

