import Movie from "../Movie/Movie";

function MovieList(props) {
    
    return (
        <>
            {props.jsonRes.map((item) => {
                return <Movie id={item.id} original_title={item.title} overview={item.overview} release_date={item.release_date} image={item.poster_path} />
            })}
        </>
    )
};

export default MovieList; 