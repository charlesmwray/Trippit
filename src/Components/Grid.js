import React from 'react';

const Grid = (props) => {
    const showDetails = (id) => {
        props.showDetails(id);
    }
    const items = props.data.map( (trip, i) => {
        const getDuration = () => {
            const startDate = trip.startDate;
            const endDate = trip.endDate;
            const duration = Math.abs( new Date(startDate) - new Date(endDate) ) / ( 1000 * 3600 * 24 );
            return  <span>{duration} days</span>;
        }
        const getItemsStatus = () => {
            var complete = 0;
            trip.todos.forEach( (todo) => {
                if (todo.complete) {
                    complete++
                }
            })
            return <span>{complete} / {trip.todos.length}</span>
        }
        return (
            <li className="list-group-item grid-item" key={i}>
                <a className="link" href="#" onClick={(e) => { showDetails(trip.id) }}>
                    <h3>{trip.title}</h3>
                    <div><span className="label">Destination</span>{trip.destination}</div>
                    <div><span className="label">Duration</span>{getDuration()}</div>
                    <div><span className="label">Category</span>{trip.category}</div>
                    <div><span className="label">Items Needed/Complete</span>{getItemsStatus()}</div>
                    <div><span className="label">Status</span>{trip.planningState} </div>
                </a>
            </li>
        )
    });
    return (
        <div className="grid-container">
            <h2>Trips</h2>
            <ul className="list-group">
                {items}
            </ul>
        </div>
    )
}

export default Grid;
