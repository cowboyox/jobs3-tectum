import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoPlus } from 'react-icons/go';

import { Input } from '@/components/ui/input';
import RadialProgress from '@/components/ui/progress';
import api from '@/utils/api';
import { backend_url } from '@/utils/variables';
import { useRouter } from 'next/navigation';

const MyGigs = ({ imagePath, setUploadedGigPath, email, setProfileData, viewMode, title }) => {
  const [loading, setLoading] = useState(false);
  // const [progress, setProgress] = useState(0);
  const router = useRouter();
  const progress = 0;

  // const onUploadProgress = (progressEvent) => {
  //   if (progressEvent.total) {
  //     const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //     setProgress(percentage);
  //   }
  // };

  const handleImageChange = (event) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];
      handleImageUpload(image);
    }
  };

  // const removeSelectedImage = () => {
  //   setLoading(false);
  //   setUploadedImagePath(null);
  //   setSelectedImage(null);
  // };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const handleImageUpload = async (image) => {
        if (!image) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('file', image);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        try {
          // const res = await uploadImageToCloudinary(formData, onUploadProgress);
          const res = await api.post(`/api/v1/profile/upload-gig/${email}`, formData, config);

          if (res.status === 200) {
            setLoading(false);
            // setUploadedImagePath(URL.createObjectURL(image));
            setUploadedGigPath((prev) => [...prev, URL.createObjectURL(image)]);
            let tmp = `/images/uploads/${email}/mygigs/${image.name}`;
            setProfileData((prev) => ({
              ...prev,
              myGigs: [...prev.myGigs, tmp],
            }));
            // if (onUploadComplete) {
            //   onUploadComplete(res.data.url);
            // }
            // setUploadUrl(res.data.url);
          }
        } catch (error) {
          setLoading(false);
          console.error('Error uploading image:', error);
        }
      };

      if (acceptedFiles.length > 0) {
        const image = acceptedFiles[0];
        // setSelectedImage(image);
        handleImageUpload(image);
      }
    },
    [email, setProfileData, setUploadedGigPath]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='h-full space-y-3'>
      <div className='h-full realative flex justify-center items-center'>
        <label
          className={`flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-[#526872] bg-[#1a272c] ${viewMode === 'edit' ? 'cursor-pointer' : 'cursor-not-allowed'} transition hover:bg-[#23343b]`}
          // htmlFor='dropzone-file'
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
            <div className='space-y-2 text-center'>
              <Image
                alt='uploaded image'
                className='h-full w-full rounded-xl object-contain opacity-70'
                key={imagePath}
                src={imagePath}
                width={1000}
                height={1000}
              />
            </div>
          )}
          
        </label>
        <div className='absolute text-center text-base z-50'>{title}</div>
      </div>

      {/* {!!uploadedImagePath && (
          <div className="flex items-center justify-between">
            <Link
              href={uploadedImagePath}
              className=" text-gray-500 text-xs hover:underline "
            >
              Click here to see uploaded image :D
            </Link>
  
            <Button
              onClick={removeSelectedImage}
              type="button"
              variant="secondary"
            >
              {uploadedImagePath ? "Remove" : "Close"}
            </Button>
          </div>
        )} */}
    </div>
  );
};

export default MyGigs;
