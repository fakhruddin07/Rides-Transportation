import React from 'react';
import Ride from '../Ride/Ride';

const Home = () => {
    const rides = [
        {
            transportImg: "https://media.zigcdn.com/media/model/2021/Feb/royal-enfield-classic-350-dual-channel_360x240.jpg",
            transportName: "BIKE"
        },
        {
            transportImg: "https://cdn.motor1.com/images/mgl/wORKo/s3/abt-audi-a6-allroad-2020.jpg",
            transportName: "CAR"
        },
        {
            transportImg: "https://www.sustainable-bus.com/wp-content/uploads/2019/12/scania-bus4.jpg",
            transportName: "BUS"
        },
        {
            transportImg: "https://static.toiimg.com/thumb/msid-78287167,width-1200,height-900,resizemode-4/.jpg",
            transportName: "TRAIN"
        }
    ]
    return (
        <div className='container'>
            <div className='row d-flex align-items-center'>
                {
                    rides.map(ride => <Ride ride={ride}></Ride>)
                }
            </div>
        </div>
    );
};

export default Home;