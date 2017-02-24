/*eslint no-undef: 0*/
import React, { Component } from 'react';
import './App.css';
import Moment from 'moment';

import Grid from './Components/Grid';
import Details from './Components/Details';
import Filter from './Components/Filter';
import Reminder from './Components/Reminder';

// Mock db response
import dbResponse from './data/dbResponse';
// Saves to localStorage
import setDb from './data/setDb';
// Gets data from localStorage
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

        // Creates array of trips with reminders.
        const reminderTimes = this.state.db.filter( (trip) => {
            return  trip.reminder
        });

        // Checks to see if trips with reminders are
        // within a minute of the current time
        const checkForReminder = () => {
            if ( !this.state.reminder ) {
                reminderTimes.forEach( (trip) => {
                    if ( Moment( trip.reminder ).isSame( Moment(), 'minute') ) {
                        this.setState({
                            reminder: { title: trip.title, date: trip.startDate, id: trip.id }
                        });
                    }
                });
            }
        }
        checkForReminder();

        // Runs the check at interval (currently at once a 5 seconds)
        setInterval(checkForReminder, 5000);
    }
    resetData() {
        // For development only. Click on header to
        // reset data to initial service call.
        localStorage.setItem('trips', null);
        window.location.reload();
    }
    showDetails(id) {
        var details = '';
        if (id) {
            // Filters db to selected trip
            details = this.state.db.filter( ( selectedTrip ) => {
                return selectedTrip.id === id;
            })[0];
        } else {
            // If no id, it's a new trip
            details = {
                new: true,
                title: '',
                destination: '',
                category: '',
                startDate: '',
                endDate: '',
                todos: [''],
            }
        }

        // Sets selected trip to Component State
        this.setState({
            selectedTrip: details
        });

        // Scrolls down to details if in mobile view on trip selection.
        setTimeout( () => {
            const windowHeight= document.documentElement.clientHeight|| window.innerHeight;
            if ( document.getElementById('details-header').getBoundingClientRect().top > windowHeight / 2 ) {
                $('body').animate({ scrollTop: $('#details-header').offset().top}, 500);
            }
        }, 100);
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

        // If it's an existing trip, update array of objects
        for(var i = 0 ; i < db.length; i++){
            if(db[i].hasOwnProperty("id") && db[i].id === data.id) {
                db[i] = data;
                newTrip = true;
                break;
            }
        }

        // If it's a new trip add it to the db
        !newTrip && db.push(data);

        // Saves to localStorage
        setDb(db);

        // Updates Component state
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
                                db[i].todos.splice(j,1);
                                break;
                            case 'save':
                                db[i].todos[j].title = value;
                                break;
                            default:
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
        // Updates planning state of trip on update from details page
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
    createReminder(e, id, type) {
        var db = this.state.db;
        for(var i = 0 ; i < db.length; i++){
            if(db[i].hasOwnProperty("id") && db[i].id === id) {

                if (type === 'update') {
                    var d = Moment(db[i].reminder);
                    db[i].reminder = d.add(1, 'minutes');
                    this.setState({
                        isReminderActive: false,
                        reminder: null,
                    });
                } else {
                    const time = e.target.CreateReminderTimepicker.value;
                    const date = e.target.CreateReminderInputDatepicker.value;
                    db[i].reminder = Moment( date + ' ' + time);
                }

            }
        }
        setDb(db);
        this.setState({
            db:db
        });
    }
    closeReminder() {
        var db = this.state.db;
        // Clears reminder on close of modal
        for(var i = 0 ; i < db.length; i++){
            if(db[i].hasOwnProperty("id") && db[i].id === this.state.reminder.id) {
                db[i].reminder = false;
            }
        }
        setDb(db);
        this.setState({
            db:db,
            isReminderActive: false,
            reminder: null,
        });
    }
    search(term) {
        var db = this.state.db;
        // Gets IDs that match search
        function search(arr, searchTerm){
            var results = [], i, key;

            for( i = arr.length; i--; ) {
                for( key in arr[i] ) {
                    if (
                        arr[i].hasOwnProperty(key) &&
                        arr[i][key].toString().toLowerCase().indexOf(searchTerm) > -1
                    ) {
                        results.indexOf( arr[i].id) === -1 && results.push( arr[i].id );
                    }
                }
            }

            return results;
        };
        const results = search(db, term.toLowerCase());
        // Filters db on IDs returned from search() into new array
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
        this.setState({
            searchedDb: filteredDb
        });
    }
    render() {
        return (
            <div className="container">
                { this.state.reminder &&
                    <Reminder
                        data={ this.state.reminder }
                        close={ this.closeReminder.bind(this) }
                        snooze={ this.createReminder.bind(this) }
                    />
                }
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="site-title" onClick={ this.resetData }>Trippit</h1>
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
