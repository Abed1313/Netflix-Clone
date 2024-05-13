import { useEffect, useState } from "react";
import MovieList from "../MovieList/MovieList";
import './Home.css';
import Navbar from "../Navbar/Navbar";


function Home() {

    const [movieArr, setMovieArr] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const serverUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=149bc0b5063951d201b3ea4107e07bda&language=en-US`;
        const res = await fetch(serverUrl);
        const jsonRes = await res.json();
        setMovieArr(jsonRes.results);
    }

    return (
        <div className="home-container">
            <h1 className="home-title">AL-ESLENE</h1>
            <Navbar />
            <div className="home-content">
                <MovieList jsonRes={movieArr} />
            </div>
        </div>
    );
}

export default Home;
