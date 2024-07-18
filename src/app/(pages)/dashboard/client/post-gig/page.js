'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useForm } from 'react-hook-form';
import { IoIosClose, IoIosCloseCircleOutline } from 'react-icons/io';
import { MdOutlineAttachFile } from 'react-icons/md';
import { PiExportThin } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { Command } from '@/components/ui/command';
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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import { COUNTRIES } from '@/utils/constants';
import api from '@/utils/api';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

// Icons

function FileUploadBody() {
  return (
    <div className='flex w-full items-center justify-center rounded-xl pb-2 pt-2'>
      <PiExportThin className='mr-2 h-[24px] w-[24px] text-[#A0B4C0]' />
      <p className='text-center'>
        <span className='text-base text-[#A0B4C0]'>Upload</span>
      </p>
    </div>
  );
}

/*
 * This is the data for the form, like labels, placholders, options and more
 * You can restructure it if you want no problem
 * I just created it quickly to have an easier method to edit the info on the page
 */
const all_form_structure = {
  budget_label: 'Setup Price',
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

  budget_placeholder: 'Choose',
  categories_label: 'Choose the category and subcategory most suitable for your Gig',
  categories_list: [
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
  ],
  categories_placeholder: 'Choose',
  experience_description: 'Determine what skills you are looking for',
  experience_label: 'Experience Requirements',
  experience_options: [
    {
      description: 'Looking for someone relatively new to this field',
      indexNum: 0,
      label: 'Entry',
      value: 'Entry',
    },
    {
      description: 'Looking for substantial experience in this field',
      indexNum: 1,
      label: 'Intermediate',
      value: 'Intermediate',
    },
    {
      description: 'Looking for comprehensive and deep expertise in this field',
      indexNum: 2,
      label: 'Expert',
      value: 'Expert',
    },
  ],

  gig_description_label: 'Briefly Describe Your Gig',
  gig_description_placeholder: 'Type here',
  gig_fixed_label: 'Project Price',
  gig_fixed_price: '36.00',

  gig_from_to: {
    // From
    from_label: 'From',
    from_placeholder: '36.00',
    // To
    to_label: 'To',
    to_placeholder: '60.00',
  },
  git_description: '80/1200 characters',

  location_label: 'Location',
  location_placeholder: 'Budapest, Hungary',

  scope_label: 'Estimate The Scope Of Your Work',
  scope_options: [
    {
      indexNum: 3,
      label: 'Above 6 months',
      value: 'Above 6 months',
    },
    {
      indexNum: 2,
      label: '3 to 6 months',
      value: '3 to 6 months',
    },
    {
      indexNum: 1,
      label: '1 to 3 months',
      value: '1 to 3 months',
    },
    {
      indexNum: 0,
      label: 'Less than a month',
      value: 'Less than a month',
    },
  ], // Default will be the first option
  scope_placeholder: 'Choose the item',

  skills_label: 'Skills',
  skills_list: [
    {
      label: 'Web Development',
    },
    {
      label: 'Adobe Photoshop',
    },
    {
      label: 'UX Design',
    },
    {
      label: 'Figma',
    },
    {
      label: 'UI Design',
    },
  ],

  skills_placeholder: 'Add tags',

  title_label0: 'Your Title Is The Most Important Place',
  title_label1: 'As your Gig storefront, ',
  title_label2:
    ' to include words that buyers  would likely use to search for a service like yours',
  title_placeholder: 'Type the title here',

  upload_files_description: 'Upload files. Format: PDF, DOC, JPG, PNG...',
  upload_files_label: 'Documents (Up To 2)',
};

