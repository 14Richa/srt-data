//data_prep.js

import {chartStyleWins, chartStyle, chartStyleLosses, barChartStyle1, pieChartStyles2,
		barChartStyle2, pieChartStyles, radarChartStyles} from "../components/style.js"
// export function getData(type)
// {
// 	const csvFilePath='../assets/sachin.csv'
// 	const csv=require('csvtojson')
// 	csv()
// 	.fromFile(csvFilePath)
// 	.then((jsonObj)=>{
// 		if(type==="Yearly")
// 		{
// 			var yearly_runs = getYearlyData(jsonObj);
// 			return yearly_runs
// 		}

// 	})
// }

export function getCenturiesData(jsonObj)
{
	var labels = ["1989-94", "1995-2000", "2001-06", "2007-12"];
	var data100 = [0, 0, 0, 0];
	var data50 = [0, 0, 0, 0];
	var centArray = jsonObj.filter(d => d.score >= 100);
	var fiftArray = jsonObj.filter(d => d.score >= 50 && d.score < 100);
	for(let i=0; i<centArray.length; i++)
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
	for(let i=0; i<fiftArray.length; i++)
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

export function getYearlyTimeSeriesData(jsonObj)
{
	var total = jsonObj;
    var wins = jsonObj.filter( d => d.match_result === "won");
    var losses = jsonObj.filter( d => d.match_result === "lost");

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

export function getRunsPieData(jsonObj)
{
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

export function GetMatchesPlayed (jsonObj)
{
	let opposition = jsonObj.map( d => d.opposition);
	let unique_opposition = opposition.filter((item, i, ar) => ar.indexOf(item) === i);
	let obj = {};
	for (let i = unique_opposition.length - 1; i >= 0; i--) {
		obj[unique_opposition[i]] = 0;
	}
	for (let i = jsonObj.length - 1; i >= 0; i--) {
		obj[jsonObj[i].opposition] += 1;
	}

	var sortable = [];
	var total=0;
	for (var country in obj) {
    	sortable.push([country, obj[country]]);
    	total += obj[country];
	}
	sortable.sort( function(a,b) { return a[1]- b[1];} );

	
	sortable = sortable.slice(sortable.length - 6);
	let temp =0;
	for (var i = sortable.length - 1; i >= 0; i--) {
		temp += sortable[i][1];
	}
	let labels = sortable.map(d => d[0]);
	labels.push("Others");
	let data = sortable.map(d => d[1]);
	data.push(total - temp);
	var chartData = {
						labels: labels,
						datasets: [
									{
										data: data,
										...pieChartStyles2
										
									}
								]
					};

	return chartData;

}

export function getTopOpponents( jsonObj )
{
	let opposition = jsonObj.map( d => d.opposition);
	let unique_opposition = opposition.filter((item, i, ar) => ar.indexOf(item) === i);
	let obj = {};
	for (let i = unique_opposition.length - 1; i >= 0; i--) {
		obj[unique_opposition[i]] = 0;
	}
	for (let i = jsonObj.length - 1; i >= 0; i--) {
		obj[jsonObj[i].opposition] += jsonObj[i].score;
	}

	var sortable = [];
	for (var country in obj) {
    	sortable.push([country, obj[country]]);
	}
	sortable.sort( function(a,b) { return a[1]- b[1];} );

	sortable = sortable.slice(sortable.length - 5);
	let labels = sortable.map(d => d[0]);
	let data = sortable.map(d => d[1]);
	let chartData = {labels: labels, datasets: [{data: data, ...radarChartStyles, ...{label: "Runs Scored"}}]};

	return chartData;

}