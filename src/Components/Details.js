import React from 'react';

import Datepicker from './Datepicker';
import CreateReminder from './CreateReminder';

const Details = (props) => {
    const saveTrip = (e) => {
        e.preventDefault();
        console.log();

        const saveData = {
            id: props.trip.id ? props.trip.id : Math.floor(100000 + Math.random() * 900000).toString(),
            title: e.target.Title.value,
            destination: e.target.City.value,
            description: e.target.Description.value,
            category: e.target.category.value,
            startDate: e.target.startInputDatepicker.value,
            endDate: e.target.endInputDatepicker.value,
            todos: props.trip.newTrip ? [''] : props.trip.todos,
            planningState: props.trip.newTrip ? 'Created' : props.trip.planningState
        }
        props.saveTrip(saveData);
    }
    const deleteTrip = (e, id) => {
        e.preventDefault();
        props.deleteTrip(id);
    }
    const options = props.categories.map( (option, i) => {
        return (
            <option key={i}>{option}</option>
        )
    });
    const parseTodos = (id) => {
        var count = 0;
        for (var i = 0; i < props.trip.todos.length; i++) {
            if (props.trip.todos[i].complete) {
                count++;
            }
        }
        if (count == props.trip.todos.length) {
            props.setPlanningState(id, 'Ready');
        } else if (count < props.trip.todos.length && count > 0) {
            props.setPlanningState(id, 'In Progress');
        } else if (count == 0) {
            props.setPlanningState(id, 'Created');
        }
    }
    const todos = props.trip.todos.map( (todo, i) => {
        const handleOnChange = (e, type) => {
            switch (type) {
                case 'update':
                    props.updateTodo('update', props.trip.id, todo.id, e.target.checked);
                    parseTodos(props.trip.id);
                    break;
                case 'delete':
                    props.updateTodo('delete', props.trip.id, todo.id);
                    parseTodos(props.trip.id);
                    break;
                case 'save':
                    props.updateTodo('save', props.trip.id, todo.id, document.getElementById('todoTitle').value);
                    parseTodos(props.trip.id);
                    break;
                default:
                    break;
            }
        }
        const id = () => {
            return i + todo.id
        }
        return (
            <li key={id()}>
                { todo.title &&
                    <div>
                        <input id={ id() } type='checkbox' defaultChecked={todo.complete} onChange={(e) => { handleOnChange( e, 'update' ) } } />
                        <label htmlFor={ id() }>{todo.title}</label>
                        <button className='btn' onClick={ (e) => { handleOnChange( e, 'delete' ) } }>Delete</button>
                    </div>
                }
                { !todo.title &&
                    <div>
                        <input id={ id() } type="checkbox" defaultChecked={todo.complete} onChange={(e) => { handleOnChange( e, 'update' ) } } />
                        <input id='todoTitle' type='text' placeholder='Enter title.' />
                        <button className='btn' onClick={ (e) => { handleOnChange(e, 'save') } }>Save</button>
                    </div>
                }
            </li>
        )
    });
    const addTodo = (id, e) => {
        e.preventDefault();
        props.addTodo(id);
    }
    const detail = (detail, label, props, inputType) => {
        const parseInputType = () => {
            if ( inputType === 'textarea' ) {
                return <textarea id={ label } defaultValue={ detail }  key={ props.trip.id }></textarea>
            } else {
                return <input id={ label } defaultValue={ detail }  key={ props.trip.id } />
            }
        }
        return (
            <div className="row">
                <div className="col-sm-5 detail-title">
                    <label htmlFor={ label }>{ label }</label>
                </div>
                <div className="col-sm-7">
                    { parseInputType() }
                </div>
            </div>
        )
    }
    const handleDateChange = (e) => {

    }
    return (
        <div className="details-wrapper">
            <form onSubmit={(e) => saveTrip(e)}>
                { detail(props.trip.title, 'Title', props) }
                { detail(props.trip.destination, 'City', props) }
                { detail(props.trip.description, 'Description', props, 'textarea' ) }
                <div className="row">
                    <div className="col-sm-5 detail-title">
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="col-sm-7">
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-5 detail-title">
                        <label htmlFor="category">Category</label>
                    </div>
                    <div className="col-sm-7">
                        <select key={ props.trip.id } id="category" defaultValue={ props.trip.category }>
                            { options }
                        </select>
                    </div>
                </div>
                <Datepicker id="start" label="Start Date" handleDateChange={ handleDateChange.bind(this) } />
                <Datepicker id="end" label="End Date" startDate={ props.trip.startDate } />
                <div className="row">
                    <div className="col-xs-12">
                        <div>Items Needed <button className="btn pull-right" onClick={ (e) => addTodo(props.trip.id, e) }>+</button></div>
                        <ul>
                            { todos }
                        </ul>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn"
                    data-toggle="modal"
                    data-target="#CreateReminder">Create Reminder</button>
                <div className="button-bar">
                    <button className="btn" type="submit">Save</button>
                    <button className="btn" onClick={ props.cancelNewTrip }>Cancel</button>
                    {
                        !props.trip.new &&
                        <button className="btn" onClick={ (e) => deleteTrip(e, props.trip.id) }>Delete</button>
                    }
                </div>
            </form>
            <CreateReminder title={props.trip.title} create={props.createReminder} id={props.trip.id} />
        </div>
    )
}

export default Details;
