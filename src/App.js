import React from 'react';
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import logo from './logo.svg';
import './App.css';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/open-animation/open-animation.scss';
import About from './components/about'

import UsersOverview from './components/UsersOverview';
import Timeline from './components/timeLine';

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";


const slider = (
  <AwesomeSlider cssModule={AwesomeSliderStyles} fillParent={false}>
    <div style = {{ backgroundColor: "white" }}> 

    
      <About/>
   

    </div>
    <div style = {{ backgroundColor: "white" }}>
        <Col >
        <Timeline />
        </Col>
    </div>

    <div style = {{ backgroundColor: "rgba(199, 204, 212)"}}>
      <Col>
        <UsersOverview />
      </Col>
    </div>
    
    <div style = {{ backgroundColor: "white"}}>4</div>
  </AwesomeSlider>
);

function App() {
  
  return (
    <div className="App">
    { slider}
      
    </div>
    
  );
}

export default App;
