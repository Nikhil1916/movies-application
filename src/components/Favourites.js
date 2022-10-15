import React, { Component } from "react";

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre: [],
      currentGenre: 'All Genre',
      searchMovie: '',
      movieLimit: 5,
      currPage: 1
    };

    this.genreId = {
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
  }
  deleteHandler(idx, id) {
    let movies = this.state.movies.filter((movies, index) => {
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
      if (genre_ids in this.genreId) {
        if (!allGenre?.find((res) => res == this.genreId[genre_ids])) {
          allGenre.push(this.genreId[genre_ids]);
        }
      }
    })
    // movies.data.results.reduce(()) write later with reduce currently checking...
    allGenre.unshift('All Genre');
    this.setState({
      movies: [...movies],
      genre: [...allGenre]
    });
    let alertHandler = document.querySelector(".popup");
    alertHandler.style.display = "flex";
    setTimeout(() => {
      alertHandler.style.display = "none";
    }, 2000);

  }

  sortPopularity = (type) => {
    let allMovies = [...this.state.movies];
    if (type == 'asc') {
      allMovies.sort((a, b) => {
        return a.popularity - b.popularity;
      })
    } else {
      allMovies.sort((a, b) => {
        return b.popularity - a.popularity;
      })
    }
    this.setState({
      movies: [...allMovies]
    })
  }

  sortRating = (type) => {
    let allMovies = [...this.state.movies];
    if (type == 'asc') {
      allMovies.sort((a, b) => {
        return a.vote_average - b.vote_average;
      })
    } else {
      allMovies.sort((a, b) => {
        return b.vote_average - a.vote_average;
      })
    }
    this.setState({
      movies: [...allMovies]
    })
  }

  render() {
    let Filteredmovies = [...this.state.movies];
    if (this.state.currentGenre != 'All Genre') {
      Filteredmovies = Filteredmovies.filter((movieObj) => {
        return this.genreId[movieObj.genre_ids[0]] == this.state.currentGenre;
      });
    }
    if (this.state.searchMovie != '') {
      Filteredmovies = Filteredmovies.filter((movieObj) => {
        return movieObj.original_title.toLowerCase().includes(this.state.searchMovie.toLowerCase());
      });
    }
    const movieLimit = parseInt(this.state.movieLimit) > 0 ? parseInt(this.state.movieLimit) : 1;
    const totalPages = Math.ceil(Filteredmovies.length / movieLimit);
    const pagesArr = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArr.push(i);
    }
    const si = (this.state.currPage - 1) * movieLimit; //start index
    const ei = si + movieLimit; //end index
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
                this.state.genre.map((genre, index) => {
                  return (

                    this.state.currentGenre == genre ? <li
                      href="#"
                      className="list-group-item active" key={index}
                    >
                      {genre}
                    </li> :
                      <li
                        href="#"
                        className="list-group-item"
                        onClick={this.handleGenre} key={index}
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
              <input type="text" className="form-control" placeholder="Search" value={this.state.searchMovie} onChange={(e) => {
                this.searchMovies(e)
              }} />
              <input type="number" className="form-control" value={this.state.movieLimit} placeholder="Results Per Page" onChange={(e) => {
                this.pageHandler(e);
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
                    <i className="fa-solid fa-sort-up cursor-pointer" onClick={() => { this.sortPopularity('asc') }} />
                    Popularity
                    <i className="fa-solid fa-sort-down cursor-pointer" onClick={() => { this.sortPopularity('desc') }}></i>
                  </th>
                  <th scope="col">
                    <i className="fa-solid fa-sort-up cursor-pointer" onClick={() => { this.sortRating('asc') }}></i>
                    Rating
                    <i className="fa-solid fa-sort-down cursor-pointer" onClick={() => { this.sortRating('desc') }}></i>
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
                      <td>{this.genreId[movieObj.genre_ids[0]]}</td>
                      <td>{movieObj.popularity}</td>
                      <td>{movieObj.vote_average}</td>
                      <td>
                        <button className="btn btn-outline-danger"
                          onClick={() => { this.deleteHandler(index, movieObj.id) }} >
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
                      this.state.currPage == pageNum ? <li className="page-item active" key={index}><a className="page-link" href="#" onClick={
                        () => { this.setState({ currPage: pageNum }) }
                      }>{pageNum}</a></li> : <li className="page-item" key={index}><a className="page-link" href="#" onClick={
                        () => { this.setState({ currPage: pageNum }) }
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
  componentDidMount() {
    this.fetchMovies();
  }
  handleGenre = (event) => {
    let currentGenre = event.target.innerHTML;
    this.setState({
      currentGenre: currentGenre,
      currPage: 1
    });
  }

  async fetchMovies() {
    let movies = JSON.parse(localStorage.getItem('favMovies'));
    let allGenre = [];
    movies.forEach((movieObj) => {
      let genre_ids = movieObj.genre_ids[0];
      if (genre_ids in this.genreId) {
        if (!allGenre?.find((res) => res == this.genreId[genre_ids])) {
          allGenre.push(this.genreId[genre_ids]);
        }
      }
    })
    // movies.data.results.reduce(()) // try reduce method instead of this
    allGenre.unshift('All Genre');
    this.setState({
      movies: [...movies],
      genre: [...allGenre]
    });
  }

  searchMovies(e) {
    this.setState({
      searchMovie: e.target.value,
      currPage: 1
    })
  }

  pageHandler = (e) => {
    let num = parseInt(Number(e.target.value));
    if (num == null || num.length == 0 || parseInt(num) <= 0) {
      // num = 1; //to make limit to 1 if getting 0 
      let alertHandler = document.querySelector(".movie-limit");
      alertHandler.style.display = "flex";
      setTimeout(() => {
        alertHandler.style.display = "none";
      }, 4000);
    }
    this.setState({
      movieLimit: num,
      currPage: 1
    })
  }

  // nextPage = () => {
  //   this.setState({
  //     currPage: this.state.currPage + 1
  //   })
  // }

  // prevPage = () => {
  //   this.setState({
  //     currPage: this.state.currPage > 0 ? this.state.currPage - 1 : 0
  //   })
  // }
}
