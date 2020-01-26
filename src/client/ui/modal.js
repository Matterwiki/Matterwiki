import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Icon, Button, TextMuted } from './'

const modalRoot = document.getElementById('modal')

const ModalMask = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
`

const ModalWrapper = styled.div`
  border: 1px solid ${props => (props.theme ? props.theme.border : '#efefef')};
  padding: 2rem;
  background-color: ${props => (props.theme ? props.theme.background : '#fff')};
  max-width: 60rem;
  margin: 0px auto;
  margin-top: 10rem;
  border-radius: 0.4rem;
  box-shadow: 0rem 0rem 2rem;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.5rem;
`

const ModalTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
`

const ModalBody = styled.div`
  padding: 2rem 0;
  overflow-wrap: break-word;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 1.5rem;
`

class Modal extends React.Component {
  render () {
    if (!this.props.visible) return null
    const { title, children, footer, okText, cancelText, handleOk, handleClose } = this.props
    const modal = (
      <>
        <ModalMask>
          <ModalWrapper>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <TextMuted onClick={handleClose}>
                <Icon type='x-square' cursorPointer />
              </TextMuted>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {footer || (
                <span>
                  <Button outline onClick={handleClose}>
                    {cancelText || 'Cancel'}
                  </Button>&nbsp;
                  <Button onClick={handleOk}>{okText || 'Ok'}</Button>
                </span>
              )}
            </ModalFooter>
          </ModalWrapper>
        </ModalMask>
      </>
    )
    return ReactDOM.createPortal(modal, modalRoot)
  }
}

export default Modal
