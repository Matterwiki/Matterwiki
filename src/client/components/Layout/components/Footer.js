import React from 'react'
import { Footer, ImageWrapper } from 'ui'
import Logo from 'assets/logo.svg'

const AppFooter = () => (
  <Footer align='center'>
    Powered by{' '}
    <a href='http://matterwiki.com'>
      <ImageWrapper height='3'>
        <img alt='matterwiki-logo' src={Logo} />
      </ImageWrapper>
    </a>
  </Footer>
)

export default AppFooter
