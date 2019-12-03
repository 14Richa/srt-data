//data_prep.js


export function getData(type)
{
	const csvFilePath='../assets/sachin.csv'
	const csv=require('csvtojson')
	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
		if(type==="Yearly")
		{
			var yearly_runs = getYearlyData(jsonObj);
			return yearly_runs
		}

	})
}

function getYearlyData(jsonObj)
{
	jsonObj = jsonObj.map( d => ({...d, year: d.date.split(" ")[2]})) ;
	//console.log(jsonObj);
	var yearlyScore = aggregate_score(jsonObj);
	
	return yearlyScore
}
 

function aggregate_score( jsonObj)
{
	var obj = {};
	for(var i = 0; i < jsonObj.length; i++) {
		var key = jsonObj[i].year;
		var value = jsonObj[i].batting_score;
		value = value.replace('*','');
		if(value ==="DNB" || value ==="TDNB") {
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
										data: data
										
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
	let chartData = {labels: labels, datasets: [{data: data}]};

	return chartData;

}