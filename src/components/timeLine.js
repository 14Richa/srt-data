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

var pieChartStyles = {
	hoverBorderColor: "#ffffff",
	backgroundColor: ["rgba(0,123,255,0.9)",
    				"rgba(0,123,255,0.3)"]

}

var barChartStyle1 = {
		hoverBorderColor: "#ffffff",
	    //barPercentage: 0.3,
	    //barThickness: 5,
	    maxBarThickness: 20,
	    minBarLength: 4,
	    backgroundColor: [
      "rgba(0,123,255,0.9)",
      "rgba(0,123,255,0.9)",
      "rgba(0,123,255,0.9)",
      "rgba(0,123,255,0.9)",
      ]
}
var barChartStyle2 = {
		hoverBorderColor: "#ffffff",
	    //barPercentage: 0.3,
	    //barThickness: 5,
	    maxBarThickness: 20,
	    minBarLength: 4,
	    backgroundColor: [
      "rgba(0,123,255,0.2)",
      "rgba(0,123,255,0.2)",
      "rgba(0,123,255,0.2)",
      "rgba(0,123,255,0.2)",
      ]
}


function getYearlyData(jsonObj)
{
	var total = jsonObj;
    var wins = jsonObj.filter( d => d.match_result == "won");
    var losses = jsonObj.filter( d => d.match_result == "lost");

    var total_data = aggregate_score(total);
    var wins_data = aggregate_score(wins);
    var losses_data = aggregate_score(losses);

    var labels = total_data.map(d => d.x);
	
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
	var total_run = jsonObj.reduce( (total, d) => ({score: total.score + d.score}) );
	var wins_run = jsonObj.filter(d => d.match_result === "won").reduce( (total, d) => ({score: total.score +  d.score  }));
	var losses_run = jsonObj.filter(d => d.match_result === "lost").reduce( (total, d) => ({score: total.score +  d.score  }));

	var firstinnings = jsonObj.filter(d => d.batting_innings === "1st").reduce( (total, d) => ({score: total.score +  d.score  }));
	var secondinnings = jsonObj.filter(d => d.batting_innings === "2nd").reduce( (total, d) => ({score: total.score +  d.score  }));
	var chartData = {
						results:
						{
							labels: ["Matches Won", "Matches Lost"],
							datasets: [
										{
											data: [wins_run.score, losses_run.score],
											...pieChartStyles
										}
										]
						},
						innings:
						{
							labels: ["First Innings", "Second Innings"],
							datasets: [
										{
											data: [firstinnings.score, secondinnings.score],
											...pieChartStyles
										}
										]
						}
					};

	return(chartData)
}

function getBarChartData(jsonObj)
{
	var labels = ["1989-94", "1995-2000", "2001-06", "2007-12"];
	var data100 = [0, 0, 0, 0];
	var data50 = [0, 0, 0, 0];
	var centArray = jsonObj.filter(d => d.score >= 100);
	var fiftArray = jsonObj.filter(d => d.score >= 50 && d.score < 100);
	for(var i=0; i<centArray.length; i++)
	{
		let year = centArray[i].year
		if(year <= 1994)
		{
			data100[0]++;
		}
		else if(year <=2000)
		{
			data100[1]++;
		}
		else if(year <= 2006)
		{
			data100[2]++;
		}
		else
		{
			data100[3]++;
		}
	}
	for(var i=0; i<fiftArray.length; i++)
	{
		let year = fiftArray[i].year
		if(year <= 1994)
		{
			data50[0]++;
		}
		else if(year <=2000)
		{
			data50[1]++;
		}
		else if(year <= 2006)
		{
			data50[2]++;
		}
		else
		{
			data50[3]++;
		}
	}
	
	var	datasets= [{label: "Number of 100s", data:data100, ...barChartStyle1},
					{label: "Number of 50s", data:data50, ...barChartStyle2}]
				
	var chartData = {labels: labels, datasets: datasets };
	return chartData;
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
			//console.log(clean_Data);
			var temp = getYearlyData(clean_Data);
			var pieData = getPieData(clean_Data);
			var barData = getBarChartData(clean_Data);
			this.setState({
        yearlyData: temp,
        pieData: pieData,
        barData: barData,
      });
		}).catch(function(err){
					throw err;
		})
	}
	

	render() {
		const { yearlyData, pieData, barData } = this.state;
		return (
		<div>
		<Row>
		<Col sm="12" md="4" lg="3" >
		</Col>
		<Col sm="12" md="4" lg="6">
				<div style = {{ marginBottom: "10px"}} class="card">
				  <div className="card-body">
				    This is some text within a card block.
				  </div>

				</div>
				<div>
				<Row>
					<Col lg="8" md="8" sm="8" className="mb-4">
					{(this.state.barData) && <BarChart title="Number of 100s and 50s" chartData={barData}/>}
	      			</Col>
	      			<Col lg="4" md="4" sm="4" className="mb-4">

	        			 {(this.state.pieData) && <UsersByDevice title="Run Stats" chartData={pieData} />}
	      			</Col>
	  			</Row>
				</div>
				<div>
				<Row>
					<Col lg="12" md="12" sm="12" className="mb-4">
	        			{(this.state.yearlyData) && <UsersOverview title="Run Stats" chartData={yearlyData} />}
					</Col>
				</Row>
				<div style = {{ marginBottom: "10px"}} class="card">
			  <div className="card-body">
			    This is some text within a card block.
			  </div>
			</div>
			</div>
			</Col>
			<Col sm="12" md="4" lg="3" >
			</Col>
			</Row>
		</div>
		)
	}
}


export default TimeLine;