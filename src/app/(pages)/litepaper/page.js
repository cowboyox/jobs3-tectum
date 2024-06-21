'use client';

import { GitBookAPI } from '@gitbook/api';
import React, { useEffect, useState } from 'react';

// Components
import Layout from '@/components/layout/Layout';

const auth_token = 'gb_api_xJJ3C8FfWoyRUvz4k5uUUCrEcFoQY4NQhEQ2QyCi';
const org_id = 'DcbpJzL6nvm3ObPyucua';

const Litepaper = () => {
  const [org, setOrg] = useState(null);
  const [pages, setPages] = useState([]);
  const [content, setContent] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [navigationData, setNavigation] = useState({ next: null, prev: null });

  const client = new GitBookAPI({
    authToken: auth_token,
  });

  useEffect(() => {
    async function fetchListOfPages() {
      document.getElementById('mask').style.display = 'flex';
      // console.log("result:", user_response.data)
      const res = await client.orgs.listSpacesInOrganizationById(org_id);
      const { items } = res.data;
      const space_res = await client.spaces.listPages(items[1].id);
      const document_res = await client.spaces.getPageById(
        items[1].id,
        space_res.data.pages[0].id,
        { format: 'document' }
      );
      // const file_res = await client.spaces.getFileById(items[items.length - 1].id, "jygegVi0ytQNQ1wBByb9")
      // console.log(file_res.data.downloadURL)
      setOrg(items[1]);
      setContent(document_res.data);
      setNavigation({ next: space_res.data.pages[1], prev: null });
      setPages(space_res.data.pages.slice(0, space_res.data.pages.length - 1));
      document.getElementById('mask').style.display = 'none';
    }
    fetchListOfPages();
  }, [client.orgs, client.spaces]);

  const findNextPrevBtns = (curPos) => {
    const center = pages.findIndex((item) => item.id === curPos.id);
    if (center === 0) {
      setNavigation({ next: pages[center + 1], prev: null });
    } else if (center === pages.length - 1) {
      setNavigation({ next: null, prev: pages[center - 1] });
    } else {
      setNavigation({ next: pages[center + 1], prev: pages[center - 1] });
    }
  };

  const getPageContent = async (page) => {
    const document_res = await client.spaces.getPageById(org.id, page.id, { format: 'document' });
    // console.log(document_res.data)
    window.scrollTo(0, 0);
    findNextPrevBtns(page);
    setContent(document_res.data);
  };

  const getFileResource = async (org_id, file_id) => {
    document.getElementById('mask').style.display = 'flex';
    client.spaces
      .getFileById(org_id, file_id)
      .then((res) => {
        document.getElementById('mask').style.display = 'none';
        setFileUrl(res.data.downloadURL);
      })
      .catch(() => {
        document.getElementById('mask').style.display = 'none';
      });
  };

  const renderNavigationButtons = () => {
    if (!navigationData.next && !navigationData.prev) return null;

    if (!navigationData.prev) {
      return (
        <button
          className='page_navigationBtn'
          onClick={() => getPageContent(navigationData.next)}
          style={{ width: '100%' }}
        >
          <div style={{ textAlign: 'left', width: '70%' }}>
            <p className='text-black' key={`preview_title`} style={{ fontSize: 14 }}>
              Next
            </p>
            <p className='text-black' key={`preview_content`} style={{ fontSize: 22 }}>
              {navigationData.next.title}
            </p>
          </div>
          <p className='text-black' style={{ fontSize: 22 }}>{`>`}</p>
        </button>
      );
    } else if (!navigationData.next) {
      return (
        <button
          className='page_navigationBtn'
          onClick={() => getPageContent(navigationData.prev)}
          style={{ width: '100%' }}
        >
          <p className='text-black' style={{ fontSize: 22 }}>{`<`}</p>
          <div style={{ textAlign: 'right', width: '70%' }}>
            <p className='text-black' key={`preview_title`} style={{ fontSize: 14 }}>
              Previous
            </p>
            <p className='text-black' key={`preview_content`} style={{ fontSize: 22 }}>
              {navigationData.prev.title}
            </p>
          </div>
        </button>
      );
    } else {
      return (
        <>
          <button
            className='page_navigationBtn'
            onClick={() => getPageContent(navigationData.prev)}
          >
            <p className='text-black' style={{ fontSize: 22 }}>{`<`}</p>
            <div style={{ textAlign: 'right', width: '70%' }}>
              <p className='text-black' key={`preview_title`} style={{ fontSize: 14 }}>
                Previous
              </p>
              <p className='text-black' key={`preview_content`} style={{ fontSize: 22 }}>
                {navigationData.prev.title}
              </p>
            </div>
          </button>
          <button
            className='page_navigationBtn'
            onClick={() => getPageContent(navigationData.next)}
          >
            <div style={{ textAlign: 'left', width: '70%' }}>
              <p className='text-black' key={`next_title`} style={{ fontSize: 14 }}>
                Next
              </p>
              <p className='text-black' key={`next_content`} style={{ fontSize: 22 }}>
                {navigationData.next.title}
              </p>
            </div>
            <p className='text-black' style={{ fontSize: 22 }}>{`>`}</p>
          </button>
        </>
      );
    }
  };

  return (
    <Layout key={`litepaper_page`} pageClass={`litepaper_page`}>
      <div className='litepaper_page_preview' key={`litepaper-preview-2374953293`} />
      <div className='litepaper_mainpage' key={`litepaper-mainpage-23583735`}>
        <div className='page_sidebar' key={`page-sidebar-583765744`}>
          <ul>
            {pages.length > 0 &&
              pages.map((item, page_index) => (
                <li key={`page_list_${page_index}`}>
                  <a className='page_nav' onClick={() => getPageContent(item)}>
                    {item.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <div className='page_content'>
          {content && <h1 className='page_content_title'>{content.title}</h1>}
          {content &&
            content.document.nodes.map((item, content_index) => {
              if (item.type === 'paragraph') {
                if (item.nodes[0].object === 'text' && item.nodes[0].leaves[0].marks.length > 0) {
                  if (item.nodes[0].leaves[0].marks[0].type === 'bold')
                    return (
                      <h3 className='page_content_subtitle' key={`content-title-${content_index}`}>
                        {item.nodes[0].leaves[0].text}
                      </h3>
                    );
                  else {
                    return (
                      <div key={`content-text-1-${content_index}`} style={{ margin: '10px 0' }}>
                        {item.nodes[0].leaves.map((node, index) => (
                          <span
                            key={`content-text-1-${content_index}-span-${index}`}
                            style={node.marks.length > 0 ? { fontStyle: node.marks[0].type } : null}
                          >
                            {node.text}
                          </span>
                        ))}
                      </div>
                    );
                  }
                } else if (
                  item.nodes.length !== 3 &&
                  item.nodes[0].object === 'text' &&
                  !item.nodes[0].leaves[0].marks.length
                ) {
                  return (
                    <p key={`content-text-2-${content_index}`} style={{ margin: '5px 0' }}>
                      {item.nodes[0].leaves[0].text}
                    </p>
                  );
                } else if (item.nodes.length === 3) {
                  return (
                    <>
                      {item.nodes.map((node) => {
                        if (node.object === 'text')
                          return (
                            <span key={`page_content_text_item_${node.leaves[0].text}`}>
                              {node.leaves[0].text}
                            </span>
                          );
                        else if (node.object === 'inline')
                          return (
                            <div key={`page_content_link_item_${node.nodes[0].leaves[0].text}`}>
                              <a href={node.nodes[0].leaves[0].text} style={{ color: 'orange' }}>
                                {node.nodes[0].leaves[0].text}
                              </a>
                            </div>
                          );
                      })}
                    </>
                  );
                }
              } else if (item.type === 'list-unordered') {
                return (
                  <ul key={`page_content_list_ul_${content_index}`}>
                    {item.nodes.map((node, list_index) => (
                      <li key={`page_content_list_li_${list_index}`}>
                        {node.nodes[0].nodes[0].leaves.map((iitem, idx) => (
                          <span
                            key={`page_content_list_li_span_${idx}`}
                            style={
                              iitem.marks.length > 0 ? { fontStyle: iitem.marks[0].type } : null
                            }
                          >
                            {iitem.text}
                          </span>
                        ))}
                      </li>
                    ))}
                  </ul>
                );
              } else if (item.type === 'images') {
                getFileResource(org.id, item.nodes[0].data.ref.file);
                return (
                  <figure key={item.nodes[0].data.ref.file}>
                    <img
                      alt={item.nodes[0].fragments[0].nodes[0].nodes[0].leaves[0].text}
                      className='page_content_image'
                      src={fileUrl}
                    />
                    <figcaption>
                      {item.nodes[0].fragments[0].nodes[0].nodes[0].leaves[0].text}
                    </figcaption>
                  </figure>
                );
              }
            })}
          <div className='litepaper_bottom_navigation' key={`navigation-buttons`}>
            {renderNavigationButtons()}
          </div>
        </div>
      </div>
      <div className='mask' id='mask' key={`litepaper-mask`}>
        <div>Loading...</div>
      </div>
    </Layout>
  );
};

export default Litepaper;
