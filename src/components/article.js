import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const ArticleContainer = styled.article`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`

const ArticleTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
  color: #333;

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #c92a2a;
    }
  }
`

const ArticleMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`

const ArticleExcerpt = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
`

const ArticleImage = styled.div`
  margin-bottom: 1rem;
  border-radius: 4px;
  overflow: hidden;
`

const ArticleLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #c92a2a;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #a61e1e;
  }
`

const Article = ({ title, date, excerpt, image, link, category }) => {
  const imageData = image ? getImage(image) : null

  return (
    <ArticleContainer>
      {imageData && (
        <ArticleImage>
          <GatsbyImage image={imageData} alt={title} />
        </ArticleImage>
      )}
      <ArticleTitle>
        <Link to={link}>{title}</Link>
      </ArticleTitle>
      <ArticleMeta>
        <span>{new Date(date).toLocaleDateString("pt-BR")}</span>
        {category && <span>• {category}</span>}
      </ArticleMeta>
      {excerpt && <ArticleExcerpt>{excerpt}</ArticleExcerpt>}
      <ArticleLink to={link}>Ler mais →</ArticleLink>
    </ArticleContainer>
  )
}

export default Article

