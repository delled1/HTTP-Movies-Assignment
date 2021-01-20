import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();
  

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    e.preventDefault();
        
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((res) => {
        console.log(res.data)
        setMovieList(res.data);
        history.push("/")
    })
    .catch((err) => {
        console.log(err)
    })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div>
      <button
        onClick={() => history.push(`/update-movie/${params.id}`)}
      >Update Movie</button>
      </div>
      <br />

      <div>
        <button onClick={deleteMovie}>Delete Movie</button>
      </div>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
