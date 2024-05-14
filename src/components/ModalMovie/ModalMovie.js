import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalMovie.css';


function ModalMovie (props){

  const handleSaveToFavorites = async () => {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        await axios.post(`${apiUrl}/addMovie`, {
            original_title: props.title,
            release_date: props.release_date,
            poster_path: props.image,
            overview: props.overview,
            comment: props.commentMovie,
        });
        props.handelClose();
    } catch (error) {
        console.error("Error saving movie to favorites:", error);
    }
};

    

    return(
        <>
        <Modal show={props.showFlag} onHide={props.handelClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
  <div className="modal-content">
    <div className="modal-image-container">
      <img src={`https://image.tmdb.org/t/p/w500${props.cleckedMovie.image}`} className="modal-image" alt="Movie Poster" />
    </div>
    <Modal.Header closeButton>
      <Modal.Title>{props.cleckedMovie.original_title}</Modal.Title>
    </Modal.Header>
    <textarea
      className="form-control mt-3"
      rows="3"
      placeholder="Add your comment..."
      value={props.commentMovie}
      onChange={(e) => props.setCommentMovie(e.target.value)}
    ></textarea>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handelClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSaveToFavorites}>
        Save Changes
      </Button>
    </Modal.Footer>
  </div>
</Modal.Body>

      </Modal>
        </>
    )
};

export default ModalMovie;

{/* <Modal.Body>
        <div className="modal-image-container">
          <img src={`https://image.tmdb.org/t/p/w500${props.cleckedMovie.image}`}></img>
          </div>
        </Modal.Body>
        <textarea
          className="form-control mt-3"
          rows="3"
          placeholder="Add your comment..."
          value={props.commentMovie}
          onChange={(e) => props.setCommentMovie(e.target.value)}
        ></textarea>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveToFavorites}>
            Save Changes
          </Button>
        </Modal.Footer> */}