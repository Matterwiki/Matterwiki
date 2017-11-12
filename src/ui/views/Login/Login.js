import React from "react";
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";

import Logo from "../../shared/components/Logo/Logo";

import "./Login.css";

const Login = () => (
  <Container className="login-box">
    <Row>
      <Col md={12} sm={12}>
        <Logo />
        <Form>
          <FormGroup>
            <Input type="email" name="email" id="email" placeholder="email" />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </FormGroup>
          <Button size="lg" block>
            Sign in
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default Login;
