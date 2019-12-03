import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

import Chart from "../utils/chart";
var myChart;
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    
    this.buildChart(this.props.chartData);
    console.log(this.props.chartData);

  }

 
  buildChart = (data) => {
    
      const chartConfig = {
      type: "pie",
      data: data,
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };


      myChart = new Chart(this.canvasRef.current, chartConfig);
    }

  

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="300"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col>
              {/*<FormSelect
                size="sm"
                value={this.state.data}
                style={{ maxWidth: "130px" }}
                onChange={(e ) => this.setState({data:e.target.value})}
              >
                <option value="results">Result</option>
                <option value="innings">Innings</option> 
              </FormSelect>*/}
            </Col>
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
             
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

PieChart.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

PieChart.defaultProps = {
  title: "PieChart",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [68.3, 24.2, 7.5],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.5)",
          "rgba(0,123,255,0.3)"
        ]
      }
    ],
    labels: ["Desktop", "Tablet", "Mobile"]
  }
};

export default PieChart;