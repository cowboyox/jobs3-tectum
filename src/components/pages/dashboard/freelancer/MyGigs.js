'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaX } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';

import RadialProgress from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import api from '@/utils/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { RiCloseLine } from 'react-icons/ri';

const MyGigs = ({
  imagePath,
  setUploadedGigPath,
  email,
  gigId,
  setProfileData,
  viewMode,
  title,
  profileId,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const progress = 0;


  const handleDeleteGig = (gigId) => {
    api.delete(`/api/v1/freelancer_gig/delete_gig/${gigId}`).then((data) => {
      setProfileData((prev) => ({
        ...prev,
         myGigs: prev.myGigs.filter((mygig) => mygig._id!== gigId),
       }));
      return toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully removed gig!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    });
  };

  return (
    <div className='h-full space-y-3'>
      <Dialog>
        <div className='realative flex h-full items-center justify-center'>
          <label
            className={`flex h-72 w-full items-center justify-center rounded-2xl border border-dashed border-[#526872] bg-[#1a272c]  transition hover:bg-[#23343b]`}
          >
            {loading && (
              <div className='max-w-md text-center'>
                <RadialProgress progress={progress} />
                <p className='text-sm font-semibold'>Uploading Picture</p>
                <p className='text-xs text-gray-400'>
                  Do not refresh or perform any other action while the picture is being uploaded
                </p>
              </div>
            )}

            {!loading && imagePath === '' && (
              <div
                className='cursor-pointer text-center'
                onClick={() => router.push(`../my-gigs/create`)}
              >
                <div className='mx-auto max-w-min rounded-md p-2'>
                  <GoPlus size='2.6em' />
                </div>
              </div>
            )}

            {imagePath && !loading && (
              <div
                className='relative z-10 h-full w-full text-center'
                
              >
                <Image
                  alt='uploaded image'
                  className='aspect-square h-full w-full rounded-xl object-cover opacity-70'
                  height={1000}
                  key={imagePath}
                  src={imagePath}
                  width={1000}
                  onClick={() => router.push(`../my-gigs/edit/${gigId}`)}
                />
                {viewMode === 'edit' && (
                  <DialogTrigger>
                    <RiCloseLine className='absolute right-[3px] top-[3px] z-50 h-[32px] w-[32px] rounded-full p-[4px] text-white bg-[#3E525B] border' />
                  </DialogTrigger>
                )}
              </div>
            )}
          </label>
          <div className='absolute z-50 text-center text-base cursor-pointer' onClick={() => router.push(`../my-gigs/edit/${gigId}`)}>{title}</div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure to delete this gig?</DialogTitle>
            <DialogDescription>It will delete your gig permanently.</DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex justify-center gap-3'>
            <DialogClose asChild>
              <button onClick={() => handleDeleteGig(gigId)}>Yes</button>
            </DialogClose>
            <DialogClose asChild>
              <button>Cancel</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyGigs;
