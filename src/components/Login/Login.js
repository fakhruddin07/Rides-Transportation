import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: ''
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
    const handleGoogleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var { displayName, email } = result.user;
                const signInUser = { name: displayName, email };
                setLoggedInUser(signInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    const handleFacebookSignIn = () => {
        var facebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
            .signInWithPopup(facebookProvider)
            .then((result) => {
                var credential = result.credential;
                var accessToken = credential.accessToken;
                var { displayName } = result.user;
                const signInUser = { name: displayName };
                setLoggedInUser(signInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    const styleForm = {
        border: "1px solid gray",
        height: '60%',
        width: '40%',
        padding: '20px',
        marginBottom: '20px'
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

    // User Logging

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    updateUserName(user.name);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }


    return (
        <div className="container">
            <Header></Header>
            <div className='d-flex justify-content-center'>
                <form onSubmit={handleSubmit} style={styleForm} className='mt-5'>
                    <div class="mb-3">
                        {newUser && <input type="name" onBlur={handleBlur} name="name" placeholder="Name" class="form-control" aria-describedby="name" required></input>}
                    </div>
                    <div class="mb-3">
                        <input type="email" onBlur={handleBlur} placeholder="Email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
                    </div>
                    <div class="mb-3">
                        <input type="password" onBlur={handleBlur} placeholder="password" name="password" class="form-control" id="exampleInputPassword1" required></input>
                    </div>
                    <div class="mb-3">
                        {newUser && <input type="password" onBlur={handleBlur} placeholder="confirm password" name="confirm password" class="form-control" id="exampleInputPassword1" required></input>}
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" onChange={() => setNewUser(!newUser)} class="form-check-input" id="exampleCheck1"></input>
                        <label class="form-check-label" for="exampleCheck1">Don't have an account?</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="btn btn-primary" type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
                    </div>
                </form>
            </div>
            <div className='d-flex justify-content-center'>
                <p style={{ color: 'red' }}>{user.error}</p>
                {
                    user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
                }
            </div>
            <hr />
            <div>
                <h4 className='d-flex justify-content-center'>Or</h4>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button onClick={handleGoogleSignIn} style={{ marginLeft: '33%', marginTop: '20px', border: '1px solid gray' }} class="btn btn-light rounded-pill" type="button">Continue with Google</button>
                    <button onClick={handleFacebookSignIn} style={{ marginLeft: '33%', marginTop: '20px', border: '1px solid gray' }} class="btn btn-light rounded-pill" type="button">Continue with Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default Login;