import React from 'react';
import Header from '../Header/Header';
import Home from '../Home/Home';

const Destination = () => {
    return (
        <div className='container'>
            <Header></Header>
            <hr/><hr/>
            <h1 className="text-center text-success">Welcome. Select Your Ride</h1>
            <Home></Home>
        </div>
    );
};

export default Destination;