import React from 'react';

// constante pour les films en tete d'affiche avec le titre et ses objets (props)
const MovieListHeading = (props) => {
    return (
        <div className='col'>
            <h1>{props.heading}</h1>
        </div>
    )
}

export default MovieListHeading;