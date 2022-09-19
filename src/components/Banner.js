import React, { Component } from 'react';
import { movies } from './getMovies';

export default class Banner extends Component {
  render() {
    let movie = [...movies.results];
    // console.log(movie);
    return (
      <>
        {
          movie.length == 0 ? (<div className='addSpace'><div className="spinner-border text-danger spinner" role="status">              
                <span class="visually-hidden">Loading...</span>
          </div></div>) : (
            <div className="banner-card">
              <img src={`https://image.tmdb.org/t/p/original/${movie[0].backdrop_path}`} className="card-img-top banner-img" alt="..." />
              <div className="card-body banner-body" >
                <h5 className="card-title banner-title">{movie[0].original_title}</h5>
                <p className="card-text banner-text">{movie[0].overview}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
              </div>
            </div>
          )}
      </>
    )
  }
}
