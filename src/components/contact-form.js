import React, { useState } from "react";
import { navigate } from "gatsby";

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

  const encode = (data) =>
    Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);

    // Tenta enviar para Netlify Forms (funciona em produção no Netlify).
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...values }),
      });
    } catch (err) {
      // ignore: falha local não impede o redirecionamento para /thanks
      console.warn("Envio falhou (provavelmente em localhost):", err);
    }

    // Navega para a página de agradecimento no cliente
    navigate("/thanks");
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="contact-form"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ display: "none" }}>
        <label>
          Não preencha este campo: <input name="bot-field" onChange={handleChange} />
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

