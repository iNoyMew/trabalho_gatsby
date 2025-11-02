import * as React from "react"
import "../styles/contact.css"

const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "O nome é obrigatório"
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "O nome deve ter pelo menos 3 caracteres"
    }

    if (!formData.email.trim()) {
      newErrors.email = "O email é obrigatório"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Por favor, insira um email válido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "A mensagem é obrigatória"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "A mensagem deve ter pelo menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simular envio para backend (substitua pela sua URL real)
      const response = await fetch("https://api.exemplo.com/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      // Como o endpoint não existe, sempre cairá no catch
      // Mas mantemos o código para quando implementar de verdade
      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setSubmitSuccess(false), 5000)
      }
    } catch (error) {
      // Para fins de demonstração, consideramos sucesso mesmo se o endpoint não existir
      console.log("Endpoint não disponível, mas dados validados:", formData)
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="contact-form-container" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Entre em Contato</h2>

      {submitSuccess && (
        <div className="success-message">
          Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name" className="form-label">Nome *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? "error" : ""}`}
          placeholder="Seu nome completo"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? "error" : ""}`}
          placeholder="seu@email.com"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Mensagem *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`form-textarea ${errors.message ? "error" : ""}`}
          placeholder="Sua mensagem..."
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
      </button>
    </form>
  )
}

export default ContactForm

