'use client';
/*
 * Selmani: I used client page as i didn't have enough time to organize it more
 * But if you do, please try to separate components that needs use client
 to another page and just remove them from this page so it remains a 
 server page
*/

import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoTrash } from 'react-icons/go';

import DropFile from '@/components/elements/dropFile';
import FormStep from '@/components/elements/formSteps/Step';
import { StepProvider } from '@/components/elements/formSteps/StepContext';
import FormNavigation from '@/components/elements/formSteps/StepNavigation';
import StepNavItem from '@/components/elements/formSteps/StepNavItem';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
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
import { useCustomContext } from '@/context/ContextProvider';
import api from '@/utils/api';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { COUNTRIES, MONTHS } from '@/utils/constants';
import { useStep } from '@/components/elements/formSteps/StepContext';
// import { StepNumber } from '@/components/elements/formSteps/StepContext';

const all_form_structure = {
  budget_mode: [
    {
      label: 'Hourly Rate',
      value: 'hourly',
    },
    {
      label: 'Fixed Price',
      value: 'fixed',
    },
  ],
  gig_from_to: {
    // From
    from_label: 'From',
    from_placeholder: '36.00',
    // To
    to_label: 'To',
    to_placeholder: '60.00',
  },
  gig_fixed_price: '36.00',
};
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

