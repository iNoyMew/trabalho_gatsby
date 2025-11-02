import * as React from "react"
import { Link } from "gatsby"
import "../styles/footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sobre o Sabor & Arte</h3>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            Restaurante especializado em culinária contemporânea. Oferecemos uma experiência gastronômica única com pratos especiais, eventos e receitas exclusivas.
          </p>
        </div>
        <div className="footer-section">
          <h3>Navegação</h3>
          <ul>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/posts">Cardápio</Link>
            </li>
            <li>
              <Link to="/noticias">Eventos</Link>
            </li>
            <li>
              <Link to="/projetos">Receitas</Link>
            </li>
            <li>
              <Link to="/contato">Contato</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Horários</h3>
          <p style={{ color: "#666", lineHeight: "1.8", fontSize: "0.9rem" }}>
            <strong>Almoço:</strong><br />
            Terça a Sábado: 12h às 15h<br />
            <br />
            <strong>Jantar:</strong><br />
            Terça a Sábado: 19h às 23h<br />
            <br />
            Domingo e Segunda: Fechado
          </p>
        </div>
      </div>
      <div className="footer-copyright">
        © {currentYear} &middot; Construído com{" "}
        <a href="https://www.gatsbyjs.com" target="_blank" rel="noopener noreferrer">
          Gatsby
        </a>
      </div>
    </footer>
  )
}

export default Footer

