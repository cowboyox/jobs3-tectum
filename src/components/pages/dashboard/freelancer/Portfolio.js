import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoPlus } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import RadialProgress from '@/components/ui/progress';
import api from '@/utils/api';
import { backend_url } from '@/utils/variables';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { RiCloseLine } from 'react-icons/ri';

const Portfolio = ({
  imagePath,
  setUploadedImagePath,
  email,
  setProfileData,
  viewMode,
  title,
  profileId,
  portfolioId,
}) => {
  const [loading, setLoading] = useState(false);
  const progress = 0;
  const { toast } = useToast();
  const router = useRouter();
  const handleDeletePortfolio = (portfolio_id) => {
    api.delete(`/api/v1/freelancer_portfolio/delete_portfolio/${portfolio_id}`).then((data) => {
      setProfileData((prev) => ({
       ...prev,
        portfolio: prev.portfolio.filter((portfolio) => portfolio._id!== portfolio_id),
      }));
      return toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully removed portfolio!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    });
  }
  return (
    <div className='h-full space-y-3'>
      <Dialog>
        <div className='realative flex h-full items-center justify-center'>
          <label
            className={`flex h-72 w-full items-center justify-center rounded-2xl border border-dashed border-[#526872] bg-[#1a272c] transition hover:bg-[#23343b]`}
            htmlFor='dropzone-file1'
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
                onClick={() => router.push(`../portfolio/create`)}
              >
                <div className='mx-auto max-w-min rounded-md p-2'>
                  <GoPlus size='2.6em' />
                </div>
              </div>
            )}

            {imagePath && !loading && (
              <div className='relative h-full w-full text-center'>
                <Image
                  alt='uploaded image'
                  className='aspect-square h-full w-full rounded-xl object-cover opacity-70'
                  height={1000}
                  key={imagePath}
                  src={`${imagePath}`}
                  width={1000}
                  onClick={() => router.push(`../portfolio-view/${profileId}/${portfolioId}`)}
                />
                {viewMode === 'edit' && (
                  <DialogTrigger>
                    <RiCloseLine className='absolute right-[3px] top-[3px] z-50 h-[32px] w-[32px] rounded-full p-[4px] text-white bg-[#3E525B] border' />
                  </DialogTrigger>
                )}
              </div>
            )}
          </label>
          <div className='absolute z-50 cursor-pointer text-center text-base'>{title}</div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure to delete this portfolio?</DialogTitle>
            <DialogDescription>
              It will delete your portfolio permanently.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex justify-center gap-3'>
            <DialogClose asChild>
              <button onClick={() => handleDeletePortfolio(portfolioId)}>
                Yes
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button>
                Cancel
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portfolio;
