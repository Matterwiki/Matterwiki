import React from "react";
import Alert from "react-s-alert";
import { Row, Col, Button, Form, Input, Heading, HelpBlock, Icon } from "ui";

import APIProvider from "utils/APIProvider";

class LogoUpload extends React.Component {
  state = {
    logo: null
  };

  handleChange = e => {
    this.setState({
      logo: e.target.files[0]
    });
  };

  handleUpload = e => {
    e.preventDefault();

    const logo = this.state.logo;
    const formData = new FormData();
    formData.append("logo", logo);

    APIProvider.post("uploads/logo", formData)
      .then(() => Alert.success("Your logo has been successfully updated."))
      .catch(error => Alert.error(error.message));
  };

  render() {
    return (
      <Row>
        <Col>
          <Heading size="2">
            <b>Change Logo</b>
          </Heading>
          <Form onSubmit={this.handleUpload}>
            <Input className="form-control" onChange={this.handleChange} type="file" name="logo" />
            <HelpBlock>
              Please reload the page for the changes to reflect throughout the site.
            </HelpBlock>
            <Button type="submit" block>
              <Icon type="upload" />Upload Logo
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default LogoUpload;
