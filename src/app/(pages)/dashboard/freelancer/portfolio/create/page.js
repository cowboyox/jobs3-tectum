'use client';
/*
 * Selmani: I used client page as i didn't have enough time to organize it more
 * But if you do, please try to separate components that needs use client
 to another page and just remove them from this page so it remains a 
 server page
*/
/*-----------------------------------------|
|   Core React library and hooks           |
|-----------------------------------------*/
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

/*-----------------------------------------|
|   Project-specific elements components   |
|-----------------------------------------*/
import DropFile from '@/components/elements/dropFile';
import FormStep from '@/components/elements/formSteps/Step';
import { StepProvider } from '@/components/elements/formSteps/StepContext';
import FormNavigation from '@/components/elements/formSteps/StepNavigation';
import StepNavItem from '@/components/elements/formSteps/StepNavItem';

/*-----------------------------------------|
|   Project-specific UI components         |
|-----------------------------------------*/
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { useCustomContext } from '@/context/ContextProvider';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import { LiaSpinnerSolid } from "react-icons/lia";


const Createportfolio = () => {
  /*------------ List of categories ------------*/
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

  /*------------ List of subcategories ------------*/
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
  
  /*------------ State hooks ------------*/
  const [currentCategory, setCurrentCategory] = useState('Accounting & Consulting');
  const [currentSub, setCurrentSub] = useState('Personal Coaching');
  const [videoFile, setVideoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);

  /*------------ Toast and Form hooks ------------*/
  const { toast } = useToast();
  const auth = useCustomContext();
  const form = useForm();
  const router = useRouter();

  /*------------ File upload handlers ------------*/
  const handleVideoUpload = (file) => {
    setVideoFile(file[0]);
  };

  const handleImageUpload = (files, index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = files[0];
    setImageFiles(newImageFiles);
  };

  const handleDocumentUpload = (files, index) => {
    const newDocumentFiles = [...documentFiles];
    newDocumentFiles[index] = files[0];
    setDocumentFiles(newDocumentFiles);
  };

  console.log("auth.currentProfile._id", auth?.currentProfile?._id);


  /*------------ Form submission handler ------------*/
  async function onSubmit(values) {
    console.log(values);
    setIsWaiting(true);
    // if (!wallet) {
    //   toast({
    //     className:
    //       'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
    //     description: <h3>Please connect your wallet!</h3>,
    //     title: <h1 className='text-center'>Error</h1>,
    //     variant: 'destructive',
    //   });
    //   return;
    // }
    values.mainCategory = currentCategory;
    values.subCategory = currentSub;
    values.email = auth.user.email;
    values.creator = auth.currentProfile._id;
    // values.walletPubkey = wallet.publicKey;
    if (!values.portfolioTitle || !values.portfolioDescription) {
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
    documentFiles.forEach((file) => {
      if (file) formData.append('files', file);
    });

    formData.append('metadata', JSON.stringify({
      video: videoFile ? 1 : 0,
      images: imageFiles.length,
      documents: documentFiles.length
    }));
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    await api
      .post('/api/v1/freelancer_portfolio/create_portfolio', values)
      .then(async (portfolioData) => {
        await api.post(`/api/v1/freelancer_portfolio/upload_attachment/${auth.currentProfile._id}/${portfolioData.data.portfolioId}`, formData, config).then(async (data) => {
          console.log("Successfully uploaded", data.data.msg[0]);
        })
        toast({
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Successfully created {values.portfolioTitle}</h3>,
          title: <h1 className='text-center'>Success</h1>,
          variant: 'default',
        });
        setIsWaiting(false);
        router.push(`/dashboard/freelancer/portfolio/${auth.currentProfile._id}`);
      })
      .catch((err) => {
        console.error('Error corrupted during creating portfolio', err);
        setIsWaiting(false);
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Internal Server Error</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
      });
  }

  return (
    <StepProvider>
      <div className='flex flex-col w-full'>
        <nav className='flex w-full flex-nowrap rounded-t-xl bg-[#10191d] mobile:overflow-x-scroll'>
          <StepNavItem name='Overview' num={1} />
          <StepNavItem name='Category' num={2} />
          <StepNavItem name='Description' num={3} /> 
        </nav>
        <Form {...form}>
          <form
            className='mx-auto mt-10 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormStep stepOrder={1}>
              <div className='text-3xl text-[#F5F5F5] mobile:text-xl'>
              Drag and drop your files here or{' '}
                <span className='main_color'>browse</span> to upload
              </div>
              <div className='text-base text-[#96B0BD]'>
                Format: JPEG, JPG, PNG, GIF, MP4, AVI. Max size per image/video: 50MB
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-2xl text-[#F5F5F5]'>Video (1 only)</p>
                <p className='text-base text-[#96B0BD]'>
                  Capture buyers attention with a video that showcases your services
                </p>
                <DropFile
                  acceptOnly='video'
                  className='aspect-video max-h-80'
                  inputName='video'
                  onFileUpload={handleVideoUpload}
                  placeHolderPlusIconSize={60}
                />
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-2xl text-[#F5F5F5]'>Images (up to 4)</p>
                <p className='text-base text-[#96B0BD]'>
                  Het noticed by the right buyers with visual examples of your services
                </p>
                <div className='grid gap-5 md:grid-cols-2'>
                  {Array.from({ length: 4 }, (_, indx) => (
                    <DropFile
                      acceptOnly='image'
                      className='aspect-video'
                      inputName={`portfolio_image_${indx}`}
                      key={indx}
                      onFileUpload={(files) => handleImageUpload(files, indx)}
                      placeHolderPlusIconSize={40}
                    />
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-2xl text-[#F5F5F5]'>Documents (up to 2)</p>
                <p className='text-base text-[#96B0BD]'>
                  Show some the best work you created in a document. Format: PDF
                </p>
                <div className='grid gap-5 md:grid-cols-2'>
                  {Array.from({ length: 2 }, (_, indx) => (
                    <DropFile
                      acceptOnly='other'
                      className='h-12'
                      inputName={`portfolio_document_${indx}`}
                      key={indx}
                      onFileUpload={(files) => handleDocumentUpload(files, indx)}
                      placeHolderPlusIconSize={40}
                    />
                  ))}
                </div>
              </div>
            </FormStep>
            <FormStep stepOrder={2}>  
              <div className='flex flex-col gap-2'>
                <p className='text-2xl text-[#F5F5F5]'>Category</p>
                <p className='text-base text-[#96B0BD]'>
                  Choose the category and subcategory most suitable for you
                </p>
                <div className='flex gap-3 mobile:flex-col'>
                  <FormField
                    name='portfolioCategory'
                    render={() => (
                      <FormItem className='flex flex-col w-full gap-2'>
                        <FormControl>
                          <Select
                            onValueChange={(e) => {
                              setCurrentCategory(e);
                            }}
                            value={currentCategory}
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
                    )}
                  />
                  <FormField
                    name='subCategory'
                    render={() => (
                      <FormItem className='flex flex-col w-full gap-2'>
                        <FormControl>
                          <Select
                            onValueChange={(e) => {
                              setCurrentSub(e);
                            }}
                            value={currentSub}
                          >
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Select a Sub Category' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {subcategory_list.map((subcat) => {
                                  if (subcat.parent === currentCategory) {
                                    return subcat.value.map((item, index) => (
                                      <SelectItem key={index} value={item}>
                                        {item}
                                      </SelectItem>
                                    ));
                                  }
                                  return null; 
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div> 
            </FormStep> 
            <FormStep stepOrder={3}>
              <FormField
                name='portfolioTitle'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>Project title</FormLabel>
                    <FormDescription className='text-base text-[#96B0BD]'>
                      {field && field.value ? field.value.length : '0'}/50 characters
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='px-4 py-4 text-base bg-transparent h-18 rounded-xl border-slate-500'
                        placeholder='Type your project title'
                        maxLength={50}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='portfolioDescription'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>
                      Briefly describe your Project
                    </FormLabel>
                    <FormDescription className='text-base text-[#96B0BD]'>
                      {field && field.value ? field.value.length : '0'}/1200 characters
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='px-4 py-4 text-base bg-transparent h-60 rounded-xl border-slate-500'
                        placeholder='Add info here...'
                        maxLength={1200}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
            </FormStep> 
            <FormStep stepOrder={4}>
              <div className='flex flex-col gap-2'>
                <div className='text-center text-3xl text-[#F5F5F5]'>You&apos;re almost done!</div>
                <div className='text-center text-base text-[#96B0BD]'>
                  Let&apos;s publish your Portfolio and get you ready to start getting more impressions
                </div>
              </div>
              <img className='w-1/2 mx-auto' src='/assets/images/publish_image.png' />
            </FormStep>
            <FormNavigation max={4} isWaiting={isWaiting}/>
          </form>
        </Form>
      </div>
    </StepProvider>
  );
};

export default Createportfolio;