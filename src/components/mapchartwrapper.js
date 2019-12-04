import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

//import "./styles.css";

import MapChart from "./mapchart";

function MapChartWrapper(data) {
  const [content, setContent] = useState("");
  return (
    <div>
      <MapChart setTooltipContent={setContent} score={data} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default MapChartWrapper