import React from 'react';

// Components
import Layout from '@/components/layout/Layout';
import CompanyImage from '@/components/pages/jobs/single/CompanyImage';
import { fixHTMLEntities, timeSincePublication } from '@/utils/Helpers';

async function getData(slug) {
  try {
    const res = await fetch(`https://main.jobs3.io/wp-json/wp/v2/jobs?_embed&slug=${slug}`);

    if (!res.ok) {
      throw new Error('Failed to fetch Job');
    }

    const job = await res.json();
    return job;
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Job' });
  }
}

const job = async ({ params }) => {
  const job = await getData(params.slug);

  return (
    <Layout pageClass={'sl_job_page'}>
      <div className='blank_space' style={{ height: '20px' }} />

      <div className='container'>
        <div className='sl_job_container'>
          <div className='sl_job_top'>
            <div className='job_info'>
              <CompanyImage logo={job[0]._gofj_company_logo} />
              <div className='sl_job_details'>
                <ul>
                  {job[0].working_hours != 'Fulltime' ? (
                    <li className='sl_job_tag'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={1.5}
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span>Fulltime</span>
                    </li>
                  ) : (
                    <li className='sl_job_tag'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={1.5}
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span>{job[0].working_hours}</span>
                    </li>
                  )}
                  {job[0].jobsearch_field_location_address != '' && (
                    <li className='sl_job_tag'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={1.5}
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span>{job[0].jobsearch_field_location_address}</span>
                    </li>
                  )}
                </ul>
                <div className='sl_job_name'>
                  {/* <img src={Company_badge_orange} />{" "} */}
                  <h2>{fixHTMLEntities(job[0].title.rendered)}</h2>
                </div>
                <div className='job_details'>
                  <div className='company_name'>CRASTONIC Ltd</div>
                </div>
              </div>
            </div>
            <div className='job_apply'>
              <div className='job_count_details'>
                <span>{timeSincePublication(job[0].jobsearch_field_job_publish_date)}</span>
                <span>{job[0].acf.sl_job_views} Views</span>
              </div>
              <a className='cta_button' href={job[0].jobsearch_field_job_apply_url} target='_blank'>
                Apply Now
              </a>
            </div>
          </div>
          <div className='sl_job_bottom'>
            <div className='sl_job_left'>
              <div className='sl_job_cmp'>
                <h3>Compensation</h3>
                <p>$13k - $70k + Token + Equity</p>
              </div>
              <div className='title_with_links'>
                <h3>Skills</h3>
                <div className='company_links_container'>
                  <a href='#'>Figma</a>
                  <a href='#'>Graphic Design</a>
                  <a href='#'>Mobile App Design</a>
                  <a href='#'>Landing Page</a>
                  <a href='#'>Web Design</a>
                  <a href='#'>Mobile UI Design</a>
                  <a href='#'>User Interface Design</a>
                  <a href='#'>UX & UI</a>
                  <a href='#'>Website Redesign</a>
                  <a href='#'>Wireframing</a>
                  <a href='#'>Webflow</a>
                  <a href='#'>Design-to-Code</a>
                  <a href='#'>User Experience Design</a>
                  <a href='#'>UI/UX Prototyping</a>
                </div>
              </div>
            </div>
            <div className='sl_job_right'>
              <div className='company_description'>
                <h1>About the Job</h1>
                <div
                  className='job_content'
                  dangerouslySetInnerHTML={{
                    __html: job[0].content.rendered,
                  }}
                />
              </div>
              <div className='work_here'>
                <a
                  className='cta_button'
                  href={job[0].jobsearch_field_job_apply_url}
                  target='_blank'
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='ready_to_work'>
          <h2>Ready to work with CRASTONIC Ltd?</h2>
          <a className='sign_up_btn' href='#'>
            Sign Up
          </a>
          <p>
            Already have an account? <a href='#'>Log in</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default job;
