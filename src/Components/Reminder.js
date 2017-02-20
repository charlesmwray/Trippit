/*eslint no-undef: 0*/
import React, { Component } from 'react';

class Reminder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.data.title,
            date: props.data.date,
            id: props.data.id,
            close: props.close,
            snooze: props.snooze
        }
    }
    componentDidMount() {
        $('#Reminder').modal('show');
    }
    componentDidUnMount() {
        $('#Reminder').modal('hide');
    }
    render(props) {
        return  (
            <div id="Reminder" className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h4 className="modal-title">Reminder for your trip: {this.state.title} on {this.state.date}</h4>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={ () => { this.state.snooze(null, this.state.id, 'update' ) } }
                            >
                                Snooze 1 minute.
                            </button>
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                                onClick={ () => { this.state.close() } }
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reminder;
