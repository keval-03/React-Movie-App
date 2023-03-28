import React from 'react';

const MovieList = (props)=>{
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
            {props.movies.map((m)=>(
                <div className='image-container d-flex justify-content-start m-3'>
					<img src={m.Poster} alt='movie'></img>
                    <div onClick={()=>props.handleFavouritesClick(m)} className='overlay d-flex align-items-center justify-content-center'>
                        <FavouriteComponent />
                    </div>
				</div>
            ))}
        </> 
    );
}

export default MovieList;