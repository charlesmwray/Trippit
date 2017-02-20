/*global $:true*/

import React, {Component} from 'react';

class Timepicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            props: props
        }
    }
    componentDidMount() {
        $('#' + this.makeId() ).timepicker({ minuteStep: 1 });
    }
    makeId() {
        return this.state.props.id + 'Timepicker';
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <label>{ this.state.props.label }</label>
                    <div className="input-group bootstrap-timepicker timepicker">
                        <input id={ this.makeId() } type="text" className="form-control input-small" />
                        <span className="input-group-addon">
                            <i className="glyphicon glyphicon-time"></i>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timepicker;
