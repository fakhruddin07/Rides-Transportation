import React from 'react';
import './Ride.css';
import { Link } from 'react-router-dom';

const Ride = (props) => {
    console.log(props.ride)
    const { transportImg, transportName, transportType } = props.ride;
    return (
        <div className='col-md-3 col-sm-12 m-top'>
            <Link to={`/rides/${transportType}`}>
                <div className='card d-inline-block'>
                    <img src={transportImg} className='card-img-top img-fluid ride-img' alt="" />
                    <div className="card-body">
                        <h5 className="card-title text-center">{transportName}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Ride;