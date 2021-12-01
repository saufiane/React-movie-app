import React from 'react';

// constante de la barre de recherche avec ses objets props
const SearchBox = (props) => {
    return (
    <div className= 'col col-sm 4'>
       <input className='form-control'
        //valeurs des objets props
       value={props.value}
    // récupération des clés & valeurs sur la barre de recherche
       onChange ={(event)=> props.setSearchValue(event.target.value)}
       placeholder="Type to search..."></input>  
   </div>
      
    )
}

export default SearchBox;