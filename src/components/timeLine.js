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

function cleanData( jsonObj )
{
    jsonObj = jsonObj.map( d => ({...d, year: parseInt(d.date.split(" ")[2])}));
    for (var i = 0; i < jsonObj.length; i++) {
        var value = jsonObj[i].batting_score;
        value = value.replace('*','');
        if(value =="DNB" || value =="TDNB") {
            value = 0;
        };
    jsonObj[i].score = parseInt(value);
    delete jsonObj[i].batting_score;
    }
    return jsonObj;
}

function aggregate_score( jsonObj)
{
	var obj = {};
	for(var i = 0; i < jsonObj.length; i++) {
		var key = jsonObj[i].year;
		var value = jsonObj[i].score;
		if( key in obj )
		{
			obj[key] += parseInt(value);
		}
		else
		{
			obj[key] = parseInt(value); 
		}
	}
	
	var keys = Object.keys(obj);
	var values = Object.values(obj);
	var res = keys.map((x, i) => ({x: parseInt(x),y: parseInt(values[i])}));
	return res;
}

var chartStyle = {        
				backgroundColor: "rgba(0,123,255,0.1)",
				//cubicInterpolationMode: "false",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3
      };

var chartStyleWins = {
      backgroundColor: "rgba(0,250,154,0.1)",
         borderColor: "rgb(0,250,154)",
         pointBackgroundColor: "#ffffff",
         pointHoverBackgroundColor: "rgb(0,250,154)",
         borderWidth: 1.5,
         pointRadius: 0,
         pointHoverRadius: 3
};

var chartStyleLosses = {
	 backgroundColor: "rgba(255,65,105,0.1)",
            borderColor: "rgba(255,65,105,1)",
            pointBackgroundColor: "#ffffff",
            pointHoverBackgroundColor: "rgba(255,65,105,1)",
            //borderDash: [3, 3],
            borderWidth: 1,
            pointRadius: 0,
            pointHoverRadius: 2
}

function getYearlyData(jsonObj)
{
	//jsonObj = jsonObj.map( d => ({...d, year: parseInt(d.date.split(" ")[2])})) ;
	//console.log(jsonObj);
	var total = jsonObj;
    var wins = jsonObj.filter( d => d.match_result == "won");
    var losses = jsonObj.filter( d => d.match_result == "lost");

    var total_data = aggregate_score(total);
    var wins_data = aggregate_score(wins);
    var losses_data = aggregate_score(losses);

    var labels = total_data.map(d => d.x);
	console.log(total_data);
	var chartData = {};
	chartData.labels = labels;
	chartData.datasets =[
							{
								label: "Total", fill: "start", lineTension: 0, 
								data: total_data, ...chartStyle
							},
							{
								label: "Wins", fill: "start", lineTension: 0,
								data: wins_data, ...chartStyleWins
							},
							{
								label: "Losses", fill: "start", lineTension: 0,
								data: losses_data, ...chartStyleLosses
							}
						];
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
			var clean_Data = cleanData(data);
			var temp = getYearlyData(clean_Data);
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