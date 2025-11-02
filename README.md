# Sabor & Arte - Site Gatsby para Restaurante

Site moderno para restaurante construído com Gatsby, incluindo cardápio, eventos, receitas e formulário de contato.

## 🎯 Requisitos Implementados

### ✅ Rotas Principais

- **Página Home** (`/`) - Página inicial com destaque dos últimos 20 conteúdos
- **Rotas Dinâmicas Geradas a partir de Markdown:**
  - `/posts/[titulo-do-post]` - Páginas individuais de pratos do cardápio
  - `/noticias/[titulo-da-noticia]` - Páginas individuais de eventos
  - `/projetos/[titulo-do-projeto]` - Páginas individuais de receitas
- **Páginas de Listagem:**
  - `/posts` - Cardápio completo
  - `/noticias` - Eventos especiais
  - `/projetos` - Receitas
  - `/contato` - Página de contato

### ✅ Formulário Responsivo

- **Página:** `/contato`
- **Componente:** `src/components/contact-form.js`
- **Validação:** 
  - Nome: obrigatório, mínimo 3 caracteres
  - Email: obrigatório, formato válido
  - Mensagem: obrigatória, mínimo 10 caracteres
- **Design:** Totalmente responsivo usando styled-components
- **Backend:** Configurado para enviar para endpoint (pode ser substituído por Netlify Forms)

### ✅ Pipeline CI/CD

**Configurado em:** `.github/workflows/deploy.yml`

**Fluxo:**
1. ✅ Commit para branch `main` ou `master` no GitHub
2. ✅ GitHub Actions é acionado automaticamente
3. ✅ Build do projeto Gatsby é executado
4. ✅ Se o build for bem-sucedido, deploy automático no GitHub Pages
5. ✅ Site atualizado automaticamente na CDN do GitHub Pages

## 📋 Requisitos de Arquitetura JAMstack

### ✅ Arquivos Markdown/MDX

- **Estrutura de conteúdo:**
  - `src/content/posts/` - Pratos do cardápio (Markdown)
  - `src/content/noticias/` - Eventos gastronômicos (Markdown)
  - `src/content/projetos/` - Receitas especiais (Markdown)

- **Plugins configurados:**
  - `gatsby-transformer-remark` - Processamento de Markdown
  - `gatsby-plugin-mdx` - Suporte a MDX

### ✅ Pipeline de Build e Deploy

- **Build:** Configurado no GitHub Actions
- **Deploy:** Automático para GitHub Pages (CDN)

### ✅ Deploy para CDN

- GitHub Pages serve como CDN automática
- Site estático otimizado e distribuído globalmente

## 🎨 Componentes e Estilos

### ✅ Layouts das Páginas

- **Layout Principal:** `src/components/layout.js`
  - Header fixo
  - Container principal responsivo
  - Footer informativo

### ✅ Componentes Estruturados

- **Header** (`src/components/header.js`) - Navegação responsiva com menu mobile
- **Footer** (`src/components/footer.js`) - Informações do restaurante e links
- **ContactForm** (`src/components/contact-form.js`) - Formulário validado
- **Article** (`src/components/article.js`) - Componente reutilizável de artigo
- **SEO** (`src/components/seo.js`) - Metadados dinâmicos

### ✅ Design Responsivo

- Media queries implementadas em todos os componentes
- Menu mobile no Header
- Grid responsivo nas listagens
- Imagens otimizadas e responsivas

### ✅ CSS e CSS-in-JS

- **CSS Modules:** `src/components/index.module.css`, `layout.css`
- **CSS-in-JS:** `styled-components` usado em todos os componentes principais
  - Header, Footer, Layout
  - Páginas (Home, Cardápio, Eventos, Receitas)
  - Templates (Post, Notícia, Projeto)
  - Formulário de contato

## 🛣️ Rotas e Camada de Dados

### ✅ Rotas a partir de Markdown

**Configuração:** `gatsby-node.js`

