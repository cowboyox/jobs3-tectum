import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
// Switched to pie instead of variable pie as it's causing issues for nextjs deployment
// import variablePie from 'highcharts/modules/variable-pie';
// variablePie(Highcharts);

export default function PieChart(props) {
  return (
    <div className={`pie_chart ${props.customClass ? props.customClass : ''}`}>
      <HighchartsReact className='chart_const' highcharts={Highcharts} options={props.chart_data} />
      <div className='chart_keys'>
        <div className='chart_item'>
          <div className='chart_color beige_c' />
          <span className='chart_name'>Shortlisted</span>
          <small className='count'>942</small>
        </div>
        <div className='chart_item'>
          <div className='chart_color orange_c' />
          <span className='chart_name'>Hired</span>
          <small className='count'>25</small>
        </div>
        <div className='chart_item'>
          <div className='chart_color light_c' />
          <span className='chart_name'>Rejected</span>
          <small className='count'>2,452</small>
        </div>
        <div className='chart_item'>
          <div className='chart_color dark_c' />
          <span className='chart_name'>Waiting</span>
          <small className='count'>10</small>
        </div>
      </div>
      <div className='download_report'>Download Report</div>
    </div>
  );
}
