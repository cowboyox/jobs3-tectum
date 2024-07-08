'use client';

import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { FaStar } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import { MdAccessTime, MdOutlineAttachFile } from 'react-icons/md';

import Coverletter from './Coverletter';
import Payment from './Payment';

import { minutesDifference } from '@/utils/Helpers';

const GigPage = ({
  gigTitle,
  gigPostDate,
  gigPrice,
  freelancerFullName,
  freelancerLocation,
  walletPubkey,
}) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [files, setFiles] = useState([]);

  const handleChange = (value) => {
    setCoverLetter(value);
  };

  const createFileObjectsFromUrls = async (data) => {
    const attachmentUrls = data;
    const filePromises = attachmentUrls.map(async (url) => {
      const response = await fetch(url, { mode: 'no-cors' });

      const blob = await response.blob();
      const fileName = url.split('/').pop();
      return new File([blob], fileName, { type: blob.type });
    });

    const fileObjects = await Promise.all(filePromises);
    setFiles(fileObjects);
  };

  const FileChanged = (file) => {
    console.log('file', file);
    console.log('file.length', file.length);
    let tmp = [];
    const filesArray = Array.from(file);
    console.log('filesArray', filesArray);
    filesArray.map((fi) => tmp.push(fi));
    setFiles(filesArray);
    console.log('tmp', tmp);
  };

  const onRemoveImage = (id) => {
    setFiles(files.filter((_, i) => i !== id));
  };

  return (
    <div className='flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center'>
      <div className='w-full md:w-[65%] md:max-w-[690px]'>
        <div className='flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'>
          <div className='flex flex-col gap-4 border-b border-lightGray pb-5'>
            <img
              alt='Gig Image'
              className='aspect-video w-full rounded-xl object-cover'
              src='/assets/images/portfolio_works/portfolio.jpeg'
            />
            <div className='flex items-center'>
              <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>
                {gigTitle}
              </h3>
            </div>
            <div className='flex flex-wrap justify-start gap-4'>
              <div className='flex items-center gap-1'>
                <MdAccessTime className='text-2xl text-medGray' />
                <span>{minutesDifference(gigPostDate)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg
                  fill='none'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M9 13.0098H12'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M9 9.00977H12'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M5.99609 13H6.00508'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M5.99609 9H6.00508'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  />
                </svg>
                <span>$ {gigPrice}</span>
              </div>
              <div className='flex items-center gap-2'>
                <FaStar className='text-2xl text-orange' />
                <span>
                  5.5 <span className='text-medGray'>(921)</span>
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <svg
                  fill='none'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M20.125 8.45081V15.5492C20.125 16.2221 19.7645 16.8433 19.1803 17.1771L12.9303 20.7486C12.3538 21.078 11.6462 21.078 11.0697 20.7486L4.81974 17.1771C4.23554 16.8433 3.875 16.222 3.875 15.5492V8.45081C3.875 7.77795 4.23554 7.15668 4.81974 6.82285L11.0697 3.25142C11.6462 2.92203 12.3538 2.92203 12.9303 3.25142L19.1803 6.82285C19.7645 7.15668 20.125 7.77795 20.125 8.45081Z'
                    stroke='#158FE8'
                    strokeWidth='1.25'
                  />
                  <path
                    d='M12.5685 8.43475L13.3078 9.91337C13.4086 10.1192 13.6775 10.3166 13.9043 10.3544L15.2443 10.5771C16.1012 10.7199 16.3029 11.3416 15.6854 11.9549L14.6436 12.9966C14.4672 13.1731 14.3706 13.5133 14.4252 13.757L14.7234 15.0465C14.9587 16.0673 14.4168 16.4622 13.5136 15.9287L12.2577 15.1852C12.0308 15.0507 11.657 15.0507 11.4259 15.1852L10.1699 15.9287C9.271 16.4622 8.72492 16.0631 8.96015 15.0465L9.2584 13.757C9.31301 13.5133 9.21639 13.1731 9.03996 12.9966L7.99821 11.9549C7.38491 11.3416 7.58234 10.7199 8.43927 10.5771L9.77928 10.3544C10.0019 10.3166 10.2708 10.1192 10.3716 9.91337L11.1109 8.43475C11.5141 7.63243 12.1694 7.63243 12.5685 8.43475Z'
                    stroke='#158FE8'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.25'
                  />
                </svg>
                <span>Top Rated</span>
              </div>
            </div>
          </div>
          <div className='flex items-start gap-4 rounded-t-xl bg-[#10191D] md:items-center md:gap-4 md:rounded-xl'>
            <div className='relative w-10 md:h-10 md:w-10'>
              <img
                className='aspect-square h-full w-full rounded-full'
                src='/assets/images/users/user-5.png'
              />
              <div className='absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-green-500' />
            </div>
            <div className='flex flex-col gap-0'>
              <div className='flex items-center gap-1'>
                <h2 className='text-md md:text-md font-bold'>{freelancerFullName}</h2>
                <img className='h-4 w-4' src='/assets/images/icons/checkmark.svg' />
              </div>
              <div className='flex flex-col gap-2 md:flex-row md:gap-4'>
                <p className='text-md text-medGray'>{freelancerLocation}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'>
          <div className='flex flex-col gap-4'>
            <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>
              Single order ($20)
            </h3>
            <p className='text-medGray'>Specify the quantity of services</p>
            <div className='flex flex-1 items-center gap-1 rounded-2xl bg-darkGray'>
              <div className='flex flex-1 flex-col items-center justify-between px-8 py-8 md:flex-row'>
                <div className='flex items-center gap-4'>
                  <h3 className='whitespace-nowrap text-medGray'>Gig Quantity</h3>
                </div>
                <div className='flex w-full items-center justify-between gap-4 md:w-auto'>
                  <button
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-orange text-lg text-white'
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity((prev) => prev - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <p className='text-xl font-[500] text-medGray'>{quantity}</p>
                  <button
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-orange text-lg text-white'
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>
              Documents (up to 2)
            </h3>
            <p className='text-medGray'>
              Show some the best work you createdin a document. Format: PDF
            </p>

            <div className='hidden grid-cols-2 gap-4 md:grid'>
              <div className='rounded-xl border border-dashed border-slate-500'>
                <FileUploader
                  fileOrFiles={files}
                  handleChange={(e) => FileChanged(e)}
                  label={''}
                  multiple={true}
                  types={['jpg', 'jpeg', 'png', 'pdf']}
                >
                  <div className='h-full cursor-pointer space-y-3'>
                    <div className='h-full'>
                      <div className='text-center'>
                        <div className='mx-auto max-w-min rounded-md p-2'>
                          <GoPlus size='2.6em' />
                        </div>
                      </div>
                    </div>
                  </div>
                </FileUploader>
                {files.length > 0 && (
                  <div className='mt-5 flex w-full flex-wrap justify-center gap-0 rounded-xl border border-slate-500'>
                    {files.map((item, index) => {
                      return (
                        <div
                          aria-hidden
                          className='flex w-full cursor-pointer items-center justify-center gap-2 p-3 md:w-1/2 lg:w-1/3'
                          key={index}
                          onClick={() => onRemoveImage(index)}
                        >
                          <MdOutlineAttachFile size={'20px'} />
                          <span className='overflow-hidden mobile:w-[80%]'>{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className='rounded-xl border border-dashed border-slate-500'>
                <FileUploader
                  fileOrFiles={files}
                  handleChange={(e) => FileChanged(e)}
                  label={''}
                  multiple={true}
                  types={['pdf']}
                >
                  <div className='h-full cursor-pointer space-y-3'>
                    <div className='h-full'>
                      <div className='text-center'>
                        <div className='mx-auto max-w-min rounded-md p-2'>
                          <GoPlus size='2.6em' />
                        </div>
                      </div>
                    </div>
                  </div>
                </FileUploader>
                {files.length > 0 && (
                  <div className='mt-5 flex w-full flex-wrap justify-center gap-0 rounded-xl border border-slate-500'>
                    {files.map((item, index) => {
                      return (
                        <div
                          aria-hidden
                          className='flex w-full cursor-pointer items-center justify-center gap-2 p-3 md:w-1/2 lg:w-1/3'
                          key={index}
                          onClick={() => onRemoveImage(index)}
                        >
                          <MdOutlineAttachFile size={'20px'} />
                          <span className='overflow-hidden mobile:w-[80%]'>{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Coverletter handleChange={handleChange} />
        </div>
      </div>
      <div className='w-full md:w-[35%] md:max-w-[420px]'>
        <Payment
          coverLetter={coverLetter}
          files={files}
          gigPrice={gigPrice}
          quantity={quantity}
          walletPubkey={walletPubkey}
        />
      </div>
    </div>
  );
};

export default GigPage;
