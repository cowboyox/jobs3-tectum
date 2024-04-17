import React from "react";

// Components
import Layout from "@/components/layout/Layout";

// Helpers
import { formatMilestoneDate, isEven } from "@/utils/Helpers";

const fetchBoardData = async () => {
  try {
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMxMDgxNTM5MSwiYWFpIjoxMSwidWlkIjo2NDI5OTYxLCJpYWQiOiIyMDI0LTAxLTE2VDE1OjI3OjE1LjAwMFoiLCJwZXIiOiJtZTp3cml0ZSIsImFjdGlkIjoyOTAyODM2LCJyZ24iOiJ1c2UxIn0.Upn8J5NCmS-djtLbl3OzzBmPLxIbh7UHMgOdjM2gGzc'
      },
      body: JSON.stringify({
        query: `query { boards(ids: 6240500320) { id name groups(ids: ["new_group14820"]) { title items_page { items { name subitems { name column_values { id value } } } } } } }`
      })
    });

    const data = await response.json();
    return data.data.boards[0].groups[0].items_page.items;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const roadmap = async () => {
	const boardData = await fetchBoardData();

	return (
		<Layout pageClass="roadmap_page">
			<div className="container roadmap_page">
				<h2>Roadmap</h2>
				<p>Please note that the dates are not final</p>

				<section className="roadmap-container">
					{boardData.length > 0 &&
						boardData.map((milestone, index) => {
							if (isEven(index + 1)) {
								// Block - Right
								return (
									<div key={index} className="grid-roadmap">
										<div className="grid-left-blank"></div>
										<div className="grid-right">
											<ul>
												<li>
													<h2 className="milestone">
														{milestone.name}
													</h2>
												</li>
												{milestone?.subitems.map(
													(goal, index) => {
														return (
															<li key={index}>
																<p>
																	{goal.name}
																</p>
																<p
																	className="now"
																	style={{
																		color: "#de9749",
																	}}
																>
																	(
																	{formatMilestoneDate(
																		goal
																			.column_values[2]
																			.value
																	)}
																	)
																</p>
															</li>
														);
													}
												)}
											</ul>
										</div>
									</div>
								);
							} else {
								// Block - Left
								return (
									<div key={index} className="grid-roadmap">
										<div className={`grid-left ${index == 0 ? 'active' : ''}`}>
											<ul className={`${index == 0 ? 'active' : ''}`}>
												<li>
													<h2 className="milestone">
														{milestone.name}
													</h2>
												</li>
												{milestone?.subitems.map(
													(goal, index) => {
														return (
															<li key={index}>
																<p>
																	{goal.name}
																</p>
																<p
																	className="now"
																	style={{
																		color: "#de9749",
																	}}
																>
																	(
																	{formatMilestoneDate(
																		goal
																			.column_values[2]
																			.value
																	)}
																	)
																</p>
															</li>
														);
													}
												)}
											</ul>
										</div>
										<div className="grid-right-blank"></div>
									</div>
								);
							}
						})}
				</section>
			</div>
		</Layout>
	);
};

export default roadmap;
