import React from "react";

// Dependencies
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

// Components
import SideBar from "./sidebar";
import DashboardHeader from "./dashboard_header";

const DashboardLayout = ({ children, header }) => {
	return (
		<>
			<ProgressBar
				height="4px"
				color="#dc4f14"
				options={{ showSpinner: false }}
				shallowRouting
			/>
			<div className="jobs3_dashboard_app">
				<SideBar />
				<div className="w-full p-4 pt-0 md:w-5/6">
					<div id="page_content_layout">
						<DashboardHeader title={header?.title} />
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
