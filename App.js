// importation des hooks useState et useEffect depuis react
import React, { useState, useEffect } from 'react';
// importation de bootstrap pour app.js
import 'bootstrap/dist/css/bootstrap.min.css';
// css app.js
import './App.css';
// importation de la movielist dans le dossier components
import MovieList from './components/MovieList';
// importation de la movielist des films en-tete d'affiche
import MovieListHeading from './components/MovieListHeading';
// importation de la SearchBox (barre de recherche)
import SearchBox from './components/SearchBox';
// importation et ajout des favoris
import AddFavourites from './components/AddFavourites';
// importation de la suppression des favoris
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
    // constante pour les films dans un hook et un tableau
	const [movies, setMovies] = useState([]);
    // constante pour les films en favoris dans un hook et un tableau
	const [favourites, setFavourites] = useState([]);
    // constante la recherche de films
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
        // url permettant l'affiche des films avec une api
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

        // réponse de la constante avec l'url en fetch et l'opérateur await
		const response = await fetch(url);
        // reponse en Json  et l'opérateur await permettant d'attendre celle-ci avec sa résolution
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
                
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
