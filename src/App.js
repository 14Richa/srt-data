import React from 'react';
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import logo from './logo.svg';
import './App.css';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/open-animation/open-animation.scss';
import About from './components/about'
import BarChart from './components/charts/barChart';
import LineChart from './components/charts/lineChart';
import UsersOverview from './components/UsersOverview';

var data = [
  {
    "name": "A",
    "value": 146
  },
  {
    "name": "B",
    "value": 687
  },
  
]


var data1 = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for(var i = 0; i < 20; i++) {
    data1.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }

function getData(){

}

const slider = (
  <AwesomeSlider cssModule={AwesomeSliderStyles}>
    <div className = "main" style = {{ backgroundColor: "white" }}> <About/></div>
    <div className = "main" style = {{ backgroundColor: "white"}} >
        <BarChart
          data={data}
          title={"check"}
          color="#70CAD1"
        />
        <LineChart
          data={data1}
          title={"check"}
          color="#70CAD1"
        />
    </div>

    <div>
      <Col lg="8" md="12" sm="12" className="mb-4">
        <UsersOverview />
      </Col>
    </div>
    
    <div>4</div>
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
