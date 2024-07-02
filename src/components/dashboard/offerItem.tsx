'use client';
import React from 'react';
import { Icon } from '@iconify/react';

const data = {
  description:
    'We are looking for an expert UI/UX designer to take our online travel website to the next level. As our website is the primary platform for users to plan and book their travel experiences, we need someone who can create a visually stunning and user-friendly interface. The ideal candidate should have a strong portfolio showcasing their expertise in UI/UX design for travel or e-commerce websites.',
  responsibilities: [
    'Collaborate with the development team to understand project requirements',
    'Conduct user research and create user personas',
    'Design wireframes, mockups, and prototypes',
    'Implement design best practices and ensure a seamless user experience',
    'Stay updated with the latest UI/UX trends and technologies',
  ],
  required: [
    'Proficiency in UI design tools like Sketch, Adobe XD, or Figma',
    'Strong understanding of user-centered design principles',
    'Experience in creating responsive web designs',
    'Knowledge of HTML, CSS, and JavaScript is a plus',
  ],
  summary:
    'This is a medium-sized project that will require a commitment of 1 to 3 months. We are looking for an expert designer who can deliver exceptional results and elevate our online travel website to new heights.',
  skills: ['UI/UX', 'Design', 'Webdesign', 'Mobile UI Design', 'Wireframing'],
  attachments: [
    { name: 'Document _1.doc', size: '1.5 MB' },
    { name: 'Imagefilename.jpg', size: '1.5 MB' },
  ],
};

const OfferItem: React.FC = () => {
  const [showDetail, setShowDetail] = React.useState<boolean>(false);

  const _renderDetails = () => (
    <div className='flex w-full flex-col gap-6 text-[#516170]'>
      <div>{data.description}</div>

      <div>
        <h2>Key Responsibilities:</h2>
        {data.responsibilities.map((_item: string) => (
          <div className='mt-1'>- {_item}</div>
        ))}
      </div>

      <div>
        <h2>Skills required:</h2>
        {data.required.map((_item: string) => (
          <div className='mt-1'>- {_item}</div>
        ))}
      </div>

      <h2>{data.summary}</h2>

      <div className='border-b border-[#28373A] pb-5'>
        <h2 className='text-white'>Skills</h2>
        <div className='mt-3 flex items-center gap-2 text-white'>
            {data.skills.map((_text: string) => (
                <div className='rounded-full w-full xs:w-auto border justify-center xs:justify-start truncate border-[#32525B] bg-[#283732] px-3 py-1'>
                  {_text}
                </div>
            ))}
        </div>
      </div>
      <div className='border-b border-[#28373A] pb-5'>
        <h2 className='text-white'>Attachments</h2>
        <div className='mt-3 flex flex-col items-start gap-2 text-white'>
          {data.attachments.map((_item: { name: string; size: string }) => (
            <div className='flex items-center gap-2 rounded-xl border border-[#526872] p-2'>
              <Icon icon='solar:file-download-outline' />
              <span>{_item.name}</span>
              <span>({_item.size})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className='mx-auto flex max-w-[1000px] flex-col gap-2 rounded-xl bg-[#10191D] p-4 sm:p-8'>
      <h1 className='text-xl'>Digital interface for finance project</h1>
      <div className='flex items-center gap-4 py-1'>
        <div className='flex items-center gap-2'>
          <Icon icon='mdi:address-marker-outline' className='text-2xl' />
          London, United Kingdom
        </div>
        <div className='flex items-center gap-2'>
          <Icon icon='fa6-regular:clock' className='text-2xl' />
          May 15 / 04:35 PM
        </div>
      </div>
      <div className='mt-2 w-full border-b border-t border-[#28373A] py-4'>
        <div className='flex w-full flex-col gap-2 rounded-xl bg-[#1B272C] px-6 py-4'>
          <div className='grid gap-3 text-[#516170] md:grid-cols-[50%_25%_25%]'>
            <div className='flex flex-col gap-2'>
              <span className='text-[#516170]'>Item</span>
              <span className='text-white'>Digital interface for finance project</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-[#516170]'>Duration</span>
              <span className='text-white'>2 days</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-[#516170]'>Price</span>
              <span className='text-white'>$400</span>
            </div>
          </div>
        </div>
      </div>

      {!showDetail ? (
        <div className='flex w-full flex-col gap-3 text-[#516170]'>
          <div>
            <div className='line-clamp-2 overflow-hidden text-ellipsis'>{data.description}</div>
            <a className='cursor-pointer text-white' onClick={() => setShowDetail(true)}>
                View more
            </a>
          </div>
          
          <div className='border-b border-[#28373A] pb-3'>
            <h2 className='text-white'>Skills</h2>
            <div className='mt-3 flex items-center gap-2 text-white'>
              {data.skills.map((_text: string) => (
                <div className='rounded-full border truncate border-[#32525B] bg-[#283732] px-3 py-1'>
                  {_text}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        _renderDetails()
      )}

      <div className='grid grid-cols-2 rounded-xl bg-[#1B272C] p-1 text-white'>
        <div className='flex cursor-pointer items-center justify-center p-3 hover:opacity-60'>
          Reject
        </div>
        <div className='flex cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-3 hover:opacity-60'>
          Accept
        </div>
      </div>
    </div>
  );
};

export default OfferItem;
