//Import libs
import React from 'react';
import * as d3 from "d3";
//Import components
import {  Row, Col } from "shards-react";
import TimeSeriesChart from './timeserieschart';
import BarChart from './barchart';
import RadarChart from './radarchart';
import PieChart from './piechart';
import PieChartOptions from './piechartopt';
//Import Functions
import { getTopOpponents, getCountriesScoreAggregate, getMatchesResultsWithScores, GetMatchesPlayed, getYearlyTimeSeriesData, getRunsPieData, 
	getCenturiesData, getGrounds, getCountriesGroundMap  } from '../utils/data_prep.js';
//Import Data
import data from '../assets/sachin.csv';
import MapChartWrapper from './mapchartwrapper';





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
			var top5Oppo = getTopOpponents(clean_Data);
			let countriesData = getCountriesGroundMap(clean_Data);
			let countries_score = getCountriesScoreAggregate(countriesData);
			let ScoreResult = getMatchesResultsWithScores(clean_Data);
			

			this.setState({
        		yearlyData: temp,
        		pieData: pieData,
        		barData: barData,
        		radarData: top5Oppo,
        		matchesPlayed: matchesPlayed,
        		countries_score: countries_score,
        		score_result: ScoreResult 
      });
		}).catch(function(err){
					throw err;
		})
	}
	

	render() {
		const { yearlyData, pieData, barData, radarData, matchesPlayed, countries_score, score_result } = this.state;
		return (
		<div>
		<Row>
		<Col sm="12" md="4" lg="2" >
		</Col>
		<Col sm="12" md="4" lg="8">
				<div style = {{ marginBottom: "10px", paddingTop: "20px"}} >
				  <div className ="mb-4">
				    We here take a look at Sachin's batting numbers in terms of centuries and fifties in the first card below. The second card tells us his statistics sliced at two dimentions, across match results and across innings played.
				  </div>
				</div>
				<div>
				<Row>
					<Col>
					</Col>
					<Col lg="6" md="6" sm="6" className="mb-4">
					{(this.state.barData) && <BarChart title="Number of 100s and 50s" chartData={barData}/>}
	      			</Col>
	      			<Col lg="4" md="4" sm="4" className="mb-4">

	        			 {(this.state.pieData) && <PieChartOptions title="Run Stats" chartData={pieData} />}
	      			</Col>
	      			<Col>
	      			</Col>
	  			</Row>
				</div>

				

				<div>
				<Row>
				<Col lg="4" md="4" sm="4" className="mb-4">
				<div style = {{ marginBottom: "10px", paddingTop: "20px"}} >
				  <div className ="mb-4">
				    In the adjacent graph we take a look at how Sachin's performance remained over the course of his career spanning more than two decades! 
				    I have also plotted the runs he scored for India in the matches India won and lost respectively in a separate line in the same plot. 
				    <b>1998</b> was the best year for Sachin in which he scored moe than 1800 runs in a single year.
				  </div>
				</div>
				</Col>
					<Col lg="7" md="7" sm="7" className="mb-4">
	        			{(this.state.yearlyData) && <TimeSeriesChart title="Runs scored over the years" chartData={yearlyData} />}
					</Col>
					
					
				</Row>
				<Row>
					<Col lg="7" md="7" sm="7">
					<div className ="mb-4">
				    In the below radar chart we take a look at which countries bore the brunt of Sachin's batting the maximum. Sachin performed best against Sri Lanka followed closely by Australia. But this data independenttly is not enough.
				    In the adjacent piechart, we can see the number of matches Sachin played against the top teams. 
				    </div>
				    <Row>
				    
				    <Col lg="10" md="10" sm="10" className ="mt-3">
	        			{(this.state.yearlyData) && <RadarChart title="Top 5 opponents" chartData={radarData}/> }
	        			</Col>
	        			<Col lg="2" md="2" sm="2">
				    </Col>
	        		</Row>
					</Col>			
					<Col lg="5" md="5" sm="5">
						<Row>
						
						<Col lg="10" md="10" sm="10">
	        			{(this.state.matchesPlayed) && <PieChart title="Matches Played" chartData={matchesPlayed} /> }
	        			</Col>
	        			<Col lg="2" md="2" sm="2">
	        			</Col>
	        			</Row>
	        			<div className ="mb-4 mt-3">
				    		In the above pie-chart we see the matches Sachin played against different teams. As expected Sachin played maximum number of matches against Sri Lanka and Australia against whom he also scored the maximum runs.
			    		</div>
				    	
					</Col>

				</Row>
				
			</div>
			</Col>
			<Col sm="12" md="4" lg="2" >
			</Col>
			</Row>
			<Row className= "mb-4">
			<Col>
			</Col>
				<Col >
	        			{(this.state.matchesPlayed) && <PieChart title="Matches where Sachin scored more than fifty runs" chartData={score_result.MoreThan} /> }
    			</Col>
    			<Col>
    				There is a popular opinion that whenever Sachin scored runs India lost the match. In these pie charts we see that it is quite the contrary. Of all the matches where Sachin score more than 50 runs 
    				India ended up winning 65% of those games. Whereas matches in which Sachin scored less than 30 runs India ended up losing 54% of those games.
    			</Col>
    			<Col >
	        			{(this.state.matchesPlayed) && <PieChart title="Matches where Sachin scored less than thirty runs" chartData={score_result.LessThan} /> }
				</Col>
				<Col>
				</Col>

			</Row>
			<Row className= "mt-4">

			<Col  lg="2" md="2" sm="2" >
			</Col>
			<Col  lg="8" md="8" sm="8" className= "mt-4" >
			In the below map, we can see which grounds and pitches Sachin loved playing on. It is a heatmap representation of all the runs he scored over his career across different countries. Sachin scored maximum runs when playing in India. 
			<MapChartWrapper data={countries_score}/>
			</Col>
			<Col  lg="2" md="2" sm="2" >
			</Col>
			</Row>
		</div>
		)
	}
}


export default TimeLine;