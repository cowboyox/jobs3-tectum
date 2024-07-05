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
}) => {
  const { toast } = useToast();

  const [filePreview, setFilePreview] = useState({
    name: fileName,
    type: fileType,
    url: fileUrl,
  });

  const previewPhoto = (file) => {
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
  };

  return (
    <div className={className}>
      {filePreview.type === 'video' ? (
        <video
          className='relative flex h-full w-full items-center justify-center rounded-xl border-[#526872] object-cover'
          controls
          src={filePreview.url}
        />
      ) : filePreview.type === 'image' ? (
        <img
          alt='Preview'
          className='relative flex h-full w-full items-center justify-center rounded-xl border border-white object-cover'
          src={filePreview.url}
        />
      ) : filePreview.url ? (
        <div className='relative flex h-full w-full items-center justify-center rounded-xl bg-white'>
          <p className='text-black'>{filePreview.name}</p>
        </div>
      ) : (
        <div className='relative flex h-full w-full items-center justify-center rounded-xl border border-dashed border-[#526872] bg-[#1B272C]'>
          <GoPlus fill='#526872' size={placeHolderPlusIconSize} />
          <FormField
            name={inputName}
            render={({ field }) => (
              <FormItem className='absolute left-0 top-0 h-full w-full opacity-0'>
                <FormControl>
                  <Input
                    {...field}
                    className='absolute left-0 top-0 h-full w-full bg-black'
                    name={inputName}
                    onChange={(evnt) => previewPhoto(evnt.target)}
                    type='file'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default DropFile;
