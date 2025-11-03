import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrap = styled.main`
  display:flex;
  align-items:center;
  justify-content:center;
  min-height: 70vh;
  padding: 2rem;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: linear-gradient(180deg,#f7fbff,#ffffff);
`;

const Card = styled.section`
  max-width: 820px;
  width: 100%;
  text-align: center;
  background: white;
  padding: 2.25rem;
  border-radius: 14px;
  box-shadow: 0 18px 40px rgba(16,30,60,0.07);
`;

const Heading = styled.h1`
  margin: 0 0 0.5rem;
  font-size: 1.9rem;
  color: #0f1724;
`;

const Subtitle = styled.p`
  margin: 0 0 1.25rem;
  color: #334155;
  font-size: 1.05rem;
`;

const Icon = styled.div`
  width: 84px;
  height: 84px;
  margin: 0 auto 1rem;
  border-radius: 999px;
  background: red;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-weight:700;
  font-size:1.6rem;
  box-shadow: 0 8px 20px rgba(43,118,255,0.14);
`;

const BackLink = styled(Link)`
  display:inline-block;
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  background: transparent;
  color: #ee0303ff;
  border-radius: 10px;
  border: 1px solid #dbe8ff;
  text-decoration: none;
  font-weight: 600;
  transition: background .12s, transform .08s;
  &:hover { background: #f4f9ff; transform: translateY(-2px); }
`;

export default function Thanks() {
  return (
    <Wrap>
      <Card>
        <Icon>✓</Icon>
        <Heading>Obrigado — mensagem recebida!</Heading>
        <Subtitle>
          Agradecemos o contato. Em breve nossa equipe responderá para o email que você informou.
        </Subtitle>
        <BackLink to="/">Voltar para a página inicial</BackLink>
      </Card>
    </Wrap>
  );
}