- Utiliza `gatsby-transformer-remark` para processar Markdown
- Cria páginas dinamicamente usando `createPages`
- Gera slugs automáticos a partir do nome do arquivo
- Templates específicos:
  - `src/templates/post.js` - Para pratos do cardápio
  - `src/templates/noticia.js` - Para eventos
  - `src/templates/projeto.js` - Para receitas

**Rotas geradas:**
- `/posts/salmão-grelhado`
- `/posts/risotto-funghi`
- `/noticias/noite-de-vinhos`
- `/projetos/pasta-carbonara`
- E mais...

### ✅ Lista de Links com Título e Data

**Implementado em:** `src/pages/index.js`

- Query GraphQL busca todos os conteúdos (posts, notícias, projetos)
- Combina e ordena por data (mais recente primeiro)
- Seleciona os últimos 20 itens
- Exibe título, data de publicação e categoria
- Links clicáveis para as páginas individuais

### ✅ Otimização de Imagens

**Plugin:** `gatsby-plugin-image`

**Implementação:**
- `StaticImage` usado na página home
- `GatsbyImage` configurado nos templates (pronto para uso)
- Suporte a formatos modernos: WebP, AVIF
- Lazy loading automático
- Placeholder blur durante carregamento

**Exemplo:**
```jsx
<StaticImage
  src="../images/gatsby-icon.png"
  alt="Sabor & Arte Logo"
  width={100}
  height={100}
  placeholder="blurred"
  formats={["auto", "webp", "avif"]}
/>
```

### ✅ Metadados das Rotas

**Componente SEO:** `src/components/seo.js`

**Metadados implementados:**
- ✅ `title` - Título da página
- ✅ `description` - Descrição meta
- ✅ `image` - Imagem Open Graph (suportado)
- ✅ Open Graph tags completas
- ✅ Twitter Cards
- ✅ Meta tags adicionais (author, etc.)

**Exemplo de uso:**
```jsx
<Seo
  title="Cardápio"
  description="Cardápio completo do restaurante"
  image="/path-to-image.jpg"
/>
```

### ✅ Metadados do Site

**Plugins configurados em:** `gatsby-config.js`

1. **Sitemap.xml:**
   - Plugin: `gatsby-plugin-sitemap`
   - Gera automaticamente `public/sitemap.xml`
   - Link incluído no `<head>`

2. **Robots.txt:**
   - Plugin: `gatsby-plugin-robots-txt`
   - Gera `public/robots.txt`
   - Configurado para permitir todos os bots
   - URL do sitemap incluída

## 📦 Tecnologias Utilizadas

- **Gatsby** v5.14.6 - Framework React
- **React** v18.2.0
- **Styled Components** v6.1.19 - CSS-in-JS
- **GraphQL** - Query language
- **gatsby-transformer-remark** - Processamento Markdown
- **gatsby-plugin-image** - Otimização de imagens
- **gatsby-plugin-sitemap** - Geração de sitemap
- **gatsby-plugin-robots-txt** - Geração de robots.txt
- **react-helmet** - Gerenciamento de meta tags
- **GitHub Actions** - CI/CD

## 🚀 Como Usar

### Instalação

```bash
cd trabalho_gatsby
npm install
```

### Desenvolvimento

```bash
npm run develop
```

Acesse: `http://localhost:8000`

### Build para Produção

```bash
npm run build
```

### Servir Build Local

```bash
npm run serve
```

## 📁 Estrutura Completa do Projeto

```
trabalho_gatsby/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD
├── public/                     # Build output (gerado)
├── src/
│   ├── components/
│   │   ├── article.js          # Componente de artigo
│   │   ├── contact-form.js    # Formulário com validação
│   │   ├── footer.js          # Rodapé
│   │   ├── header.js          # Cabeçalho responsivo
│   │   ├── layout.js          # Layout principal
│   │   ├── seo.js             # Componente SEO
│   │   ├── layout.css         # CSS tradicional
│   │   └── index.module.css   # CSS Modules
│   ├── content/
│   │   ├── posts/             # Cardápio (Markdown)
│   │   ├── noticias/          # Eventos (Markdown)
│   │   └── projetos/          # Receitas (Markdown)
│   ├── images/                # Imagens estáticas
│   ├── pages/
│   │   ├── index.js           # Home (lista últimos 20)
│   │   ├── posts.js           # Listagem de cardápio
│   │   ├── noticias.js        # Listagem de eventos
│   │   ├── projetos.js        # Listagem de receitas
│   │   └── contato.js         # Página de contato
│   └── templates/
│       ├── post.js            # Template para pratos
│       ├── noticia.js          # Template para eventos
│       └── projeto.js          # Template para receitas
├── gatsby-config.js           # Configuração principal
├── gatsby-node.js             # Criação de rotas dinâmicas
└── package.json
```

