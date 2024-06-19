import React, { useEffect, useState } from 'react';

const SearchBar=(props)=>{
    const {searchValue, setValue} = {...props};

    const [showCancel, setShowCancel] = useState(false);

    useEffect(() => {
        if(searchValue){
            setShowCancel(true);
        } else {
            setShowCancel(false);
        }
    }, [searchValue]);
    
    const handleChange=(event)=>{
        setValue(event.target.value);
    }

    const handleCancel = () => {
        setValue("");
    }

    return (
      <>
        <div className="col col-sm-4">
          <input
            className="form-control"
            value={searchValue}
            onChange={handleChange}
            placeholder="Type to Search..."
          />
        </div>
        {showCancel && (
          <button onClick={handleCancel} className="cancel-button">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-x-square"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                fill-rule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        )}
      </>
    );
};

export default SearchBar;