import React from 'react';

const Grid = (props) => {
    const showDetails = (id) => {
        props.showDetails(id);
    }
    const items = props.data.map( (trip, i) => {
        const makeGridClasses = () => {
            // TODO: This should be refactored.
            if ( props.selectedTrip ) {
                if ( props.selectedTrip.id === trip.id ) {
                    return "list-group-item grid-item active";
                } else {
                    return "list-group-item grid-item";
                }
            } else {
                return "list-group-item grid-item";
            }
        }
        const getDuration = () => {
            // Parses dates to get duration of trip
            const startDate = trip.startDate;
            const endDate = trip.endDate;
            const duration = Math.abs( new Date(startDate) - new Date(endDate) ) / ( 1000 * 3600 * 24 );
            return  <span>{duration} days</span>;
        }
        const getItemsStatus = () => {
            // Parses todos to get number completed and total
            var complete = 0;
            trip.todos.forEach( (todo) => {
                if (todo.complete) {
                    complete++
                }
            })
            return <span>{complete} / {trip.todos.length}</span>
        }
        return (
            <li className={ makeGridClasses() } key={ i }>
                <a className="link" href="#" onClick={(e) => { showDetails(trip.id) }}>
                    { trip.reminder && <span className="glyphicon glyphicon-bell pull-right"></span> }
                    <h3>{trip.title}</h3>
                    <div><span className="label">Destination</span>{ trip.destination }</div>
                    <div><span className="label">Duration</span>{ getDuration() }</div>
                    <div><span className="label">Category</span>{ trip.category }</div>
                    <div><span className="label">Items Needed/Complete</span>{ getItemsStatus() }</div>
                    <div><span className="label">Status</span>{ trip.planningState }</div>
                </a>
            </li>
        )
    });
    return (
        <div className="grid-container">
            <ul className="list-group">
                {items}
            </ul>
        </div>
    )
}

export default Grid;
