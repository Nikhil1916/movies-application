import React, { Component } from 'react';
import { movies } from './getMovies';

export default class MovieList extends Component {
    constructor(){
        super();
        this.state={
            hover:''
        }
    }
    handleEnter=(id)=>{

        this.setState({
            hover:id
        })
    }
    handleLeave=()=>{
        this.setState({
            hover:false
        })
    }
    render() {
        let movieList = movies.results;
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', textDecoration: 'underline' }}>
                    <h2 className='display-3'>TRENDING!!</h2>
                </div>
                {movieList.length == 0 ? (<div className="spinner-border text-danger spinner" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>) :
                    (<div>
                        <div className='movie-list'>
                            {
                                movieList.map((movieObj) => {
                                    return (
                                        <div className="movie-card card" onMouseEnter={()=>{this.handleEnter(movieObj.id)}}
                                         onMouseLeave={()=>{this.handleLeave(movieObj.id)}} key={movieObj.id}>
                                            <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..." />
                                            <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                                            {
                                                this.state.hover==movieObj.id && <div className='button-wrapper'><a href="#" className="btn btn-secondary movie-btn">Add to Favourites</a></div> 
                                            }
                                            
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>)
                }
                <nav aria-label="Page navigation example" className='pagination'>
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}
