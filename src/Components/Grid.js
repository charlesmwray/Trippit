import React from 'react';

const Grid = (props) => {
    const showDetails = (id) => {
        props.showDetails(id);
    }
    const tableBody = props.data.map( (trip, i) => {
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
            <tr key={i} onClick={(e) => { showDetails(trip.id) }}>
                <td>{trip.title}</td>
                <td>{trip.destination}</td>
                <td>{getDuration()}</td>
                <td>{trip.category}</td>
                <td>{getItemsStatus()}</td>
                <td>{trip.planningState} </td>
            </tr>
        )
    });
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Destination</th>
                    <th>Duration</th>
                    <th>Category</th>
                    <th>Items needed/complete</th>
                    <th>Planning State</th>
                </tr>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </table>
    )
}

export default Grid;
