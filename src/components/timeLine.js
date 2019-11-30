import React from 'react';
import BarChart from './charts/barChart';
import LineChart from './charts/lineChart';
import { Container, Row, Col } from "shards-react";
import UsersOverview from './UsersOverview';


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


class TimeLine extends React.Component {
	render() {
		return (
		<div>
			<div>
			<Row>
				<Col lg="4" md="12" sm="6" className="mb-4">
        			<UsersOverview />
      			</Col>
      			<Col lg="2" md="6" sm="3" className="mb-4">
        			<UsersOverview />
      			</Col>
  			</Row>
			</div>
			<div>
			<Row>
				<UsersOverview/>
			</Row>
			</div>
		</div>
		)
	}
}


export default TimeLine;