const GigPosting = () => {
  const { toast } = useToast();
  const auth = useCustomContext();
  const router = useRouter();
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [jobCategories, setJobCategories] = useState([]);
  const [skillSet, setSkillSet] = useState([]);
  const [budgetMode, setBudgetMode] = useState('hourly');
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [options, setOptions] = useState(COUNTRIES);
  const [placeholder, setPlaceholder] = useState('Add location');
  const [postData, setPostData] = useState({
    attachment: [],
    experienceLevel: 0,
    gigCategory: [],
    gigDeadline: 3,
    gigDescription: '',
    gigPaymentType: 1, // hourly budget gig first
    gigPrice: 0,
    gigTitle: '',
    location: [],
    maxBudget: 0,
    minBudget: 0,
    profileId: null,
    requiredSkills: [],
  });
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
  const [selectedSkill, setSelectedSkill] = useState('');
  const [currentCategory, setCurrentCategory] = useState('Accounting & Consulting');
  const [currentSub, setCurrentSub] = useState('Personal Coaching');
  useEffect(() => {
    if (auth) {
      setPostData((prev) => ({
        ...prev,
        profileId: auth?.currentProfile?._id,
      }));
    }
  }, [auth]);

  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    if (tmp === null) {
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Please login first!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
      alert('Login First!');
      router.push('/');
    } else {
    }
  }, [router, toast]);

  const FileChanged = (file) => {
    console.log('file', file);
    console.log('file.length', file.length);
    let tmp = [];
    const filesArray = Array.from(file);
    console.log('filesArray', filesArray);
    filesArray.map((fi) => tmp.push(fi));
    setFiles(filesArray);
    setFiles2(tmp);
    console.log('tmp', tmp);
    setPostData((prev) => ({
      ...prev,
      attachment: [...prev.attachment, filesArray],
    }));
  };
  const onRemoveImage = (id) => {
    setFiles(files.filter((_, i) => i !== id));
  };
  const FileError = (error) => {
    console.error(error);
  };
  const form = useForm();
  console.log('files is here', files);
  console.log('postData', postData);
  const handleSetGigTitle = (e) => {
    setPostData((prev) => ({
      ...prev,
      gigTitle: e.target.value,
    }));
  };
  const handlePublish = async () => {
    if (!postData.gigTitle || !postData.gigDescription) {
      return toast({
        className:
          'bg-yellow-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Input Gig Title and Description</h3>,
        title: <h1 className='text-center'>Warning</h1>,
        variant: 'default',
      });
    }
    const formData = new FormData();
    console.log('files2 ->', files2);
    files2.map((file) => {
      formData.append('files', file);
    });

    let tmp = localStorage.getItem('jobs_2024_token');
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(tmp).data.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    await api
      .post('/api/v1/client_gig/post_gig', postData)
      .then(async (gigData) => {
        await api
          .post(
            `/api/v1/client_gig/upload_attachment/${auth.currentProfile._id}/${gigData.data.gigId}`,
            formData,
            config
          )
          .then(async (data) => {
            console.log('Successfully uploaded', data.data.msg[0]);
            await api.post('/api/v1/freelancer_gig/send_tg_bot', {
              gigDescription: postData.gigDescription,
              gigId: gigData.data.gigId,
              gigTitle: postData.gigTitle,
              imageURL:
                auth?.currentProfile?.avatarURL != '' ? auth.currentProfile.avatarURL : null,
              profileName: auth.user.name,
              profileType: 'Client',
            });
          });
        toast({
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Successfully posted gig titled {postData.gigTitle}</h3>,
          title: <h1 className='text-center'>Success</h1>,
          variant: 'default',
        });
        router.push('./my-gigs');
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
  };

  useEffect(() => {
    setPostData((prev) => ({
      ...prev,
      requiredSkills: skillSet,
    }));
  }, [skillSet]);
console.log("postData", postData);
  return (
    <div className='gig_posting mb-4 flex justify-center rounded-xl bg-[#10191d] p-7 mobile:flex-col-reverse mobile:gap-3 mobile:p-2'>
      <Form {...form}>
        <form
          className='itmes-end justify-center rounded-2xl bg-[#10191D] p-[30px] mobile:p-0'
          onSubmit={(e) => {
            e.preventDefault();
            handlePublish();
          }}
        >
          <FormField
            name='gig_title'
            render={() => (
              <FormItem className='mt-8'>
                <h1 className='mb-4 text-2xl font-semibold'>Gig Title</h1>
                <p className='text-base font-normal text-[#96B0BD]'>
                  {all_form_structure.title_label1}
                  <span className='font-bold'>{all_form_structure.title_label0}</span>
                  {all_form_structure.title_label2}
                </p>
                <FormControl>
                  <div className='mt-4 rounded-2xl border border-[#526872] bg-transparent p-5 text-base outline-none placeholder:text-muted-foreground disabled:opacity-50'>
                    <input
                      className='box-border w-full bg-transparent !p-0 text-[#96B0BD] outline-none'
                      onChange={(e) => handleSetGigTitle(e)}
                      placeholder={all_form_structure.title_placeholder}
                      value={postData.gigTitle}
                    />
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mt-14 flex flex-col gap-2'>
            <p className='mb-4 text-2xl text-[#F5F5F5]'>Category</p>
            <p className='text-base text-[#96B0BD]'>
              Choose the category and subcategory most suitable for your Gig
            </p>
            <div className='flex gap-3'>
              <FormField
                name='gigCategory'
                render={() => (
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormControl>
                      <Select
                        onValueChange={(e) => {
                          setPostData((prev) => ({
                            ...prev,
                            gigCategory: [...prev.gigCategory, e],
                          }));
                          setCurrentCategory(e);
                        }}
                      >
                        <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                          <SelectValue placeholder='Choose' />
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
                          setPostData((prev) => ({
                            ...prev,
                            gigCategory: [...prev.gigCategory, e],
                          }));
                        }}
                      >
                        <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                          <SelectValue placeholder='Choose' />
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
          <FormField
            name='gig_skills'
            render={() => (
              <FormItem className='gig_skills mt-8'>
                <FormLabel className='mb-4 text-2xl text-[#F5F5F5]'>
                  {all_form_structure.skills_label}
                </FormLabel>
                <p className='mb-4 text-base text-[#96B0BD]'>
                  Enter Skills. 5 tags maximum, use letters and numbers only
                </p>
                <FormControl className='w-full bg-[#10191D]'>
                  <Command>
                    <div className='mt-4 rounded-2xl border border-[#526872] bg-transparent p-5 text-base outline-none placeholder:text-muted-foreground disabled:opacity-50'>
                      <input
                        className='box-border w-full bg-transparent !p-0 text-[#96B0BD] outline-none'
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (skillSet.length < 5) {
                              setSkillSet((prevSkillSet) => [...prevSkillSet, selectedSkill]);
                            }
                            setSelectedSkill('');
                          }
                        }}
                        placeholder={all_form_structure.skills_placeholder}
                        value={selectedSkill}
                      />
                    </div>
                    <div className='mt-8 flex flex-wrap items-center gap-3'>
                      {skillSet.map((index, selectedSkillIndex) => (
                        <div
                          className='flex w-auto cursor-pointer items-center whitespace-nowrap rounded-full bg-[#28373E] px-5 py-1 text-sm text-[#F5F5F5]'
                          data-index={selectedSkillIndex}
                          key={selectedSkillIndex}
                          onClick={() => {
                            const newSkillSet = [...skillSet];
                            newSkillSet.splice(selectedSkillIndex, 1);
                            setSkillSet(newSkillSet);
                          }}
                        >
                          <IoIosCloseCircleOutline className='ml-2 mr-1 text-base' />
                          {index}
                        </div>
                      ))}
                    </div>
                    {/* <CommandList>
                      <CommandEmpty>No skills found.</CommandEmpty>
                      <CommandGroup>
                        <div className='suggested_skills mt-3 flex flex-wrap gap-3'>
                          {all_form_structure.skills_list.map((suggestedSkill) => (
                            <CommandItem
                              className={`skill_name ${skillSet.includes(suggestedSkill.label) && 'hidden'} w-auto cursor-pointer whitespace-nowrap rounded-full border border-slate-500 bg-transparent px-4 py-2`}
                              key={suggestedSkill.label}
                              onSelect={(currentSkill) => {
                                setSkillSet((prevSkillSet) => [...prevSkillSet, currentSkill]);
                                setPostData((prev) => ({
                                  ...prev,
                                  requiredSkills: [...prev.requiredSkills, currentSkill],
                                }));
                              }}
                              value={suggestedSkill.label}
                            >
                              {suggestedSkill.label}
                              <FiPlus className='ml-2' />
                            </CommandItem>
                          ))}
                        </div>
                      </CommandGroup>
                    </CommandList> */}
                  </Command>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name='gig_scope'
            render={({ field }) => (
              <FormItem className='mt-8'>
                <FormLabel className='mb-4 text-2xl font-semibold'>
                  {all_form_structure.scope_label}
                </FormLabel>

                <FormDescription className='text-base font-normal text-[#96B0BD]'>
                  {all_form_structure.scope_placeholder}
                </FormDescription>
                <RadioGroup
                  className='radio_items flex flex-wrap gap-0 pt-3'
                  defaultValue={all_form_structure.scope_options[0].value}
                  onValueChange={field.onChange}
                >
                  {all_form_structure.scope_options.map((single_option) => (
                    <div
                      className='radio_item mb-4 flex w-full items-center space-x-2 md:w-1/2 md:pr-2 xl:w-1/4'
                      key={single_option.value}
                    >
                      <RadioGroupItem
                        className='hidden'
                        id={single_option.value}
                        onClick={() => {
                          setPostData((prev) => ({
                            ...prev,
                            gigDeadline: single_option.indexNum,
                          }));
                        }}
                        value={single_option.value}
                      />
                      <Label
                        className='ml-[4px] w-full cursor-pointer rounded-[15px] border border-slate-500 p-5 transition'
                        htmlFor={single_option.value}
                      >
                        {single_option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />
          <FormField
            name='gig_experience'
            render={({ field }) => (
              <FormItem className='mt-8'>
                <FormLabel className='mb-4 text-2xl font-semibold'>
                  {all_form_structure.experience_label}
                </FormLabel>
                <FormDescription className='text-base font-normal text-[#96B0BD]'>
                  {all_form_structure.experience_description}
                </FormDescription>
                <RadioGroup
                  className='flex flex-col gap-[15px] pt-3 xl:flex-row'
                  defaultValue={all_form_structure.experience_options[0].value}
                  onValueChange={field.onChange}
                >
                  {all_form_structure.experience_options.map((experience_option, key) => (
                    <div
                      className={`flex w-full items-start gap-3 space-x-2 rounded-[15px] border border-slate-500 px-3 py-0 xl:w-1/3 ${selectedLevel == key && 'border-[#526872] bg-[#28373E]'}`}
                      key={key}
                    >
                      <RadioGroupItem
                        className='mt-7 h-6 w-6'
                        id={experience_option.value}
                        onClick={() => {
                          setPostData((prev) => ({
                            ...prev,
                            experienceLevel: experience_option.indexNum,
                          }));
                          setSelectedLevel(key);
                        }}
                        value={experience_option.value}
                      />
                      <Label
                        className='w-full cursor-pointer py-7'
                        htmlFor={experience_option.value}
                      >
                        <span className='text-xl text-slate-300'>{experience_option.label}</span>
                        <p className='mt-4 text-base text-slate-500'>
                          {experience_option.description}
                        </p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />
          <div className='mt-14 flex flex-col gap-2'>
            <p className='mb-4 text-2xl font-semibold text-[#F5F5F5]'>Location</p>
            <div className='flex gap-3'>
              <FormField
                name='location'
                render={() => (
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormControl>
                      <MultipleSelector
                        options={options}
                        placeholder={placeholder}
                        emptyIndicator={
                          <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
                            No results found.
                          </p>
                        }
                        onChange={(e) => {
                          setPostData((prev) => ({
                            ...prev,
                            location: e.map((item) => item.value),
                          }));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Budget */}
          <FormField
            name='budget'
            render={({ field }) => (
              <FormItem className='mt-8'>
                <FormLabel className='mb-4 text-2xl font-semibold'>
                  {all_form_structure.budget_label}
                </FormLabel>
                <RadioGroup
                  className='flex flex-wrap gap-3 pt-3 md:flex-nowrap'
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
                    <div className='items-centerspace-x-2 flex w-full flex-col px-0 py-0' key={key}>
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
                                      placeholder={all_form_structure.gig_from_to.from_placeholder}
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
                                      placeholder={all_form_structure.gig_from_to.to_placeholder}
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

          {/* For Hourly Rate budget */}

          {/* For Hourly Rate budget */}

          {/* Description */}
          <FormField
            name='gig_description'
            render={() => (
              <FormItem className='mt-8'>
                <FormLabel className='mb-4 text-2xl font-semibold'>
                  {all_form_structure.gig_description_label}
                </FormLabel>
                <FormDescription className='text-base font-normal text-[#96B0BD]'>
                  {all_form_structure.git_description}
                </FormDescription>
                <FormControl>
                  <div className='mt-4 rounded-2xl border border-[#526872] bg-transparent p-5 text-base outline-none placeholder:text-muted-foreground disabled:opacity-50'>
                    <textarea
                      className='box-border w-full resize-none bg-transparent !p-0 text-[#96B0BD] outline-none'
                      onChange={(e) => {
                        setPostData((prev) => ({
                          ...prev,
                          gigDescription: e.target.value,
                        }));
                      }}
                      placeholder={all_form_structure.gig_description_placeholder}
                      rows={7}
                      value={postData.gigDescription}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* File Upload */}
          <FormField
            name='attachemnts'
            render={() => (
              <FormItem className='mt-8'>
                <FormLabel className='mb-4 text-2xl font-semibold'>
                  {all_form_structure.upload_files_label}
                </FormLabel>
                <FormDescription className='text-base font-normal text-[#96B0BD]'>
                  {all_form_structure.upload_files_description}
                </FormDescription>
                <FormControl>
                  <div className='rounded-xl border border-dashed border-slate-500'>
                    <FileUploader
                      fileOrFiles={files}
                      handleChange={(e) => FileChanged(e)}
                      label={''}
                      multiple={true}
                      types={[
                        'jpg',
                        'jpeg',
                        'png',
                        'gif',
                        'pdf',
                        'mp4',
                        'avi',
                        'mov',
                        'doc',
                        'docx',
                      ]}
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
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex justify-center md:justify-end'>
            <Button
              className='mt-8 w-full min-w-[220px] rounded-xl bg-[#DC4F13] text-white md:w-1/5 xl:w-1/5'
              type='submit'
            >
              Publish Gig
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GigPosting;
