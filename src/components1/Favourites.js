import React, { Component, useState, useEffect } from "react";

const Favourites = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [currentGenre, setCurrGenre] = useState("All Genre");
  const [searchMovie, setSearchMovie] = useState("");
  const [movieLimit, setMovieLimit] = useState(5);
  const [currPage, setCurrPage] = useState(1);

  const genreId = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  function deleteHandler(idx, id) {
    let movieList = movies.filter((movies, index) => {
      return idx != index;
    });
    let favMovies = JSON.parse(localStorage.getItem('favMovies'));
    favMovies = favMovies.filter((movieObj) => {
      return movieObj.id != id;
    })

    localStorage.setItem('favMovies', JSON.stringify(favMovies));
    let allGenre = [];
    favMovies.forEach((movieObj) => {
      let genre_ids = movieObj.genre_ids[0];
      if (genre_ids in genreId) {
        if (!allGenre?.find((res) => res == genreId[genre_ids])) {
          allGenre.push(genreId[genre_ids]);
        }
      }
    })
    // movies.data.results.reduce(()) write later with reduce currently checking...
    allGenre.unshift('All Genre');
    setMovies([...movieList]);
    setGenre([...allGenre]);
    let alertHandler = document.querySelector(".popup");
    alertHandler.style.display = "flex";
    setTimeout(() => {
      alertHandler.style.display = "none";
    }, 2000);

  }

  const sortPopularity = (type) => {
    const allMovies = [...movies];
    if (type == 'asc') {
      allMovies.sort((a, b) => {
        return a.popularity - b.popularity;
      })
    } else {
      allMovies.sort((a, b) => {
        return b.popularity - a.popularity;
      })
    }
    setMovies([...allMovies]);
  }

  const sortRating = (type) => {
    const allMovies = [...movies];
    if (type == 'asc') {
      allMovies.sort((a, b) => {
        return a.vote_average - b.vote_average;
      })
    } else {
      allMovies.sort((a, b) => {
        return b.vote_average - a.vote_average;
      })
    }
    setMovies([...allMovies])
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleGenre = (event) => {
    const currentGenre = event.target.innerHTML;
    setCurrGenre(currentGenre);
    setCurrPage(1);
  }

  async function fetchMovies() {
    let movies = JSON.parse(localStorage.getItem('favMovies'));
    let allGenre = [];
    movies.forEach((movieObj) => {
      let genre_ids = movieObj.genre_ids[0];
      if (genre_ids in genreId) {
        if (!allGenre?.find((res) => res == genreId[genre_ids])) {
          allGenre.push(genreId[genre_ids]);
        }
      }
    })
    // movies.data.results.reduce(()) // try reduce method instead of this
    allGenre.unshift('All Genre');
    setMovies([...movies]);
    setGenre([...allGenre]);
  }

  function searchMovies(e) {
    setSearchMovie(e.target.value);
    setCurrPage(1);
  }

  const pageHandler = (e) => {
    let num = parseInt(Number(e.target.value));
    if (num == null || num.length == 0 || parseInt(num) <= 0) {
      // num="";
      let alertHandler = document.querySelector(".movie-limit");
      alertHandler.style.display = "flex";
      setTimeout(() => {
        alertHandler.style.display = "none";
      }, 4000);
    }

    setMovieLimit(num > 0 ? num : "");
    setCurrPage(1);
  }

  let Filteredmovies = [...movies];
  if (currentGenre != 'All Genre') {
    Filteredmovies = Filteredmovies.filter((movieObj) => {
      return genreId[movieObj.genre_ids[0]] == currentGenre;
    });
  }
  if (searchMovie != '') {
    Filteredmovies = Filteredmovies.filter((movieObj) => {
      return movieObj.original_title.toLowerCase().includes(searchMovie.toLowerCase());
    });
  }
  const movieMaxLimit = parseInt(movieLimit) > 0 ? parseInt(movieLimit) : 1;
  const totalPages = Math.ceil(Filteredmovies.length / movieMaxLimit);
  const pagesArr = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesArr.push(i);
  }
  const si = (currPage - 1) * movieMaxLimit; //start index
  const ei = si + movieMaxLimit; //end index
  Filteredmovies = Filteredmovies.slice(si, ei);
  return (
    <div>
      <div className="alert-box popup">
        <span>A Favourite movie entry was deleted.</span>
      </div>
      <div className="alert-box movie-limit">
        <span>The minimum limit can be 1.</span>
      </div>
      <div className="row favouritesContainer">
        <div className="col-sm-3 col-xs-12">
          <ul className="list-group">
            {
              genre.map((genre, index) => {
                return (

                  currentGenre == genre ? <li
                    href="#"
                    className="list-group-item active" key={index}
                  >
                    {genre}
                  </li> :
                    <li
                      href="#"
                      className="list-group-item"
                      onClick={handleGenre} key={index}
                    >
                      {genre}
                    </li>
                )
              })
            }
          </ul>
        </div>
        <div className="col-sm-1 col-xs-12"></div>
        <div className="col-sm-7 col-xs-12">
          <div className="inputsContainer">
            <input type="text" className="form-control" placeholder="Search" value={searchMovie} onChange={(e) => {
              searchMovies(e)
            }} />
            <input type="number" className="form-control" value={movieLimit} placeholder="Results Per Page" onChange={(e) => {
              pageHandler(e);
            }} />
          </div>
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Index</th>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">
                  <i className="fa-solid fa-sort-up cursor-pointer" onClick={() => { sortPopularity('asc') }} />
                  Popularity
                  <i className="fa-solid fa-sort-down cursor-pointer" onClick={() => { sortPopularity('desc') }}></i>
                </th>
                <th scope="col">
                  <i className="fa-solid fa-sort-up cursor-pointer" onClick={() => { sortRating('asc') }}></i>
                  Rating
                  <i className="fa-solid fa-sort-down cursor-pointer" onClick={() => { sortRating('desc') }}></i>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Filteredmovies.map((movieObj, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <img
                        style={{ width: "8rem" }}
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                      />
                      {movieObj.original_title}
                    </td>
                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{movieObj.vote_average}</td>
                    <td>
                      <button className="btn btn-outline-danger"
                        onClick={() => { deleteHandler(index, movieObj.id) }} >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {
                pagesArr.map((pageNum, index) => {
                  return (
                    currPage == pageNum ? <li className="page-item active" key={index}><a className="page-link" href="#" onClick={
                      () => { setCurrPage(pageNum) }
                    }>{pageNum}</a></li> : <li className="page-item" key={index}><a className="page-link" href="#" onClick={
                      () => { setCurrPage(pageNum) }
                    }>{pageNum}</a></li>
                  )
                })
              }
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default Favourites;

