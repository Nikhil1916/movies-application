import axios from 'axios';
import React, { Component } from 'react';

export default class Banner extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }
  async componentDidMount() {
    let movies = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=163f277147e890372ca8152b7b8b6711&language=en-US&page=1');
    this.setState({
      movies: [...movies.data.results]
    })
  }
  render() {
    let movie = [...this.state.movies];
    return (
      <>
        {
          movie.length == 0 ? (<div className='addSpace'><div className="spinner-border text-danger spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div></div>) : (
            <div className="banner-card">
              <img src={`https://image.tmdb.org/t/p/original/${movie[0].backdrop_path}`} className="card-img-top banner-img" alt="..." />
              <div className="card-body banner-body" >
                <h5 className="card-title banner-title">{movie[0].original_title}</h5>
                <p className="card-text banner-text">{movie[0].overview}</p>
              </div>
            </div>
          )}
      </>
    )
  }
}
