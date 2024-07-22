'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/ContextProvider';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GrDocumentDownload } from 'react-icons/gr';
import { FileUploader } from 'react-drag-drop-files';
import { MdOutlineAttachFile } from 'react-icons/md';
import { PiExportThin } from 'react-icons/pi';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';

function FileUploadBody() {
  return (
    <div className='flex w-full items-center justify-center rounded-xl pb-2 pt-2 cursor-pointer'>
      <PiExportThin className='mr-2 h-[24px] w-[24px] text-[#A0B4C0]' />
      <p className='text-center'>
        <span className='text-base text-[#A0B4C0]'>Upload</span>
      </p>
    </div>
  );
}
const EditPortfolio = ({ params }) => {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useCustomContext();
  const [viewMode, setViewMode] = useState('preview');
  const [portfolioList, setPortfolioList] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState({});
  const [files, setFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [postDocuments, setPostDocuments] = useState([]);
  const [changedPostions, setChangedPostions] = useState([false, false, false, false]);

  useEffect(() => {
    if (viewMode === 'preview') {
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
    }
  }, [params.profileID, viewMode]);
  console.log('currentPortfolio', currentPortfolio?.gallery?.documents);

  useEffect(() => {
    const selectedPortfolio = portfolioList.find((item) => item._id === String(params.portfolioID));
    setCurrentPortfolio(selectedPortfolio);
  }, [portfolioList, params.portfolioID]);

  useEffect(() => {
    if (auth?.currentProfile?._id === params.profileID) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [auth, params.profileID]);
  const FileChanged = (file) => {
    let tmp = [];
    const filesArray = Array.from(file);
    filesArray.map((fi) => tmp.push(fi));
    setFiles(filesArray);
  };
  const VideoFileChanged = (file) => {
    setVideoFile(file);
  };
  const ImageFileChanged = (file, index) => {
    let tmp = [];
    tmp = imageFiles.map((item) => item);
    tmp[index] = file;
    setImageFiles(tmp);
    let tmp1 = [];
    tmp1 = changedPostions.map((item) => item);
    tmp1[index] = true;
    setChangedPostions(tmp1);
  };
  const onRemoveImage = (id) => {
    setFiles(files.filter((_, i) => i !== id));
  };
  console.log('imageFiles', imageFiles);
  const handlePublish = async () => {
    // values.walletPubkey = wallet.publicKey;
    if (!currentPortfolio.portfolioTitle || !currentPortfolio.portfolioDescription) {
      return toast({
        className:
          'bg-yellow-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Input Portfolio Title and Description</h3>,
        title: <h1 className='text-center'>Warning</h1>,
        variant: 'default',
      });
    }
    const formData = new FormData();
    if (videoFile) {
      formData.append('files', videoFile);
    }

    imageFiles.forEach((file) => {
      if (file) formData.append('files', file);
    });
    files.forEach((file) => {
      if (file) formData.append('files', file);
    });

    formData.append(
      'metadata',
      JSON.stringify({
        video: videoFile ? 1 : 0,
        images: imageFiles.length,
        documents: files.length,
        changedPostions: changedPostions,
      })
    );
    let tmp = localStorage.getItem('jobs_2024_token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    await api
      .put(`/api/v1/freelancer_portfolio/edit_portfolio/${params.portfolioID}`, currentPortfolio)
      .then(async (portfolioData) => {
        await api
          .post(
            `/api/v1/freelancer_portfolio/upload_attachment/${auth.currentProfile._id}/${portfolioData.data.portfolioId}`,
            formData,
            config
          )
          .then(async (data) => {
            console.log('Successfully uploaded', data.data.msg[0]);
          });
        toast({
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Successfully updated {currentPortfolio.portfolioTitle}</h3>,
          title: <h1 className='text-center'>Success</h1>,
          variant: 'default',
        });
        setViewMode('preview');
        // router.push('/dashboard/freel ancer/portfolio');
      })
      .catch((err) => {
        console.error('Error corrupted during updating portfolio', err);
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Internal Server Error</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
      });
  };

  return (
    <div className='flex flex-col py-6'>
      <div className='flex w-full items-center justify-center gap-5 rounded-[15px] bg-[#1B272C] px-[5px] py-[5px] text-base font-bold text-[#F5F5F5]'>
        <div
          className={`flex w-1/2 cursor-pointer items-center justify-center rounded-[15px] px-10 py-[10px] ${viewMode === 'preview' && 'bg-[#DC4F13]'}`}
          onClick={() => {
            handlePublish();
          }}
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
      {viewMode === 'preview' && (
        <>
          <div className='mt-[30px] flex flex-col items-start justify-center gap-[30px] rounded-[15px] bg-[#10191D] pb-[30px]'>
            <div className='h-[470px] w-full'>
              <video
                className='relative flex h-full w-full items-center justify-center rounded-xl border-[#526872] object-cover'
                controls
                src={currentPortfolio?.gallery?.video ? currentPortfolio.gallery?.video : ''}
              />
            </div>
            <div className='grid w-full grid-cols-1 gap-5 px-[30px] md:grid-cols-2 lg:grid-cols-4'>
              {currentPortfolio?.gallery?.images?.map((item, key) => (
                <div key={key} className='h-[105px] w-full'>
                  <Image
                    alt='avatar'
                    className='aspect-square h-full w-full rounded-[10px] object-cover'
                    height={1000}
                    src={item ? item : ''}
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
          <div className='align-start mt-[30px] flex w-full flex-col gap-[15px] rounded-[15px] bg-[#10191D] p-[30px] md:w-1/2'>
            <div className='text-[18px] font-bold text-[#96B0BD]'>Documents</div>
            <div className='flex flex-col items-center justify-center gap-[15px] md:flex-row'>
              {currentPortfolio?.gallery?.documents?.map((item, key) => (
                <div
                  className='flex cursor-pointer gap-[10px] rounded-[15px] border border-[#526872] px-[15px] py-[10px]'
                  onClick={() => router.push(item)}
                  key={key}
                >
                  <GrDocumentDownload className='rounded-[5px] text-[24px] text-[#96B0BD]' />
                  <div className='text-base text-[#96B0BD] mobile:w-[80%] overflow-hidden'>
                    {String(item).split('/').pop() || ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {viewMode === 'edit' && (
        <div className='jutify-center mt-[30px] flex w-full flex-col items-start gap-[60px] rounded-[15px] bg-[#10191D] p-[30px]'>
          <div className='flex w-full flex-col gap-[15px]'>
            <div className='text-[24px] font-semibold text-[#F5F5F5]'>Project Title</div>
            <div className='text-base text-[#96B0BD]'>
              {currentPortfolio?.portfolioTitle.length}/50 symbols
            </div>
            <div className='rouned-[15px] w-full rounded-[15px] border border-[#526872] p-[20px] text-base text-[#96B0BD]'>
              <input
                className='w-full border-none bg-transparent outline-none'
                value={currentPortfolio?.portfolioTitle}
                onChange={(e) =>
                  setCurrentPortfolio((prev) => ({ ...prev, portfolioTitle: e.target.value }))
                }
                placeholder='Type your title'
              />
            </div>
          </div>
          <div className='flex w-full flex-col gap-[15px]'>
            <div className='text-[24px] font-semibold text-[#F5F5F5]'>Describe Your Item</div>
            <div className='text-base text-[#96B0BD]'>
              {currentPortfolio?.portfolioDescription.length}/1400 symbols
            </div>
            <div className='rouned-[15px] w-full rounded-[15px] border border-[#526872] p-[20px] text-base text-[#96B0BD]'>
              <textarea
                className='w-full border-none bg-transparent outline-none'
                value={currentPortfolio?.portfolioDescription}
                onChange={(e) =>
                  setCurrentPortfolio((prev) => ({ ...prev, portfolioDescription: e.target.value }))
                }
                placeholder='Type your description'
                rows={7}
              />
            </div>
          </div>
          <div className='flex w-full flex-col gap-[15px]'>
            <div className='text-[24px] font-semibold text-[#F5F5F5]'>Documents (Up To 2)</div>
            <div className='text-base text-[#96B0BD]'>
              Show some the best work you created in a document. Format: PDF
            </div>
            <div className='rounded-xl border border-dashed border-slate-500'>
              <FileUploader
                fileOrFiles={files}
                handleChange={(e) => FileChanged(e)}
                types={['doc', 'docx']}
                multiple={true}
                label={''}
              >
                <FileUploadBody />
              </FileUploader>
              {files.length > 0 && (
                <div className='mt-5 flex w-full flex-wrap justify-center gap-0 rounded-xl border border-slate-500'>
                  {files.map((item, index) => {
                    return (
                      <div
                        aria-hidden
                        className='flex w-full cursor-pointer items-center justify-center gap-2 p-3 md:w-1/2 lg:w-1/3'
                        key={index}
                        onClick={() => onRemoveImage(index)}
                      >
                        <MdOutlineAttachFile size={'20px'} />
                        <span className='overflow-hidden mobile:w-[80%]'>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {files.length === 0 && currentPortfolio?.gallery?.documents?.length > 0 && (
                <div className='mt-5 flex w-full flex-wrap justify-center gap-0 rounded-xl border border-slate-500'>
                  {currentPortfolio?.gallery?.documents.map((item, index) => {
                    return (
                      <div
                        aria-hidden
                        className='flex w-full cursor-pointer items-center justify-center gap-2 p-3 md:w-1/2 lg:w-1/3'
                        key={index}
                      >
                        <MdOutlineAttachFile size={'20px'} />
                        <span className='overflow-hidden mobile:w-[80%]'>
                          {String(item).split('/').pop() || ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className='flex w-full flex-col gap-[15px]'>
            <div className='text-[24px] font-semibold text-[#F5F5F5]'>Video(1 Only)</div>
            <div className='text-base text-[#96B0BD]'>
              Capture buyers attention with a video that showcases your services
            </div>
            {videoFile && (
              <div className='flex w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-500 md:w-3/5'>
                <FileUploader
                  fileOrFiles={videoFile}
                  handleChange={(e) => VideoFileChanged(e)}
                  types={['avi', 'mp4']}
                  multiple={false}
                  label={''}
                >
                  <video
                    className='relative flex h-full w-full items-center justify-center rounded-xl border-[#526872] object-cover'
                    controls
                    src={URL.createObjectURL(videoFile)}
                  />
                </FileUploader>
              </div>
            )}
            {!videoFile && currentPortfolio?.gallery?.video && (
              <div className='flex w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-500 md:w-3/5'>
                <FileUploader
                  fileOrFiles={videoFile}
                  handleChange={(e) => VideoFileChanged(e)}
                  types={['avi', 'mp4']}
                  multiple={false}
                  label={''}
                >
                  <video
                    className='relative flex h-full w-full items-center justify-center rounded-xl border-[#526872] object-cover'
                    controls
                    src={currentPortfolio?.gallery?.video}
                  />
                </FileUploader>
              </div>
            )}
            {!videoFile && !currentPortfolio?.gallery?.video && (
              <div className='flex h-[400px] w-full items-center justify-center rounded-xl border border-dashed border-slate-500 md:w-3/5'>
                <FileUploader
                  fileOrFiles={videoFile}
                  handleChange={(e) => VideoFileChanged(e)}
                  types={['avi', 'mp4']}
                  multiple={false}
                  label={''}
                >
                  <AiOutlinePlus className='h-[59px] w-[59px] text-[#96B0BD] cursor-pointer' />
                </FileUploader>
              </div>
            )}
          </div>

          <div className='flex w-full flex-col gap-[15px]'>
            <div className='text-[24px] font-semibold text-[#F5F5F5]'>Images(Up To 4)</div>
            <div className='text-base text-[#96B0BD]'>
              Het noticed by the right buyers with visual examples of your services
            </div>
            <div className='grid w-full grid-cols-1 md:grid-cols-2 items-center justify-center gap-5 md:w-3/5'>
              {[0, 1, 2, 3].map((item, key) => (
                <FileUploader
                  fileOrFiles={imageFiles[key] ? imageFiles[key] : null}
                  handleChange={(e) => ImageFileChanged(e, key)}
                  types={['jpg', 'jpeg', 'png', 'gif']}
                  multiple={false}
                  label={''}
                  key={key}
                >
                  {imageFiles[key] ? (
                    <Image
                      className='relative flex h-[178px] w-full items-center justify-center rounded-xl border-[#526872] object-cover'
                      src={URL.createObjectURL(imageFiles[key])}
                      width={1000}
                      height={175}
                      alt='imageFile'
                    />
                  ) : currentPortfolio?.gallery?.images[key] ? (
                    <Image
                      className='relative flex h-[178px] w-full items-center justify-center rounded-xl border-[#526872] object-cover'
                      src={currentPortfolio?.gallery?.images[key]}
                      width={1000}
                      height={175}
                      alt='imageFile'
                    />
                  ) : (
                    <div className='flex h-[178px] cursor-pointer items-center justify-center rounded-[15px] border border-dashed border-[#526872] bg-[#1B272C]'>
                      <AiOutlinePlus className='h-[29px] w-[29px] text-[#96B0BD]' />
                    </div>
                  )}
                </FileUploader>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPortfolio;
