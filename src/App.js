import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import RideDetail from './components/RideDetail/RideDetail';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Destination from './components/Destination/Destination';
import firebaseConfig from './components/Login/firebase.config';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <div className="bg-img">
              <Header></Header>
              <Home></Home>
            </div>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/rides/:transportType">
            <RideDetail></RideDetail>
          </PrivateRoute>
          <Route path="/destination">
            <Destination></Destination>
          </Route>
          <Route exact path="/">
            <div className="bg-img">
              <Header></Header>
              <Home></Home>
            </div>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
