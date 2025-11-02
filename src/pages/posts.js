import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/pages.css"


const PostsPage = ({ data }) => {
  if (!data || !data.posts) {
    return (
      <Layout>
        <div className="page-container">
          <h1 className="page-title">Posts</h1>
          <p className="page-empty-state">Carregando posts...</p>
        </div>
      </Layout>
    )
  }

  const posts = data.posts.nodes || []

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
        <h1 className="page-title">Nosso Cardápio</h1>
        {posts.length > 0 ? (
          <div className="page-posts-grid">
            {posts.map((node) => {
              const slug = getSlug(node)
              const link = `/posts/${slug}`

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
                  {node.frontmatter.preco && (
                    <div className="page-post-price">{node.frontmatter.preco}</div>
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
          <p className="page-empty-state">Nenhum post disponível ainda.</p>
        )}
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Cardápio"
    description="Cardápio completo do restaurante Sabor & Arte - Pratos principais, entradas e sobremesas"
  />
)

export default PostsPage

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
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

