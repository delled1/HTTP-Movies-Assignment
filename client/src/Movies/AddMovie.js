import axios from "axios";
import React, { useState } from "react"
import {  useHistory } from "react-router-dom";

const AddMovie = (props) => {

    const initialMovieData = {
        id: "",
        title: "",
        director: "",
        metascore: "",
        stars:[""]
    }

    const { push } = useHistory();

    const [movie, setMovie] = useState(initialMovieData)

    const changeHandler = (e) => {
        if(e.target.name === 'stars')  {
            setMovie({
                ...movie,
                stars: e.target.value.split(',')
            })
        } 
        else {
            setMovie({
                ...movie,
                [e.target.name]: e.target.value
            })
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        axios.post("http://localhost:5000/api/movies", movie)
        .then((res) => {
            console.log(res.data)
            props.setMovieList(res.data);
            push("/")
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <h2>Add Movie</h2>

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

export default AddMovie