//Radar.js
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

class RadarChart extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

    componentDidMount() {
    console.log(this.props);
    const chartConfig = {
      type: "radar",
      data: this.props.chartData,
      options: {
        ...{
            scale: {
                angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 50,
                suggestedMax: 100
            }
            },
            tooltips: {
              mode: 'point'
            }
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
            height="150"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col>
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

RadarChart.propTypes = {
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

RadarChart.defaultProps = {
  title: "Radar Chart",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [10, 20, 30, 40, 50, 28],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.9)",
        ]
      },
      {
        hoverBorderColor: "#ffffff",
        data: [105, 260, 330, 420, 50, 28],
        backgroundColor: [
          "rgba(0,123,252,0.9)",
          "rgba(0,123,252,0.9)",
          "rgba(0,123,252,0.9)",
          "rgba(0,123,252,0.9)",
          "rgba(0,123,252,0.9)",
          "rgba(0,123,252,0.9)",
        ]
      }
    ],
    labels: ["A", "B", "C", "D", "E", "F"]
  }
};

export default RadarChart;