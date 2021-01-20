import axios from "axios";
import React, {useState, useEffect} from "react"
import { useParams, useHistory } from "react-router-dom";


const UpdateMovie = (props) => {
    console.log(props)

    const { push } = useHistory;
    const { id } = useParams;
    // const foundMovie = props.movieList.find((movie) => movie.id.toString() === id)

    const [movie, setMovie] = useState({
        id: 1,
        title: "Star Wars",
        director: "George Lucas",
        metascore: 92,
        stars: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"]
      },)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/1`)
        .then((res) => {
            console.log(res.data)
            setMovie(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    const changeHandler = e => {
        e.persist();
        
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/1`, movie)
        .then((res) => {
            console.log(res.data)
            // props.setMovieList(res.data);
            // push(`/movie-list/1`)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    return (
        <div>
            
            <h2>UPDATE MOVIE</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <input 
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
                />
                </div>

                <input 
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
                />
                
                <div>
                <input 
                type="text"
                name="metascore"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
                />
                </div>

                <div>
                <input 
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="stars"
                value={movie.stars}
                />
                </div>

                <div>
                <button>Update</button>
                </div>
                

            </form>
        </div>
    )
}

export default UpdateMovie