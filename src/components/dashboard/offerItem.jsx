'use client';
import React from 'react';
import { Icon } from '@iconify/react';

import { useToast } from '@/components/ui/use-toast';
import api from '@/utils/api';

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
const descriptionTextMaxLength = 320;

const OfferItem = ({ 
  gigTitle, 
  gigPrice, 
  deliveryTime, 
  proposal, 
  avatarURL,
  fullName,
  proposalId, 
  refetchAllOrdersProposed,
  accepted,
}) => {
  const { toast } = useToast();

  const [showDetail, setShowDetail] = React.useState(false);

  const _renderDetails = () => (
    <div className='flex w-full flex-col gap-6 text-[#516170]'>
      <div>{data.description}</div>

      <div>
        <h2>Key Responsibilities:</h2>
        {data.responsibilities.map((_item, key) => (
          <div className='mt-1' key={key}>- {_item}</div>
        ))}
      </div>

      <div>
        <h2>Skills required:</h2>
        {data.required.map((_item, key) => (
          <div className='mt-1' key={key}>- {_item}</div>
        ))}
      </div>

      <div>
        <h2>{data.summary}</h2>
        <a className='text-white cursor-pointer' onClick={() => setShowDetail(false)}>
            View less
        </a>
      </div>

      <div className='border-b border-[#28373A] pb-5'>
        <h2 className='text-white'>Skills</h2>
        <div className='flex items-center gap-2 mt-3 text-white'>
            {data.skills.map((_text, key) => (
                <div className='rounded-full w-full xs:w-auto border justify-center xs:justify-start truncate border-[#32525B] bg-[#283732] px-3 py-1' key={key}>
                  {_text}
                </div>
            ))}
        </div>
      </div>
      <div className='border-b border-[#28373A] pb-5'>
        <h2 className='text-white'>Attachments</h2>
        <div className='flex flex-col items-start gap-2 mt-3 text-white'>
          {data.attachments.map((_item, key) => (
            <div className='flex items-center gap-2 rounded-xl border border-[#526872] p-2' key={key}>
              <Icon icon='solar:file-download-outline' />
              <span>{_item.name}</span>
              <span>({_item.size})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const onAccept = async () => {
    try {
      await api.put(`/api/v1/freelancer_gig/accept-order/${proposalId}`);

      await refetchAllOrdersProposed();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully accepted the proposal!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during accepting proposal:', err);

      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  const onReject = async () => {
    try {
      await api.put(`/api/v1/freelancer_gig/reject-order/${proposalId}`);

      await refetchAllOrdersProposed();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully rejected the proposal!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during rejecting proposal:', err);

      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='mx-auto flex w-full flex-col gap-2 rounded-xl bg-[#10191D] p-4 sm:p-8'>
      <h1 className='text-xl'>{gigTitle}</h1>
      <div className='flex items-center gap-4 py-1'>
        <div className='relative w-12 h-12 mobile:h-8 mobile:w-8'>
          <img
            className='object-cover w-12 h-12 rounded-full mobile:h-8 mobile:w-8 aspect-square'
            src={
              avatarURL
                ? avatarURL
                : '/assets/images/users/user-3.png'
            }
          />
          <div className='absolute w-3 h-3 bg-green-500 rounded-full bottom-1 right-1 mobile:bottom-0 mobile:right-0 mobile:h-3 mobile:w-3' />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <h2 className='text-xl mobile:text-xs'>
              {fullName}
            </h2>
            <img
              className='w-4 h-4 mobile:h-3 mobile:w-3'
              src='/assets/images/icons/checkmark.svg'
            />
          </div>
        </div>
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
              <span className='text-white'>{gigTitle}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-[#516170]'>Duration</span>
              <span className='text-white'>{deliveryTime}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-[#516170]'>Price</span>
              <span className='text-white'>${gigPrice}</span>
            </div>
          </div>
        </div>
      </div>
     
      <div className='flex w-full flex-col gap-3 text-[#516170]'>
        <div>
          <div className=''>
            {
              proposal.length < descriptionTextMaxLength
                ? proposal
                : showDetail
                  ? proposal
                  : proposal.slice(0, descriptionTextMaxLength) + '...'
            }
          </div>
          {
            proposal.length < descriptionTextMaxLength ? (
                <></>
              ) : !showDetail ? (
                <button
                  className='text-white cursor-pointer'
                  onClick={() => {
                    setShowDetail(true);
                  }}
                >
                  Show more
                </button>
              ) : (
                <button
                  className='text-white cursor-pointer'
                  onClick={() => {
                    setShowDetail(false);
                  }}
                >
                  Show less
                </button>
              )
          }
        </div>
        
        <div className='border-b border-[#28373A] pb-3'>
          <h2 className='text-white'>Skills</h2>
          <div className='flex items-center gap-2 mt-3 text-white'>
            {data.skills.map((_text, key) => (
              <div className='rounded-full border truncate border-[#32525B] bg-[#283732] px-3 py-1' key={key}>
                {_text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        {
          accepted ?
            <div className='grid grid-cols-1 rounded-xl bg-[#1B272C] p-1 text-white w-[25%] float-right'>
              <div onClick={onReject} className='flex items-center justify-center p-3 cursor-pointer hover:opacity-60'>
                Reject
              </div>
            </div> :
            <div className='grid grid-cols-2 rounded-xl bg-[#1B272C] p-1 text-white w-[50%] float-right'>
              <div onClick={onReject} className='flex items-center justify-center p-3 cursor-pointer hover:opacity-60'>
                Reject
              </div>
              <div onClick={onAccept} className='flex cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-3 hover:opacity-60'>
                Accept
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default OfferItem;
