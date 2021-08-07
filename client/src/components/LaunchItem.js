import React from 'react';
// import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import '../App.css'

const LaunchItem = ({ launch: { id, flight_number, name, date_local, success, rocket } }) => {
    
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col md-9">
                    <h4>Mission: <span className={success ? 'text-success' : success === false ? 'text-danger' : ''}>{name}</span></h4>
                    <p>Date: <Moment format="MM/DD/YYYY">{date_local}</Moment></p>
                </div>
                <div className="col md-3 launches">
                    <Link to={`/launch/${id}`} className="btn btn-secondary">Launch Details</Link>
                </div>
            </div>
        </div>
    )
}

export default LaunchItem