import React from "react";

// Components
import Layout from "@/components/layout/Layout";

const roadmap = () => {
	return (
		<Layout pageClass="roadmap_page">
			<div className="container roadmap_page">
				<h2>Roadmap</h2>
				<p>Please note that the dates are not final</p>

				<section className="roadmap-container">
					{/* Block 1 - Left */}
					<div className="grid-roadmap">
						<div className="grid-left active">
							<ul className="active">
								<li>
									<img
										src={"/assets/icons/block-1/icon-1.png"}
									/>
									<p>EVM support for parachains</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-1/icon-2.png"}
									/>
									<p>
										SubQuery Academy <br /> Proof of
										indexing
									</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-1/icon-1.png"}
									/>
									<p>Premium enterprise service</p>
								</li>
							</ul>
						</div>
						<div className="grid-right-blank">
							<p className="now">March</p>
						</div>
					</div>

					{/* Block 2 - Right */}
					<div className="grid-roadmap">
						<div className="grid-left-blank">
							<p className="now">April</p>
						</div>
						<div className="grid-right">
							<ul>
								<li>
									<h2 className="milestone">Milestone 2 <small className="date">(April)</small></h2>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-1.png"}
									/>
									<p>SubQuery Builders/Grants Program</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-2.png"}
									/>
									<p>
										SQT Network contract internal MVP <br />{" "}
										Coordinator and client SDK
										implementations
									</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-2.png"}
									/>
									<p>EU cluster</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-3.png"}
									/>
									<p>subql init improvements</p>
								</li>
							</ul>
						</div>
					</div>

					{/* Block 3 - Left */}
					<div className="grid-roadmap">
						<div className="grid-left">
							<ul>
								<li>
									<h2 className="milestone">Milestone 3 <small className="date">(May)</small></h2>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-2.png"}
									/>
									<p>Public testnet launch</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-2.png"}
									/>
									<p>
										SubQuery Network Explorer and dApp{" "}
										<br /> Point-in-time indexing
									</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-1/icon-1.png"}
									/>
									<p>
										SQT Network contract v1 and external
										code audit
									</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-2.png"}
									/>
									<p>
										Internal micropayments testing <br />{" "}
										Enterprise health monitoring
									</p>
								</li>
							</ul>
						</div>
						<div className="grid-right-blank">
							<p className="now">May</p>
						</div>
					</div>

					{/* Block 4 - Right */}
					<div className="grid-roadmap">
						<div className="grid-left-blank">
							<p className="now">June</p>
						</div>
						<div className="grid-right">
							<ul>
								<li>
									<h2 className="milestone">Milestone 4 <small className="date">(June)</small></h2>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-2.png"}
									/>
									<p>$THREE token generation event</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-2.png"}
									/>
									<p>
										Public incentivised testnet launch{" "}
										<br />
										Data traffic insights and reporting
									</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-3.png"}
									/>
									<p>Scalable intelligent routing</p>
								</li>
							</ul>
						</div>
					</div>

					{/* Block 5 - Left */}
					<div className="grid-roadmap">
						<div className="grid-left">
							<ul>
								<li>
									<h2 className="milestone">Milestone 5 <small className="date">(Q2 2025)</small></h2>
								</li>
								<li>
									<img
										src={"/assets/icons/block-1/icon-2.png"}
									/>
									<p>Launch of the SubQuery Foundation</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-1/icon-2.png"}
									/>
									<p>
										Finalise research for other Layer-1
										chains <br />
										Liquidity mining program
									</p>
								</li>
							</ul>
						</div>
						<div className="grid-right-blank">
							<p className="now">Q2 2025</p>
						</div>
					</div>

					{/* Block 6 - Right */}
					<div className="grid-roadmap">
						<div className="grid-left-blank">
							<p className="now">Q3 2025</p>
						</div>
						<div className="grid-right">
							<ul>
								<li>
									<h2 className="milestone">Milestone 5 <small className="date">(Q3 2025)</small></h2>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-2.png"}
									/>
									<p>Mainnet launch</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-2.png"}
									/>
									<p>Centralised exchange launch</p>
								</li>
							</ul>
						</div>
					</div>

					{/* Block 7 - Left */}
					<div className="grid-roadmap">
						<div className="grid-left">
							<ul>
								<li>
									<h2 className="milestone">Milestone 6</h2>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-2.png"}
									/>
									<p>SubQuery launches its own parachain</p>
								</li>
								<li>
									<img
										src={"/assets/icons/block-2/icon-1.png"}
									/>
									<p>
										SubQuery Foundation moves towards a DAO
									</p>
								</li>
							</ul>
						</div>
						<div className="grid-right-blank">
							<p className="now"></p>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default roadmap;
