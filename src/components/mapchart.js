import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0, 1000])
  .range(["#D6D6DA", "#4ca6ff"]);

const rounded = num => {
  return (num) + " runs scored";
};

const MapChart = ({ setTooltipContent, score }) => {
  console.log(score.data, "check1");
  let countries;
  if(score.data)
  {
    countries = Object.keys(score.data);
  }

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup center={[30,20]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo =>{
                //console.log(countries, "Here2");
                const d = countries.find(s => s === geo.properties.NAME );
                let runs = 0;
                if(d) {runs = score.data[d];console.log(d,"HEre", colorScale(runs));}

                return(
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    console.log(geo);
                    setTooltipContent(`${NAME} — ${rounded(runs)}`);
                  }
                  }
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  fill={d ? colorScale(runs) : "#D6D6DA"}
                  // style={{
                  //   default: {
                  //     fill: "#D6D6DA",
                  //     outline: "none"
                  //   },
                  //   hover: {
                  //     fill: "#4CA6FF",
                  //     outline: "none"
                  //   },
                  //   pressed: {
                  //     fill: "#4495e5",
                  //     outline: "none"
                  //   }
                  // }}
                />
              );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
