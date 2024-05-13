import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ModalMovie ({handelClose,handelShow,original_title,poster_path,showFlag,cleckedMovie}){

    const handleSaveToFavorites = async () => {
        try {
            await axios.post('http://localhost:3000/addMovie', {
              original_title : item.title
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    

    return(
        <>
        <Modal show={showFlag} onHide={handelClose}>
        <Modal.Header closeButton>
          <Modal.Title>{cleckedMovie.item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelClose}>
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
};

export default ModalMovie;