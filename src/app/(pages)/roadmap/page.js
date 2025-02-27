import React from 'react';

import Layout from '@/components/layout/Layout';
import { formatMilestoneDate, formatMilestoneTime, isEven } from '@/utils/Helpers';

const fetchBoardData = async () => {
  try {
    const response = await fetch('https://api.monday.com/v2', {
      body: JSON.stringify({
        query: `
				query { 
					boards(ids: 6240500320) 
					{ 
						id 
						name 
						groups(ids: ["new_group14820"]) { 
							title 
							items_page { 
								items { 
									name 
									subitems 
									{ 
										name 
										column_values 
										{ 
											id 
											value 
										} 
									} 
								} 
							} 
						} 
					} 
				}`,
      }),
      headers: {
        'API-Version': '2024-07',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMxMDgxNTM5MSwiYWFpIjoxMSwidWlkIjo2NDI5OTYxLCJpYWQiOiIyMDI0LTAxLTE2VDE1OjI3OjE1LjAwMFoiLCJwZXIiOiJtZTp3cml0ZSIsImFjdGlkIjoyOTAyODM2LCJyZ24iOiJ1c2UxIn0.Upn8J5NCmS-djtLbl3OzzBmPLxIbh7UHMgOdjM2gGzc',
        'Content-Type': 'application/json',
        'cache-control': 'no-store',
      },
      method: 'POST',
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
    <Layout pageClass='roadmap_page'>
      <div className='roadmap_page container'>
        <h2>Roadmap</h2>
        <p>Please note that the dates are not final</p>

        <section className='roadmap-container'>
          {boardData.length > 0 &&
            boardData.map((milestone, index) => {
              if (isEven(index + 1)) {
                // Block - Right
                return (
                  <div className='grid-roadmap' key={index}>
                    <div className='grid-left-blank' />
                    <div className='grid-right'>
                      <ul>
                        <li>
                          <h2 className='milestone'>{milestone.name}</h2>
                        </li>
                        {milestone?.subitems.map((goal, index) => {
                          // console.log("sub item right => ", goal.column_values)
                          let link = null;
                          if (goal.column_values[4].value) {
                            const { url } = JSON.parse(goal.column_values[4].value);
                            link = url;
                          }
                          return (
                            <li key={index}>
                              {link ? (
                                <a
                                  className='now'
                                  href={link}
                                  style={{
                                    color: '#fff',
                                    display: 'flex',
                                    textDecoration: 'underline',
                                  }}
                                  target='_blank'
                                >
                                  <p
                                    style={
                                      goal.column_values[4].value && { textDecoration: 'underline' }
                                    }
                                  >
                                    {goal.name}
                                  </p>
                                  {(goal.column_values[2].value || goal.column_values[3].value) && (
                                    <p
                                      className='now'
                                      style={{
                                        color: '#de9749',
                                        marginLeft: 10,
                                      }}
                                    >
                                      (
                                      {goal.column_values[2].value ? (
                                        <span
                                          className='now'
                                          style={{
                                            color: '#de9749',
                                          }}
                                        >
                                          {formatMilestoneDate(goal.column_values[2].value)}
                                        </span>
                                      ) : null}
                                      {goal.column_values[3].value ? (
                                        <span
                                          className='now'
                                          style={{
                                            color: '#de9749',
                                            marginLeft: 10,
                                          }}
                                        >
                                          {formatMilestoneTime(goal.column_values[3].value)}
                                        </span>
                                      ) : null}
                                      )
                                    </p>
                                  )}
                                </a>
                              ) : (
                                <>
                                  <p>{goal.name}</p>
                                  {(goal.column_values[2].value || goal.column_values[3].value) && (
                                    <p
                                      className='now'
                                      style={{
                                        color: '#de9749',
                                      }}
                                    >
                                      (
                                      {goal.column_values[2].value ? (
                                        <span
                                          className='now'
                                          style={{
                                            color: '#de9749',
                                          }}
                                        >
                                          {formatMilestoneDate(goal.column_values[2].value)}
                                        </span>
                                      ) : null}
                                      {goal.column_values[3].value ? (
                                        <span
                                          className='now'
                                          style={{
                                            color: '#de9749',
                                            marginLeft: 10,
                                          }}
                                        >
                                          {formatMilestoneTime(goal.column_values[3].value)}
                                        </span>
                                      ) : null}
                                      )
                                    </p>
                                  )}
                                </>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              } else {
                // Block - Left
                return (
                  <div className='grid-roadmap' key={index}>
                    <div className={`grid-left ${index == 0 ? 'active' : ''}`}>
                      <ul className={`${index == 0 ? 'active' : ''}`}>
                        <li>
                          <h2 className='milestone'>{milestone.name}</h2>
                        </li>
                        {milestone?.subitems.map((goal, index) => {
                          // console.log("sub item left => ", goal.column_values)
                          let link = null;
                          if (goal.column_values[4].value) {
                            const { url } = JSON.parse(goal.column_values[4].value);
                            link = url;
                          }
                          return (
                            <li key={index}>
                              {link ? (
                                <a
                                  className='now'
                                  href={link}
                                  style={{ color: '#fff', display: 'flex' }}
                                  target='_blank'
                                >
                                  <p
                                    style={
                                      goal.column_values[4].value && { textDecoration: 'underline' }
                                    }
                                  >
                                    {goal.name}
                                  </p>
                                  {(goal.column_values[2].value || goal.column_values[3].value) && (
                                    <p
                                      className='now'
                                      style={{
                                        color: '#de9749',
                                        marginLeft: 10,
                                      }}
                                    >
                                      (
                                      {goal.column_values[2].value ? (
                                        <span
                                          className='now'
                                          style={{
                                            color: '#de9749',
                                          }}
                                        >
                                          {formatMilestoneDate(goal.column_values[2].value)}
                                        </span>
                                      ) : null}
                                      {goal.column_values[3].value ? (
                                        <span
                                          className='now'
                                          style={{
                                            color: '#de9749',
                                            marginLeft: 10,
                                          }}
                                        >
                                          {formatMilestoneTime(goal.column_values[3].value)}
                                        </span>
                                      ) : null}
                                      )
                                    </p>
                                  )}
                                </a>
                              ) : (
                                <>
                                  <p>{goal.name}</p>
                                  {(goal.column_values[2].value || goal.column_values[3].value) && (
                                    <p
                                      className='now'
                                      style={{
                                        color: '#de9749',
                                      }}
                                    >
                                      (
                                      {goal.column_values[2].value ? (
                                        <span
                                          className='now'
                                          style={{
                                            color: '#de9749',
                                          }}
                                        >
                                          {formatMilestoneDate(goal.column_values[2].value)}
                                        </span>
                                      ) : null}
                                      {goal.column_values[3].value ? (
                                        <span
                                          className='now'
                                          style={{
                                            color: '#de9749',
                                            marginLeft: 10,
                                          }}
                                        >
                                          {formatMilestoneTime(goal.column_values[3].value)}
                                        </span>
                                      ) : null}
                                      )
                                    </p>
                                  )}
                                </>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className='grid-right-blank' />
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
