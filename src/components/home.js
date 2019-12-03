import React from 'react';

import { Link } from 'react-router-dom';


const divStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  position: "relative",
  top: "40%",
  transform: "translateY(-50%)",
  textAlign : 'center'
}

class Home extends React.Component {
  render() {
    return (      
       
        <div style={divStyle}>
           
			  <div> <Link to= "/about" > / about </Link> </div>
			  <div> <Link to= "/data" > / data </Link> </div>
			
        </div> 
      
    );
  }
}


export default Home;
