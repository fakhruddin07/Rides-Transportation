import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PeopleIcon from '../../images/peopleicon.png'
import Header from '../Header/Header';
import fakeData2 from '../../Data/Data2.json'
import { useForm } from 'react-hook-form';
import Map from '../../images/Map.png'

const RideDetail = () => {
    const [startingToEnding, setStartingToEnding] = useState({});
    const [toggle, setToggle] = useState(true);

    // hook
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const location = startingToEnding;
        location.startFrom = data.startFrom;
        location.destination = data.destination;
        setStartingToEnding(location);
        setToggle(false); //setting toggler
    }

    //dynamic route
    const transportType = useParams().transportType || 'bike';

    //fake-data-access
    const data = fakeData2;
    console.log(data[transportType]);


    //custom-styling
    const styleImg = {
        maxWidth: '130px',
        maxHeight: '130px',
        width: 'auto',
        height: 'auto'
    };
    return (
        <div className="container">
            <Header />
            <hr></hr>
            {
                (toggle) ?
                    (<div className="row">
                        <div className="col-md-6">
                            <div class="form-container  mt-5">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label>PICK FROM: <br />
                                            <select name="startFrom" ref={register}>
                                                <option value="Motijheel">Motijheel</option>
                                                <option value="Mirpur">Mirpur</option>
                                                <option value="Boshundhara">Boshundhara</option>
                                                <option value="Gulshan">Gulshan</option>
                                                <option value="Bonani">Bonani</option>
                                                <option value="Mirpur-1">Mirpur-1</option>
                                            </select>
                                        </label>
                                        <br />
                                        <label>PICK TO: <br />
                                            <select name="destination" ref={register}>
                                                <option value="Mirpur-10">Mirpur-10</option>
                                                <option value="Uttara">Uttara</option>
                                                <option value="Mahammodpur">Mahammodpur</option>
                                                <option value="Farmgate">Framgate</option>
                                                <option value="Panthapoth">Panthapoth</option>
                                                <option value="Sciencelab">Sciencelab</option>
                                            </select>
                                        </label>
                                    </div>
                                    <label>DATE: <br />
                                        <input type="date" name="date" ref={register}></input>
                                    </label> <br />
                                    <input className="btn btn-primary" type="submit" value="SEARCH" />
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src={Map} alt="" />
                        </div>
                    </div>
                    ) :
                    (
                        <div className="row">
                            <div className="col-md-6">
                                <div className="bg-dark" style={{ padding: '40px 20px', borderRadius: '10px', color: 'white' }}>
                                    <h3>FROM: {startingToEnding.startFrom}</h3>
                                    <br />
                                    <h3>DESTINATION: {startingToEnding.destination} </h3>
                                </div>

                                {

                                    data !== null && data[transportType].map(vehicle => {
                                        return <>
                                            <div className="subcontainer-style d-flex justify-content-between mt-4">
                                                <div className="d-flex justify-content-start">
                                                    <img src={vehicle.image} className="img-thumbnail" alt="..." style={styleImg} />
                                                    <h4 className="ml-3">{transportType} {vehicle.capacity}</h4>
                                                    <img src={PeopleIcon} className="ml-3" alt="..." style={styleImg} /></div>
                                                <h4>{vehicle.rent}</h4>
                                            </div>
                                        </>
                                    })
                                }
                            </div>
                            <div className="col-md-6">
                                <img src={Map} alt="" />
                            </div>
                        </div>
                    )

            }

        </div>
    );
};

export default RideDetail;