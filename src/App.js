import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/movieList';
import MovieListHeading from './components/movieListHeading';
import SearchBar from './components/searchBar';
import AddFavourites from './components/addFavourite';
import removeFavourites from './components/removeFavourites';

function App() {
  const [movies,setMovies]=useState([])
  const [searchValue,setSearchValue]=useState('');
  const [favourites,setFavourites]=useState([]);

  const getMovies=async()=>{
    const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=a52b551`;

    const res=await fetch(url);
    const resJson=await res.json();

    // console.log(resJson);
    if(resJson.Search){
      setMovies(resJson.Search);
    }
  }

  useEffect(()=>{
    getMovies();
  },[searchValue]);

  useEffect(()=>{
    const moviesFav=JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    setFavourites(moviesFav)
  },[]);

  const saveToLocalStorage=(items)=>{
    localStorage.setItem('react-movie-app-favourites',JSON.stringify(items));
  }

  const addFavouriteMovie=(movie)=>{
    const newFavouriteList=[...favourites,movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList)
  }

  const removedFavouriteMovie=(movie)=>{
    const newFavouriteList=favourites.filter((fm)=>{
      return fm.imdbID !== movie.imdbID
    })

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList)
  }
  
  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBar searchValue={searchValue} setValue={setSearchValue} />
      </div>
			<div className='row'>
        <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites}/>
			</div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
        <MovieList movies={favourites} handleFavouritesClick={removedFavouriteMovie} favouriteComponent={removeFavourites}/>
			</div>
		</div>
  );
}

export default App;
