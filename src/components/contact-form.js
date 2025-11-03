import React, { useState } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";

const FormWrap = styled.section`
  max-width: 720px;
  margin: 2.5rem auto;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.9), #fff);
  box-shadow: 0 10px 30px rgba(12,20,35,0.08);
  border-radius: 12px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.6rem;
  color: #0f1724;
  text-align: center;
`;

const StyledForm = styled.form`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #233240;
  margin-bottom: 0.35rem;
`;

const Input = styled.input`
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  border: 1px solid #d0d7df;
  background: #fff;
  font-size: 0.95rem;
  outline: none;
  transition: box-shadow .15s, border-color .15s;
  &:focus {
    border-color: #b12108ff;
    box-shadow: 0 4px 12px rgba(124,156,255,0.12);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  border: 1px solid #d0d7df;
  font-size: 0.95rem;
  min-height: 140px;
  resize: vertical;
  outline: none;
  &:focus {
    border-color: #b12108ff;
    box-shadow: 0 4px 12px rgba(124,156,255,0.12);
  }
`;

const Error = styled.span`
  margin-top: 0.35rem;
  color: #b91c1c;
  font-size: 0.85rem;
`;

const Btn = styled.button`
  margin-top: 0.5rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  color: white;
  cursor: pointer;
  background: red;
  box-shadow: 0 8px 20px rgba(43,118,255,0.12);
  transition: transform .08s ease, box-shadow .12s ease, opacity .12s;
  &:active { transform: translateY(1px); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

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

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...values }),
      });
    } catch (err) {
      console.warn("Envio falhou (provavelmente em localhost):", err);
    }

    navigate("/thanks");
  };

  return (
    <FormWrap aria-labelledby="contact-title">
      <Title id="contact-title">Fale com a gente</Title>

      <StyledForm
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p style={{ display: "none" }}>
          <label>
            Não preencha este campo: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>

        <Row>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" name="name" value={values.name} onChange={handleChange} required />
          {errors.name && <Error>{errors.name}</Error>}
        </Row>

        <Row>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" value={values.email} onChange={handleChange} required />
          {errors.email && <Error>{errors.email}</Error>}
        </Row>

        <Row>
          <Label htmlFor="message">Mensagem</Label>
          <Textarea id="message" name="message" rows="6" value={values.message} onChange={handleChange} required />
          {errors.message && <Error>{errors.message}</Error>}
        </Row>

        <Btn type="submit" disabled={submitting}>
          {submitting ? "Enviando..." : "Enviar mensagem"}
        </Btn>
      </StyledForm>
    </FormWrap>
  );
}

