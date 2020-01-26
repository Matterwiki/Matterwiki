import React from 'react'
import { HelpBlock, Col, Row } from 'ui'

const NotFoundError = () => (
  <Row>
    <Col>
      <h1>Page not found</h1>
      <br />
      <HelpBlock>
        The page you are looking for does not exist.<br />
        If you think it should, please contact your Matterwiki Admin.
      </HelpBlock>
    </Col>
  </Row>
)

export default NotFoundError
