'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import StarRatings from 'react-star-ratings'; 
import { fixHTMLEntities, formatDate } from "@/utils/Helpers";

/*------------------| Images |------------------*/    
import { GoChevronRight } from "react-icons/go"; 
import { FaLink } from "react-icons/fa6";

export default function EmployerProfile(parameters) {  
    const [activeProfileTab, setactiveProfileTab] = useState('all_work');
    const handleTabClick = (tabName) => {
        setactiveProfileTab(tabName);
    };

    const [activeReviewTab, setactiveReviewTab] = useState('completed_jobs');
    const handleReviewTabClick = (tabName) => {
        setactiveReviewTab(tabName);
    };
    const fakeReviewsData = [
        {
            id: 1,
            projectName: 'UI Redesign for webapp',
            rating: 4,
            fromDate: 'Nov 3, 2023',
            toDate: 'Nov 29, 2023',
            jobType: 'Private earnings',
        },
        {
            id: 2,
            projectName: 'Mobile App Development',
            rating: 5,
            fromDate: 'Dec 15, 2023',
            toDate: 'Jan 10, 2024',
            jobType: 'Freelance project',
        },
        {
            id: 3,
            projectName: 'E-commerce Website Redesign',
            rating: 3,
            fromDate: 'Sep 8, 2023',
            toDate: 'Oct 5, 2023',
            jobType: 'Contract work',
        },
        {
            id: 4,
            projectName: 'Logo Design for Startup',
            rating: 4,
            fromDate: 'Oct 12, 2023',
            toDate: 'Nov 7, 2023',
            jobType: 'Part-time gig',
        },
        {
            id: 5,
            projectName: 'Web Development for Nonprofit',
            rating: 5,
            fromDate: 'Nov 15, 2023',
            toDate: 'Dec 10, 2023',
            jobType: 'Volunteer project',
        },
    ];
    return (
        <div className="profile_page">
            <div className="profile_container">
                <div className="profile_top">
                    <div className="profile_img"> 
                        <img src='/assets/images/icons/online_status_off.svg' className='status_icon' />
                        <img src='https://images.unsplash.com/photo-1600486913747-55e5470d6f40' />
                    </div>
                    <div className="profile_details">
                        <div className="profile_name">
                            <h2>{parameters.params.username}</h2> <img src='/assets/images/icons/verified.svg' />
                        </div>
                        <div className="profile_location">
                            <img src='/assets/images/icons/location.svg' /> <span>Yogyakarta, Indonesia</span>
                        </div>
                        <div className="profile_badges">
                            <div className="profile_badge">
                                <img src='/assets/images/icons/job_success.png' />
                                <span>96% Job Success</span>
                            </div>
                            <div className="profile_badge">
                                <img src='/assets/images/icons/top_rated.svg' />
                                <span>Top Rated Plus</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_bottom">
                    <div className="profile_left">
                        <div className="navigate_profile_tabs">
                            <h3>View profile</h3>
                            <div className="navigate_tabs_container">
                                <div className={`single_nav_tab ${activeProfileTab === 'ui_ux' ? 'current_tab' : ''}`}
                                    onClick={() => handleTabClick('ui_ux')}>
                                    <span>UX/UI Design</span> <GoChevronRight />
                                </div>
                                <div className={`single_nav_tab ${activeProfileTab === 'frontend' ? 'current_tab' : ''}`}
                                    onClick={() => handleTabClick('frontend')}>
                                    <span>Front-End Development</span> <GoChevronRight />
                                </div>
                                <div className={`single_nav_tab ${activeProfileTab === 'all_work' ? 'current_tab' : ''}`}
                                    onClick={() => handleTabClick('all_work')}>
                                    <span>All work</span> <GoChevronRight />
                                </div>
                            </div>
                        </div>
                        <div className="ready_to_work">
                            <h3>Ready to work with Iqbal A.?</h3>
                            <Link href="#" className='sign_up'>Sign up</Link>
                            <div className="already_have_account">
                                Already have an account? <Link href="#" >Log in</Link>
                            </div>
                        </div>
                        <div className="profile_summary_stats">
                            <div className="single_summary">
                                <strong>109</strong> <span>Total jobs</span>
                            </div>
                            <div className="single_summary">
                                <strong>2,974</strong> <span>Total hours</span>
                            </div>
                        </div>
                        <div className="other_profile_details">
                            <div className="row_profile_details">
                                <h3>Hours per week</h3>
                                <p>As Needed - Open to Offers</p>
                                <p>&lt; 24 hrs response time </p>
                                <p>Open to contract to hire </p>
                            </div>
                            <div className="row_profile_details">
                                <h3>Associated with</h3>
                                <p><span>Teamup Agency</span> 543 hours</p>
                                <p>100% Job Success</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile_right">
                        {activeProfileTab === 'all_work' &&
                            <div className="profile_tab_content">
                                <div className="top_profile_tab">
                                    <h4>UI UX designer | Website designer, App designer & Figma designer</h4>
                                    <div className="right_tab_side">
                                        <span>$30.00/hr</span>
                                        <div className="link_icon">
                                            <FaLink />
                                        </div>
                                    </div>
                                </div>
                                <div className="profile_tab_description">
                                    {fixHTMLEntities( 
                                        <>
                                            <p>
                                                Highly experienced and strong 7 years of experience in ui & ux design to help you make a great wow factor and boost your customer satisfaction for your website design, mobile design or Figma design.
                                            </p>
                                            <p>
                                                🏆 Top 3% on Upwork as Top-rated Plus talent <br />
                                                ⭐ 70+ finished projects & products <br />
                                                2000+ hours as professional <br />
                                                😁 Fun to work with <br />
                                                💪 Flexible problem-solving approach
                                            </p>
                                            <p>
                                                Also, I&apos;m the founder of an Indonesia-based design agency, where I lead a team of talented Website designer, UX designers and Figma designer. I take a flexible problem-solving approach to every project, and I&apos;m confident that my experience and expertise can help us create a functional and visually appealing design for your website or app.
                                            </p>
                                            <p>
                                                My design deliverables: <br />
                                                ✅ Dashboard UI UX Design <br />
                                                ✅ Website UI UX Design <br />
                                                ✅ Android UI UX Design <br />
                                                ✅ iOS UI UX Design <br />
                                                ✅ Responsive website design <br />
                                                ✅ Sitemap <br />
                                                ✅ User Flow <br />
                                                ✅ Wireframes <br />
                                                ✅ Prototyping <br />
                                                ✅ UX Research <br />
                                                ✅ Design system / Design tokens <br />
                                                ✅ Design documentation
                                            </p>
                                            <p>
                                                I always begin every project by working closely with clients to understand their needs and brainstorm ideas. I then create a rough product requirements or sitemap and craft high-fidelity designs that meet their unique needs.
                                            </p>
                                            <p>
                                                My design tools: <br />
                                                🎨 FIGMA / SKETCH for design <br />
                                                🎨 TRELLO / ASANA for project management
                                            </p>
                                            <p>
                                                Take a look at my Upwork profile and portfolio to see if I&apos;m the right fit for your project. I&apos;m excited to hear more about your ideas and help bring them to life. Don&apos;t hesitate to send me a job invitation and let&apos;s chat!
                                            </p>
                                            <p>
                                                ----- <br />
                                                My specialities <br />
                                                UI/UX Designer, Website designer, Mobile app designer, Figma designer, User Interface, User Experience,
                                                Android designer, iOS designer, Professional designer, Senior designer, Website redesign, Mobile app redesign,
                                                Dashboard designer, Dashboard redesign, Responsive website designer, SaaS designer
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        }
                        <div className="book_consultation">
                            <h3>Book a consultation</h3>
                            <div className="book_consultation_container">
                                <div className="left_consultation">
                                    <h4>Design Consultation</h4>
                                    <div className="icon_video">
                                        <img src='/assets/images/icons/video_icon.svg' /> 
                                        <p>$30 per 30 min Zoom meeting</p>
                                    </div>
                                    <div className="consultation_tags">
                                        <Link href="#" className='single_tag'>Mobile App Design</Link>
                                        <Link href="#" className='single_tag'>Resume Design</Link>
                                        <Link href="#" className='single_tag'>Web Design</Link>
                                    </div>
                                </div>
                                <Link href="#" className='book_consultaion_cta'>Book a consultation</Link> 
                            </div>
                        </div>
                        <div className="work_history">
                            <div className="work_history_top">
                                <h3>Work history</h3>
                                <nav>
                                    <div className={`review_tab_nav ${activeReviewTab === 'completed_jobs' ? 'current_reviews' : ''}`} onClick={() => handleReviewTabClick('completed_jobs')}>
                                        Completed jobs (99)
                                    </div>
                                    <div className={`review_tab_nav ${activeReviewTab === 'in_progress' ? 'current_reviews' : ''}`} onClick={() => handleReviewTabClick('in_progress')}>
                                        In progress (10)
                                    </div>
                                </nav>
                            </div>
                            {activeReviewTab === 'completed_jobs' &&
                                <div className="reviews_tab_container">
                                    {fakeReviewsData.map(review => (
                                        <div className="single_review" key={review.id}>
                                            <h4>{review.projectName}</h4>
                                            <div className="reviews_details">
                                                <div className="star_rating">
                                                    <StarRatings
                                                        rating={review.rating}
                                                        starRatedColor="#E36103"
                                                        starEmptyColor="#96b0bd"
                                                        numberOfStars={5}
                                                        starDimension="18px"
                                                        starSpacing="1px"
                                                    />
                                                    <span>{review.rating}.00</span>
                                                </div>
                                                <div className="review_details_divider"></div>
                                                <div className="date_from_to">
                                                    <span className='date_from'>{review.fromDate}</span> - <span className='date_to'>{review.toDate}</span>
                                                </div>
                                            </div>
                                            <div className="review_job_type">{review.jobType}</div>
                                        </div>
                                    ))}
                                </div>
                            }
                            <div className="more_reviews">
                                Iqbal A. has more jobs. <span>Create an account to review them</span>
                            </div>
                        </div>
                        <div className="portfolio_work">
                            <h3>Portfolio</h3>
                            <div className="portfolio_container">
                                <div className="single_portfolio_work">
                                    <img src='/assets/images/portfolio_works/work_1.png' />
                                    <h4>UI UX Designer - Healthcare dashboard</h4>
                                </div>
                                <div className="single_portfolio_work">
                                    <img src='/assets/images/portfolio_works/work_2.png' />
                                    <h4>UI UX Designer - NFT Landing page</h4>
                                </div>
                                <div className="single_portfolio_work sign_up_card">
                                    <h3>Want to see more?</h3>
                                    <div className="sign_up_btn">Sign up</div>
                                </div>
                            </div>
                        </div>
                        <div className="profile_skills">
                            <h3>Skills</h3>
                            <div className="profile_skills_container">
                                <Link href="#" className='profile_skill'> Figma </Link>
                                <Link href="#" className='profile_skill'> Graphic Design </Link>
                                <Link href="#" className='profile_skill'> Mobile App Design </Link>
                                <Link href="#" className='profile_skill'> Wireframing </Link>
                                <Link href="#" className='profile_skill'> Webflow </Link>
                                <Link href="#" className='profile_skill'> Website Redesign </Link>
                                <Link href="#" className='profile_skill'> Landing Page </Link>
                                <Link href="#" className='profile_skill'> Web Design </Link>
                                <Link href="#" className='profile_skill'> Mobile UI Design </Link>
                                <Link href="#" className='profile_skill'> User Experience Design </Link>
                                <Link href="#" className='profile_skill'> UI/UX Prototyping </Link>
                                <Link href="#" className='profile_skill'> User Interface Design </Link>
                                <Link href="#" className='profile_skill'> UX & UI </Link>
                                <Link href="#" className='profile_skill'> Landing Page Design </Link>
                                <Link href="#" className='profile_skill'> Design-to-Code </Link> 
                            </div>
                        </div>
                        <div className="project_catalog">
                            <h3>Project catalog </h3>
                            <p>Get started working with Iqbal quickly with these predefined projects.</p>
                            <div className="single_project_catalog">
                                <div className="project_img">
                                    <img src='/assets/images/project_catalog_1.png' />
                                </div>
                                <div className="project_details">
                                    <h4   className='project_name'>You will get a fantastic Landing page design in Figma</h4>
                                    <div  className="project_time">2 days delivery</div>
                                    <Link className='view_project' href="#">View project</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}