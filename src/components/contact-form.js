import React, { useState } from "react";
import "../styles/contact.css";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!values.name || values.name.trim().length < 2) {
      errs.name = "Nome deve ter ao menos 2 caracteres.";
    }
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = "Email inválido.";
    }
    if (!values.message || values.message.trim().length < 10) {
      errs.message = "Mensagem deve ter ao menos 10 caracteres.";
    }
    return errs;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      e.preventDefault(); // bloqueia envio para Netlify se houver erro
      setErrors(errs);
      return;
    }
    // se válido, deixa o formulário submeter normalmente (Netlify Forms processará)
    setSubmitting(true);
    // não chamar fetch/axios aqui; o envio padrão do formulário é usado
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/thanks"
      onSubmit={handleSubmit}
      className="contact-form"
    >
      {/* Campo necessário para Netlify identificar o form */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot anti-bot */}
      <p style={{ display: "none" }}>
        <label>
          Não preencha este campo:{" "}
          <input name="bot-field" onChange={handleChange} />
        </label>
      </p>

      <label>
        Nome
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>

      <label>
        Mensagem
        <textarea
          name="message"
          rows="6"
          value={values.message}
          onChange={handleChange}
          required
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}

