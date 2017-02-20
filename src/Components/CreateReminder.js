/*eslint no-undef: 0*/
import React from 'react';
import Datepicker from './Datepicker';
import Timepicker from './Timepicker';

const CreateReminder = (props) => {
    const handleSubmit = (e, id) => {
        e.preventDefault();
        props.create(e, id);
        $('#CreateReminder').modal('hide');
    }
    return  (
        <div id="CreateReminder" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <form onSubmit={ (e) => { handleSubmit(e, props.id) } }>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Set Reminder for {props.title}</h4>
                        </div>
                        <div className="modal-body">
                            <Timepicker id="CreateReminder" label="Time" />
                            <Datepicker id="CreateReminder" label="Date" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-dismiss="modal">Close</button>
                            <button type="button" className="btn" type="submit">Save changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateReminder;
