'use client';
import React,{useState,useEffect} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import PieChart from '../../../components/elements/pie_chart';
import DataTable from  '../../../components/elements/data_table';

export default function ClientDashboard() {
    const { toast } = useToast();
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        name: "",
        role: [0],
        verified: false
    });

    useEffect(() => {
        let tmp = localStorage.getItem('jobs_2024_token');
        if (tmp === null) {
            toast({
                variant: "destructive",
                title: <h1 className='text-center'>Error</h1>,
                description: <h3>Please Login First</h3>,
                className: "bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center"
            });
            alert("Please Login First");
            router.push('/');
        } else {
            setUser(JSON.parse(tmp).data.user);
        }
    }, [])
    const assets_data = {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
        },
        title: {
            text: '',
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b>{point.name}'
        },
        series: [{
            minPointSize: 30,
            innerSize: '70%',
            borderRadius: 0,
            data: [
                {
                    name: 'Shortlisted',
                    y: 70,
                    z: 100
                },
                {
                    name: 'Rejected',
                    y: 13,
                    z: 97
                },
                {
                    name: 'Hired',
                    y: 10,
                    z: 96
                },
                {
                    name: 'Waiting',
                    y: 7,
                    z: 95
                },
            ],
            colors: [
                '#96B0BD',
                '#E8E4D8',
                '#E36103',
                '#516170',
            ],
            dataLabels: {
                enabled: false // Disable data labels
            }
        }],
    };
    const table_data = [
        {
            id: 0,
            row_title: "UI UX Designer",
            row_category: "Full Time",
            row_type: "12",
            row_status: "inactive",
        },
        {
            id: 1,
            row_title: "UI UX Designer",
            row_category: "Full Time",
            row_type: "12",
            row_status: "active",
        },
        {
            id: 2,
            row_title: "UI UX Designer",
            row_category: "Full Time",
            row_type: "100",
            row_status: "active",
        },
    ]
    const chart_options = {
        chart: {
            type: 'spline',
            margin: [0, 0, 0, 0], 
            backgroundColor: 'transparent',
            height: 100,
        },
        title: {
            text: '',
        }, 
        xAxis: {
            visible: false, 
        },
        yAxis: {
            visible: false, 
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,  
                },
                color: '#96B0BD',
            },
        },
        series: [
            {
                data: [50, 42, 45, 50, 45, 50, 40, 50, 43, 50, 45, 50],  
            },
        ],
        tooltip: {
            formatter: function () {
                return this.y; 
            },
        },
    };
    const chart_options_1 = {
        chart: {
            type: 'spline',
            margin: [0, 0, 0, 0], 
            backgroundColor: 'transparent',
            height: 100,
        },
        title: {
            text: '',
        }, 
        xAxis: {
            visible: false, 
        },
        yAxis: {
            visible: false, 
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,  
                },
                color: '#E36103',
            },
        },
        series: [
            {
                data: [50, 42, 45, 50, 45, 50, 40, 50, 43, 50, 45, 50],  
            },
        ],
        tooltip: {
            formatter: function () {
                return this.y; 
            },
        },
    };
    const allUserDataAnalytics = [
        {
            id: 0, 
            dataTitle: 'New Candidates to Review',
            analyticsTotal: '2,456',
            analyticsPercent: "+4.5%",
            chartData: chart_options_1,
        }, 
        {
            id: 1, 
            dataTitle: 'Total Application',
            analyticsTotal: '2,456',
            analyticsPercent: "+4.5%",
            chartData: chart_options,
        }, 
        {
            id: 2, 
            dataTitle: 'Meetings',
            analyticsTotal: '2,456',
            analyticsPercent: "+4.5%",
            chartData: chart_options,
        }, 
        {
            id: 3, 
            dataTitle: 'Messages received',
            analyticsTotal: '2,456',
            analyticsPercent: "+4.5%",
            chartData: chart_options,
        },
    ]
    return ( 
        <div className="client_dashboard_page">
            <h2>Welcome To Jobs<span>3</span></h2>
            <p>Thomas Kyle Wilson</p>
            <div className="client_dashboard_dashboard">
                <div className="client_dashboard_left_side panels_container">
                    <div className="panel dashboard_top">
                        <div className="panel_top">
                            <div className="left_side">
                                <h3 className="panel_heading"> Application Responce </h3>
                            </div>
                            <div className="right_side">
                                <div className="button_dropdown">
                                    <div className="button_trigger">
                                        <div className="three_dots">
                                            <div className='sl_dot'></div>
                                            <div className='sl_dot'></div>
                                            <div className='sl_dot'></div>
                                        </div>
                                    </div>
                                    <div className="button_dropdown_content">
                                        <div className="dropdown_option choosen_option">Choose option</div>
                                        <div className="dropdown_option">Download Report</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel_content">
                            <PieChart chart_data={assets_data} />
                        </div>
                    </div>
                    <div className="dashboard_bottom">
                        <DataTable
                            table_name="Recent Job Posts"
                            category_set={true}
                            type_set={true}
                            status_set={true}
                            data_rows={table_data}
                        />
                    </div>
                </div>
                <div className="client_dashboard_right_side panels_container">
                    <div className="panel">
                        {allUserDataAnalytics.map(singleDataAnalytics => (
                            <div className="single_user_data" key={singleDataAnalytics.id}>
                                <h3>{singleDataAnalytics.dataTitle}</h3>
                                <div className="user_data_content">
                                    <div className="user_data_left">
                                        <strong>{singleDataAnalytics.analyticsTotal}</strong>
                                        <span>{singleDataAnalytics.analyticsPercent}</span>
                                    </div>
                                    <div className="chart_right">
                                        <HighchartsReact
                                            className="chart_const"
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
    )
}