import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import './FavList.css';

function FavList() {
    const [movieArr, setMovieArr] = useState([]);
    const [showMoreArr, setShowMoreArr] = useState([]);
    const [editableCommentId, setEditableCommentId] = useState(null);
    const [updateComment, setUpdateComment] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const serverUrl = `http://localhost:3000/getMovies`;
            const res = await fetch(serverUrl);
            const jsonRes = await res.json();
            setMovieArr(jsonRes);
            setShowMoreArr(new Array(jsonRes.length).fill(false));
        } catch (error) {
            console.error('Error fetching favorite movies:', error);
        }
    }

    const toggleShowMore = (index) => {
        setShowMoreArr(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    }

    const deleteMovie = async (id) => {
        try {
            const serverUrl = `http://localhost:3000/deleteMovie/${id}`;
            const res = await fetch(serverUrl, { method: "DELETE" });
            if (res.ok) {
                setMovieArr(prevMovies => prevMovies.filter(movie => movie.id !== id));
            } else {
                console.error('Failed to delete movie:', res.statusText);
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    }

    const updateMovie = async (id) => {
        const movieToUpdate = movieArr.find((movie) => movie.id === id);
        if (!movieToUpdate) return;

        const updatedMovie = { ...movieToUpdate, comment: updateComment };

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await fetch(`${apiUrl}/updateMovie/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedMovie),
            });

            if (res.ok) {
                setMovieArr((prevMovies) =>
                    prevMovies.map((m) => (m.id === id ? updatedMovie : m))
                );
                setEditableCommentId(null);
                setUpdateComment('');
            } else {
                console.error("Failed to update movie");
            }
        } catch (error) {
            console.error("Error updating movie:", error);
        }
    };

    return (
        <div className="favlist-container">
            <h1 className="favlist-title">Favorite List Movie</h1>
            <Navbar />
            <div className="favlist-content">
                {movieArr.map((movie, index) => (
                    <div key={movie.id} className="favlist-movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="favlist-movie-img" />
                        <div className="favlist-movie-details">
                            <h2 className="favlist-movie-title">{movie.original_title}</h2>
                            <p className="favlist-movie-overview">
                                {showMoreArr[index] ? movie.overview : `${movie.overview.substring(0, 121)}`}
                            </p>
                            <button className="show-more-btn" onClick={() => toggleShowMore(index)}>
                                {showMoreArr[index] ? "Show Less" : "Show More"}
                            </button>
                            <p>Date: {movie.release_date}</p>
                            {editableCommentId === movie.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={updateComment}
                                        onChange={(e) => setUpdateComment(e.target.value)}
                                    />
                                    <button className="button" onClick={() => updateMovie(movie.id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p>Comment: {movie.comment}</p>
                                    <button className="button" onClick={() => setEditableCommentId(movie.id)}>Edit Comment</button>
                                </>
                            )}
                            <button className="button" onClick={() => deleteMovie(movie.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavList;







// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import './FavList.css';

// function FavList() {
//   const [showMore, setShowMore] = useState(false);

//   const useStateForBouton = () => {
//     setShowMore(!showMore);

//   }

//   const [movieArr, setMovieArr] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const serverUrl = `http://localhost:3000/getMovies`; // Assuming this endpoint fetches the favorite movies
//       const res = await fetch(serverUrl);
//       const jsonRes = await res.json();
//       setMovieArr(jsonRes);
//     } catch (error) {
//       console.error('Error fetching favorite movies:', error);
//     }
//   }

//   const deleteMovie = async (id) => {
//     try {
//       const serverUrl = `http://localhost:3000/deleteMovie/${id}`;
//       const res = await fetch(serverUrl, { method: "DELETE" });
//       if (res.ok) {
//         // Remove the deleted movie from the movieArr state
//         setMovieArr(prevMovies => prevMovies.filter(movie => movie.id !== id));
//       } else {
//         console.error('Failed to delete movie:', res.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting movie:', error);
//     }
//   }


//   return (
//     <div className="favlist-container">
//       <h1 className="favlist-title">Favorite List Movie</h1>
//       <Navbar />
//       <div className="favlist-content">
//         {movieArr.map(movie => (
//           <div key={movie.id} className="favlist-movie-card">
//             <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="favlist-movie-img" />
//             <div className="favlist-movie-details">
//               <h2 className="favlist-movie-title">{movie.title}</h2>
//               <h5 className='movie-overview-container'>
//                 {showMore ? movie.overview : `${movie.overview.substring(0, 121)}`}
//                 <button className="show-more-btn" onClick={useStateForBouton}>
//                   {showMore ? "Show Less" : "Show More"}
//                 </button>
//               </h5>

//               <p>ID: {movie.id}</p>
//               <p>Date: {movie.release_date}</p>
//               <button variant="danger" className="button" onClick={() => { deleteMovie(movie.id) }}>Delete</button>{' '}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FavList;

