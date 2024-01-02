// SparkLineChart.js

import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const SparkLineChart = ({ data }) => {
  return (
    <div>
      {/* Sparklines component: Container for the Sparkline */}
      <Sparklines data={data} width={180} height={60}>
        {/* SparklinesLine component: Renders the line of the Sparkline */}
        <SparklinesLine color="#1c8cdc" />

        {/* SparklinesSpots component: Renders spots (data points) on the line */}
        <SparklinesSpots style={{ fill: '#1c8cdc' }} />
      </Sparklines>
    </div>
  );
};

export default SparkLineChart;
