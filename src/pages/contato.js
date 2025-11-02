import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ContactForm from "../components/contact-form"

const ContatoPage = () => (
  <Layout>
    <Seo title="Contato" description="Entre em contato conosco" />
    <ContactForm />
  </Layout>
)

export default ContatoPage

