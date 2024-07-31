'use client';
import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const DropFile = ({
  className,
  inputName,
  placeHolderPlusIconSize,
  acceptOnly,
  onFileUpload,
  fileType = null,
  fileUrl = null,
  fileName = null,
  isAuth,
}) => {
  const { toast } = useToast();

  const [filePreview, setFilePreview] = useState({
    name: fileName,
    type: fileType,
    url: fileUrl,
  });

  const previewPhoto = (file) => {
    if (file.files[0]) {
      if (onFileUpload) {
        onFileUpload(file.files);
      }
      const fileType = file.files[0].type.split('/')[0];
      const fileUrl = URL.createObjectURL(file.files[0]);
      const fileName = file.files[0].name;

      // Validate file type
      if (acceptOnly === 'image' && fileType !== 'image') {
        toast({
          description: 'Only image files are allowed, for example png/jpeg/webp/etc...',
          title: 'Please select an image file.',
        });
        return;
      } else if (acceptOnly === 'video' && fileType !== 'video') {
        toast({
          description: 'Only video files are allowed, for example webm/mp4/mov/etc...',
          title: 'Please select a video file.',
        });
        return;
      } else if (acceptOnly === 'other' && (fileType === 'image' || fileType === 'video')) {
        toast({
          description: 'Please try something else, for example pdf/docx/txt/etc...',
          title: 'Images and Videos are not accepted',
        });
        return;
      }

      setFilePreview({
        name: fileName,
        type: fileType,
        url: fileUrl,
      });
    }
  };

  return (
    <div className={className}>
      <div className='relative flex h-full w-full items-center justify-center rounded-xl border border-dashed border-[#526872] bg-[#1B272C]'>
        {filePreview.type === 'video' ? (
          <video
            className='absolute flex h-full w-full items-center justify-center rounded-xl border-[#526872] object-cover'
            controls
            src={filePreview.url}
          />
        ) : filePreview.type === 'image' ? (
          <img
            alt='Preview'
            className='absolute top-0 left-0 w-full h-full cursor-pointer'
            src={filePreview.url}
          />
        ) : filePreview.url ? (
          <div className='absolute flex items-center justify-center w-full h-full bg-white rounded-xl'>
            <p className='text-black'>{filePreview.name}</p>
          </div>
        ) : (
          <GoPlus fill='#526872' size={placeHolderPlusIconSize} />
        )}
        <FormField
          name={inputName}
          render={({ field }) => (
            <FormItem className='absolute top-0 left-0 w-full h-full opacity-0'>
              <FormControl>
                <Input
                  {...field}
                  className='absolute top-0 left-0 w-full h-full bg-black cursor-pointer'
                  name={inputName}
                  onChange={(evnt) => previewPhoto(evnt.target)}
                  title={filePreview.url ? filePreview.name : 'Add an image'}
                  type='file'
                  disabled={isAuth === false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DropFile;
