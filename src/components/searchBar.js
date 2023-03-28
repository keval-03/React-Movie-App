import React from 'react';

const SearchBar=(props)=>{
    
    const handleChange=(event)=>{
        props.setValue(event.target.value);
    }

    return (
        <div className='col col-sm-4'>
            <input className='form-control'
            value={props.searchValue}
            onChange={handleChange}
            placeholder='Type to Search...'
            />
        </div>
    );
};

export default SearchBar;