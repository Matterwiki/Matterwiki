import React from "react";
import Alert from "react-s-alert";
import { Grid, Row, Col, Button, Form, FormGroup, FormControl, HelpBlock } from "react-bootstrap";

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
      <Grid>
        <Row>
          <Col md={6} sm={12}>
            <h4>
              <b>Change Logo</b>
            </h4>
            <Form onSubmit={this.handleUpload}>
              <FormGroup>
                <FormControl
                  className="form-control"
                  onChange={this.handleChange}
                  type="file"
                  name="logo"
                />
              </FormGroup>
              <HelpBlock>
                Please reload the page for the changes to reflect throughout the site.
              </HelpBlock>
              <Button type="submit" block>
                Upload Logo
              </Button>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LogoUpload;
