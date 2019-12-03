import React from 'react';
//import BarChart from './charts/barChart';
//import LineChart from './charts/lineChart';
import { Container, Row, Col } from "shards-react";
import UsersOverview from './UsersOverview';
import UsersByDevice from './UsersByDevice';
import BarChart from './BarChart';
import RadarChart from './radarchart';
import PieChart from './piechart';
import { getTopOpponents, GetMatchesPlayed  } from '../utils/data_prep.js';
import * as d3 from "d3";
import data from '../assets/sachin.csv'

import {chartStyleWins, chartStyle, chartStyleLosses, barChartStyle1, pieChartStyles2,
		barChartStyle2, pieChartStyles, radarChartStyles} from './style'

function cleanData( jsonObj )
{
    jsonObj = jsonObj.map( d => ({...d, year: parseInt(d.date.split(" ")[2])}));
    jsonObj = jsonObj.map( d => ({...d, opposition: d.opposition.substr(d.opposition.indexOf(' ')+ 1)}));
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
			console.log(clean_Data);
			var temp = getYearlyData(clean_Data);
			var pieData = getPieData(clean_Data);
			var barData = getBarChartData(clean_Data);
			var matchesPlayed = GetMatchesPlayed(clean_Data);
			matchesPlayed.datasets[0] = {...matchesPlayed.datasets[0], ...pieChartStyles2}; 
			var top5Oppo = getTopOpponents(clean_Data);
			top5Oppo.datasets[0] = {...top5Oppo.datasets[0], ...radarChartStyles, ...{label: "Runs Scored"}};

			this.setState({
        		yearlyData: temp,
        		pieData: pieData,
        		barData: barData,
        		radarData: top5Oppo,
        		matchesPlayed: matchesPlayed
      });
		}).catch(function(err){
					throw err;
		})
	}
	

	render() {
		const { yearlyData, pieData, barData, radarData, matchesPlayed } = this.state;
		return (
		<div>
		<Row>
		<Col sm="12" md="4" lg="2" >
		</Col>
		<Col sm="12" md="4" lg="8">
				<div style = {{ marginBottom: "10px"}} class="card">
				  <div className="card-body">
				    We can take a look at Sachin's batting numbers at different cuts on this page. Each card is a different slice of data. Cards are self-explanatory, I have added comments wherever needed.
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
				<Row>
					<Col lg="8" md="8" sm="8">
	        			{(this.state.yearlyData) && <RadarChart title="Top 5 opponents" chartData={radarData}/> }
					</Col>
					<Col lg="4" md="4" sm="4">
	        			{(this.state.matchesPlayed) && <PieChart title="Matches Played" chartData={matchesPlayed} chartOptions={radarChartStyles}/> }
					</Col>
				</Row>
				<div style = {{ marginBottom: "10px"}} class="card">
			  <div className="card-body">
			    This is some text within a card block.
			  </div>
			</div>
			</div>
			</Col>
			<Col sm="12" md="4" lg="2" >
			</Col>
			</Row>
		</div>
		)
	}
}


export default TimeLine;