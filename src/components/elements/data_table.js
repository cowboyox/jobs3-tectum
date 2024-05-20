import React, { useState } from 'react';

//------// Media //------//
import { IoClipboardOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";


export default function DataTable( props ) {
    const [selectedStatusOption, setSelectedStatusOption] = useState('all');
    const filteredRows = props.data_rows.filter(single_data => {
        if (selectedStatusOption === 'all') {
            return true; 
        } else {
            return single_data.row_status === selectedStatusOption;
        }
    });
    return (
        <div className="data_table">
            <div className="table_head">
                <div className="half_table">
                    <div className="table_name">{props.table_name}</div>
                </div>
                <div className="half_table">
                    {props.category_set == true && (
                        <div className="col_1 table_category">Category</div>
                    )}
                    {props.type_set == true && (
                        <div className="col_1 table_type">Applications</div>
                    )}
                    {props.status_set == true && (
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
                    )}
                </div>
            </div>
            <div className="table_content">
                { filteredRows.map(single_data => (
                    <div className="table_row" key={single_data.row_id}>
                        <div className="half_table">
                            <div className="col_1 content_name">
                                <div className={`copy_clypboard ${single_data.row_status}`}><IoClipboardOutline /></div> 
                                <span>{single_data.row_title}</span>
                            </div>
                        </div>
                        <div className="half_table">
                            {props.category_set == true && (
                                <div className="col_1 content_category">{single_data.row_category}</div>
                            )}
                            {props.type_set == true && (
                                <div className="col_1 content_type">{single_data.row_type}</div>
                            )}
                            {props.status_set == true && (
                                <div className="col_1 content_status">
                                    <div className={`col_1 status_btn ${single_data.row_status}`}>
                                        {single_data.row_status}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div> 
                )) }
            </div>
        </div>
    )
}