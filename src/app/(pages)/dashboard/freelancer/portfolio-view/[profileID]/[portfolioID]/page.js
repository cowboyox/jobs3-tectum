'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GrDocumentDownload } from 'react-icons/gr';
import { Item } from '@radix-ui/react-radio-group';

const EditPortfolio = ({ params }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useCustomContext();
  const [viewMode, setViewMode] = useState('preview');
  const [portfolioList, setPortfolioList] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    api
      .get(`/api/v1/freelancer_portfolio/find_all_portfolios_by_profileId/${params.profileID}`)
      .then((data) => {
        if (data.data.data) {
          setPortfolioList(data.data.data);
        }
      })
      .catch((err) => {
        console.error('Error corrupted while getting all gigs: ', err);
      });
  }, []);

  useEffect(() => {
    console.log('id', params.portfolioI);
    const selectedPortfolio = portfolioList.find((item) => item._id === String(params.portfolioID));
    setCurrentPortfolio(selectedPortfolio);
  }, [portfolioList]);

  console.log('currentPortfolio', currentPortfolio);
  console.log('portfolioList', portfolioList);
  console.log('length', currentPortfolio?.gallery?.images.length);
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

  console.log("files", files);

  useEffect(() => {
    
    async function fetchFileObjects() {
      if(!currentPortfolio) return;
      await createFileObjectsFromUrls(currentPortfolio.gallery.documents);
    }
    
    fetchFileObjects();

  }, [currentPortfolio])
  const handleDownload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/download', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        console.error('Error downloading file:', response.status);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  return (
    <div className='flex flex-col py-6'>
      <div className='flex w-full items-center justify-center gap-5 rounded-[15px] bg-[#1B272C] px-[5px] py-[5px] text-base font-bold text-[#F5F5F5]'>
        <div
          className={`flex w-1/2 cursor-pointer items-center justify-center rounded-[15px] px-10 py-[10px] ${viewMode === 'preview' && 'bg-[#DC4F13]'}`}
          onClick={() => setViewMode('preview')}
        >
          Preview
        </div>
        <div
          className={`flex w-1/2 cursor-pointer items-center justify-center rounded-[15px] px-10 py-[10px] font-bold ${viewMode === 'edit' && 'bg-[#DC4F13]'}`}
          onClick={() => setViewMode('edit')}
        >
          Edit
        </div>
      </div>
      <div className='mt-[30px] flex flex-col items-start justify-center gap-[30px] rounded-[15px] bg-[#10191D] pb-[30px]'>
        <div className='h-[470px] w-full'>
          <video
            className='relative flex h-full w-full items-center justify-center rounded-xl border-[#526872] object-cover'
            controls
            src={currentPortfolio?.gallery?.video ? currentPortfolio.gallery?.video : ''}
          />
        </div>
        <div className='grid w-full grid-cols-1 gap-5 px-[30px] md:grid-cols-2 lg:grid-cols-4'>
          {currentPortfolio?.gallery?.images.map((item, key) => (
            <div key={key} className='h-[105px] w-full'>
              <Image
                alt='avatar'
                className='aspect-square h-full w-full rounded-[10px] object-cover'
                height={1000}
                src={item ? item : '/assets/images/Rectangle 273.png'}
                width={1000}
              />
            </div>
          ))}
        </div>
        <div className='px-[30px] text-start text-[40px] text-[#F5F5F5]'>
          {currentPortfolio?.portfolioTitle}
        </div>
        <div className='px-[30px] text-start text-base text-[#96B0BD]'>
          {currentPortfolio?.portfolioDescription}
        </div>
      </div>
      <div className='align-start mt-[30px] flex flex-col gap-[15px] rounded-[15px] bg-[#10191D] p-[30px] w-full md:w-1/2' >
        <div className='text-[18px] font-bold text-[#96B0BD]'>Documents</div>
        <div className='flex flex-col items-center justify-center gap-[15px] md:flex-row' >
          {currentPortfolio?.gallery?.documents?.map((item, key) => (
            <div
              key={key}
              className='flex gap-[10px] rounded-[15px] border-[#526872] px-[15px] py-[10px] border cursor-pointer' onClick={() => handleDownload(files[key])}
            >
              <GrDocumentDownload className='rounded-[5px] text-[24px] text-[#96B0BD]' />
              <div className='text-base text-[#96B0BD]'>{files[key]?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditPortfolio;
