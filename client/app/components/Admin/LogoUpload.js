import React from "react";
import Alert from "react-s-alert";
import {
  Grid,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  FormControl,
  HelpBlock
} from "react-bootstrap";

import API from "api/wrapper.js";

class LogoUpload extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      logo: null
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      logo: e.target.files[0]
    });
  }

  handleUpload(e) {
    e.preventDefault();
    
    var logo = this.state.logo;
    var formData = new FormData();
    formData.append("logo", logo);

    var myHeaders = new Headers({
      "x-access-token": window.localStorage.getItem("userToken")
    });

    var myInit = {
      method: "POST",
      headers: myHeaders,
      body: formData
    };

    fetch("/api/logo/", myInit)
      .then(response => response.json())
      .then(serverData => {
        if (serverData.error.error) {
          Alert.error(serverData.error.message);
        } else {
          Alert.success("Your logo has been successfully updated.");
        }
      });
  }



  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} sm={12}>
            <h4><b>Change Logo</b></h4>
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
