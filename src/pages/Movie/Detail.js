import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GetDetailMovie from '../../utils/networks/GetDetailMovies';
import styled from 'styled-components';

const Detail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [genres, setGenres] = useState([]);

    const url_image = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;

    const getDetail = async (id) => {
        const data = await GetDetailMovie(id);
        setMovie(data);
        setGenres(data.genres);
    };

    useEffect(() => {
        getDetail(id);
    }, [id]);

    return (
        <StyledDetail>
            <div className="movie-card">
                <img className="movie-image" src={url_image} alt='' />
                <div className="details">
                    <h1 className="movie-title">{movie.title}</h1>
                    <div className="genre-list">
                        {genres.map((item) => (
                            <p key={item.id} className="genre">{item.name}</p>
                        ))}
                    </div>
                    <h3 className="movie-tagline">{movie.tagline}</h3>
                    <p className="movie-description">{movie.overview}</p>
                    <Link to="/">
                        <button className="back-button">Back to Home</button>
                    </Link>
                </div>
            </div>
        </StyledDetail>
    );
};

const StyledDetail = styled.div`
    font-family: 'Homoarakhn', sans-serif;
    background-color: #f0f0f0;
    color: #333;
    margin: 0;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    .movie-card {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        display: flex;
        flex-direction: row; /* Image on the left on larger screens */
        max-width: 800px;
        width: 100%;
        text-align: center;
    }

    .movie-image {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        margin-right: 1.5rem; /* Adjusted margin-right for space between image and text */
    }

    .details {
        text-align: left;
        flex-grow: 1;
    }

    .movie-title {
        font-size: 2rem;
        color: #4361ee;
        margin-bottom: 1rem;
    }

    .genre-list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }

    .genre {
        background-color: #4361ee;
        color: #fff;
        padding: 8px 16px;
        margin: 0 4px 4px 0;
        border-radius: 5px;
    }

    .movie-tagline {
        font-size: 1.2rem;
        color: #64748b;
        margin-bottom: 1rem;
    }

    .movie-description {
        font-size: 1rem;
        color: #333;
        margin-bottom: 1.5rem;
        text-align: left;
    }

    .back-button {
        background-color: #800000;
        color: #fff;
        padding: 0.8rem 1.5rem;
        margin-top: 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        transition: background-color 0.3s ease;
    }

    .back-button:hover {
        background-color: #600000;
    }

    @media (max-width: 768px) {
        .movie-card {
            flex-direction: column; /* Image on top on smaller screens */
        }
        .movie-image {
            margin-right: 0; /* No margin on smaller screens */
            margin-bottom: 1.5rem; /* Adjusted margin-bottom for space between image and text */
        }
    }
`;

export default Detail;
