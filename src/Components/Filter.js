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
            <div className="filter-section">
                <form onSubmit={ (e) => { search(e) } }>
                    <input className="form-control search" type="text" id="search" />
                    <button className="btn btn-primary first" type="submit">Search</button>
                    <button className="btn btn-default" type="reset" onClick={ props.resetSearch }>Reset</button>
                </form>
            </div>
            <div className="filter-section">
                <label>Filter</label>
                <select className="form-control filter" onChange={ (e) => { filter(e) } }>
                    <option value="None">None</option>
                    <option value="Business Trip">Business Trip</option>
                    <option value="Vacation">Vacation</option>
                </select>
            </div>
            <div className="filter-section pull-right">
                <button className="btn btn-default" onClick={ props.createNewTrip }>Create New Trip</button>
            </div>
        </div>
    );
}

export default Filter;
