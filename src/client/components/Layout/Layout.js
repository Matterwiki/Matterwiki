import React from 'react'
import { Container } from 'ui'
import Header from './components/Header/Header'
import Footer from './components/Footer'

const Layout = ({ children, ...props }) => (
  <div>
    <Header {...props} />
    <Container minHeight='80vh'>{children}</Container>
    <Footer />
  </div>
)

export default Layout