## 🔄 Fluxo CI/CD

1. **Desenvolvedor faz commit:**
   ```bash
   git add .
   git commit -m "Atualização"
   git push origin main
   ```

2. **GitHub Actions detecta o push:**
   - Workflow `.github/workflows/deploy.yml` é acionado

3. **Build é executado:**
   - Checkout do código
   - Instalação de dependências (`npm ci`)
   - Build do Gatsby (`npm run build`)

4. **Deploy automático:**
   - Se build for bem-sucedido, deploy para GitHub Pages
   - Site fica disponível em `https://seuusuario.github.io/trabalho-gatsby`

5. **CDN automática:**
   - GitHub Pages serve como CDN global
   - Site distribuído mundialmente

## 📝 Adicionando Novo Conteúdo

### Novo Prato no Cardápio

Crie um arquivo em `src/content/posts/nome-do-prato.md`:

```markdown
---
title: "Nome do Prato"
date: "2025-11-01"
description: "Descrição do prato"
category: "Pratos Principais"
preco: "R$ 75,00"
---

# Nome do Prato

Descrição detalhada...
```

### Novo Evento

Crie em `src/content/noticias/nome-do-evento.md`:

```markdown
---
title: "Nome do Evento"
date: "2025-11-05"
description: "Descrição do evento"
category: "Eventos"
---

# Nome do Evento

Detalhes do evento...
```

### Nova Receita

Crie em `src/content/projetos/nome-da-receita.md`:

```markdown
---
title: "Nome da Receita"
date: "2025-11-10"
description: "Descrição"
category: "Receitas"
tech: ["Tipo", "Categoria"]
---

# Nome da Receita

Instruções...
```

## ✅ Checklist de Requisitos

### Requisitos Básicos
- [x] Rota principal (home)
- [x] Rotas geradas de Markdown (`/posts/[titulo]`, `/noticias/[titulo]`, `/projetos/[titulo]`)
- [x] Formulário responsivo com 3+ campos
- [x] Validação de formulário
- [x] Envio para backend (endpoint configurável)

### CI/CD
- [x] Pipeline configurada (GitHub Actions)
- [x] Build automático no commit
- [x] Deploy automático em caso de sucesso
- [x] Deploy para CDN (GitHub Pages)

### Arquitetura JAMstack
- [x] Arquivos Markdown/MDX
- [x] Pipeline de build e deploy
- [x] Deploy para CDN

### Componentes e Estilos
- [x] Layouts das páginas
- [x] Componentes estruturados (Header, Footer, Article, ContactForm)
- [x] Design responsivo
- [x] Imports de CSS
- [x] CSS-in-JS (styled-components)

### Rotas e Dados
- [x] Rotas de marcação (markdownRemark)
- [x] Lista de links com título e data (últimos 20 na home)
- [x] Otimização de imagens (gatsby-plugin-image)
- [x] Metadados das rotas (title, description, image)
- [x] Metadados do site (sitemap.xml, robots.txt)

## 🎉 Projeto Completo!

Todos os requisitos foram implementados com sucesso. O projeto está pronto para:
- Desenvolvimento local
- Build de produção
- Deploy automático via CI/CD
- Hospedagem em CDN (GitHub Pages)

---

**Tema:** Restaurante "Sabor & Arte"  
**Tecnologia:** Gatsby 5 + React + Styled Components  
**Deploy:** GitHub Actions + GitHub Pages
