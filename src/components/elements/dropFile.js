"use client";
import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go'; 
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"
import { FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form";

const DropFile = ({ className, inputName, placeHolderPlusIconSize, acceptOnly }) => {
    const { toast } = useToast();

    const [filePreview, setFilePreview] = useState({
        type: null,
        url: null,
        name: null
    });

    const previewPhoto = (file) => {
        const fileType = file.files[0].type.split('/')[0];
        const fileUrl = URL.createObjectURL(file.files[0]);
        const fileName = file.files[0].name;

        // Validate file type
        if (acceptOnly === 'image' && fileType !== 'image') {
            toast({
                title: "Please select an image file.",
                description: "Only image files are allowed, for example png/jpeg/webp/etc...",
            })
            return;
        } else if (acceptOnly === 'video' && fileType !== 'video') {
            toast({
                title: "Please select a video file.",
                description: "Only video files are allowed, for example webm/mp4/mov/etc...",
            })
            return;
        } else if (acceptOnly === 'other' && (fileType === 'image' || fileType === 'video')) { 
            toast({
                title: "Images and Videos are not accepted",
                description: "Please try something else, for example pdf/docx/txt/etc...",
            })
            return;
        }

        setFilePreview({
            type: fileType,
            url: fileUrl,
            name: fileName
        });
    };

    return (
        <div className={className}>
            {filePreview.type === 'video' ? (
                <video
                    src={filePreview.url}
                    controls
                    className="w-full h-full rounded-xl border-[#526872] flex items-center justify-center relative object-cover"
                />
            ) : filePreview.type === 'image' ? (
                <img
                    src={filePreview.url}
                    alt="Preview"
                    className="w-full h-full rounded-xl border border-white flex items-center justify-center relative object-cover"
                />
            ) : filePreview.url ? (
                <div className="w-full h-full flex items-center justify-center bg-white rounded-xl relative">
                    <p className="text-black">{filePreview.name}</p>
                </div>
            ) : (
                <div className="w-full h-full bg-[#1B272C] border border-dashed rounded-xl border-[#526872] flex items-center justify-center relative">
                    <GoPlus size={placeHolderPlusIconSize} fill="#526872" />
                    <FormField
                      name={inputName}
                      render={({ field }) => (
                        <FormItem className='absolute top-0 left-0 h-full w-full opacity-0'>
                          <FormControl>
                            <Input
                                {...field}
                                onChange={(evnt) => previewPhoto(evnt.target)}
                                type="file"
                                name={inputName}
                                className="absolute top-0 left-0 h-full w-full bg-black"
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
