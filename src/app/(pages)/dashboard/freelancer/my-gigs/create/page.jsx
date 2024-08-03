'use client';
/*
 * Selmani: I used client page as i didn't have enough time to organize it more
 * But if you do, please try to separate components that needs use client
 to another page and just remove them from this page so it remains a 
 server page
*/

import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
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

const CreateGig = () => {
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

    await api
      .post('/api/v1/freelancer_gig/post_gig', values)
      .then(async (gigData) => {
        await api
          .post(
            `/api/v1/freelancer_gig/upload_attachment/${auth.currentProfile._id}/${gigData.data.gigId}`,
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
      <div className='flex w-full flex-col'>
        <nav className='flex w-full flex-nowrap rounded-t-xl bg-[#10191d] mobile:overflow-x-scroll'>
          <StepNavItem name='Overview' num={1} />
          <StepNavItem name='Pricing' num={2} />
          <StepNavItem name='Description' num={3} />
          <StepNavItem name='Requirements' num={4} />
          <StepNavItem name='Gallery' num={5} />
          <StepNavItem name='Publish' num={6} />
        </nav>
        <Form {...form}>
          <form
            className='mx-auto mt-10 flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormStep stepOrder={1}>
              <FormField
                name='gigTitle'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>Gig title</FormLabel>
                    <FormDescription className='text-base text-[#96B0BD]'>
                      As your Gig storefront, your title is the most important place to include
                      words that buyers would likely use to search for a service like yours
                    </FormDescription>
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
              />
              <div className='flex flex-col gap-2'>
                <p className='text-2xl text-[#F5F5F5]'>Category</p>
                <p className='text-base text-[#96B0BD]'>
                  Choose the category and subcategory most suitable for your Gig
                </p>
                <div className='flex gap-3 mobile:flex-col'>
                  <FormField
                    name='gigCategory'
                    render={() => (
                      <FormItem className='flex w-full flex-col gap-2'>
                        <FormControl>
                          <Select
                            onValueChange={(e) => {
                              setCurrentCategory(e);
                            }}
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
                      <FormItem className='flex w-full flex-col gap-2'>
                        <FormControl>
                          <Select
                            onValueChange={(e) => {
                              setCurrentSub(e);
                            }}
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
                    )}
                  />
                </div>
              </div>
              <div className='flex w-full flex-col gap-4'>
                <FormField
                  name='gig_tags'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-2'>
                      <FormLabel className='text-2xl text-[#F5F5F5]'>
                        Search tags, positive keywords
                      </FormLabel>
                      <FormDescription className='text-base text-[#96B0BD]'>
                        Enter search terms you feel buyers will use when looking for service.
                      </FormDescription>
                      <FormControl>
                        <Input defaultValue={tags.join(', ')} type='hidden' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <input
                  className={`h-14 w-full rounded-xl border border-slate-500 bg-transparent px-4 py-4 text-base ${tags.length >= 5 ? 'cursor-not-allowed opacity-15' : ''}`}
                  onChange={(event) => setTagInputValue(event.target.value)}
                  onKeyDown={tagsInputFocus}
                  placeholder='Enter tag'
                  value={tagInputValue}
                />
                <div className='flex flex-wrap items-center gap-3'>
                  {tags.map((tag, index) => (
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
              <FormField
                name='budget'
                render={({ field }) => (
                  <FormItem className='mt-8'>
                    <FormLabel className='mb-4 text-2xl font-semibold'>Setup Price</FormLabel>
                    <RadioGroup
                      className='flex flex-col gap-3 pt-3'
                      defaultValue={all_form_structure.budget_mode[0].value}
                      onValueChange={(val) => {
                        field.onChange();
                        setBudgetMode(val);
                        setPostData((prev) => ({
                          ...prev,
                          gigPaymentType: val === 'hourly' ? 1 : 0,
                          gigPrice: val === 'hourly' ? 0 : prev.gigPrice,
                          maxBudget: val === 'hourly' ? prev.maxBudget : 0,
                          minBudget: val === 'hourly' ? prev.minBudget : 0,
                        }));
                      }}
                    >
                      {all_form_structure.budget_mode.map((budget_option, key) => (
                        <div
                          className='items-centerspace-x-2 flex w-full flex-col px-0 py-0'
                          key={key}
                        >
                          <div
                            className={`flex w-full items-center gap-2 space-x-2 rounded-t-xl border border-slate-500 px-3 py-0 ${budgetMode !== budget_option.value ? 'rounded-xl' : 'bg-[#28373E]'}`}
                          >
                            <RadioGroupItem
                              className='h-4 w-4'
                              id={budget_option.value}
                              value={budget_option.value}
                            />
                            <Label
                              className='w-full cursor-pointer py-7 text-xl text-slate-300'
                              htmlFor={budget_option.value}
                            >
                              {budget_option.label}
                            </Label>
                          </div>
                          {budgetMode == 'hourly' && budget_option.value == 'hourly' && (
                            <div
                              className='flex w-full flex-col items-center justify-center gap-5 rounded-b-xl border border-[#526872] bg-[#1B272C] px-3 xl:flex-row'
                              key={key}
                            >
                              <FormField
                                name='hourly_rate_from'
                                render={() => (
                                  <FormItem className='mb-4 mt-2 flex w-full flex-col items-center justify-between gap-2 xl:flex-row'>
                                    <FormLabel className='text-base font-normal text-[#96B0BD]'>
                                      {all_form_structure.gig_from_to.from_label}
                                    </FormLabel>
                                    <FormControl>
                                      <div className='relative w-full pr-7'>
                                        <Input
                                          className='rounded-xl border-slate-400 bg-[#28373E] px-6 py-6 text-end text-base [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                                          min={0}
                                          onChange={(e) =>
                                            setPostData((prev) => ({
                                              ...prev,
                                              minBudget: parseInt(e.target.value),
                                            }))
                                          }
                                          placeholder={
                                            all_form_structure.gig_from_to.from_placeholder
                                          }
                                          type='number'
                                          value={postData.minBudget}
                                        />
                                        <span className='absolute left-5 top-1/2 -translate-y-1/2 border-slate-400'>
                                          $
                                        </span>
                                        <span className='absolute right-0 top-1/2 -translate-y-1/2 border-slate-400'>
                                          /hr
                                        </span>
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                name='hourly_rate_to'
                                render={() => (
                                  <FormItem className='mb-4 mt-2 flex w-full flex-col items-center justify-between gap-2 xl:flex-row'>
                                    <FormLabel className='text-base font-normal text-[#96B0BD]'>
                                      {all_form_structure.gig_from_to.to_label}
                                    </FormLabel>
                                    <FormControl>
                                      <div className='relative w-full pr-7'>
                                        <Input
                                          className='rounded-xl border-slate-400 bg-[#28373E] px-6 py-6 text-end text-base [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                                          min={0}
                                          onChange={(e) => {
                                            setPostData((prev) => ({
                                              ...prev,
                                              maxBudget: parseInt(e.target.value),
                                            }));
                                          }}
                                          placeholder={
                                            all_form_structure.gig_from_to.to_placeholder
                                          }
                                          type='number'
                                          value={postData.maxBudget}
                                        />
                                        <span className='absolute left-5 top-1/2 -translate-y-1/2 border-slate-400'>
                                          $
                                        </span>
                                        <span className='absolute right-0 top-1/2 -translate-y-1/2 border-slate-400'>
                                          /hr
                                        </span>
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                          {budgetMode == 'fixed' && budget_option.value == 'fixed' && (
                            <FormField
                              name='fixed_price'
                              render={() => (
                                <FormItem className='flex w-full rounded-b-xl border border-[#526872] bg-[#1B272C] pl-3 pr-5'>
                                  <FormControl>
                                    <div className='relative my-4 w-full'>
                                      <Input
                                        className='rounded-xl border-slate-400 bg-[#28373E] px-6 py-6 text-end text-base [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                                        min={0}
                                        onChange={(e) => {
                                          setPostData((prev) => ({
                                            ...prev,
                                            gigPrice: parseInt(e.target.value),
                                          }));
                                        }}
                                        placeholder={all_form_structure.gig_fixed_price}
                                        type='number'
                                        value={postData.gigPrice}
                                      />
                                      <span className='absolute left-5 top-1/2 -translate-y-1/2 border-slate-400'>
                                        $
                                      </span>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </FormItem>
                )}
              />
              <FormField
                name='revision'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>Revisions</FormLabel>
                    <FormControl>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                          <SelectValue placeholder='Revisions' />
                        </SelectTrigger>
                        <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                          <SelectGroup>
                            {Array.from({ length: 31 }, (_, i) => (
                              <SelectItem key={i + 1} value={`${i + 1}`}>
                                {i}
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
                name='deliveryTime'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>Delivery time</FormLabel>
                    <FormControl>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                          <SelectValue placeholder='Select' />
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
                )}
              />
              <FormField
                name='initialConcept'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>
                      Number Of Initial Concepts
                    </FormLabel>
                    <FormControl>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                          <SelectValue placeholder='Select' />
                        </SelectTrigger>
                        <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                          <SelectGroup>
                            {Array.from({ length: 5 }, (_, i) => (
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
                )}
              />
              <FormField
                name='instantBuy'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel className='mb-4 text-2xl font-semibold'>Setup Price</FormLabel>
                    <div
                      className={`flex w-full cursor-pointer gap-6 rounded-[15px] border border-[#3E525B] py-[25px] pl-[24px] pr-[16px] ${postData.instantBuy && 'bg-[#28373E]'}`}
                      onClick={() =>
                        setPostData((prev) => ({ ...prev, instantBuy: !prev.instantBuy }))
                      }
                    >
                      <div
                        className={`h-6 w-6 rounded-full border border-[#A0B4C0] ${postData.instantBuy && 'border-8 border-[#E0F0F9]'}`}
                       />
                      <div className='text-[18px]'>Instant Buy</div>
                    </div>
                  </FormItem>
                )}
              />
              <div className='text-[#96B0BD]'>Allow buyers to purchase your gig instantly without needing to apply</div>
            </FormStep>
            <FormStep stepOrder={3}>
              <FormField
                name='gigDescription'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>
                      Briefly describe your Gig
                    </FormLabel>
                    <FormDescription className='text-base text-[#96B0BD]'>
                      0/1200 characters
                      {/* 
                        * Selmani: Needs to be functional for sure, just 
                        didn't got a chance to complete it 
                        * And it would be better to create a reusable component!
                      */}
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='h-60 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                        placeholder='Add info here...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormStep>
            <FormStep stepOrder={4}>
              <div className='text-2xl text-[#F5F5F5]'>
                Get all the information you need from buyers to get started
              </div>
              <div className='text-base text-[#96B0BD]'>
                Add questions to help buyers provide you with exactly what you need to start working
                on their order
              </div>
              {requirementQuestions.map((requirement_question, q_indx) => (
                <Question
                  answer_placeholder={requirement_question.answer_placeholder}
                  id={requirement_question.id}
                  key={requirement_question.id}
                  onDelete={deleteQuestion}
                  question={requirement_question.question}
                  question_num={q_indx + 1}
                />
              ))}
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
            </FormStep>
            <FormStep stepOrder={5}>
              <div className='text-3xl text-[#F5F5F5] mobile:text-xl'>
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
                      inputName={`gig_image_${indx}`}
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
                      inputName={`gig_document_${indx}`}
                      key={indx}
                      onFileUpload={(files) => handleDocumentUpload(files, indx)}
                      placeHolderPlusIconSize={40}
                    />
                  ))}
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
              <img className='mx-auto w-1/2' src='/assets/images/publish_image.png' />
            </FormStep>
            <FormNavigation isWaiting={isWaiting} />
          </form>
        </Form>
      </div>
    </StepProvider>
  );
};

export default CreateGig;
