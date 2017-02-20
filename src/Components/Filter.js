import React from 'react';

const Filter = (props) => {
    const search = (e) => {
        e.preventDefault();
        props.search(e.target.search.value);
    }
    const filter = (e) => {
        e.preventDefault();
        props.filter(e.target.value);
    }
    return (
        <div className="filter-container">
            <form onSubmit={ (e) => { search(e) } }>
                <input type="text" id="search" />
                <button className="btn" type="submit">Search</button>
                <button className="btn" type="reset" onClick={ props.resetSearch }>Reset</button>
            </form>
            <h4>Filter</h4>
            <select onChange={ (e) => { filter(e) } } defaultValue="select">
                <option disabled value="select">-- Select</option>
                <option value="None">None</option>
                <option value="Business Trip">Business Trip</option>
                <option value="Vacation">Vacation</option>
            </select>
            <button className="btn" onClick={ props.createNewTrip }>New Trip</button>
            <h4>Dev</h4>
            <button className="btn" onClick={ props.resetData }>Reset</button>
        </div>
    );
}

export default Filter;
