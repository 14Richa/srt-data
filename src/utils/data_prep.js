//data_prep.js

export function getData(type)
{
	const csvFilePath='../assets/sachin.csv'
	const csv=require('csvtojson')
	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
		if(type=="Yearly")
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