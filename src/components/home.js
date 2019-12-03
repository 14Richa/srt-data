import React from 'react';

import { Link } from 'react-router-dom';




class Home extends React.Component {
  render() {
    return (      
       
        <div style={{textAlign : 'center'}}>
           
			  <div> <Link to= "/" > home </Link> </div>
			  <div> <Link to= "/about" > about </Link> </div>
			  <div> <Link to= "/data" > data </Link> </div>
			
        </div> 
      
    );
  }
}


export default Home;
