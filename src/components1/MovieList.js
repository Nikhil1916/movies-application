import axios from 'axios';
import React, { useState, useEffect } from 'react';
function MovieList() {
    const [hover, setHover] = useState("");
    const [movies, setMovies] = useState([]);
    const [currPage, setPage] = useState(1);
    const [favMovies, setFavMovies] = useState([]);

    const handleEnter = (id) => {
        setHover(id);
    }
    const handleLeave = () => {
        setHover(false);
    }
    const nextPage = () => {
        setPage(currPage + 1)
    }

    const prevPage = () => {
        setPage(currPage > 0 ? currPage - 1 : 0)
    }

    async function fetchMovies() {
        const movies = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=163f277147e890372ca8152b7b8b6711&language=en-US&page=${currPage}`);
        setMovies([...movies.data.results])
    }

    const favMovieHandler = (obj = null) => {
        let moviesArr = JSON.parse(localStorage.getItem('favMovies')) || [];
        if (obj != null) {
            if (!moviesArr.find((movie) => movie.id == obj.id)) {
                moviesArr.push(obj);
            } else {
                moviesArr = moviesArr.filter((movieObj) => movieObj.id != obj.id)
            }
        }
        localStorage.setItem('favMovies', JSON.stringify(moviesArr));
        const movieIds = moviesArr.map((movieObj) => movieObj.id);
        setFavMovies([...movieIds])

    }
    useEffect(() => {
        fetchMovies();
        favMovieHandler();
    }, []);


    useEffect(() => {
        fetchMovies();
    }, [currPage]);

    const movieList = [...movies];
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
                                    <div className="movie-card card" onMouseEnter={() => { handleEnter(movieObj.id) }}
                                        onMouseLeave={() => { handleLeave(movieObj.id) }} key={movieObj.id}>
                                        <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} className="card-img-top movie-img" alt={movieObj.original_title} />
                                        <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                                        {
                                            hover == movieObj.id && <div className='button-wrapper'>
                                                <a className="btn btn-secondary movie-btn" onClick={() => { favMovieHandler(movieObj) }}>
                                                    {!favMovies.includes(movieObj.id) ? 'Add to Favourites' : 'Remove From Favourite'}
                                                </a>
                                            </div>
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                    <nav aria-label="Page navigation example" className='pagination'>
                        <ul className="pagination">
                            {currPage == 1 ? '' : <li className="page-item"><a className="page-link" onClick={prevPage}>Previous</a></li>}
                            <li className="page-item"><a className="page-link" >{currPage}</a></li>
                            <li className="page-item"><a className="page-link" onClick={nextPage} href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
                )
            }
        </div>
    )
}
export default MovieList;
