export const getMovies = async (searchText, setMovieList) => {
  const url = `http://www.omdbapi.com/?s=${searchText}&apikey=a52b551`;

  const res = await fetch(url);
  const resJson = await res.json();

  // console.log(resJson);
  if (resJson.Search) {
    setMovieList(resJson.Search);
  }
};
