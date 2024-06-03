import React from "react";

// Components
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/navigation";
import SideBar from '@/components/layout/sidebar';
import DashboardHeader from '@/components/layout/dashboard_header'; 

const Orders = () => {
	return (
		<div className="orders_page">
            <DashboardHeader />
            <SideBar />
        </div>
    )}

export default Orders;