const CreateResume = () => {
  const wallet = useAnchorWallet();

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
  const [currentCategory, setCurrentCategory] = useState('Accounting & Consulting');
  const [currentSub, setCurrentSub] = useState('Personal Coaching');

  const { toast } = useToast();
  const auth = useCustomContext();
  const router = useRouter();

  const form = useForm();
  const [tags, setTags] = useState([]);
  const [requirementQuestions, setRequirementQuestions] = useState([
    {
      answer_placeholder: '3D design, e-commerce, accounting, marketing, etc',
      id: 0,
      question: 'If you are ordering for a business, what’s your industry?',
    },
    {
      answer_placeholder: 'Building a mobile app, creating an animation, developing a game, etc',
      id: 1,
      question: 'Is this order part of a bigger project you’re working on?',
    },
  ]);

  // const [profile, setProfileData] = useState(null);
  // useEffect(() => {
  //   if (auth.user) {
  //     api.get(`/api/v1/profile/get-profile/${auth.user.email}/0`).then((res) => {
  //       setProfileData(res.data.profile);
  //     });
  //   }
  // }, [auth]);
  const [budgetMode, setBudgetMode] = useState('hourly');
  const [postData, setPostData] = useState({
    instantBuy: false,
  });

  const newQuestionRef = useRef(null);
  const newAnswerPlaceholderRef = useRef(null);
  const [changedPostions, setChangedPostions] = useState([false, false, false, false]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isExperience, setIsExperience] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'David',
    lastName: 'Johnson',
    phoneNumber: '+82812312',
    email: 'davidjohnson@gmail.com',
    location: 'United States',
    summary: 'I am a senior developer.',
    skills: [{name: 'Graphic Design', year: '4'}],
    certificates: [{name: 'Microsoft'}],
    experience: [],
    educations: [],
  });
  const [skillName, setSkillName] = useState('');
  const [yearOfExperience, setYearOfExperience] = useState('');
  const [certificateItem, setCertificateItem] = useState({
    name: '',
    year: '',
    isExpired: false,
    fromMonth: '',
    fromYear: '',
    toMonth: '',
    toYear: '',
  });
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingCertification, setIsAddingCertification] = useState(false);
  const [stepNumber, setStepNumber] = useState(1);
  const [isResumePreview, setIsResumePreview] = useState(true);

  useEffect(() => {
    if (stepNumber === 2) setIsExperience((prevState) => true);
    console.log('useEffect', stepNumber);
  }, [stepNumber]);

  const addNewQuestion = () => {
    const newQuestion = newQuestionRef.current.value.trim();
    const newAnswerPlaceholder = newAnswerPlaceholderRef.current.value.trim();

    if (newQuestion && newAnswerPlaceholder) {
      const newQuestionObject = {
        answer_placeholder: newAnswerPlaceholder,
        id: requirementQuestions.length + 1,
        question: newQuestion,
      };
      setRequirementQuestions((prevState) => [...prevState, newQuestionObject]);

      // Clear input fields
      newQuestionRef.current.value = '';
      newAnswerPlaceholderRef.current.value = '';
    }
  };

  const deleteQuestion = (id) => {
    setRequirementQuestions((prevState) => prevState.filter((question) => question.id !== id));
  };

  const [tagInputValue, setTagInputValue] = useState('');

  const tagsInputFocus = (event) => {
    if (event.key === 'Enter' && tagInputValue.trim()) {
      event.preventDefault();
      if (tags.length < 5) {
        setTags([...tags, tagInputValue.trim()]);
        setTagInputValue('');
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const [videoFile, setVideoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);

  const handleVideoUpload = (file) => {
    setVideoFile(file[0]); // Assuming single file for video
  };

  const handleImageUpload = (files, index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = files[0]; // Assuming single file for each image slot
    setImageFiles(newImageFiles);
    let tmp1 = [];
    tmp1 = changedPostions.map((item) => item);
    tmp1[index] = true;
    setChangedPostions(tmp1);
  };

  const handleDocumentUpload = (files, index) => {
    const newDocumentFiles = [...documentFiles];
    newDocumentFiles[index] = files[0]; // Assuming single file for each document slot
    setDocumentFiles(newDocumentFiles);
  };
  async function onSubmit(values) {
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

    /* Selmani: I didn't check if all the values are being passed here
     * And i'm sure not all, so please make sure all necessary inputs are being passed
     * NOTE: Make sure to check the ShadCN documentation
     * https://ui.shadcn.com/docs/components
     * I know you know but just wanted to mention :D
     */
    values.question = requirementQuestions;
    values.searchKeywords = tags;
    values.email = auth.user.email;
    values.creator = auth.currentProfile._id;
    values.walletPubkey = wallet.publicKey;
    values.instantBuy = postData.instantBuy;
    values.gigPaymentType = postData.gigPaymentType;
    values.gigPrice = postData.gigPrice;
    values.minBudget = postData.minBudget;
    values.maxBudget = postData.maxBudget;
    values.gigCategory = currentCategory;
    values.subCategory = currentSub;
    // if (profile) {
    //   values.creator = profile._id;
    // }

    if (!values.gigTitle || !values.gigDescription) {
      return toast({
        className:
          'bg-yellow-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Input Gig Title and Description</h3>,
        title: <h1 className='text-center'>Warning</h1>,
        variant: 'default',
      });
    }
    setIsWaiting(true);

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
    console.log('documentFiles.length', documentFiles.length);
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

    console.log('values', values);
    await api
      .post('/api/v1/freelancer_gig/post_gig', values)
      .then(async (gigData) => {
        await api
          .post(
            `/api/v1/freelancer_gig/upload_attachment/${auth.currentProfile._id}/${gigData.data.data._id}`,
            formData,
            config
          )
          .then(async (data) => {
            console.log('Successfully uploaded', data.data.msg[0]);
            await api.post('/api/v1/freelancer_gig/send_tg_bot', {
              gigDescription: values.gigDescription,
              gigId: gigData.data.gigId,
              gigTitle: values.gigTitle,
              imageURL:
                auth?.currentProfile?.avatarURL != '' ? auth.currentProfile.avatarURL : null,
              profileName: auth.user.name,
              profileType: 'Freelancer',
            });
          });
        toast({
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Successfully posted gig titled {values.gigTitle}</h3>,
          title: <h1 className='text-center'>Success</h1>,
          variant: 'default',
        });
        setIsWaiting(false);
        router.push(`./${auth.currentProfile._id}`);
      })
      .catch((err) => {
        console.error('Error corrupted during posting gig', err);
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
      {!isResumePreview ? (
        <div className='flex w-full flex-col'>
          <nav className='flex w-full flex-nowrap rounded-t-xl bg-[#10191d] mobile:overflow-x-scroll'>
            <StepNavItem name='Contact Information' num={1} />
            <StepNavItem name='Work experience & Education' num={2} />
            <StepNavItem name='Skills & Certifications' num={3} />
          </nav>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormStep stepOrder={1}>
                {/* <FormField
                name='gigTitle'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>First name</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                        placeholder='I will do something im really good at...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
                <div className='mx-auto mt-10 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'>
                  <div className='flex w-full flex-col gap-4'>
                    <FormField
                      name='gig_tags'
                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-2'>
                          <FormLabel className='text-2xl text-[#F5F5F5]'>
                            First name <span className='text-[#dc4f13]'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                              type='text'
                              placeholder='Devon Miles'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex w-full flex-col gap-4'>
                    <FormField
                      name='gig_tags'
                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-2'>
                          <FormLabel className='text-2xl text-[#F5F5F5]'>
                            Last name <span className='text-[#dc4f13]'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                              type='text'
                              placeholder='Devon Miles'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex w-full flex-col gap-4'>
                    <FormField
                      name='gig_tags'
                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-2'>
                          <FormLabel className='text-2xl text-[#F5F5F5]'>Headline</FormLabel>
                          <FormControl>
                            <Input
                              className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                              type='text'
                              placeholder='Title of the searching Gig can be very long'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex w-full flex-col gap-4'>
                    <hr />
                  </div>
                  <FormField
                    name='gigTitle'
                    render={({ field }) => (
                      <FormItem className='flex flex-col gap-2'>
                        <FormLabel className='text-2xl text-[#F5F5F5]'>Summary</FormLabel>
                        <FormDescription>0/1200 characters</FormDescription>
                        <FormControl>
                          <Textarea
                            {...field}
                            className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                            placeholder='I am Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name='gigTitle'
                    render={({ field }) => (
                      <FormItem className='flex flex-col gap-2'>
                        <FormLabel className='text-2xl text-[#F5F5F5]'>
                          Phone <span className='text-[#dc4f13]'>*</span>
                        </FormLabel>
                        <FormControl>
                          <PhoneInput defaultCountry='US' placeholder='Input you number' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex w-full flex-col gap-4'>
                    <FormField
                      name='gig_tags'
                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-2'>
                          <FormLabel className='text-2xl text-[#F5F5F5]'>Email</FormLabel>
                          <FormControl>
                            <Input
                              className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                              type='text'
                              placeholder='Email'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>Location</FormLabel>
                    <FormDescription>This help you to match with nearby jobs</FormDescription>
                    <FormControl>
                      {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                      <Select>
                        <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                          <SelectValue placeholder='United States' />
                        </SelectTrigger>
                        <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                          <SelectGroup>
                            {COUNTRIES.map((country, index) => (
                              <SelectItem key={index} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <div className='flex w-full flex-col gap-4'>
                    <FormField
                      name='gig_tags'
                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-2'>
                          <FormLabel className='text-2xl text-[#F5F5F5]'>Street address</FormLabel>
                          <FormDescription>Visible only to you</FormDescription>
                          <FormControl>
                            <Input
                              className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                              type='text'
                              placeholder='Title of the searching Gig can be very long'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex w-full flex-col gap-4'>
                    <FormField
                      name='gig_tags'
                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-2'>
                          <FormLabel className='text-2xl text-[#F5F5F5]'>
                            City, state <span className='text-[#dc4f13]'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                              type='text'
                              placeholder='Title of the searching Gig can be very long'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex w-full flex-col gap-4'>
                    <FormField
                      name='gig_tags'
                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-2'>
                          <FormLabel className='text-2xl text-[#F5F5F5]'>
                            Postal code <span className='text-[#dc4f13]'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                              type='text'
                              placeholder='Title of the searching Gig can be very long'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </FormStep>
              {isExperience ? (
                <FormStep stepOrder={2}>
                  <div className='mx-auto mt-10 w-full max-w-3xl mobile:px-3'>
                    <p className='text-2xl'>Work experience</p>
                  </div>
                  <div className='mx-auto mt-3 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'>
                    <div className='flex w-full flex-col gap-4'>
                      <FormField
                        name='gig_tags'
                        render={({ field }) => (
                          <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='text-2xl text-[#F5F5F5]'>
                              Job title <span className='text-[#dc4f13]'>*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                type='text'
                                placeholder='Name'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='flex w-full flex-col gap-4'>
                      <FormField
                        name='gig_tags'
                        render={({ field }) => (
                          <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='text-2xl text-[#F5F5F5]'>Company</FormLabel>
                            <FormControl>
                              <Input
                                className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                type='text'
                                placeholder='Name'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormItem className='flex w-full flex-col gap-2'>
                      <FormLabel className='text-2xl text-[#F5F5F5]'>Country</FormLabel>
                      <FormControl>
                        {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                        <Select>
                          <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                            <SelectValue placeholder='United States' />
                          </SelectTrigger>
                          <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                            <SelectGroup>
                              {COUNTRIES.map((country, index) => (
                                <SelectItem key={index} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <div className='flex w-full flex-col gap-4'>
                      <FormField
                        name='gig_tags'
                        render={({ field }) => (
                          <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='text-2xl text-[#F5F5F5]'>
                              City, state <span className='text-[#dc4f13]'>*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                type='text'
                                placeholder='Title of the searching Gig can be very long'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='flex w-full flex-col gap-4'>
                      <FormField
                        name='gig_tags'
                        render={({ field }) => (
                          <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='text-2xl text-[#F5F5F5]'>
                              Time period <span className='text-[#dc4f13]'>*</span>
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='flex gap-2'>
                      <FormItem className='flex w-full flex-col gap-2'>
                        <FormLabel className='text-base text-[#96B0BD]'>From</FormLabel>
                        <FormControl>
                          {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                          <Select>
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Month' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {MONTHS.map((month, index) => (
                                  <SelectItem key={index} value={month}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem className='mt-10 flex w-full flex-col gap-2'>
                        <FormControl>
                          {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                          <Select>
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Year' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {Array.from({ length: 40 }, (_, i) => (
                                  <SelectItem key={i + 1} value={`${i + 2020}`}>
                                    {i + 2020}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>

                    <div className='flex gap-2'>
                      <FormItem className='flex w-full flex-col gap-2'>
                        <FormLabel className='text-base text-[#96B0BD]'>To</FormLabel>
                        <FormControl>
                          {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                          <Select>
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Month' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {MONTHS.map((month, index) => (
                                  <SelectItem key={index} value={month}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem className='mt-10 flex w-full flex-col gap-2'>
                        <FormControl>
                          {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                          <Select>
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Year' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {Array.from({ length: 40 }, (_, i) => (
                                  <SelectItem key={i + 1} value={`${i + 2020}`}>
                                    {i + 2020}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>

                    <FormField
                      name='gigTitle'
                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-2'>
                          <FormLabel className='text-2xl text-[#F5F5F5]'>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                              value='I am Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring'
                              placeholder='Input Description'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='flex'>
                      <div className='w-2/3 bg-transparent' />
                      <button
                        className='flex w-1/3 cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#DC4F13] py-5 text-center text-white mobile:py-3'
                        onClick={() => setIsExperience(false)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </FormStep>
              ) : (
                <FormStep stepOrder={2}>
                  <div className='mx-auto mt-10 w-full max-w-3xl mobile:px-3'>
                    <p className='text-2xl'>Education</p>
                  </div>
                  <div className='mx-auto mt-3 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'>
                    <div className='flex w-full flex-col gap-4'>
                      <FormField
                        name='gig_tags'
                        render={({ field }) => (
                          <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='text-2xl text-[#F5F5F5]'>
                              Level of education
                            </FormLabel>
                            <FormControl>
                              <Input
                                className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                type='text'
                                placeholder='Name'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='flex w-full flex-col gap-4'>
                      <FormField
                        name='gig_tags'
                        render={({ field }) => (
                          <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='text-2xl text-[#F5F5F5]'>
                              Field of study
                            </FormLabel>
                            <FormControl>
                              <Input
                                className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                type='text'
                                placeholder='Name'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='flex w-full flex-col gap-4'>
                      <FormField
                        name='gig_tags'
                        render={({ field }) => (
                          <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='text-2xl text-[#F5F5F5]'>School name</FormLabel>
                            <FormControl>
                              <Input
                                className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                type='text'
                                placeholder='Name'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='flex w-full flex-col gap-4'>
                      <FormField
                        name='gig_tags'
                        render={({ field }) => (
                          <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='text-2xl text-[#F5F5F5]'>
                              City, state <span className='text-[#dc4f13]'>*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                type='text'
                                placeholder='Title of the searching Gig can be very long'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='flex w-full flex-col gap-4'>
                      <FormField
                        name='gig_tags'
                        render={({ field }) => (
                          <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='text-2xl text-[#F5F5F5]'>
                              Time period <span className='text-[#dc4f13]'>*</span>
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='flex gap-2'>
                      <FormItem className='flex w-full flex-col gap-2'>
                        <FormLabel className='text-base text-[#96B0BD]'>From</FormLabel>
                        <FormControl>
                          {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                          <Select>
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Month' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {MONTHS.map((month, index) => (
                                  <SelectItem key={index} value={month}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem className='mt-10 flex w-full flex-col gap-2'>
                        <FormControl>
                          {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                          <Select>
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Year' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {Array.from({ length: 40 }, (_, i) => (
                                  <SelectItem key={i + 1} value={`${i + 2020}`}>
                                    {i + 2020}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>

                    <div className='flex gap-2'>
                      <FormItem className='flex w-full flex-col gap-2'>
                        <FormLabel className='text-base text-[#96B0BD]'>To</FormLabel>
                        <FormControl>
                          {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                          <Select>
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Month' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {MONTHS.map((month, index) => (
                                  <SelectItem key={index} value={month}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem className='mt-10 flex w-full flex-col gap-2'>
                        <FormControl>
                          {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                          <Select>
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Year' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {Array.from({ length: 40 }, (_, i) => (
                                  <SelectItem key={i + 1} value={`${i + 2020}`}>
                                    {i + 2020}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  </div>
                </FormStep>
              )}
              <FormStep stepOrder={3}>
                <div className='mx-auto mt-10 flex w-full max-w-3xl justify-between mobile:px-3'>
                  <p className='text-2xl'>Skills</p>
                  <button
                    className='h-10 w-10 rounded-xl bg-[#10191d] mobile:px-3'
                    onClick={() => setIsAddingSkill(true)}
                  >
                    +
                  </button>
                </div>
                {isAddingSkill && (
                  <div className='mx-auto mt-10 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'>
                    <div className='flex w-full flex-col gap-4'>
                      <div className='flex w-full flex-col gap-4'>
                        <FormField
                          name='gig_tags'
                          render={({ field }) => (
                            <FormItem className='flex flex-col gap-2'>
                              <FormLabel className='text-2xl text-[#F5F5F5]'>
                                Skill name <span className='text-[#dc4f13]'>*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                  type='text'
                                  placeholder='Title of the searching Gig can be very long'
                                  onChange={(e) => setSkillName(e.target.value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex w-full flex-col gap-4'>
                        <FormField
                          name='gig_tags'
                          render={({ field }) => (
                            <FormItem className='flex flex-col gap-2'>
                              <FormLabel className='text-2xl text-[#F5F5F5]'>
                                Years of experience
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                  type='text'
                                  placeholder='Title of the searching Gig can be very long'
                                  onChange={(e) => setYearOfExperience(e.target.value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex'>
                        <div className='w-2/3 bg-transparent' />
                        <button
                          className='flex w-1/3 cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#DC4F13] py-5 text-center text-white mobile:py-3'
                          onClick={() => {
                            setProfileData((prevState) => [
                              ...prevState,
                              skills.push({ name: skillName, year: yearOfExperience }),
                            ]);
                            console.log('Skills', skills);
                            setIsAddingSkill(false);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {profileData.skills.map((skill, index) => {
                  return (
                    <div
                      className='mx-auto mt-2 flex w-full max-w-3xl justify-between gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'
                      key={index}
                    >
                      <p>{skill.name}</p>
                      <div className='flex gap-3'>
                        <img
                          className='cursor-pointer'
                          onClick={() => setEditPrice(true)}
                          src='/assets/images/icons/edit-pen.svg'
                        />
                        <img
                          className='cursor-pointer fill-white text-white'
                          onClick={() => setEditPrice(true)}
                          src='/assets/images/icons/delete-white.svg'
                        />
                      </div>
                    </div>
                  );
                })}
                <div className='mx-auto mt-10 flex w-full max-w-3xl justify-between mobile:px-3'>
                  <p className='text-2xl'>Certification</p>
                  <button
                    className='h-10 w-10 rounded-xl bg-[#10191d] mobile:px-3'
                    onClick={() => setIsAddingCertification(true)}
                  >
                    +
                  </button>
                </div>
                {isAddingCertification && (
                  <div className='mx-auto mt-10 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'>
                    <div className='flex w-full flex-col gap-4'>
                      <div className='flex w-full flex-col gap-4'>
                        <FormField
                          name='gig_tags'
                          render={({ field }) => (
                            <FormItem className='flex flex-col gap-2'>
                              <FormLabel className='text-2xl text-[#F5F5F5]'>
                                Certification/licence name <span className='text-[#dc4f13]'>*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                  type='text'
                                  placeholder='Title of the searching Gig can be very long'
                                  onChange={(e) =>
                                    setCertificateItem((prevState) => ({
                                      ...prevState,
                                      name: e.target.value,
                                    }))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex w-full flex-col gap-4'>
                        <FormField
                          name='gig_tags'
                          render={({ field }) => (
                            <FormItem className='flex flex-col gap-2'>
                              <FormLabel className='text-2xl text-[#F5F5F5]'>
                                Years of experience
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                                  type='text'
                                  placeholder='Title of the searching Gig can be very long'
                                  onChange={(e) =>
                                    setCertificateItem((prevState) => ({
                                      ...prevState,
                                      year: e.target.value,
                                    }))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* -------------------Time period---------------------- */}
                      <div className='flex w-full flex-col gap-4'>
                        <FormField
                          name='gig_tags'
                          render={({ field }) => (
                            <FormItem className='flex flex-col gap-2'>
                              <FormLabel className='text-2xl text-[#F5F5F5]'>
                                Time period <span className='text-[#dc4f13]'>*</span>
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex gap-3'>
                        <Checkbox />
                        <p>Does not expire</p>
                      </div>
                      {/* ----------------from------------------------- */}
                      <div className='flex gap-2'>
                        <FormItem className='flex w-full flex-col gap-2'>
                          <FormLabel className='text-base text-[#96B0BD]'>From</FormLabel>
                          <FormControl>
                            {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                            <Select>
                              <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                                <SelectValue placeholder='Month' />
                              </SelectTrigger>
                              <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                                <SelectGroup>
                                  {MONTHS.map((month, index) => (
                                    <SelectItem key={index} value={month}>
                                      {month}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        <FormItem className='mt-10 flex w-full flex-col gap-2'>
                          <FormControl>
                            {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                            <Select>
                              <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                                <SelectValue placeholder='Year' />
                              </SelectTrigger>
                              <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                                <SelectGroup>
                                  {Array.from({ length: 40 }, (_, i) => (
                                    <SelectItem key={i + 1} value={`${i + 2020}`}>
                                      {i + 2020}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                      {/* -------------to----------------------- */}
                      <div className='flex gap-2'>
                        <FormItem className='flex w-full flex-col gap-2'>
                          <FormLabel className='text-base text-[#96B0BD]'>To</FormLabel>
                          <FormControl>
                            {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                            <Select>
                              <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                                <SelectValue placeholder='Month' />
                              </SelectTrigger>
                              <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                                <SelectGroup>
                                  {MONTHS.map((month, index) => (
                                    <SelectItem key={index} value={month}>
                                      {month}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        <FormItem className='mt-10 flex w-full flex-col gap-2'>
                          <FormControl>
                            {/* <Select defaultValue={field.value} onValueChange={field.onChange}> */}
                            <Select>
                              <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                                <SelectValue placeholder='Year' />
                              </SelectTrigger>
                              <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                                <SelectGroup>
                                  {Array.from({ length: 40 }, (_, i) => (
                                    <SelectItem key={i + 1} value={`${i + 2020}`}>
                                      {i + 2020}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                      <div className='flex'>
                        <div className='w-2/3 bg-transparent' />
                        <button
                          className='flex w-1/3 cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#DC4F13] py-5 text-center text-white mobile:py-3'
                          onClick={() => {
                            setCertificates((prevState) => [
                              ...prevState,
                              {
                                name: certificateItem.name,
                                year: certificateItem.name,
                                fromMonth: certificateItem.fromMonth,
                                toMonth: certificateItem.toMonth,
                                fromYear: certificateItem.fromYear,
                                toYear: certificateItem.toYear,
                                isExpired: certificateItem.isExpired,
                              },
                            ]);
                            console.log('Certificates', profileData.certificates);
                            setIsAddingCertification(false);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {profileData.certificates.map((certificate, index) => {
                  return (
                    <div
                      className='mx-auto mt-2 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'
                      key={index}
                    >
                      <p>{certificate.name}</p>
                    </div>
                  );
                })}
              </FormStep>
              {!isExperience && (
                <div className='mx-auto mt-2 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] mobile:px-3'>
                  <FormNavigation
                    isWaiting={isWaiting}
                    setStepNumbers={setStepNumber}
                    finalButtonName='Save and continue'
                    setIsResumePreview={setIsResumePreview}
                    max='3'
                  />
                </div>
              )}
            </form>
          </Form>
        </div>
      ) : (
        <div>
          <div className='mx-auto mt-2 flex w-full max-w-3xl justify-between gap-6 rounded-xl p-7 mobile:px-3'>
            <button
              className='text-2xl font-bold text-[#dc4f13]'
              onClick={() => {
                setIsResumePreview((prevState) => false);
                console.log('back', isResumePreview);
              }}
            >
              Back
            </button>
            <div className='flex gap-4 rounded-2xl border-[1px] border-[#516170] p-2'>
              <button className='flex bg-[#dc4f13] px-5 py-3 text-[14px]'>
                <img
                  className='cursor-pointer fill-white text-white'
                  onClick={() => setEditPrice(true)}
                  src='/assets/images/icons/download-line.svg'
                />
                Download
              </button>
              <img
                className='cursor-pointer fill-white text-white'
                onClick={() => setEditPrice(true)}
                src='/assets/images/icons/trip-dot.svg'
              />
            </div>
          </div>
          <div className='mx-auto mt-2 flex w-full max-w-3xl flex-col gap-2 rounded-xl bg-[#10191d] p-7 mobile:px-3'>
            <p className='text-2xl py-2'>{profileData.firstName + ' ' + profileData.lastName}</p>
            <p className='text-[#96b0bd] text-base'>{profileData.phoneNumber}</p>
            <p className='text-[#96b0bd] text-base'>{profileData.email}</p>
            <p className='text-[#96b0bd] text-base'>{profileData.location}</p>
          </div>
          <div className='mx-auto mt-2 flex w-full max-w-3xl flex-col gap-6 mobile:px-3'>
            <p className='text-2xl'>Summary</p>
            <div className='flex flex-col gap-6 rounded-xl bg-[#10191d] p-7'>
              <p className='text-[#96b0bd] text-base'>{profileData.summary}</p>
            </div>
          </div>
          <div className='mx-auto mt-10 flex w-full max-w-3xl justify-between mobile:px-3'>
            <p className='text-2xl'>Work experience</p>
            <button
              className='h-10 w-10 rounded-xl bg-[#10191d] mobile:px-3'
              onClick={() => setIsAddingSkill(true)}
            >
              +
            </button>
          </div>
          <div className='mx-auto mt-10 flex w-full max-w-3xl justify-between mobile:px-3'>
            <p className='text-2xl'>Education</p>
            <button
              className='h-10 w-10 rounded-xl bg-[#10191d] mobile:px-3'
              onClick={() => setIsAddingSkill(true)}
            >
              +
            </button>
          </div>

          <div className='mx-auto mt-10 flex w-full max-w-3xl justify-between mobile:px-3'>
            <p className='text-2xl'>Skills</p>
            <button
              className='h-10 w-10 rounded-xl bg-[#10191d] mobile:px-3'
              onClick={() => setIsAddingSkill(true)}
            >
              +
            </button>
          </div>
          {profileData.skills.map((skill, index) => {
            return (
              <div
                className='mx-auto mt-2 flex w-full max-w-3xl justify-between gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'
                key={index}
              >
                <p>{skill.name}</p>
                <div className='flex gap-3'>
                  <img
                    className='cursor-pointer'
                    onClick={() => setEditPrice(true)}
                    src='/assets/images/icons/edit-pen.svg'
                  />
                  <img
                    className='cursor-pointer fill-white text-white'
                    onClick={() => setEditPrice(true)}
                    src='/assets/images/icons/delete-white.svg'
                  />
                </div>
              </div>
            );
          })}

          <div className='mx-auto mt-10 flex w-full max-w-3xl justify-between mobile:px-3'>
            <p className='text-2xl'>Certifications</p>
            <button
              className='h-10 w-10 rounded-xl bg-[#10191d] mobile:px-3'
              onClick={() => setIsAddingSkill(true)}
            >
              +
            </button>
          </div>
          {profileData.certificates.map((certificate, index) => {
            return (
              <div
                className='mx-auto mt-2 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'
                key={index}
              >
                <p>{certificate.name}</p>
              </div>
            );
          })}
          <div className='mx-auto mt-8 flex w-full max-w-3xl gap-6 rounded-xl mobile:px-3'>
            <button className='text-[#dc4f13] font-bold text-2xl w-1/3 text-left'>
              add more section
            </button>
          </div>
        </div>
      )}
    </StepProvider>
  );
};

export default CreateResume;
