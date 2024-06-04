import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Link from 'next/link';
import Image from 'next/image';
import { GoPlus } from "react-icons/go";
import RadialProgress from "@/components/ui/progress";
import { Input } from '@/components/ui/input';
import api from '@/utils/api';

const Portfolio = ({ imagePath, setUploadedImagePath, email }) => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const onUploadProgress = (progressEvent) => {
        if (progressEvent.total) {
            const percentage = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentage);
        }
    };

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

    const handleImageUpload = async (image) => {
        if (!image) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("file", image);
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
                setUploadedImagePath((prev) => [
                    ...prev,
                    URL.createObjectURL(image)
                ])
                console.log("---------- ", image)
                // if (onUploadComplete) {
                //   onUploadComplete(res.data.url);
                // }
                // setUploadUrl(res.data.url);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error uploading image:", error);
        }
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const image = acceptedFiles[0];
            setSelectedImage(image);
            handleImageUpload(image);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });


    return (
        <div className="space-y-3 h-full">
            <div {...getRootProps()} className="h-full">
                <label
                    htmlFor="dropzone-file1"
                    className="w-full h-72 bg-[#1a272c] rounded-2xl flex items-center justify-center border border-dashed border-[#526872] cursor-pointer transition hover:bg-[#23343b]"
                    onClick={e => e.stopPropagation()}
                >
                    {loading && (
                        <div className="text-center max-w-md">
                            <RadialProgress progress={progress} />
                            <p className="text-sm font-semibold">Uploading Picture</p>
                            <p className="text-xs text-gray-400">
                                Do not refresh or perform any other action while the picture is
                                being uploaded
                            </p>
                        </div>
                    )}

                    {!loading && imagePath === "" && (
                        <div className="text-center">
                            <div className="p-2 rounded-md max-w-min mx-auto">
                                <GoPlus size="2.6em" />
                            </div>
                        </div>
                    )}

                    {imagePath && !loading && (
                        <div className="text-center space-y-2">
                            <Image
                                width={1000}
                                height={1000}
                                src={imagePath}
                                className="w-full object-contain opacity-70 rounded-xl"
                                alt="uploaded image"
                                key={imagePath}
                            />
                        </div>
                    )}
                </label>

                <Input
                    {...getInputProps()}
                    id="dropzone-file1"
                    accept="image/png, image/jpeg"
                    type="file"
                    className="hidden"
                    disabled={loading}
                    onChange={handleImageChange}
                />
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
    )
}

export default Portfolio;