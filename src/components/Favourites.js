import React, { Component } from "react";
import axios from "axios";

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre:[],
      currentGenre:'All Genre',
      searchMovie:''
    };
    // this.movieGenre=[];
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
  deleteHandler(idx,id) {
    console.log(id);
    let movies = this.state.movies.filter((movies, index) => {
      return idx != index;
    });
    let favMovies=JSON.parse(localStorage.getItem('favMovies'));
    favMovies=favMovies.filter((movieObj)=>{
      return movieObj.id!=id;
    })
    console.log(favMovies);
    localStorage.setItem('favMovies',JSON.stringify(favMovies));
    let allGenre=[]
    favMovies.forEach((movieObj)=>{
      let genre_ids=movieObj.genre_ids[0];
      if(genre_ids in this.genreId){
          if(!allGenre?.find((res)=>res==this.genreId[genre_ids])){
            allGenre.push(this.genreId[genre_ids]);
          }
      }
    })
    // movies.data.results.reduce(())
    allGenre.unshift('All Genre');
    this.setState({
      movies: [...movies],
      genre: [...allGenre]
    });
    this.setState({
      movies: [...movies],
    });
    let alertHandler = document.querySelector(".popup");
    // console.log(alertHandler.sty);
    alertHandler.style.display = "flex";
    setTimeout(() => {
      alertHandler.style.display = "none";
    }, 2000);
    
  }
  render() {
    let Filteredmovies=[...this.state.movies];
    if(this.state.currentGenre!='All Genre')
    Filteredmovies= Filteredmovies.filter((movieObj)=>{
      console.log(movieObj);
      return this.genreId[movieObj.genre_ids[0]]==this.state.currentGenre;
    });
    if(this.state.searchMovie!=''){
      Filteredmovies= Filteredmovies.filter((movieObj)=>{
        console.log(movieObj);
        return movieObj.original_title.toLowerCase().includes(this.state.searchMovie.toLowerCase());
      });
    }
    return (
      <div>
        <div className="popup">
          <span>A Favourite movie entry was deleted.</span>
        </div>
        <div className="row favouritesContainer">
          <div className="col-sm-3 col-xs-12">
          <ul className="list-group">
          {
            this.state.genre.map((genre,index)=>{
             return (
  
             this.state.currentGenre==genre ?  <li
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
              <input type="text" className="form-control" placeholder="Search"  onChange={(e)=>{
                this.searchMovies(e)
              }} />
              <input type="number" className="form-control" placeholder="Results Per Page" />
            </div>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Popularity</th>
                  <th scope="col">Rating</th>
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
                          onClick={() => { this.deleteHandler(index,movieObj.id) }} >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.fetchMovies();
  }
  handleGenre=(event)=>{
    // console.log(event);
    let currentGenre=event.target.innerHTML;
    this.setState({
      currentGenre:currentGenre,
    });
  }

  async fetchMovies() {
    // let movies = await axios.get(
    //   `https://api.themoviedb.org/3/movie/popular?api_key=163f277147e890372ca8152b7b8b6711&language=en-US&page=${this.state.currPage}`
    // );
    // console.log(movies);
    let movies=JSON.parse(localStorage.getItem('favMovies'));
    let allGenre=[]
    movies.forEach((movieObj)=>{
      let genre_ids=movieObj.genre_ids[0];
      if(genre_ids in this.genreId){
          if(!allGenre?.find((res)=>res==this.genreId[genre_ids])){
            allGenre.push(this.genreId[genre_ids]);
          }
      }
    })
    // movies.data.results.reduce(())
    allGenre.unshift('All Genre');
    this.setState({
      movies: [...movies],
      genre: [...allGenre]
    });
    // console.log(allGenre);
  }

  searchMovies(e){
    // console.log(this,e.target.value);
    this.setState({
      searchMovie:e.target.value
    })
  }
}
