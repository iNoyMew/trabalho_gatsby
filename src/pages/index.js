import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/home.css"

const IndexPage = ({ data }) => {
  if (!data || !data.posts || !data.noticias || !data.projetos) {
    return (
      <Layout>
        <section className="hero">
          <h1>Bem-vindo ao Meu Site Gatsby</h1>
          <p>Carregando conteúdo...</p>
        </section>
      </Layout>
    )
  }

  const posts = data.posts.nodes || []
  const noticias = data.noticias.nodes || []
  const projetos = data.projetos.nodes || []

  const allContent = [
    ...posts.map(p => ({ ...p, type: 'post', basePath: '/posts' })),
    ...noticias.map(n => ({ ...n, type: 'noticia', basePath: '/noticias' })),
    ...projetos.map(pr => ({ ...pr, type: 'projeto', basePath: '/projetos' })),
  ]
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    .slice(0, 20)

  const getSlug = (node) => {
    return node.fields?.slug || 
      node.frontmatter.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
  }

  return (
    <Layout>
      <section className="hero">
        <StaticImage
          src="../images/gatsby-icon.png"
          alt="Sabor & Arte Logo"
          width={100}
          height={100}
          className="hero-image"
          placeholder="blurred"
          formats={["auto", "webp", "avif"]}
        />
        <h1>Bem-vindo ao Sabor & Arte</h1>
        <p>
          Descubra uma experiência gastronômica única. Explore nosso cardápio,
          participe de nossos eventos e aprenda receitas especiais.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Destaques</h2>
        {allContent.length > 0 ? (
          <div className="posts-grid">
            {allContent.map((node) => {
              const slug = getSlug(node)
              const link = `${node.basePath}/${slug}`

              return (
                <article key={node.id} className="post-card">
                  <div className="post-content">
                    <div className="post-meta">
                      <span>
                        {new Date(node.frontmatter.date).toLocaleDateString("pt-BR")}
                      </span>
                      {node.frontmatter.category && (
                        <span className="post-category">{node.frontmatter.category}</span>
                      )}
                    </div>
                    <h3 className="post-title">
                      <Link to={link}>{node.frontmatter.title}</Link>
                    </h3>
                    {node.frontmatter.preco && (
                      <div className="post-price">{node.frontmatter.preco}</div>
                    )}
                    {node.excerpt && (
                      <p className="post-excerpt">{node.excerpt}</p>
                    )}
                    <Link to={link} className="post-link">Ver detalhes →</Link>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="empty-state">Nenhum conteúdo disponível ainda.</p>
        )}
      </section>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Início"
    description="Restaurante Sabor & Arte - Cardápio, eventos e receitas especiais"
  />
)

export default IndexPage

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { frontmatter: { date: DESC } }
      limit: 20
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
          preco
        }
      }
    }
    noticias: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/noticias/" } }
      sort: { frontmatter: { date: DESC } }
      limit: 20
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
          preco
        }
      }
    }
    projetos: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projetos/" } }
      sort: { frontmatter: { date: DESC } }
      limit: 20
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
          preco
        }
      }
    }
  }
`
