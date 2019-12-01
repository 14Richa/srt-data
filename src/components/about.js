import React from 'react';
import srt from '../images/srt.jpg';
import { Container, Row, Col } from "shards-react";


function About() {

	return (
		<div className="mb-10">
		<h1  style = {{marginBottom: "30px", fontFamily: "san-sarif", fontStyle: "bold", color: "black"}}> Sachin Ramesh Tendulkar </h1>
		<Row >
		<Col>
		</Col>
				<Col >
				<img  src = {srt} style = {{height: "500px", marginBottom: "20px" }}/>
      			</Col>
      			<Col >
  					<div className = "card mt-4" >
						<div className = "card-body" style = {{fontFamily: "Vollkorn", fontStyle: "italic", color: "black", textAlign: "left"}}>
						<div style = {{ color: "black"}}> "On a train from Shimla to Delhi, there was a halt at one of the stations. The train stopped by for few minutes as usual. Sachin was nearing a century, batting on 98. The passengers, railway officials, everyone on the train waited for Sachin to complete the century. This genius can stop time in India!"</div>
						</div>
					</div>
        			 
      			</Col>
      			<Col>
      			</Col>
		</Row>
		
		
		</div>
		


	);
}


// <div class = "card" style = {{marginTop: "10px", width: "960px"}}>
// 		<div class = "card-body">
// 			<p style = {{ color: "black"}}> Sachin Ramesh Tendulkar (born 24 April 1973) is an Indian former international cricketer and a former captain of the Indian national team. He is widely regarded as one of the greatest batsmen in the history of cricket.[4] He is the highest run scorer of all time in International cricket. Tendulkar took up cricket at the age of eleven, made his Test debut on 15 November 1989 against Pakistan in Karachi at the age of sixteen, and went on to represent Mumbai domestically and India internationally for close to twenty-four years. He is the only player to have scored one hundred international centuries, the first batsman to score a double century in an ODI, the holder of the record for the most runs in both Test and ODI, and the only player to complete more than 30,000 runs in international cricket</p>
// 		</div>
// 		</div>



export default About;



