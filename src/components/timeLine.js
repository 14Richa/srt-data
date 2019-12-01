import React from 'react';
//import BarChart from './charts/barChart';
//import LineChart from './charts/lineChart';
import { Container, Row, Col } from "shards-react";
import UsersOverview from './UsersOverview';
import UsersByDevice from './UsersByDevice';
import BarChart from './BarChart';
//import { getData } from '../utils/data_prep.js';
import * as d3 from "d3";
import data from '../assets/sachin.csv'

function aggregate_score( jsonObj)
{
	var obj = {};
	for(var i = 0; i < jsonObj.length; i++) {
		var key = jsonObj[i].year;
		var value = jsonObj[i].batting_score;
		value = value.replace('*','');
		if(value =="DNB" || value =="TDNB") {
			value = 0;
		};

		if( key in obj )
		{
			obj[key] += parseInt(value);
		}
		else
		{
			obj[key] = parseInt(value); 
		}
	}
	return(obj);
}

var chartStyle = {        
				backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3
      };

function getYearlyData(jsonObj)
{
	jsonObj = jsonObj.map( d => ({...d, year: d.date.split(" ")[2]})) ;
	//console.log(jsonObj);
	var yearlyScore = aggregate_score(jsonObj);
	var chartData = {};
	chartData.labels = Object.keys(yearlyScore);
	chartData.datasets = [{label: "Total", fill: "start", 
												data: Object.values(yearlyScore), ...chartStyle}];
	return chartData
}

function getPieData(jsonObj)
{
	var pieProp = { 
					hoverBorderColor: "#ffffff",
					backgroundColor: ["rgba(0,123,255,0.9)",
          								"rgba(0,123,255,0.5)",
      									"rgba(0,123,255,0.3)"]
					}
	var chartData = {labels: ["Win", "Lose"],
					datasets: [{
						data: [64, 36],
						...pieProp
					}]}
		return(chartData)
}



class TimeLine extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			yearlyData: null,
			pieData: null
			//yearlyData: {labels: ["a", "b"], datasets: [{label:"initial", fill:"start", data: [1,2], ...chartStyle}]}
		}
	}

	componentDidMount()
	{
		d3.csv(data).then((data) => {
			var temp = getYearlyData(data);
			var pieData = getPieData(data);
			console.log(pieData);
			this.setState({
        yearlyData: temp,
        pieData: pieData
      });
		}).catch(function(err){
					throw err;
		})
	}
	

	render() {
		const { yearlyData, pieData } = this.state;
		return (
		<div>
		<div style = {{ marginBottom: "10px"}} class="card">
		  <div className="card-body">
		    This is some text within a card block.
		  </div>
		</div>
			<div>
			<Row>
				<Col lg="8" md="12" sm="6" className="mb-4">
        			{(this.state.yearlyData) && <UsersOverview title="Run Stats" chartData={yearlyData} />}
      			</Col>
      			<Col lg="4" md="6" sm="3" className="mb-4">
        			 {(this.state.pieData) && <UsersByDevice title="Check" chartData={pieData} />}
      			</Col>
  			</Row>
			</div>
			<div>
			<Row>
				<Col lg="8" md="12" sm="6" className="mb-4">
				<BarChart/>
				</Col>
			</Row>
			<div style = {{ marginBottom: "10px"}} class="card">
		  <div className="card-body">
		    This is some text within a card block.
		  </div>
		</div>
			</div>
		</div>
		)
	}
}


export default TimeLine;