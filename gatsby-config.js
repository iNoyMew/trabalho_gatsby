/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Sabor & Arte`,
    description: `Restaurante especializado em culinária contemporânea. Descubra nossos pratos especiais, receitas e eventos gastronômicos`,
    author: `Sabor & Arte`,
    siteUrl: `https://seusuario.github.io/trabalho-gatsby`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `noticias`,
        path: `${__dirname}/src/content/noticias`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projetos`,
        path: `${__dirname}/src/content/projetos`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sabor & Arte`,
        short_name: `Sabor & Arte`,
        start_url: `/`,
        background_color: `#c92a2a`,
        theme_color: `#c92a2a`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        createLinkInHead: true,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://seusuario.github.io/trabalho-gatsby`,
        sitemap: `https://seusuario.github.io/trabalho-gatsby/sitemap.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
  ],
}
