//Import libs
import React from 'react';
import * as d3 from "d3";
//Import components
import {  Row, Col } from "shards-react";
import TimeSeriesChart from './timeserieschart';

import BarChart from './BarChart';
import RadarChart from './radarchart';
import PieChart from './piechart';
import PieChartOptions from './piechartopt';
//Import Functions
import { getTopOpponents, GetMatchesPlayed, getYearlyTimeSeriesData, getRunsPieData, getCenturiesData  } from '../utils/data_prep.js';
//Import Data
import data from '../assets/sachin.csv'



function cleanData( jsonObj ){
    jsonObj = jsonObj.map( d => ({...d, year: parseInt(d.date.split(" ")[2])}));
    jsonObj = jsonObj.map( d => ({...d, opposition: d.opposition.substr(d.opposition.indexOf(' ')+ 1)}));
    for (var i = 0; i < jsonObj.length; i++) {
        var value = jsonObj[i].batting_score;
        value = value.replace('*','');
        if(value ==="DNB" || value ==="TDNB") {
            value = 0;
        };
    jsonObj[i].score = parseInt(value);
    delete jsonObj[i].batting_score;
    }
    return jsonObj;
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
			var temp = getYearlyTimeSeriesData(clean_Data);
			var pieData = getRunsPieData(clean_Data);
			var barData = getCenturiesData(clean_Data);
			var matchesPlayed = GetMatchesPlayed(clean_Data);
			//matchesPlayed.datasets[0] = {...matchesPlayed.datasets[0], ...pieChartStyles2}; 
			var top5Oppo = getTopOpponents(clean_Data);
			//top5Oppo.datasets[0] = {...top5Oppo.datasets[0], ...radarChartStyles, ...{label: "Runs Scored"}};

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

	        			 {(this.state.pieData) && <PieChartOptions title="Run Stats" chartData={pieData} />}
	      			</Col>
	  			</Row>
				</div>
				<div>
				<Row>
					<Col lg="12" md="12" sm="12" className="mb-4">
	        			{(this.state.yearlyData) && <TimeSeriesChart title="Run Stats" chartData={yearlyData} />}
					</Col>
				</Row>
				<Row>
					<Col lg="8" md="8" sm="8">
	        			{(this.state.yearlyData) && <RadarChart title="Top 5 opponents" chartData={radarData}/> }
					</Col>
					<Col lg="4" md="4" sm="4">
	        			{(this.state.matchesPlayed) && <PieChart title="Matches Played" chartData={matchesPlayed} /> }
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