'use client';
import React, { useState } from 'react';

import { CiSearch } from "react-icons/ci";
import { CiGrid31 } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa6";

export default function Proposals() {
    const AllProposals = [
        {
            id: 0,
            row_title: "Jane Cooper",
            row_company: "Microsoft",
            row_phone: "(225) 555-0118",
            row_email: "jane@microsoft.com",
            row_country: "United States",
            row_status: "inactive",
        },
        {
            id: 1,
            row_title: "Floyd Miles",
            row_company: "Yahoo",
            row_phone: "(205) 555-0100",
            row_email: "floyd@yahoo.com",
            row_country: "Kiribati",
            row_status: "active",
        },
        {
            id: 2,
            row_title: "Ronald Richards",
            row_company: "Adobe",
            row_phone: "(302) 555-0107",
            row_email: "ronald@adobe.com",
            row_country: "Israel",
            row_status: "active",
        },
        {
            id: 3,
            row_title: "Marvin McKinney",
            row_company: "Tesla",
            row_phone: "(252) 555-0126",
            row_email: "marvin@tesla.com",
            row_country: "Iran",
            row_status: "active",
        },
    ]
    const [selectedStatusOption, setSelectedStatusOption] = useState('all');
    const filteredRows = AllProposals.filter(single_data => {
        if (selectedStatusOption === 'all') {
            return true; 
        } else {
            return single_data.row_status === selectedStatusOption;
        }
    });

    return (
        <div className="proposals_page">
            <h2>Welcome To Jobs<span>3</span></h2>
            <div className="form_filter">
                <div className="search_container">
                    <CiSearch />
                    <input type="text" placeholder='AI SEARCH' />
                </div>
                <div className="filter_options">
                    <div className="f_option"><CiGrid31 /> Category</div>
                    <div className="f_option"><CgSortAz /> Sort By : <span>Popular</span></div>
                </div>
            </div>
            <div className="data_table"> 
                <h3>All proposals</h3>
                <div className="table_head">
                    <div className="col_1 customer_name">Customer Name</div>
                    <div className="col_1 company_name">Company</div>
                    <div className="col_1 email_txt">Phone</div>
                    <div className="col_1 phone_txt">Email</div>
                    <div className="col_1 country_txt">Country</div>
                    <div className="col_1 table_status">
                        <div className="button_dropdown">
                            <div className="button_trigger">
                                <span>Status</span> <FaAngleDown />
                            </div>
                            <div className="button_dropdown_content">
                                <div className="dropdown_option choosen_option" onClick={() => setSelectedStatusOption('all')}>All</div>
                                <div className="dropdown_option" onClick={() => setSelectedStatusOption('active')}>Active</div>
                                <div className="dropdown_option" onClick={() => setSelectedStatusOption('inactive')}>Inactive</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table_content">
                    {filteredRows.map(single_data => (
                        <div className="table_row" key={single_data.row_id}>
                            <div className="col_1 content_name"> <span>{single_data.row_title}</span> </div>
                            <div className="col_1 tb_content content_company">{single_data.row_company}</div>
                            <div className="col_1 tb_content content_phone">{single_data.row_phone}</div>
                            <div className="col_1 tb_content content_email">{single_data.row_email}</div>
                            <div className="col_1 tb_content content_country">{single_data.row_country}</div>
                            <div className="col_1 content_status">
                                <div className={`col_1 status_btn ${single_data.row_status}`}>
                                    {single_data.row_status}
                                </div>
                            </div> 
                        </div>
                    ))}
                </div>
                <div className="table_pagination">
                    <p className="showing_data">Showing data 1 to 4 of  256K entries</p>
                    <div className="pagination_numbers">
                        <div className="left_arrow">&lt;</div>
                        <div className="single_pagination_num current_data">1</div>
                        <div className="single_pagination_num">2</div>
                        <div className="single_pagination_num">3</div>
                        <div className="single_pagination_num">4</div>
                        <span className="pagination_separator">...</span>
                        <div className="single_pagination_num">40</div>
                        <div className="left_arrow">&gt;</div>
                    </div>
                </div>
            </div>
        </div > 
    )
} 