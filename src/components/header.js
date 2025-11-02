import * as React from "react"
import { Link } from "gatsby"
import "../styles/header.css"

const Header = ({ siteTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" className="logo">{siteTitle}</Link>
        <button 
          className="menu-button" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
        <nav className={`nav ${isMenuOpen ? "mobile-open" : "mobile-hidden"}`}>
          <Link to="/" className="nav-link">Início</Link>
          <Link to="/posts" className="nav-link">Cardápio</Link>
          <Link to="/noticias" className="nav-link">Eventos</Link>
          <Link to="/projetos" className="nav-link">Receitas</Link>
          <Link to="/contato" className="nav-link">Contato</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
