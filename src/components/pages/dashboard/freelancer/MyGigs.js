import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoPlus } from 'react-icons/go';

import { Input } from '@/components/ui/input';
import RadialProgress from '@/components/ui/progress';
import api from '@/utils/api';
import { backend_url } from '@/utils/variables';

const MyGigs = ({ imagePath, setUploadedGigPath, email, setProfileData, viewMode }) => {
  const [loading, setLoading] = useState(false);
  // const [progress, setProgress] = useState(0);

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
      <div {...getRootProps()} className='h-full'>
        <label
          className={`flex h-72 w-full items-center justify-center rounded-2xl border border-dashed border-[#526872] bg-[#1a272c] ${viewMode === 'edit' ? 'cursor-pointer' : 'cursor-not-allowed'} transition hover:bg-[#23343b]`}
          htmlFor='dropzone-file'
          onClick={(e) => e.stopPropagation()}
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
            <div className='text-center'>
              <div className='mx-auto max-w-min rounded-md p-2'>
                <GoPlus size='2.6em' />
              </div>
            </div>
          )}

          {imagePath && !loading && (
            <div className='space-y-2 text-center'>
              <Image
                alt='uploaded image'
                className='w-full rounded-xl object-contain opacity-70'
                height={1000}
                key={imagePath}
                src={`${backend_url}/${imagePath}`}
                width={1000}
              />
            </div>
          )}
        </label>
        {viewMode === 'edit' && (
          <Input
            {...getInputProps()}
            accept='image/png, image/jpeg'
            className='hidden'
            disabled={loading}
            id='dropzone-file'
            onChange={handleImageChange}
            type='file'
          />
        )}
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
