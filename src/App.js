import React, { Component } from 'react';
import './App.css';

import Grid from './Components/Grid';
import Details from './Components/Details';
import Filter from './Components/Filter';

import dbResponse from './data/dbResponse';
import setDb from './data/setDb';
import getDb from './data/getDb';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            db: [],
            searchedDb: null,
            filteredDb: null,
            selectedTrip: null,
            tripCategories: ['None','Business Trip','Vacation'],
        }
    }
    componentWillMount() {
        setDb( getDb() ? getDb() : dbResponse);
        this.setState({
            db: getDb(),
        });
    }
    componentDidMount() {
        const reminderTimes = this.state.db.filter( (trip) => {
            console.log(trip.reminder);
            return trip.reminder
        });
        const checkForReminder = () => {
            var date = new Date('yyyy/');
            console.log()
        }
        setInterval(checkForReminder, 1000);
    }
    resetData() {
        localStorage.setItem('trips', null);
        window.location.reload();
    }
    showDetails(id) {
        var details = '';
        if (id) {
            details = this.state.db.filter( ( selectedTrip ) => {
                return selectedTrip.id === id;
            })[0];
        } else {
            details = {
                new: true,
                title: '',
                destination: {
                    city: ''
                },
                category: '',
                startDate: '',
                endDate: '',
                todos: [''],
            }
        }

        this.setState({
            selectedTrip: details
        });
        setTimeout( () => { document.getElementById('details-header').scrollIntoView(); }, 100);
    }
    createNewTrip() {
        this.showDetails();
    }
    cancelNewTrip() {
        this.setState({
            selectedTrip: null
        })
    }
    saveTrip(data) {
        var db = this.state.db;
        var newTrip = false;
        for(var i = 0 ; i < db.length; i++){
            if(db[i].hasOwnProperty("id") && db[i].id === data.id) {
                db[i] = data;
                newTrip = true;
                break;
            }
        }
        !newTrip && db.push(data);
        setDb(db);
        this.setState({
            db:db
        })
    }
    deleteTrip(id) {
        var db = this.state.db;
        for(var i = 0 ; i < db.length; i++){
            if(db[i].hasOwnProperty("id") && db[i].id === id) {
                db.splice(i, 1);
                break;
            }
        }
        setDb(db);
        this.setState({
            db:db,
            selectedTrip:null
        })
    }
    updateTodo(type, id, todoId, value) {
        var db = this.state.db;
        for(var i = 0 ; i < db.length; i++){
            if(db[i].hasOwnProperty("id") && db[i].id === id) {
                for(var j = 0 ; j < db[i].todos.length; j++){
                    if(db[i].todos[j].hasOwnProperty("id") && db[i].todos[j].id === todoId) {
                        switch (type) {
                            case 'update':
                                db[i].todos[j].complete = value;
                                break;
                            case 'delete':
                                console.log(j)
                                db[i].todos.splice(j,1);
                                break;
                            case 'save':
                                db[i].todos[j].title = value;
                                break;
                        }
                    }
                }
            }
        }
        setDb(db);
        this.setState({
            db:db
        });
    }
    addTodo(id) {
        var db = this.state.db;
        for(var i = 0 ; i < db.length; i++){
            if(db[i].hasOwnProperty("id") && db[i].id === id) {
                db[i].todos.push(
                    {
                        id: Math.floor(100000 + Math.random() * 900000).toString(),
                        title: '',
                        complete: false
                    }
                )
            }
        }
        setDb(db);
        this.setState({
            db:db
        });
    }
    setPlanningState(id, state) {
        var db = this.state.db;
        for(var i = 0 ; i < db.length; i++){
            if(db[i].hasOwnProperty("id") && db[i].id === id) {
                db[i].planningState = state;
                break;
            }
        }

        setDb(db);
        this.setState({
            db:db
        });
    }
    createReminder(e, id) {
        var db = this.state.db;
        for(var i = 0 ; i < db.length; i++){
            if(db[i].hasOwnProperty("id") && db[i].id === id) {
                const time = e.target.CreateReminderTimepicker.value.split(':');
                const date = e.target.CreateReminderInputDatepicker.value.split('/');
                const reminderDateTime = new Date( date[2], date[0], date[1], time[0], time[1].slice(0,2), 0);

                db[i].reminder = reminderDateTime;
            }
        }
        setDb(db);
        this.setState({
            db:db
        });
    }
    search(term) {
        var db = this.state.db;
        function search(arr, searchTerm){
            var results = [], i, key;

            for( i = arr.length; i--; ) {
                for( key in arr[i] ) {
                    if (
                        arr[i].hasOwnProperty(key) &&
                        arr[i][key].toString().toLowerCase().indexOf(searchTerm) > -1
                    ) {
                        results.indexOf( arr[i].id) == -1 && results.push( arr[i].id );
                    }
                }
            }

            return results;
        };
        const results = search(db, term.toLowerCase());
        var searchedDb = db.filter(function(trip, i) {
            return results.indexOf(trip.id) !==  -1;
        });
        this.setState({
            searchedDb: searchedDb
        });
    }
    resetSearch() {
        this.setState({
            searchedDb: null
        });
    }
    filter(filter) {
        const db = this.state.db;
        const filteredDb = db.filter( function( trip ) {
            return trip.category === filter;
        });
        console.log( filteredDb );
        this.setState({
            searchedDb: filteredDb
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="site-title">Trippit</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Filter
                            createNewTrip={ this.createNewTrip.bind(this) }
                            search={ this.search.bind(this) }
                            filter={ this.filter.bind(this) }
                            resetSearch={ this.resetSearch.bind(this) }
                            resetData={ this.resetData.bind(this) }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <Grid
                            data={ this.state.searchedDb || this.state.db }
                            showDetails={ this.showDetails.bind(this) }
                            selectedTrip={ this.state.selectedTrip }
                        />
                    </div>
                    <div className="col-xs-12 col-sm-8 details-container">
                        { this.state.selectedTrip &&
                            <Details
                                trip={ this.state.selectedTrip }
                                categories={ this.state.tripCategories }
                                saveTrip={ this.saveTrip.bind(this) }
                                deleteTrip={ this.deleteTrip.bind(this) }
                                cancelNewTrip={ this.cancelNewTrip.bind(this) }
                                updateTodo={ this.updateTodo.bind(this) }
                                addTodo={ this.addTodo.bind(this) }
                                setPlanningState={ this.setPlanningState.bind(this) }
                                createReminder={ this.createReminder.bind(this) }
                            />
                        }
                        { !this.state.selectedTrip && <h2><span className="hidden-xs">&#8678;</span> Select a trip</h2> }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
