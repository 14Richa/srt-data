import React from 'react';
import logo from './logo.svg';
import './App.css';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/open-animation/open-animation.scss';


const slider = (
  <AwesomeSlider cssModule={AwesomeSliderStyles}>
    <div style = {{ backgroundColor: "white" }}>1</div>
    <div>2</div>
    <div>3</div>
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
