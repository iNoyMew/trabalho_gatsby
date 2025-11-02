import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/pages.css"

const NoticiasPage = ({ data }) => {
  if (!data || !data.noticias) {
    return (
      <Layout>
        <div className="page-container">
          <h1 className="page-title">Eventos</h1>
          <p className="page-empty-state">Carregando eventos...</p>
        </div>
      </Layout>
    )
  }

  const noticias = data.noticias.nodes || []

  const getSlug = (node) => {
    return node.fields?.slug || 
      node.frontmatter.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
  }

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-title">Eventos Especiais</h1>
        {noticias.length > 0 ? (
          <div className="page-posts-grid">
            {noticias.map((node) => {
              const slug = getSlug(node)
              const link = `/noticias/${slug}`

              return (
                <article key={node.id} className="page-post-card">
                  <div className="page-post-meta">
                    <span>
                      {new Date(node.frontmatter.date).toLocaleDateString("pt-BR")}
                    </span>
                    {node.frontmatter.category && (
                      <span className="page-post-category">{node.frontmatter.category}</span>
                    )}
                  </div>
                  <h3 className="page-post-title">
                    <Link to={link}>{node.frontmatter.title}</Link>
                  </h3>
                  {node.excerpt && (
                    <p className="page-post-excerpt">{node.excerpt}</p>
                  )}
                  <Link to={link} className="page-post-link">Ver detalhes →</Link>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="page-empty-state">Nenhum evento disponível ainda.</p>
        )}
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Eventos"
    description="Eventos especiais do restaurante Sabor & Arte - Degustações, noites de vinhos e eventos gastronômicos"
  />
)

export default NoticiasPage

export const query = graphql`
  query {
    noticias: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/noticias/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 160)
        fields {
          slug
        }
        frontmatter {
          title
          date
          category
        }
      }
    }
  }
`
