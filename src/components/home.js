import React from 'react';
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';




class Home extends React.Component {
  render() {
    return (      
       
        <div>
           <ul>
			  <li>Coffee</li>
			  <li>Tea</li>
			  <li>Milk</li>
			</ul> 
        </div> 
      
    );
  }
}


export default Home;
