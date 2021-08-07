import React, { useState } from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import { Link, useLocation } from 'react-router-dom';
import Moment from 'react-moment';

import Rocket from './Rocket';
import '../App.css';



const LAUNCH_QUERY = gql`
  query LaunchQuery($id: String!) {
    launch(id: $id) {
        id
        flight_number
        name
        date_local
        success
        rocket
        details
    }
  }
`;

const Launch = () => {
    const [img, setImg] = useState('');
    const location = useLocation();
    console.log('location', location)
    const id = location.pathname.slice(1).split('/')[1];
    console.log('id', id)
    const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { id }});
    console.log('loading', loading);
    console.log('error', error);
    console.log('data', data);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>
    
    const { name, flight_number, date_local, success, rocket, details } = data.launch;

    return (
        <div className="launch-details">
            <h1 className="display-4 my-3"><span className="text-dark">Mission:</span> {name}</h1>
            <h4 className="mb-3">Launch Details</h4>
            <ul className="list-group">
                <li className="list-group-item">Flight Number: {flight_number}</li>
                <li className="list-group-item">Launch Year: <Moment format="YYYY">{date_local}</Moment></li>
                <li className="list-group-item"><span className="rocket-info">Rocket:&nbsp;<Rocket id={rocket} img={img} setImg={setImg}/></span></li>
                
                <li className="list-group-item">Launch Successful: <span className={success ? 'text-success' : success === false ? 'text-danger' : ''}>{success ? 'Yes' : success === false ? 'No' : 'N/A'}</span></li>
                <li className="list-group-item">Details: <em>{details}</em></li>
            </ul>
            <div className="rocket-image-container mb-3">
                {
                    img ? <img className="rocket-image" src={img} alt="rocket"/> : null
                }
            </div>
            <Link to="/" className="btn btn-secondary">Back</Link>
        </div>
    )
}

export default Launch
