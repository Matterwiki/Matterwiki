import React from "react";

import { Modal, Button } from "react-bootstrap";

class ArticleModal extends React.Component {
  constructor(...args) {
    super(...args);
    // TODO I realise this is wrong. Think of a better way!
    this.state = {
      showModal: this.props.showModal
    };

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <Modal show={this.state.showModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <Row>
              <Col md={6} sd={12}>
                <h3>{this.props.content}</h3>
              </Col>
            </Row>
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button block={true} onClick={this.closeModal}>
            That's great
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ArticleModal;