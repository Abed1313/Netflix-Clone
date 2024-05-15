import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';
import './Movie.css';
import { useState } from 'react';
import ModalMovie from '../ModalMovie/ModalMovie';


function Movie(props) {
    const [showMore, setShowMore] = useState(false);

    const useStateForBouton = () => {
        setShowMore(!showMore);

    }

    const [showFlag, setHhowFlag] = useState(false);

    const [cleckedMovie, setCleckedMovie] = useState({});

    const [commentMovie, setCommentMovie] = useState()

    const handelShow = (props) => {
        setCleckedMovie(props);
        console.log(props)
        setHhowFlag(true);

    }

    const handelClose = () => {
        setHhowFlag(false);
        setCommentMovie()
    }

  

    return (
        <>
            <Row xs={1} md={4} className="g-4">
                <Col>
                    <Card className="movie-card">
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.image}`} />
                        <Card.Body>
                            <Card.Title className="movie-title">{props.title}</Card.Title>

                            <h5 className='info'>{showMore ? props.overview : `${props.overview.substring(0, 121)}`}
                                <button className="add-favorite-btn" onClick={useStateForBouton}>{showMore ? "Show Less" : "Show More"}</button>
                            </h5>

                         
                            <Card.Text>
                                Date: {props.release_date}
                            </Card.Text>
                            
                            <Button variant="primary" className="add-favorite-btn" onClick={() => { handelShow(props) }}>Add to Favorite</Button>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ModalMovie
                showFlag={showFlag}
                handelClose={handelClose}
                cleckedMovie={cleckedMovie}
                commentMovie={commentMovie}
                setCommentMovie={setCommentMovie}
                title={props.title}
                release_date={props.release_date}
                image={props.image}
                overview={props.overview}
            />
            {/* <FavList  showFlag={showFlag}
                handelClose={handelClose}
                cleckedMovie={cleckedMovie}
                commentMovie={commentMovie}
                setCommentMovie={setCommentMovie} 
                useStateForBouton ={useStateForBouton}
                deleteMovie={deleteMovie} /> */}

        </>
    )
};

export default Movie;
