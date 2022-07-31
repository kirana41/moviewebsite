import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react';
import {NavLink,useParams} from "react-router-dom";
import { useGlobalContext } from './context'

const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_KEY}`;
function SingleMovie() {
 
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState("");
  
const getMovies = async(url) =>{
  setIsLoading(true);
  try{
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if(data.Response === "True"){
      setIsLoading(false);
      setMovie(data);
    }
  }catch(error){
    console.log(error);
  }
};



  useEffect(()=>{
    getMovies(`${API_URL}&i=${id}`);
  }, [id])
 

    if (isLoading) {
      return (
        <section className="movie-section ">
          <div className="loading">Loading....</div>;
        </section>
      );
    }

  return (
   
        <section className="movie-section">
            <div className="movie-card">
              <figure>
                <img src={movie.Poster} alt="" />
              </figure>
              <div className="card-content">
                <p className="title">{movie.Title}</p>
                <p className=""></p>
                <p className="card-text">{movie.Released}</p>
                <p className="card-text">{movie.Genre}</p>
                <p className="card-text">{movie.imdbRating} / 10</p>
                <p className="card-text">{movie.Country}</p>
                <NavLink to="/" className="back-btn">
                  Go Back
                </NavLink>
              </div>
            </div>
        </section>
  
  )
}

export default SingleMovie