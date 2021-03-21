import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import firebaseConfig from '../Login/firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    var user = firebase.auth().currentUser;
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container">
                    <a class="navbar-brand" href="#">BD Rides and Transport</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div class="navbar-nav ml-auto">
                            <Link to="/home" class="nav-link active" aria-current="page">Home</Link>
                            <Link to="/destination" class="nav-link active" aria-current="page">Destination</Link>
                            <Link to="/blog" class="nav-link active" aria-current="page">Blog</Link>
                            <Link to="/contact" class="nav-link active" aria-current="page">Contact</Link>
                            {
                                user ? user.displayName : <Link to="/login"><button class="btn btn-success" type="login">Login</button></Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;