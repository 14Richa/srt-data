//BarChart.js
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

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

    componentDidMount() {
    const chartConfig = {
      type: "bar",
      data: this.props.chartData,
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
          },
          scales: {
            xAxes: [{
                stacked: true
            	}],
            yAxes: [{
                stacked: true
            	}]
        	},
        },
        ...this.props.chartOptions
      }
    };

    new Chart(this.canvasRef.current, chartConfig);
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
            height="100"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col>
              <FormSelect
                size="sm"
                value="last-week"
                style={{ maxWidth: "130px" }}
                onChange={() => {}} //Change here to update data.
              >
                <option value="last-week">Last Week</option>
                <option value="today">Today</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </FormSelect>
            </Col>
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
              <a href="#">View full report &rarr;</a>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

BarChart.propTypes = {
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

BarChart.defaultProps = {
  title: "BarChart",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        barPercentage: 0.5,
        //barThickness: 5,
        //maxBarThickness: 8,
        minBarLength: 2,
        data: [10, 20, 30, 40, 50],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.9)",
        ]
      }
    ],
    labels: ["A", "B", "C", "D", "E"]
  }
};

export default BarChart;