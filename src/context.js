import React, { useContext, useEffect, useState } from "react";
//6d18e3c5
const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_KEY}`;
const AppContext = React.createContext();

//provider
const AppProvider = ({children}) => {

   const [isLoading,setIsLoading] = useState("true");
   const [movie,setMovie] = useState([]);
   const [isError, setIsError] = useState({show:"false", msg:""});
   const [query, setQuery] = useState("titanic");

    const getMovies = async (url) => {
        setIsLoading(true);
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setIsError({
                    show:false,
                    msg:"",
                });
                setMovie(data.Search);
            } else{
                setIsError({
                show: true,
                msg:data.Error,
                });
            }
        } catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        let timerOut = setTimeout(()=>{
            getMovies(`${API_URL}&s=${query}`);
        },1000);
        return () => clearTimeout(timerOut);
    },[query])
    return <AppContext.Provider value = {{isLoading,isError,movie,query,setQuery}}>{children}</AppContext.Provider>
};

//global custom hooks
const useGlobalContext = () =>{
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext};