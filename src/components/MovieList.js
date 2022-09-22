import axios from 'axios';
import React, { Component } from 'react';

export default class MovieList extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            movies: [],
            currPage:1
        }
        this.pageNo=1;
    }
    handleEnter = (id) => {
        this.setState({
            hover: id
        })
    }
    handleLeave = () => {
        this.setState({
            hover: false
        })
    }
    nextPage=()=>{
        this.pageNo=this.state.currPage;
        this.setState({
            currPage:this.state.currPage+1
        },this.fetchMovies)
    }

    prevPage=()=>{
        this.pageNo=this.state.currPage;
        this.setState({
            currPage:this.state.currPage > 0 ? this.state.currPage-1 : 0
        },this.fetchMovies)
    }

    // componentDidUpdate(prevState){
    //     console.log(this.state.currPage,this.pageNo);
    //     if(this.state.currPage!=this.pageNo){
    //         console.log('pageChange');
    //         this.pageNo=this.state.currPage;
    //         this.fetchMovies();
    //     }
    // }
     componentDidMount() {
        this.fetchMovies();
    }

    async fetchMovies(){
        let movies = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=163f277147e890372ca8152b7b8b6711&language=en-US&page=${this.state.currPage}`);     
        this.setState({
            movies: [...movies.data.results]
        })
    }
    render() {
        // console.log('update render');
        const movieList = [...this.state.movies];
        return (
            <div>
                {movieList.length == 0 ? (<div className="spinner-border text-danger spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>) :
                    (<div>
                        <div>
                            <h2 style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', textDecoration: 'underline' }} className='display-3'>TRENDING!!</h2>
                        </div>
                        <div className='movie-list'>
                            {
                                movieList.map((movieObj) => {
                                    return (
                                        <div className="movie-card card" onMouseEnter={() => { this.handleEnter(movieObj.id) }}
                                            onMouseLeave={() => { this.handleLeave(movieObj.id) }} key={movieObj.id}>
                                            <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..." />
                                            <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                                            {
                                                this.state.hover == movieObj.id && <div className='button-wrapper'><a href="#" className="btn btn-secondary movie-btn">Add to Favourites</a></div>
                                            }

                                        </div>
                                    );
                                })
                            }
                        </div>
                        <nav aria-label="Page navigation example" className='pagination'>
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link"  onClick={this.prevPage}>Previous</a></li>
                        <li className="page-item"><a className="page-link" >{this.state.currPage}</a></li>
                        <li className="page-item"><a className="page-link"  onClick={this.nextPage} href="#">Next</a></li>
                    </ul>
                </nav>
                    </div>
                    )
                }
            </div>
        )
    }
}
