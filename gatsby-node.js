const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/post.js`)
  const noticiaTemplate = path.resolve(`./src/templates/noticia.js`)
  const projetoTemplate = path.resolve(`./src/templates/projeto.js`)
  const postsResult = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const noticiasResult = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/noticias/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const projetosResult = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/projetos/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  if (postsResult.errors) {
    reporter.panicOnBuild(`Erro ao buscar posts`, postsResult.errors)
    return
  }

  if (noticiasResult.errors) {
    reporter.panicOnBuild(`Erro ao buscar notícias`, noticiasResult.errors)
    return
  }

  if (projetosResult.errors) {
    reporter.panicOnBuild(`Erro ao buscar projetos`, projetosResult.errors)
    return
  }

  const posts = postsResult.data.allMarkdownRemark.nodes
  const noticias = noticiasResult.data.allMarkdownRemark.nodes
  const projetos = projetosResult.data.allMarkdownRemark.nodes

  posts.forEach((node) => {
    const slug = node.fields?.slug || 
      node.frontmatter.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

    createPage({
      path: `/posts/${slug}`,
      component: postTemplate,
      context: {
        id: node.id,
      },
    })
  })

  noticias.forEach((node) => {
    const slug = node.fields?.slug || 
      node.frontmatter.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

    createPage({
      path: `/noticias/${slug}`,
      component: noticiaTemplate,
      context: {
        id: node.id,
      },
    })
  })

  projetos.forEach((node) => {
    const slug = node.fields?.slug || 
      node.frontmatter.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

    createPage({
      path: `/projetos/${slug}`,
      component: projetoTemplate,
      context: {
        id: node.id,
      },
    })
  })
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const filePath = fileNode.relativePath
    const fileName = filePath.replace(/\.[^/.]+$/, '')
    
    createNodeField({
      node,
      name: `slug`,
      value: fileName,
    })
  }
}
