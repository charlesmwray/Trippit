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
            <div className="filter-item search form-group">
                <h4>Search</h4>
                <form onSubmit={ (e) => { search(e) } }>
                    <input className="form-control search" type="text" id="search" />
                    <button className="btn btn-default first" type="submit">Search</button>
                    <button className="btn btn-danger" type="reset" onClick={ props.resetSearch }>Reset</button>
                </form>
            </div>
            <div className="filter-item form-group">
                <h4>Filter</h4>
                <select className="form-control" onChange={ (e) => { filter(e) } } defaultValue="select">
                    <option disabled value="select">-- Select</option>
                    <option value="None">None</option>
                    <option value="Business Trip">Business Trip</option>
                    <option value="Vacation">Vacation</option>
                </select>
            </div>
            <div className="filter-item">
                <h4>Create</h4>
                <button className="btn btn-default" onClick={ props.createNewTrip }>New Trip</button>
            </div>
        </div>
    );
}

export default Filter;
