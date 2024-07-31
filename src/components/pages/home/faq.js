'use client';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { GoPlus } from "react-icons/go"; 

const AccordionComponent = ({ accordionTitle, accordionContent }) => {
    return (
        <div className='accordion_item bg-[#10191D] rounded-xl flex flex-col overflow-x-hidden'>
            <div className='accordion_toggler px-10 py-6 mobile:px-5 mobile:py-3 flex items-center justify-between cursor-pointer'>
                <span className="text-white text-xl mobile:text-base">{accordionTitle}</span>
                <div className='bg-orange h-10 w-10 rounded-xl flex items-center justify-center'>
                    <GoPlus size={25} />
                </div>
            </div>
            <div className='accordion_divider h-[1px] w-0 bg-[#1B272C]' />
            <div className='accordion_content px-10 py-0 h-0 mobile:px-5 overflow-hidden'>
                <pre className='text-[#96B0BD] text-base mobile:text-sm leading-normal whitespace-pre-wrap'>
                    {accordionContent}
                </pre>
            </div>
        </div>
    )
}

const FAQ = () => {
    const faqUseRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            /*----------| Animate Section Heading |----------*/
            SplitType.create("#faq_heading");
            gsap.from('#faq_heading .char', {
              y: -100,
              rotateX: 40,
              rotateY: -35,
              rotateZ: -15,
              opacity: 0,
              duration: 1,
              stagger: 0.1,
              scrollTrigger: {
                trigger: '#faq_heading',
                start: 'top bottom',
                end: 'bottom 50%',
                scrub: 1
              } 
            });

            /*----------| Accordion Function to toggle with Gsap and Timeline |----------*/
            const toggleAccordion = (accItem, action) => {
                let tl = gsap.timeline();
                const toggler = accItem.querySelector('.accordion_toggler');
                const content = accItem.querySelector('.accordion_content');
                const divider = accItem.querySelector('.accordion_divider');
                const togglerIcon = toggler.querySelector('svg');

                if(action === 'open') {
                    tl.to(togglerIcon, {
                        rotate: 45, 
                        duration: 0.2
                    })
                    .to(content, { 
                        duration: 0.2,
                        paddingTop: 24,
                        paddingBottom: 24,
                    })
                    .to(content, {
                        height: 'auto',
                        duration: 0.2
                    })
                    .to(divider, {
                        width: '100%',
                        duration: 0.2
                    })
                    .add(() => accItem.classList.add('active'));
                }
                if(action === 'close') {
                    tl.to(divider, {
                        width: 0,
                        duration: 0.2
                    })
                    .to(togglerIcon, {
                        rotate: 0, 
                        duration: 0.2
                    })
                    .to(content, {
                        height: 0,
                        duration: 0.2,
                        paddingTop: 0,
                        paddingBottom: 0,
                    })
                    .add(() => accItem.classList.remove('active'));
                }
            }
            const accordionItems = document.querySelectorAll('.accordion_item');
            accordionItems.forEach((singleAccordionItem) => {
                //----| Accordion scroll animation
                gsap.from(singleAccordionItem, {
                    y: 20,
                    rotateX: 20,
                    rotateY: -15,
                    rotateZ: -5,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: singleAccordionItem,
                        start: 'top 70%',
                        end: 'bottom 70%',
                        scrub: true,
                    }
                });


                //----| Accordion Logic using the toggleAccordion function
                const toggler = singleAccordionItem.querySelector('.accordion_toggler');
                toggler.addEventListener('click', () => {
                    const isActive = singleAccordionItem.classList.contains('active');
            
                    // Close all other accordions except the clicked one
                    accordionItems.forEach((closeThisAccordion) => {
                        if (closeThisAccordion !== singleAccordionItem) {
                            toggleAccordion(closeThisAccordion, 'close');
                        }
                    });
                    // If the clicked accordion item was not active, open it
                    if (!isActive) {
                        toggleAccordion(singleAccordionItem, 'open');
                    }
                });
            });
            

            // Lighting Animation
            gsap.from('#perfetFor-light-1', {
                duration: 1,
                scale: .5,
                opacity: .6,
                x: -600,
                scrollTrigger: {
                    trigger: '#perfetFor-light-1',
                    start: 'top bottom',
                    end: 'bottom 50%',
                    scrub: 1,
                } 
            });
        }, faqUseRef);
    
        return ()=> ctx.revert();
    }, [])

    return (
        <div className="py-40 mobile:py-20 relative" ref={faqUseRef}>
            <div className='max-w-4xl mx-auto relative z-10'>
                <h2 className="text-white text-[150px] mobile:text-7xl font-bold text-center" id="faq_heading">FAQ</h2>
                <div className="flex flex-col gap-5 mobile:mt-10 mobile:px-5">
                    <AccordionComponent
                        accordionTitle='What is JOBS3'
                        accordionContent={`  Jobs3 is an advanced services and employment portal that connects buyers and sellers through their skills and requirements. We have an extensive network of professionals either looking for work or looking to have work completed.
                        
Jobs3 uses extensive technology from Three Protocol to deliver a seamless, intuitive jobs and services marketplace unlike anything seen before.
                        
Profiles are completely decentralised and require no-KYC. Jobs3 leverages Zero Knowledge Proof pseudo anonymisation to create a form of decentralised digital identification that can be used across all of Three Protocol’s marketplaces.
                        
Users can securely transact with each other through the Tri-Proof Smart Contract system. Ensuring that users can pay and be paid without any concerns, and if there are ever any disputes the impartial DAO assesses the evidence and makes a judgement accordingly.
                        
Your time is precious, that’s why we’ve built a groundbreaking neural network AI called the Procurement Matching AI. This AI allows buyers and sellers to be connected on more than just keywords and dramatically increases the efficiency of the marketplace.`}
                    />
                    <AccordionComponent
                        accordionTitle='How do I create a profile?'
                        accordionContent={`  Simply click the Sign Up button at the top of the page and you’ll be guided through the intuitive account creation process. 
Then, on the profile page, you can change your avatar and personal information. Freelancers can show off their portfolios, and Clients can share important information.`}
                    />
                    <AccordionComponent
                        accordionTitle='How does the Tri-Proof Smart Contract work?'
                        accordionContent={`  Our Tri-Proof Smart Contracts are a straightforward solution to secure and reliable transactions. Upon engagement between two parties (let’s say someone wants a new website), a tri-proof contract is instantly created with three signatories: the buyer, the seller, and the DAO. 

This contract serves as an escrow, holding the payment for services and potential dispute funds.
                        
If everything goes well in the transaction, then the buyer and seller sign, and funds are released. 
                        
In cases where there are disputes, the disputing party won’t sign and it will be escalated to the DAO. 
                        
The DAO's judgment determines the rightful recipient of the escrowed funds.`}
                    />
                    <AccordionComponent
                        accordionTitle='How does Jobs3 protect buyers and sellers?'
                        accordionContent={`  Each profile can only accumulate reviews following genuine transactions thanks to the ZKP process.

During transactions, each party is protected by the Tri-Proof Smart Contracts. If there is ever an issue, one party needs only to escalate the issue to the DAO and they will be supported appropriately.`}
                    />
                    <AccordionComponent
                        accordionTitle='Do I have to use an ID?'
                        accordionContent={`  No, the ZKP Decentralised Digital IDs are designed to be created without the need for KYC. Of course, some long-term employers may request to get to know you in a more personal sense, but that decision is for you to come to with the employer.`}
                    />
                </div>
            </div>
            {/*----- Lighting -----*/}
            <div id="perfetFor-light-1" className='
                rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,_#DC4F13_0%,_#FF4C00_100%)] blur-[150px] opacity-0
                h-[300px] w-[300px]
                absolute bottom-1/4 left-full
            '/>
        </div>
    )
}

export default FAQ
