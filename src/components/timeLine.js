import React from 'react';
import BarChart from './charts/barChart';
import LineChart from './charts/lineChart';
import { Container, Row, Col } from "shards-react";
import UsersOverview from './UsersOverview';
import UsersByDevice from './UsersByDevice';
import { getData } from '../utils/data_prep.js';




class TimeLine extends React.Component {

	componentDidMount()
	{
		var yearlyData = getData("Yearly");
		console.log(yearlyData);
	}

	render() {
		return (
		<div>
		<div style = {{ marginBottom: "90px"}} class="card">
		  <div className="card-body">
		    This is some text within a card block.
		  </div>
		</div>
			<div>
			<Row>
				<Col lg="8" md="12" sm="6" className="mb-4">
        			<UsersOverview />
      			</Col>
      			<Col lg="4" md="6" sm="3" className="mb-4">
        			<UsersByDevice />
      			</Col>
  			</Row>
			</div>
			<div>
			<Row>
				<Col lg="8" md="12" sm="6" className="mb-4">
				<UsersOverview/>
				</Col>
			</Row>
			</div>
		</div>
		)
	}
}


export default TimeLine;