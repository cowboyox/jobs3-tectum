'use client';
/*
 * Selmani: I used client page as i didn't have enough time to organize it more
 * But if you do, please try to separate components that needs use client
 to another page and just remove them from this page so it remains a 
 server page
*/

import { useAnchorWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoTrash } from 'react-icons/go';
import { MdOutlineAttachFile } from 'react-icons/md';
import DropFile from '@/components/elements/dropFile';
import FormStep from '@/components/elements/formSteps/Step';
import { StepProvider } from '@/components/elements/formSteps/StepContext';
import FormNavigation from '@/components/elements/formSteps/StepNavigation';
import StepNavItem from '@/components/elements/formSteps/StepNavItem';
import { Checkbox } from '@/components/ui/checkbox';
import { PiExportThin } from 'react-icons/pi';

import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import { useGetFreelancerGigById } from '@/hooks/useGetFreelancerGigById';
import api from '@/utils/api';
import { FileUploader } from 'react-drag-drop-files';
import { AiOutlinePlus } from 'react-icons/ai';
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
const Question = (props) => {
  return (
    <div className='flex gap-2 rounded-xl border border-[#526872] p-4'>
      <p className='text-base text-white'>{props.question_num}.</p>
      <div className='flex w-full flex-col gap-1'>
        <p className='text-base text-white'>{props.question}</p>
        <p className='w-full border-0 bg-transparent p-0 text-base text-[#96B0BD] shadow-none shadow-transparent outline-none'>
          {props.answer_placeholder}
        </p>
      </div>
      <GoTrash className='cursor-pointer' onClick={() => props.onDelete(props.id)} />
    </div>
  );
};

