import React, { Component } from 'react';
import { movies } from './getMovies';

export default class MovieList extends Component {
    render() {
        let movieList = movies.results;
        return (
            <div>
            <div style={{display:'flex',justifyContent:'center',marginTop:'2rem',textDecoration:'underline'}}>
                <h2 className='display-3'>TRENDING!!</h2>
                </div>
                <div className='movie-list'>
                {
                    movieList.map((movieObj)=>{
                        return (
                            <div className="movie-card card">
                        <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..." />
                        <div className="card-body movie-body" >
                            <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                            {/* <p className="card-text movie-text">{movie.overview}</p> */}
                            <div className='button-wrapper'><a href="#" className="btn btn-primary movie-btn">Add to Favourites</a></div>
                        </div>
                    </div>
                        );
                    })
                }   
                </div>
            </div>
        )
    }
}
