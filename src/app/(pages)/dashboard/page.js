'use client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import DataTable from '../../../components/elements/data_table';
import PieChart from '../../../components/elements/pie_chart';

import { useToast } from '@/components/ui/use-toast';

export default function ClientDashboard() {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    name: '',
    role: [0],
    verified: false,
  });
  console.log('Test');
  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    if (tmp === null) {
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Please Login First</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
      alert('Please Login First');
      router.push('/');
    } else {
      setUser(JSON.parse(tmp).data.user);
    }
  }, [router, toast]);
  const assets_data = {
    chart: {
      backgroundColor: 'transparent',
      type: 'pie',
    },
    series: [
      {
        borderRadius: 0,
        colors: ['#96B0BD', '#E8E4D8', '#E36103', '#516170'],
        data: [
          {
            name: 'Shortlisted',
            y: 70,
            z: 100,
          },
          {
            name: 'Rejected',
            y: 13,
            z: 97,
          },
          {
            name: 'Hired',
            y: 10,
            z: 96,
          },
          {
            name: 'Waiting',
            y: 7,
            z: 95,
          },
        ],
        dataLabels: {
          enabled: false, // Disable data labels
        },
        innerSize: '70%',
        minPointSize: 30,
      },
    ],
    title: {
      text: '',
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b>{point.name}',
    },
  };
  const table_data = [
    {
      id: 0,
      row_category: 'Full Time',
      row_status: 'inactive',
      row_title: 'UI UX Designer',
      row_type: '12',
    },
    {
      id: 1,
      row_category: 'Full Time',
      row_status: 'active',
      row_title: 'UI UX Designer',
      row_type: '12',
    },
    {
      id: 2,
      row_category: 'Full Time',
      row_status: 'active',
      row_title: 'UI UX Designer',
      row_type: '100',
    },
  ];
  const chart_options = {
    chart: {
      backgroundColor: 'transparent',
      height: 100,
      margin: [0, 0, 0, 0],
      type: 'spline',
    },
    plotOptions: {
      series: {
        color: '#96B0BD',
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        data: [50, 42, 45, 50, 45, 50, 40, 50, 43, 50, 45, 50],
      },
    ],
    title: {
      text: '',
    },
    tooltip: {
      formatter: function () {
        return this.y;
      },
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
  };
  const chart_options_1 = {
    chart: {
      backgroundColor: 'transparent',
      height: 100,
      margin: [0, 0, 0, 0],
      type: 'spline',
    },
    plotOptions: {
      series: {
        color: '#E36103',
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        data: [50, 42, 45, 50, 45, 50, 40, 50, 43, 50, 45, 50],
      },
    ],
    title: {
      text: '',
    },
    tooltip: {
      formatter: function () {
        return this.y;
      },
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
  };
  const allUserDataAnalytics = [
    {
      analyticsPercent: '+0%',
      analyticsTotal: '0',
      chartData: chart_options_1,
      dataTitle: 'New Candidates to Review',
      id: 0,
    },
    {
      analyticsPercent: '+0%',
      analyticsTotal: '0',
      chartData: chart_options,
      dataTitle: 'Total Application',
      id: 1,
    },
    {
      analyticsPercent: '+0%',
      analyticsTotal: '0',
      chartData: chart_options,
      dataTitle: 'Meetings',
      id: 2,
    },
    {
      analyticsPercent: '+0%',
      analyticsTotal: '0',
      chartData: chart_options,
      dataTitle: 'Messages received',
      id: 3,
    },
  ];
  return (
    <div className='client_dashboard_page'>
      <h2>
        Welcome To Jobs<span>3</span>
      </h2>
      <p>{user.name}</p>
      <div className='client_dashboard_dashboard'>
        <div className='client_dashboard_left_side panels_container'>
          <div className='panel dashboard_top'>
            <div className='panel_top'>
              <div className='left_side'>
                <h3 className='panel_heading'> Application Response </h3>
              </div>
              <div className='right_side'>
                <div className='button_dropdown'>
                  <div className='button_trigger'>
                    <div className='three_dots'>
                      <div className='sl_dot' />
                      <div className='sl_dot' />
                      <div className='sl_dot' />
                    </div>
                  </div>
                  <div className='button_dropdown_content'>
                    <div className='dropdown_option choosen_option'>Choose option</div>
                    <div className='dropdown_option'>Download Report</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='panel_content'>
              <PieChart chart_data={assets_data} />
            </div>
          </div>
          <div className='dashboard_bottom'>
            <DataTable
              category_set={true}
              data_rows={table_data}
              status_set={true}
              table_name='Recent Job Posts'
              type_set={true}
            />
          </div>
        </div>
        <div className='client_dashboard_right_side panels_container'>
          <div className='panel'>
            {allUserDataAnalytics.map((singleDataAnalytics) => (
              <div className='single_user_data' key={singleDataAnalytics.id}>
                <h3>{singleDataAnalytics.dataTitle}</h3>
                <div className='user_data_content'>
                  <div className='user_data_left'>
                    <strong>{singleDataAnalytics.analyticsTotal}</strong>
                    <span>{singleDataAnalytics.analyticsPercent}</span>
                  </div>
                  <div className='chart_right'>
                    <HighchartsReact
                      className='chart_const'
                      highcharts={Highcharts}
                      options={singleDataAnalytics.chartData}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
