import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapChart() {
  const highlightedCountries = ["China", "Mexico"]; // insert the names of the countries you want to highlight

  return (

<ComposableMap >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const isHighlighted = highlightedCountries.includes(geo.properties.name);
           
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
              
                  default: {
                    fill: isHighlighted ? "#00723F" : "#D8D8D8",
                  },
                  hover: {
                    fill: "#F53",
                  },
                  pressed: {
                    fill: "#E42",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>

  )
}
