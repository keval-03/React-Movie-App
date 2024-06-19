import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/movieList';
import MovieListHeading from './components/movieListHeading';
import SearchBar from './components/searchBar';
import AddFavourites from './components/addFavourite';
import removeFavourites from './components/removeFavourites';
import { getMovies } from './services/api_calls';

function App() {
  const [movies,setMovies]=useState([])
  const [searchValue,setSearchValue]=useState('');
  const [favourites,setFavourites]=useState([]);

  useEffect(()=>{
    if(searchValue){
      getMovies(searchValue, setMovies);
    } else {
      setMovies([]);
    }
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
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBar searchValue={searchValue} setValue={setSearchValue} />
      </div>
      <div className="row">
        {searchValue && !movies.length && (
          <p className="empty-list">Sorry! No such movie found :(</p>
        )}
        {!searchValue && !movies.length && (
          <p className="empty-list">Search Movies...</p>
        )}
        {movies.length > 0 && (
          <MovieList
            movies={movies}
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={AddFavourites}
          />
        )}
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        {favourites.length === 0 && (
          <p className="empty-list">No Favourite Movies!!</p>
        )}
        {favourites.length > 0 && (
          <MovieList
            movies={favourites}
            handleFavouritesClick={removedFavouriteMovie}
            favouriteComponent={removeFavourites}
          />
        )}
      </div>
    </div>
  );
}

export default App;
