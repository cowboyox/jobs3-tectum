import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoPlus } from 'react-icons/go';

import { Input } from '@/components/ui/input';
import RadialProgress from '@/components/ui/progress';
import api from '@/utils/api';
import { backend_url } from '@/utils/variables';
import { useRouter } from 'next/navigation';


const Portfolio = ({ imagePath, setUploadedImagePath, email, setProfileData, viewMode, title, profileId, portfolioId }) => {
  const [loading, setLoading] = useState(false);
  // const [progress, setProgress] = useState(0);
  const progress = 0;
  const router = useRouter();

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
          const res = await api.post(`/api/v1/profile/upload-portfolio/${email}`, formData, config);

          if (res.status === 200) {
            setLoading(false);
            // setUploadedImagePath(URL.createObjectURL(image));
            setUploadedImagePath((prev) => [...prev, URL.createObjectURL(image)]);
            let tmp = `/images/uploads/${email}/portfolio/${image.name}`;
            setProfileData((prev) => ({
              ...prev,
              portfolio: [...prev.portfolio, tmp],
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
        setSelectedImage(image);
        handleImageUpload(image);
      }
    },
    [email, setProfileData, setUploadedImagePath]
  );
  console.log("imagePath", imagePath);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='h-full space-y-3'>
      <div className='realative flex h-full items-center justify-center'>
        <label
          className={`flex h-72 w-full items-center justify-center rounded-2xl border border-dashed border-[#526872] bg-[#1a272c] cursor-pointer transition hover:bg-[#23343b]`}
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
            <div className='text-center cursor-pointer' onClick={() => router.push(`../portfolio/create`)} >
              <div className='mx-auto max-w-min rounded-md p-2'>
                <GoPlus size='2.6em' />
              </div>
            </div>
          )}

          {imagePath && !loading && (
            <div className='text-center h-full w-full' onClick={() => router.push(`../portfolio-view/${profileId}/${portfolioId}`)}>
              <Image
                alt='uploaded image'
                className='w-full rounded-xl aspect-square object-cover opacity-70 h-full'
                height={1000}
                key={imagePath}
                src={`${imagePath}`}
                width={1000}
              />
            </div>
          )}
        </label>
        <div className='absolute z-50 text-center text-base cursor-pointer'>{title}</div>

        {/* {viewMode === 'edit' && (
          <Input
            {...getInputProps()}
            accept='image/png, image/jpeg'
            className='hidden'
            disabled={loading}
            id='dropzone-file1'
            onChange={handleImageChange}
            type='file'
          />
        )} */}
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

export default Portfolio;