const EditGig = () => {
  const wallet = useAnchorWallet();
  const { gigId } = useParams();
  const { data: gigInfo, refetch: refetchGig } = useGetFreelancerGigById(gigId);
  const [isAuth, setIsAuth] = useState(false);

  const categories_list = [
    {
      label: 'Accounting & Consulting',
      value: 'category_1',
    },
    {
      label: 'Admin Support',
      value: 'category_2',
    },
    {
      label: 'Customer Service',
      value: 'category_3',
    },
    {
      label: 'Crypto & Web3',
      value: 'category_4',
    },
    {
      label: 'Data Science & Analytics',
      value: 'category_5',
    },
    {
      label: 'Design & Creative',
      value: 'category_6',
    },
    {
      label: 'Engineering & Architecture',
      value: 'category_7',
    },
    {
      label: 'IT & Networking',
      value: 'category_8',
    },
    {
      label: 'Legal',
      value: 'category_9',
    },
    {
      label: 'Sales & Marketing',
      value: 'category_10',
    },
    {
      label: 'Translation',
      value: 'category_11',
    },
    {
      label: 'Web, Mobile & Software Development',
      value: 'category_12',
    },
    {
      label: 'Writing',
      value: 'category_13',
    },
  ];

  const subcategory_list = [
    {
      parent: 'Accounting & Consulting',
      value: [
        'Personal Coaching',
        'Career Coaching',
        'Business Analysis',
        'Management Consulting',
        'Instructional Design',
        'HR Administration',
        'Recruiting & Talent Sourcing',
        'Training & Development',
        'Tax Preparation',
        'Bookkeeping',
        'Accounting',
        'Financial Management/CFO',
        'Financial Analysis & Modeling',
      ],
    },
    {
      parent: 'Admin Support',
      value: [
        'Personal Virtual Assistance',
        'Executive Virtual Assistance',
        'Legal Virtual Assistance',
        'Ecommerce Mangement',
        'Medical Virtual Assistance',
        'General Virtual Assistance',
        'Data Entry',
        'Manual Transcription',
        'Supply Chain & Logistics Project Management',
        'Business Project Management',
        'Digital Project Mangement',
        'Construction & Engineering Project Mangement',
        'Development & IT Project Management',
        'Healthcare Project Mangement',
        'Quantitative Research',
        'Market Research',
        'General Research Services',
        'Qualitative Research',
        'Product Reviews',
        'Web & Software Product Research',
      ],
    },
    {
      parent: 'Customer Service',
      value: [
        'Customer Onboarding',
        'IT Support',
        'Tech Support',
        'Email, Phone & Chat Support',
        'Visual Tagging & Processing',
        'Community Management',
        'Content Moderation',
      ],
    },
    {
      parent: 'Crypto & Web3',
      value: [
        'NFT Art',
        'Coins Design & Tokenisation',
        'Blockchain & NFT Development',
        'Wallet Development',
        'DEX/CEX Listing',
        'Trading Bots Development',
        'Smart Contracts Development',
        'DAPPs Development',
        'Security & Audit',
        'KOLs Marketing',
        'Consulting',
        'Web3 PR',
        'Shilling',
        'Market Making',
        'Trending',
        'Buy Bots',
        'CryptoBanner Ads',
        'Reddit',
        'Telegram Promotion',
        'Token Launch',
      ],
    },
    {
      parent: 'Data Science & Analytics',
      value: [
        'Data Mining',
        'Data Engineering',
        'Data Extraction',
        'Data Processing',
        'Deep Learning',
        'Knowledge Representation',
        'AI Data Annotation & Labeling',
        'Machine Learning',
        'Generative AI Modeling',
        'Data Visualization',
        'Data Analytics',
        'Experimentation & Testing',
      ],
    },
    {
      parent: 'Design & Creative',
      value: [
        'Brand Identity Design',
        'Logo Design',
        'Singing',
        'Acting',
        'Voice Talent',
        'Music Performance',
        'Visual Effects',
        '2D Animation',
        'Video Editing',
        'Video Production',
        'AI Video Generation & Editing',
        'Motion Graphics',
        'Videography',
        '3D Animation',
        'Packaging Design',
        'Art Direction',
        'Graphic Design',
        'Image Editing',
        'Presentation Design',
        'Creative Direction',
        'Editorial Design',
        'AI Image Generation & Editing',
        'Cartoons & Comics',
        'Pattern Design',
        'Fine Art',
        'Portraits & Caricatures',
        'Illustration',
        'Songwriting & Music Composition',
        'Music Production',
        'Audio Editing',
        'AI Speech & Audio Generation',
        'Audio Production',
        'Product & Industrial Design',
        'Jewelry Design',
        'Fashion Design',
        'AR/VR Design',
        'Game Art',
        'Production Photography',
        'Local Photography',
        'Animated Explainers',
      ],
    },
    {
      parent: 'Engineering & Architecture',
      value: [
        'Structural Engineering',
        'Building Information Modeling',
        'Civil Engineering',
        '3D Modeling & Rendering',
        'CAD',
        'Landscape Architecture',
        'Architectural Design',
        'Interior Design',
        'Trade Show Design',
        'Energy Engineering',
        'Mechanical Engineering',
        'Chemical & Process Engineering',
        'Electronic Engineering',
        'Electrical Engineering',
        'STEM Tutoring',
        'Physics',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Logistics & Supply Chain Management',
        'Sourcing & Procurement',
      ],
    },
    {
      parent: 'IT & Networking',
      value: [
        'Network Security',
        'IT Compliance',
        'Information Security',
        'Database Administration',
        'Cloud Engineering',
        'Solution Architecture',
        'DevOps Engineering',
        'Business Applications Development',
        'Systems Engineering',
        'Network Administration',
      ],
    },
    {
      parent: 'Legal',
      value: [
        'Business & Corporate Law',
        'Intellectual Property Law',
        'Paralegal Services',
        'Tax Law',
        'Securities & Finance Law',
        'Labor & Employment Law',
        'Regulatory Law',
        'International Law',
        'Immigration Law',
      ],
    },
    {
      parent: 'Sales & Marketing',
      value: [
        'Public Relations',
        'Social Media Strategy',
        'Marketing Strategy',
        'Content Strategy',
        'Brand Strategy',
        'Email Marketing',
        'SEO',
        'Social Media Marketing',
        'Display Advertising',
        'Campaign Management',
        'Marketing Automation',
        'Search Engine Marketing',
        'Telemarketing',
        'Lead Generation',
        'Sales & Business Development',
        'Book and Ebook Marketing',
        'Podcast Marketing',
        'Video Marketing',
        'Influencer Marketing',
        'Mobile App Marketing',
        'Affiliate Marketing',
      ],
    },
    {
      parent: 'Translation',
      value: [
        'Sign Language Interpretation',
        'Live Interpretation',
        'Language Tutoring',
        'Technical Document Translation',
        'Legal Document Translation',
        'Medical Document Translation',
        'General Translation Services',
        'Language Localization',
      ],
    },
    {
      parent: 'Web, Mobile & Software Development',
      value: [
        'Ecommerce Website Development',
        'Desktop Software Development',
        'Scripting & Automation',
        'Manual Testing',
        'Automation Testing',
        'AI Chatbot Development',
        'AI Integration',
        'Prototyping',
        'Mobile Design',
        'Web Design',
        'UX/UI Design',
        'Mobile App Development',
        'Mobile Game Development',
        'Scrum Leadership',
        'Product Management',
        'Firmware Development',
        'Emerging Tech',
        'AR/VR Development',
        'Coding Tutoring',
        'Database Development',
        'Back-End Development',
        'Front-End Development',
        'Full Stack Development',
        'CMS Development',
        'Video Game Development',
      ],
    },
    {
      parent: 'Writing',
      value: [
        'Sales Copywriting',
        'Marketing Copywriting',
        'Ad & Email Copywriting',
        'Proofreading',
        'Copy Editing',
        'Grant Writing',
        'Business & Proposal Writing',
        'Resume & Cover Letter Writing',
        'Medical Writing',
        'Legal Writing',
        'Academic & Research Writing',
        'Technical Writing',
        'Writing Tutoring',
        'Scriptwriting',
        'Ghostwriting',
        'Creative Writing',
        'Article & Blog Writing',
        'Web & UX Writing',
        'AI Content Writing',
      ],
    },
  ];

  const [formInfo, setFormInfo] = useState({
    currentCategory: '',
    deliveryTime: 0,
    documents: [],
    email: '',
    gigDescription: '',
    gigPrice: 0,
    gigTitle: '',
    images: [],
    question: [],
    revision: 0,
    subCategory: '',
    tags: [],
    video: '',
  });

  const { toast } = useToast();
  const auth = useCustomContext();
  const router = useRouter();

  const form = useForm();

  useEffect(() => {
    if (gigInfo && auth) {
      setFormInfo({
        currentCategory: gigInfo.gigCategory,
        deliveryTime: gigInfo.deliveryTime,
        documents: gigInfo.gallery?.documents,
        email: auth.user?.email,
        gigDescription: gigInfo.gigDescription,
        gigPrice: gigInfo.gigPrice,
        gigTitle: gigInfo.gigTitle,
        images: gigInfo.gallery?.images,
        question: gigInfo.question,
        revision: gigInfo.revision,
        subCategory: gigInfo.subCategory,
        tags: gigInfo.searchKeywords,
        video: gigInfo.gallery?.video,
      });
      setIsAuth(auth.currentProfile?._id === gigInfo.creator?._id);
    }
  }, [gigInfo, auth]);

  const newQuestionRef = useRef(null);
  const newAnswerPlaceholderRef = useRef(null);

  const addNewQuestion = () => {
    const newQuestion = newQuestionRef.current.value.trim();
    const newAnswerPlaceholder = newAnswerPlaceholderRef.current.value.trim();

    if (newQuestion && newAnswerPlaceholder) {
      const newQuestionObject = {
        answer_placeholder: newAnswerPlaceholder,
        id: gigInfo.question.length + 1,
        question: newQuestion,
      };
      setFormInfo((prev) => ({ ...prev, question: [...prev.question, newQuestionObject] }));

      // Clear input fields
      newQuestionRef.current.value = '';
      newAnswerPlaceholderRef.current.value = '';
    }
  };

  const deleteQuestion = (id) => {
    isAuth &&
      setFormInfo((prev) => ({ ...prev, question: prev.question.filter((q) => q.id !== id) }));
  };

  const [tagInputValue, setTagInputValue] = useState('');

  const tagsInputFocus = (event) => {
    if (event.key === 'Enter' && tagInputValue.trim()) {
      event.preventDefault();
      if (formInfo.tags.length < 5) {
        setFormInfo((prev) => ({ ...prev, tags: [...prev.tags, tagInputValue.trim()] }));
        setTagInputValue('');
      }
    }
  };

  const removeTag = (indexToRemove) => {
    isAuth &&
      setFormInfo((prev) => ({
        ...prev,
        tags: prev.tags.filter((_, index) => index !== indexToRemove),
      }));
  };

  const [videoFile, setVideoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [changedPostions, setChangedPostions] = useState([false, false, false, false]);

  const getFileNameFromUrl = (url) => {
    if (url) {
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname;
      const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
      const cleanFilename = filename.split('?')[0].split('#')[0];

      return cleanFilename;
    } else {
      return '';
    }
  };
  const onRemoveImage = (id) => {
    setDocumentFiles(documentFiles.filter((_, i) => i !== id));
  };
  async function onSubmit() {
    if (isAuth) {
      if (!wallet) {
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Please connect your wallet!</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
        return;
      }

      if (!formInfo.gigTitle || !formInfo.gigDescription) {
        return toast({
          className:
            'bg-yellow-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3 className='text-center'>Input Gig Title and Description</h3>,
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

      documentFiles.forEach((file) => {
        if (file) formData.append('files', file);
      });
      formData.append(
        'metadata',
        JSON.stringify({
          video: videoFile ? 1 : 0,
          images: imageFiles.length,
          documents: documentFiles.length,
          changedPostions: changedPostions,
        })
      );
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      console.log('prepared well', formInfo);
      console.log('formData', formData);

      await api
        .put(`/api/v1/freelancer_gig/edit_gig/${gigId}`, formInfo)
        .then(async () => {
          await api
            .post(
              `/api/v1/freelancer_gig/upload_attachment/${auth.currentProfile._id}/${gigId}`,
              formData,
              config
            )
            .then(async (data) => {
              console.log(data);
            });
          toast({
            className:
              'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Successfully updated gig titled {formInfo.gigTitle}</h3>,
            title: <h1 className='text-center'>Success</h1>,
            variant: 'default',
          });
          await refetchGig();
          router.push(`../${auth.currentProfile._id}`);
        })
        .catch((err) => {
          console.error('Error corrupted during posting gig', err);
          toast({
            className:
              'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Internal Server Error</h3>,
            title: <h1 className='text-center'>Error</h1>,
            variant: 'destructive',
          });
        });
    } else {
      router.back();
    }
  }
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
  const DocumentFileChanged = (file) => {
    let tmp = [];
    const filesArray = (Array.from(file)).slice(0,2);
    filesArray.map((fi) => tmp.push(fi));
    setDocumentFiles(filesArray);
  };
  console.log("formInfo", formInfo);
  return (
    <StepProvider>
      <div className='flex w-full flex-col'>
        <nav className='mobile:overflow-x-scroll flex w-full flex-nowrap rounded-t-xl bg-[#10191d]'>
          <StepNavItem isEdit name='Overview' num={1} />
          <StepNavItem isEdit name='Pricing' num={2} />
          <StepNavItem isEdit name='Description' num={3} />
          <StepNavItem isEdit name='Requirements' num={4} />
          <StepNavItem isEdit name='Gallery' num={5} />
          {isAuth && <StepNavItem isEdit name='Publish' num={6} />}
        </nav>
        <Form {...form}>
          <form
            className='mobile:px-3 mx-auto mt-10 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] p-7'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormStep stepOrder={1}>
              <FormItem className='flex flex-col gap-2'>
                <FormLabel className='text-2xl text-[#F5F5F5]'>Gig title</FormLabel>
                <FormDescription className='text-base text-[#96B0BD]'>
                  As your Gig storefront, your title is the most important place to include words
                  that buyers would likely use to search for a service like yours
                </FormDescription>
                <FormControl>
                  <Textarea
                    className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                    onChange={(e) => setFormInfo((prev) => ({ ...prev, gigTitle: e.target.value }))}
                    placeholder='I will do something im really good at...'
                    value={formInfo.gigTitle}
                    disabled={!isAuth}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <div className='flex flex-col gap-2'>
                <p className='text-2xl text-[#F5F5F5]'>Category</p>
                <p className='text-base text-[#96B0BD]'>
                  Choose the category and subcategory most suitable for your Gig
                </p>
                <div className='mobile:flex-col flex gap-3'>
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormControl>
                      <Select
                        defaultValue={formInfo.currentCategory}
                        onValueChange={(e) =>
                          setFormInfo((prev) => ({ ...prev, currentCategory: e }))
                        }
                        value={formInfo.currentCategory}
                        disabled={!isAuth}
                      >
                        <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                          <SelectValue placeholder='Select a Category' />
                        </SelectTrigger>
                        <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                          <SelectGroup>
                            {categories_list.map((job_category) => (
                              <SelectItem key={job_category.value} value={job_category.label}>
                                {job_category.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormControl>
                      <Select
                        defaultValue={formInfo.subCategory}
                        onValueChange={(e) => setFormInfo((prev) => ({ ...prev, subCategory: e }))}
                        value={formInfo.subCategory}
                        disabled={!isAuth}
                      >
                        <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                          <SelectValue placeholder='Select a Sub Category' />
                        </SelectTrigger>
                        <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                          <SelectGroup>
                            {subcategory_list.map((subcat) => {
                              if (subcat.parent === formInfo.currentCategory) {
                                return subcat.value.map((item, index) => (
                                  <SelectItem key={index} value={item}>
                                    {item} {/* Displaying the item instead of index */}
                                  </SelectItem>
                                ));
                              }
                              return null; // Return null if condition is not met
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              </div>
              <div className='flex w-full flex-col gap-4'>
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel className='text-2xl text-[#F5F5F5]'>
                    Search tags, positive keywords
                  </FormLabel>
                  <FormDescription className='text-base text-[#96B0BD]'>
                    Enter search terms you feel buyers will use when looking for service.
                  </FormDescription>
                  <FormControl>
                    <Input defaultValue={formInfo.tags.join(', ')} type='hidden' />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <input
                  className={`h-14 w-full rounded-xl border border-slate-500 bg-transparent px-4 py-4 text-base ${formInfo.tags.length >= 5 ? 'cursor-not-allowed opacity-15' : ''}`}
                  onChange={(event) => setTagInputValue(event.target.value)}
                  onKeyDown={tagsInputFocus}
                  placeholder='Enter tag'
                  value={tagInputValue}
                  disabled={!isAuth}
                />
                <div className='flex flex-wrap items-center gap-3'>
                  {formInfo.tags.map((tag, index) => (
                    <div
                      className='flex w-auto cursor-pointer items-center whitespace-nowrap rounded-full bg-white px-2 py-1 text-sm text-black'
                      key={index}
                      onClick={() => removeTag(index)}
                    >
                      {tag}
                      <GoTrash className='ml-2' />
                    </div>
                  ))}
                </div>
                <p className='text-sm text-[#526872]'>
                  5 tags maximum, use letters and numbers only
                </p>
              </div>
            </FormStep>
            <FormStep stepOrder={2}>
              <FormItem className='flex flex-col gap-2'>
                <FormLabel className='text-2xl text-[#F5F5F5]'>Setup price</FormLabel>
                <FormControl>
                  <Input
                    className='h-14 w-full rounded-xl border border-slate-500 bg-transparent px-4 py-4 text-base'
                    onChange={(e) => setFormInfo((prev) => ({ ...prev, gigPrice: e.target.value }))}
                    placeholder='Price'
                    type='number'
                    value={formInfo.gigPrice}
                    disabled={!isAuth}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem className='flex w-full flex-col gap-2'>
                <FormLabel className='text-2xl text-[#F5F5F5]'>Revisions</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => setFormInfo((prev) => ({ ...prev, revision: e }))}
                    value={String(formInfo.revision)}
                    disabled={!isAuth}
                  >
                    <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                      <SelectValue placeholder='Revisions' />
                    </SelectTrigger>
                    <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                      <SelectGroup>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={i + 1} value={`${i + 1}`}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem className='flex w-full flex-col gap-2'>
                <FormLabel className='text-2xl text-[#F5F5F5]'>Delivery time</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => setFormInfo((prev) => ({ ...prev, deliveryTime: e }))}
                    value={formInfo.deliveryTime}
                    disabled={!isAuth}
                  >
                    <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                      <SelectValue placeholder='Delivery time' />
                    </SelectTrigger>
                    <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                      <SelectGroup>
                        {Array.from({ length: 60 }, (_, i) => (
                          <SelectItem key={i + 1} value={`${i + 1} days`}>
                            {i + 1} day{i + 1 > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                        <SelectItem value='+ 2 months'>+ 2 Months</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormStep>
            <FormStep stepOrder={3}>
              <FormItem className='flex flex-col gap-2'>
                <FormLabel className='text-2xl text-[#F5F5F5]'>Briefly describe your Gig</FormLabel>
                <FormDescription className='text-base text-[#96B0BD]'>
                  0/1200 characters
                </FormDescription>
                <FormControl>
                  <Textarea
                    className='h-60 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                    onChange={(e) =>
                      setFormInfo((prev) => ({ ...prev, gigDescription: e.target.value }))
                    }
                    placeholder='Add info here...'
                    value={formInfo.gigDescription}
                    disabled={!isAuth}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormStep>
            <FormStep stepOrder={4}>
              <div className='text-2xl text-[#F5F5F5]'>
                Get all the information you need from buyers to get started
              </div>
              <div className='text-base text-[#96B0BD]'>
                Add questions to help buyers provide you with exactly what you need to start working
                on their order
              </div>
              {formInfo.question.map((requirement_question, q_indx) => (
                <Question
                  answer_placeholder={requirement_question.answer_placeholder}
                  id={requirement_question.id}
                  key={requirement_question.id}
                  onDelete={deleteQuestion}
                  question={requirement_question.question}
                  question_num={q_indx + 1}
                />
              ))}
              {isAuth && (
                <div className='flex flex-col gap-3 rounded-xl border border-[#526872] p-3'>
                  <input
                    className='h-14 w-full rounded-xl border border-slate-500 bg-transparent px-4 py-4 text-base'
                    placeholder='Add question here'
                    ref={newQuestionRef}
                  />
                  <input
                    className='h-14 w-full rounded-xl border border-slate-500 bg-transparent px-4 py-4 text-base'
                    placeholder='Answer example (For the client to know how to answer)'
                    ref={newAnswerPlaceholderRef}
                  />
                  <div
                    className='h-14 w-full cursor-pointer rounded-xl bg-slate-700 px-4 py-4 text-center text-base text-white transition hover:bg-white hover:text-black'
                    onClick={addNewQuestion}
                  >
                    Add new question
                  </div>
                </div>
              )}
            </FormStep>
            <FormStep stepOrder={5}>
              <div className='mobile:text-xl text-3xl text-[#F5F5F5]'>
                Showcase your services in a Gig gallery. Drag and drop your files here or{' '}
                <span className='main_color'>browse</span> to upload
              </div>
              <div className='text-base text-[#96B0BD]'>
                Encourage buyers to choose your Gig by featuring a variety of your work. Format:
                JPEG, JPG, PNG, GIF, MP4, AVI. Max size per image/video: 50MB
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-2xl text-[#F5F5F5]'>Video (1 only)</p>
                <p className='text-base text-[#96B0BD]'>
                  Capture buyers attention with a video that showcases your services
                </p>
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
                {!videoFile && formInfo.video && (
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
                        src={formInfo.video}
                      />
                    </FileUploader>
                  </div>
                )}
                {!videoFile && !formInfo.video && (
                  <div className='flex h-[400px] w-full items-center justify-center rounded-xl border border-dashed border-slate-500 md:w-3/5'>
                    <FileUploader
                      fileOrFiles={videoFile}
                      handleChange={(e) => VideoFileChanged(e)}
                      types={['avi', 'mp4']}
                      multiple={false}
                      label={''}
                    >
                      <AiOutlinePlus className='h-[59px] w-[59px] cursor-pointer text-[#96B0BD]' />
                    </FileUploader>
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-2xl text-[#F5F5F5]'>Images (up to 4)</p>
                <p className='text-base text-[#96B0BD]'>
                  Het noticed by the right buyers with visual examples of your services
                </p>
                <div className='grid w-full grid-cols-1 items-center justify-center gap-5 md:w-3/5 md:grid-cols-2'>
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
                      ) : formInfo?.images?.length > key && formInfo?.images[key]? (
                        <Image
                          className='relative flex h-[178px] w-full items-center justify-center rounded-xl border-[#526872] object-cover'
                          src={formInfo?.images[key]}
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
              <div className='flex flex-col gap-4'>
                <p className='text-2xl text-[#F5F5F5]'>Documents (up to 2)</p>
                <p className='text-base text-[#96B0BD]'>
                  Show some the best work you created in a document. Format: PDF
                </p>
                <div className='rounded-xl border border-dashed border-slate-500'>
                  <FileUploader
                    fileOrFiles={documentFiles}
                    handleChange={(e) => DocumentFileChanged(e)}
                    types={['doc', 'docx', 'pdf']}
                    multiple={true}
                    label={''}
                  >
                    <FileUploadBody />
                  </FileUploader>
                  {documentFiles.length > 0 && (
                    <div className='mt-5 flex w-full flex-wrap justify-center gap-0 rounded-xl border border-slate-500'>
                      {documentFiles.map((item, index) => {
                        return (
                          <div
                            aria-hidden
                            className='flex w-full cursor-pointer items-center justify-center gap-2 p-3 md:w-1/2 lg:w-1/3'
                            key={index}
                            onClick={() => onRemoveImage(index)}
                          >
                            <MdOutlineAttachFile size={'20px'} />
                            <span className='mobile:w-[80%] overflow-hidden'>{item.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {documentFiles.length === 0 && formInfo?.documents?.length > 0 && (
                    <div className='mt-5 flex w-full flex-wrap justify-center gap-0 rounded-xl border border-slate-500'>
                      {formInfo?.documents.map((item, index) => {
                        return (
                          <div
                            aria-hidden
                            className='flex w-full cursor-pointer items-center justify-center gap-2 p-3 md:w-1/2 lg:w-1/3'
                            key={index}
                          >
                            <MdOutlineAttachFile size={'20px'} />
                            <span className='mobile:w-[80%] overflow-hidden'>
                              {String(item).split('/').pop() || ''}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className='flex items-start gap-5'>
                <Checkbox id='terms' />
                <label
                  className='text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  htmlFor='terms'
                >
                  I declare that these materials were created by myself or by my team and do not
                  infringe on any 3rd party rights. I understand that the illegal use of digital
                  assets is against JOBS3’s Terms of Service and may result in blocking my account
                </label>
              </div>
            </FormStep>
            <FormStep stepOrder={6}>
              <div className='flex flex-col gap-2'>
                <div className='text-center text-3xl text-[#F5F5F5]'>You’re almost done!</div>
                <div className='text-center text-base text-[#96B0BD]'>
                  Let’s publish your Gig and get you ready to start selling
                </div>
              </div>
              <Image
                alt='publish_img'
                className='mx-auto w-1/2'
                height={500}
                src='/assets/images/publish_image.png'
                width={500}
              />
            </FormStep>
            <FormNavigation isAuth={isAuth} />
          </form>
        </Form>
      </div>
    </StepProvider>
  );
};

export default EditGig;
