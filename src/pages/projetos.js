import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/pages.css"

const ProjetosPage = ({ data }) => {
  if (!data || !data.projetos) {
    return (
      <Layout>
        <div className="page-container">
          <h1 className="page-title">Receitas</h1>
          <p className="page-empty-state">Carregando receitas...</p>
        </div>
      </Layout>
    )
  }

  const projetos = data.projetos.nodes || []

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
        <h1 className="page-title">Nossas Receitas</h1>
        {projetos.length > 0 ? (
          <div className="page-posts-grid">
            {projetos.map((node) => {
              const slug = getSlug(node)
              const link = `/projetos/${slug}`

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
                  {node.frontmatter.tech && (
                    <div className="tech-badges-container">
                      {node.frontmatter.tech.map((tech, index) => (
                        <span key={index} className="tech-badge-small">{tech}</span>
                      ))}
                    </div>
                  )}
                  {node.excerpt && (
                    <p className="page-post-excerpt">{node.excerpt}</p>
                  )}
                  <Link to={link} className="page-post-link">Ver detalhes →</Link>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="page-empty-state">Nenhuma receita disponível ainda.</p>
        )}
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Receitas"
    description="Receitas especiais do restaurante Sabor & Arte - Aprenda a preparar pratos incríveis em casa"
  />
)

export default ProjetosPage

export const query = graphql`
  query {
    projetos: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projetos/" } }
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
          tech
        }
      }
    }
  }
`
