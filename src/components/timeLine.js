import React from 'react';
import BarChart from './charts/barChart';
import LineChart from './charts/lineChart';
import { Container, Row, Col } from "shards-react";
import UsersOverview from './UsersOverview';
import UsersByDevice from './UsersByDevice';
import { printcheck } from '../utils/data_prep.js';

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

printcheck("test1");

var data1 = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for(var i = 0; i < 20; i++) {
    data1.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }


class TimeLine extends React.Component {

	componentDidMount()
	{
		printcheck("test2");
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