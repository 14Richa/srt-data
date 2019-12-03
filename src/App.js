import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Row } from "shards-react";

import './App.css';

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
        <div className="App-body">
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
