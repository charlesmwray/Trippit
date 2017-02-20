/*eslint no-undef: 0*/
import React, {Component} from 'react';

class Datepicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            label: props.label,
            // If the calendar must be limited to dates in the past
            startDate: props.startDate || null,
            // Iitial selected date or today
            initialDate: props.initialDate || this.getFormattedDate()
        }
    }
    componentDidMount() {
        // instantiates datepicker
        $( "#" + this.getDatepickerId() ).datepicker({
            autoclose: true,
            todayHighlight: true,
            startDate: this.state.startDate
        }).datepicker( 'update', this.state.initialDate );
    }
    getFormattedDate(date) {
        var d = date || new Date();
        return d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();
    }
    getDatepickerId() {
        return this.state.id + 'Datepicker';
    }
    getInputDatepickerId() {
        return this.state.id + 'InputDatepicker'
    }
    render() {
        return (
            <div className="row form-group">
                <div className="col-sm-12">
                    <label>{ this.state.label }</label>
                    <div id={ this.getDatepickerId() } className="input-group date" data-date-format="mm/dd/yyyy">
                        <input
                            id={ this.getInputDatepickerId() }
                            className="form-control"
                            type="text"
                            defaultValue="Select date"
                        />
                        <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Datepicker;
