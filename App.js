

import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
// import SearchIcon from'./search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=eac3310b';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            console.log(data.Search);
            setMovies(data.Search);  // Correct the case here
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        searchMovies(searchTerm);
    }, [searchTerm]);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => searchMovies(searchTerm)}>Search</button>
            </div>

            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
};

export default App;
