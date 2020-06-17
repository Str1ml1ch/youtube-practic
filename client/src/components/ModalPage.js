import React,{useState} from 'react'
import {Button,Modal} from 'react-bootstrap'

export const ModalPage=(props)=> {
    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title || 'Modal heading'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.body || "Woohoo, you're reading this text in a modal"}!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  