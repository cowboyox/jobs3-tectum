"use client";
import React, { useEffect, useState } from 'react';
import { GitBookAPI } from '@gitbook/api';
// Components
import Layout from "@/components/layout/Layout";

const auth_token = "gb_api_xJJ3C8FfWoyRUvz4k5uUUCrEcFoQY4NQhEQ2QyCi"
const org_id = "DcbpJzL6nvm3ObPyucua"

const litepaper = () => {
	const [org, setOrg] = useState(null)
	const [pages, setPages] = useState([])
	const [content, setContent] = useState(null)
	const [fileUrl, setFileUrl] = useState(null)
	const [navigationData, setNavigation] = useState({ prev: null, next: null })

	const client = new GitBookAPI({
		authToken: auth_token
	});

	useEffect(() => {
		async function fetchListOfPages() {
			document.getElementById('mask').style.display = 'flex'
			const user_response = await client.user.getAuthenticatedUser()
			const { id } = user_response.data;
			const res = await client.orgs.listSpacesInOrganizationById(org_id)
			const { items } = res.data;
			const space_res = await client.spaces.listPages(items[1].id)
			console.log(space_res.data.pages)
			const document_res = await client.spaces.getPageById(items[items.length - 1].id, space_res.data.pages[0].id, { format: 'document' })
			console.log(document_res.data)
			// const file_res = await client.spaces.getFileById(items[items.length - 1].id, "jygegVi0ytQNQ1wBByb9")
			// console.log(file_res.data.downloadURL)
			setOrg(items[items.length - 1])
			setContent(document_res.data)
			setNavigation({ prev: null, next: space_res.data.pages[1] })
			setPages(space_res.data.pages.slice(0, space_res.data.pages.length - 1))
			document.getElementById('mask').style.display = 'none'
		}
		fetchListOfPages();
	}, [])

	const findNextPrevBtns = (curPos) => {
		const center = pages.findIndex(item => item.id === curPos.id)
		if (center === 0) {
			setNavigation({ prev: null, next: pages[center + 1] })
		} else if (center === pages.length - 1) {
			setNavigation({ prev: pages[center - 1], next: null })
		} else {
			setNavigation({ prev: pages[center - 1], next: pages[center + 1] })
		}
	}

	const getPageContent = async (page) => {
		const document_res = await client.spaces.getPageById(org.id, page.id, { format: 'document' })
		// console.log(document_res.data)
		window.scrollTo(0, 0);
		findNextPrevBtns(page)
		setContent(document_res.data)
	}

	const getFileResource = async (org_id, file_id) => {
		document.getElementById('mask').style.display = 'flex'
		client.spaces.getFileById(org_id, file_id).then(res => {
			document.getElementById('mask').style.display = 'none'
			setFileUrl(res.data.downloadURL)
		}).catch(err => { document.getElementById('mask').style.display = 'none' });
	}

	const renderNavigationButtons = () => {
		if (!navigationData.next && !navigationData.prev) return null;

		if (!navigationData.prev) {
			return <button className='page_navigationBtn' style={{ width: '100%' }} onClick={() => getPageContent(navigationData.next)}>
				<div style={{ width: '70%', textAlign: 'left' }}>
					<p className='text-black' style={{ fontSize: 14 }}>Next</p>
					<p className='text-black' style={{ fontSize: 22 }}>{navigationData.next.title}</p>
				</div>
				<p className='text-black' style={{ fontSize: 22 }}>{`>`}</p>
			</button>
		} else if (!navigationData.next) {
			return <button className='page_navigationBtn' style={{ width: '100%' }} onClick={() => getPageContent(navigationData.prev)}>
				<p className='text-black' style={{ fontSize: 22 }}>{`<`}</p>
				<div style={{ width: '70%', textAlign: 'right' }}>
					<p className='text-black' style={{ fontSize: 14 }}>Previous</p>
					<p className='text-black' style={{ fontSize: 22 }}>{navigationData.prev.title}</p>
				</div>
			</button>
		} else {
			return <>
				<button className='page_navigationBtn' onClick={() => getPageContent(navigationData.prev)}>
					<p className='text-black' style={{ fontSize: 22 }}>{`<`}</p>
					<div style={{ width: '70%', textAlign: 'right' }}>
						<p className='text-black' style={{ fontSize: 14 }}>Previous</p>
						<p className='text-black' style={{ fontSize: 22 }}>{navigationData.prev.title}</p>
					</div>
				</button>
				<button className='page_navigationBtn' onClick={() => getPageContent(navigationData.next)}>
					<div style={{ width: '70%', textAlign: 'left' }}>
						<p className='text-black' style={{ fontSize: 14 }}>Next</p>
						<p className='text-black' style={{ fontSize: 22 }}>{navigationData.next.title}</p>
					</div>
					<p className='text-black' style={{ fontSize: 22 }}>{`>`}</p>
				</button>
			</>
		}
	}

	return (
		<Layout pageClass={`litepaper_page`}>
				<div className='litepaper_page_preview'>
				</div>
				<div className='litepaper_mainpage'>
					<div className='page_sidebar' key={`page_sidebar`}>
						<ul>
							{
								pages.length > 0 && pages.map((item, page_index) => (<li key={`page_list_${page_index}`}>
									<a className='page_nav' onClick={() => getPageContent(item)}>{item.title}</a>
								</li>))
							}
						</ul>
					</div>
					<div className='page_content' key={`page_content`}>
						{
							content && <h1 className='page_content_title'>{content.title}</h1>
						}
						{
							content && content.document.nodes.map((item, content_index) => {
								if (item.type === "paragraph") {
									if (item.nodes[0].object === 'text' && item.nodes[0].leaves[0].marks.length > 0) {
										if (item.nodes[0].leaves[0].marks[0].type === 'bold')
											return <h3 className='page_content_subtitle' key={`content-title-${content_index}`}>{item.nodes[0].leaves[0].text}</h3>
										else {
											return <div key={`content-text-${content_index}`} style={{ margin: '10px 0' }}>{item.nodes[0].leaves.map((node, index) => <span style={node.marks.length > 0 ? { fontStyle: node.marks[0].type } : null}>{node.text}</span>)}</div>
										}
									} else if (item.nodes.length !== 3 && item.nodes[0].object === 'text' && !item.nodes[0].leaves[0].marks.length) {
										return <p style={{ margin: '5px 0' }} key={`content-text-${content_index}`}>{item.nodes[0].leaves[0].text}</p>
									} else if (item.nodes.length === 3) {
										return <>{
											item.nodes.map((node) => {
												if (node.object === 'text') return <span key={`page_content_link_item_${node.leaves[0].text}`}>{node.leaves[0].text}</span>
												else if (node.object === 'inline') return <div key={`page_content_link_item_${node.nodes[0].leaves[0].text}`}><a href={node.nodes[0].leaves[0].text}>{node.nodes[0].leaves[0].text}</a><br /></div>
											})
										}</>
									}
								} else if (item.type === "list-unordered") {
									return <ul key={`page_content_list_ul_${content_index}`}>
										{item.nodes.map((node, list_index) => (<li key={`page_content_list_li_${list_index}`}>
											{
												node.nodes[0].nodes[0].leaves.map((iitem, idx) => <span key={`page_content_list_li_span_${idx}`} style={iitem.marks.length > 0 ? { fontStyle: iitem.marks[0].type } : null}>{iitem.text}</span>)
											}</li>))
										}
									</ul>
								} else if (item.type === "images") {
									getFileResource(org.id, item.nodes[0].data.ref.file)
									return <figure key={item.nodes[0].data.ref.file}>
										<img className='page_content_image' src={fileUrl} alt={item.nodes[0].fragments[0].nodes[0].nodes[0].leaves[0].text} />
										<figcaption>{item.nodes[0].fragments[0].nodes[0].nodes[0].leaves[0].text}</figcaption>
									</figure>
								}
							})
						}
						<div className='litepaper_bottom_navigation'>
							{renderNavigationButtons()}
						</div>
					</div>
				</div>
				<div id='mask' className='mask'><div>Loading...</div></div>
		</Layout>
	)
};

export default litepaper;
