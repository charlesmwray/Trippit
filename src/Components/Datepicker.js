/*eslint no-undef: 0*/
import React, {Component} from 'react';

class Datepicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            label: props.label,
            startDate: props.startDate || null
        }
    }
    componentDidMount() {
        const today = this.getFormattedDate();

        $("#" + this.getDatepickerId()).datepicker({
            autoclose: true,
            todayHighlight: true,
            startDate: this.state.startDate
        }).datepicker('update', today);

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
            <div className="row">
                <div className="col-sm-12">
                    <label>{ this.state.label }</label>
                    <div id={ this.getDatepickerId() } className="col-sm-7 input-group date" data-date-format="mm/dd/yyyy">
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
