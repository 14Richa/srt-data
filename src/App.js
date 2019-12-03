import React from 'react';
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/open-animation/open-animation.scss';

import UsersOverview from './components/UsersOverview';
import Timeline from './components/timeLine';
import About from './components/about';
import NavExample from './components/Navbar';
import Home from './components/home';

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";



class App extends React.Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <NavExample />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/data" component={Timeline}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}


export default App;
