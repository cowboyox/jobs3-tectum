'use client';
import React, { useEffect, useState } from 'react';

// Components
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from 'react-drag-n-drop-image';
import api from '@/utils/api';

// Icons
import { IoCheckmark } from 'react-icons/io5';
import { GoChevronDown, GoTrash } from 'react-icons/go';
import { FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

function FileUploadBody() {
  return (
    <div className='flex h-52 w-full items-center justify-center rounded-xl border border-dashed border-slate-500 p-3'>
      <p className='text-center'>
        <span className='text-lg text-slate-500'>Drag and drop or &nbsp; </span> browse files
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
  title_label: 'Title',
  title_placeholder: 'Write a title for your job post',

  categories_label: 'JOB CATEGORY',
  categories_placeholder: 'Dropdown menu with categories list',
  categories_list: [
    {
      value: 'category_1',
      label: 'Accounting & Consulting',
    },
    {
      value: 'category_2',
      label: 'Admin Support',
    },
    {
      value: 'category_3',
      label: 'Customer Service',
    },
    {
      value: 'category_4',
      label: 'Category 4',
    },
    {
      value: 'category_5',
      label: 'Category 5',
    },
  ],

  skills_label: 'Skills',
  skills_placeholder: 'Type or search...',
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

  scope_label: 'Scope',
  scope_placeholder: 'Estimate the scope of your work',
  scope_options: [
    {
      label: 'Above 6 months',
      value: 'Above 6 months',
      indexNum: 3,
    },
    {
      label: '3 to 6 months',
      value: '3 to 6 months',
      indexNum: 2,
    },
    {
      label: '1 to 3 months',
      value: '1 to 3 months',
      indexNum: 1,
    },
    {
      label: 'Less than a month',
      value: 'Less than a month',
      indexNum: 0,
    },
  ], // Default will be the first option

  experience_label: 'Experience Requirements',
  experience_options: [
    {
      label: 'Entry',
      value: 'Entry',
      description: 'Looking for someone relatively new to this field',
      indexNum: 0,
    },
    {
      label: 'Intermediate',
      value: 'Intermediate',
      description: 'Looking for substantial experience in this field',
      indexNum: 1,
    },
    {
      label: 'Expert',
      value: 'Expert',
      description: 'Looking for comprehensive and deep expertise in this field',
      indexNum: 2,
    },
    {
      label: 'Not Sure',
      value: 'Not Sure',
      description: 'Looking for comprehensive and deep expertise in this field',
      indexNum: 3,
    },
  ],

  location_label: 'Location',
  location_placeholder: 'Budapest, Hungary',

  budget_label: 'Your Budget',
  budget_placeholder: 'Select the payment mode and min/max budget',
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

  gig_description_label: 'Description',
  gig_description_placeholder: 'Write gig description',

  upload_files_label: 'Upload Files',
};
// @ts-ignore
const GigPosting = (props) => {
  const { toast } = useToast();
  const [user, setUser] = useState({
    email: '',
    name: '',
    role: [0],
    verified: false,
  });

  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    if (tmp === null) {
      toast({
        variant: 'destructive',
        title: <h1 className='text-center'>Error</h1>,
        description: <h3>Please login first!</h3>,
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
      });
      alert('Login First!');
      router.push('/');
    } else {
      setUser(JSON.parse(tmp).data.user);
    }
  }, []);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [jobCategory, setCategoryValue] = useState('');
  const [skillSet, setSkillSet] = useState([]);
  const [budgetMode, setBudgetMode] = useState('hourly');
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [postData, setPostData] = useState({
    gigTitle: '',
    gigCategory: [],
    requiredSkills: [],
    experienceLevel: 0,
    location: '',
    gigPaymentType: false,
    minBudget: 0,
    maxBudget: 0,
    gigPrice: 0,
    gigDescription: '',
    attachment: [],
    gigDeadline: 3,
  });

  const FileChanged = (file) => {
    let tmp = [];
    file.map((fi) => tmp.push(fi.file));
    setFiles(file);
    setFiles2(tmp);
    setPostData((prev) => ({
      ...prev,
      attachment: [...prev.attachment, file],
    }));
  };

  const onRemoveImage = (id) => {
    setFiles((prev) => prev.filter((i) => i.id !== id));
  };

  const FileError = (error) => {
    console.error(error);
  };

  const form = useForm();

  const handleSetGigTitle = (e) => {
    setPostData((prev) => ({
      ...prev,
      gigTitle: e.target.value,
    }));
  };

  useEffect(() => {
    const fetcGigData = () => {
      api
        .get(`/api/v1/client_gig/get_gig_by_id/${props.id}`)
        .then((res) => {
          setPostData({
            ...postData,
            ...res.data.data,
          });
          setSkillSet(res.data.data.requiredSkills);
          console.log('🚀 ~ api.get ~ res:', res);
        })
        .catch((err) => {
          console.log('🚀 ~ api.get ~ err:', err);
        });
    };

    if (props.id) {
      fetcGigData();
    }
  }, [props.id]);

  const handlePublish = async () => {
    if (!postData.gigTitle) {
      return toast({
        variant: 'default',
        title: <h1 className='text-center'>Warning</h1>,
        description: <h3 className='text-center'>Input Gig Title</h3>,
        className:
          'bg-yellow-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
      });
    }

    const formData = new FormData();
    files2.map((file) => {
      formData.append('files', file);
    });
    let tmp = localStorage.getItem('jobs_2024_token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(tmp).data.token}`,
      },
    };

    if (props.id) {
      await api
        .put(`/api/v1/client_gig/edit_gig/${id}`, postData)
        .then(async (data) => {
          console.log('🚀 ~ .then ~ data:', data);
          await api
            .post(`/api/v1/client_gig/upload_attachment/${data.data.gigId}`, formData, config)
            .then((data) => {
              console.log('Successfully uploaded');
            });
          toast({
            variant: 'default',
            title: <h1 className='text-center'>Success</h1>,
            description: <h3>Successfully edit gig titled {postData.gigTitle}</h3>,
            className:
              'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          });
          router.push('/jobs');
        })
        .catch((err) => {
          console.log('Error corrupted during posting gig', err);
          toast({
            variant: 'destructive',
            title: <h1 className='text-center'>Error</h1>,
            description: <h3>Internal Server Error</h3>,
            className:
              'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          });
        });
    } else {
      await api
        .post('/api/v1/client_gig/post_gig', postData)
        .then(async (data) => {
          await api
            .post(`/api/v1/client_gig/upload_attachment/${data.data.gigId}`, formData, config)
            .then((data) => {
              console.log('Successfully uploaded');
            });
          toast({
            variant: 'default',
            title: <h1 className='text-center'>Success</h1>,
            description: <h3>Successfully posted gig titled {postData.gigTitle}</h3>,
            className:
              'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          });
          router.push('/jobs');
        })
        .catch((err) => {
          console.log('Error corrupted during posting gig', err);
          toast({
            variant: 'destructive',
            title: <h1 className='text-center'>Error</h1>,
            description: <h3>Internal Server Error</h3>,
            className:
              'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          });
        });
    }
  };

  return (
    <div className='gig_posting'>
      {props.id ? (
        <h1 className='text-3xl md:text-4xl'>
          Edit <span className='main_color'>Gig</span> Post
        </h1>
      ) : (
        <h1 className='text-3xl md:text-4xl'>
          Create a <span className='main_color'>New Gig</span> Post
        </h1>
      )}

      <Form {...form}>
        <form className='max-w-lg'>
          <FormField
            name='gig_title'
            render={({ field }) => (
              <FormItem className='mt-8'>
                <FormLabel className='text-lg uppercase text-slate-500'>
                  {all_form_structure.title_label}
                </FormLabel>
                <FormControl>
                  <Input
                    className='rounded-full border-slate-500 bg-black px-6 py-6 text-base'
                    onChange={(e) => handleSetGigTitle(e)}
                    placeholder={all_form_structure.title_placeholder}
                    value={postData.gigTitle}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='job_category'
            render={({ field }) => (
              <FormItem className='mt-8'>
                <FormLabel className='text-lg uppercase text-slate-500'>
                  {all_form_structure.categories_label}
                </FormLabel>
                <FormControl className='w-full'>
                  <Popover onOpenChange={setOpen} open={open}>
                    <PopoverTrigger
                      asChild
                      className='w-full rounded-full border-slate-500 px-6 py-6 text-base'
                    >
                      <Button
                        aria-expanded={open}
                        className='w-full justify-between'
                        role='combobox'
                        variant='outline'
                      >
                        {jobCategory
                          ? all_form_structure.categories_list.find(
                              (job_category) => job_category.value === jobCategory
                            )?.label
                          : all_form_structure.categories_placeholder}
                        <GoChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-screen max-w-lg p-0'>
                      <Command>
                        <CommandInput placeholder='Type or search...' />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            {all_form_structure.categories_list.map((job_category) => (
                              <CommandItem
                                key={job_category.value}
                                onSelect={(currentValue) => {
                                  setCategoryValue(
                                    currentValue === jobCategory ? '' : currentValue
                                  );
                                  setPostData((prev) => ({
                                    ...prev,
                                    gigCategory: [
                                      ...prev.gigCategory,
                                      currentValue === jobCategory ? '' : currentValue,
                                    ],
                                  }));
                                  setOpen(false);
                                }}
                                value={job_category.value}
                              >
                                {job_category.label}
                                <IoCheckmark
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    jobCategory === job_category.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='gig_skills'
            render={({ field }) => (
              <FormItem className='gig_skills mt-8'>
                <FormLabel className='text-lg uppercase text-slate-500'>
                  {all_form_structure.skills_label}
                </FormLabel>
                <FormControl className='w-full'>
                  <Command>
                    <div className='mb-2 flex flex-wrap items-center gap-3'>
                      {skillSet.map((selectedSkill, selectedSkillIndex) => (
                        <div
                          className='flex w-auto cursor-pointer items-center whitespace-nowrap rounded-full bg-white px-2 py-1 text-sm text-black'
                          data-index={selectedSkillIndex}
                          key={selectedSkillIndex}
                          onClick={() => {
                            const newSkillSet = [...skillSet];
                            newSkillSet.splice(selectedSkillIndex, 1);
                            setSkillSet(newSkillSet);
                          }}
                        >
                          {selectedSkill}
                          <GoTrash className='ml-2' />
                        </div>
                      ))}
                    </div>
                    <div className='w-full rounded-full border border-slate-500 px-6 py-3 text-base'>
                      <CommandInput placeholder={all_form_structure.skills_placeholder} />
                    </div>
                    <CommandList>
                      <CommandEmpty>No skills found.</CommandEmpty>
                      <CommandGroup>
                        <div className='suggested_skills mt-3 flex flex-wrap gap-3'>
                          {all_form_structure.skills_list.map((suggestedSkill) => (
                            <CommandItem
                              className={`skill_name ${
                                skillSet.includes(suggestedSkill.label) && 'hidden'
                              } w-auto cursor-pointer whitespace-nowrap rounded-full border border-slate-500 bg-transparent px-4 py-2`}
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
                    </CommandList>
                  </Command>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name='gig_scope'
            render={({ field }) => (
              <FormItem className='mt-8'>
                <FormLabel className='text-lg uppercase text-slate-500'>
                  {all_form_structure.scope_label}
                </FormLabel>
                <FormDescription className='text-base'>
                  {all_form_structure.scope_placeholder}
                </FormDescription>
                <RadioGroup
                  className='radio_items flex flex-wrap gap-0 pt-3'
                  defaultValue={all_form_structure.scope_options[0].value}
                  onValueChange={field.onChange}
                >
                  {all_form_structure.scope_options.map((single_option) => (
                    <div
                      className='radio_item mb-4 flex w-full items-center space-x-2 md:w-1/2 md:pr-2'
                      key={single_option.value}
                    >
                      <RadioGroupItem
                        className='hidden'
                        id={single_option.value}
                        onClick={(e) => {
                          setPostData((prev) => ({
                            ...prev,
                            gigDeadline: single_option.indexNum,
                          }));
                        }}
                        value={single_option.value}
                      />
                      <Label
                        className='ml-0 w-full cursor-pointer rounded-full border border-slate-500 p-5 transition'
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
                <FormLabel className='text-lg uppercase text-slate-500'>
                  {all_form_structure.experience_label}
                </FormLabel>
                <RadioGroup
                  className='flex flex-wrap gap-3 pt-3'
                  defaultValue={all_form_structure.experience_options[0].value}
                  onValueChange={field.onChange}
                >
                  {all_form_structure.experience_options.map((experience_option) => (
                    <div
                      className='flex w-full items-center gap-3 space-x-2 rounded-xl border border-slate-500 px-3 py-0'
                      key={experience_option.value}
                    >
                      <RadioGroupItem
                        className='h-6 w-6'
                        id={experience_option.value}
                        onClick={(e) => {
                          setPostData((prev) => ({
                            ...prev,
                            experienceLevel: experience_option.indexNum,
                          }));
                        }}
                        value={experience_option.value}
                      />
                      <Label
                        className='w-full cursor-pointer py-7'
                        htmlFor={experience_option.value}
                      >
                        <span className='text-xl text-slate-300'>{experience_option.label}</span>
                        <p className='text-base text-slate-500'>{experience_option.description}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />
          <FormField
            name='location'
            render={({ field }) => (
              <FormItem className='mt-8'>
                <FormLabel className='text-lg uppercase text-slate-500'>
                  {all_form_structure.location_label}
                </FormLabel>
                <FormControl>
                  <Input
                    className='rounded-full border-slate-500 bg-black px-6 py-6 text-base'
                    onChange={(e) => {
                      setPostData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }));
                    }}
                    placeholder={all_form_structure.location_placeholder}
                    value={postData.location}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Budget */}
          <FormField
            name='budget'
            render={({ field }) => (
              <FormItem className='mt-8'>
                <FormLabel className='text-lg uppercase text-slate-500'>
                  {all_form_structure.budget_label}
                </FormLabel>
                <FormDescription className='text-base'>
                  {all_form_structure.budget_placeholder}
                </FormDescription>
                <RadioGroup
                  className='flex flex-wrap gap-3 pt-3 md:flex-nowrap'
                  defaultValue={all_form_structure.budget_mode[0].value}
                  onValueChange={(val) => {
                    field.onChange();
                    setBudgetMode(val);
                    setPostData((prev) => ({
                      ...prev,
                      gigPaymentType: val === 'hourly' ? 1 : 0,
                    }));
                  }}
                >
                  {all_form_structure.budget_mode.map((budget_option) => (
                    <div
                      className='flex w-full items-center gap-2 space-x-2 rounded-xl border border-slate-500 px-3 py-0'
                      key={budget_option.value}
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
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />

          {/* For Hourly Rate budget */}
          {budgetMode == 'hourly' && (
            <div className='flex gap-5'>
              <FormField
                name='hourly_rate_from'
                render={({ field }) => (
                  <FormItem className='mt-8 w-full'>
                    <FormLabel className='text-lg uppercase text-slate-500'>
                      {all_form_structure.gig_from_to.from_label}
                    </FormLabel>
                    <FormControl>
                      <div className='relative w-full pr-7'>
                        <Input
                          className='rounded-full border-slate-400 bg-black px-6 py-6 text-end text-base [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                          min={0}
                          onChange={(e) =>
                            setPostData((prev) => ({
                              ...prev,
                              minBudget: e.target.value,
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
                render={({ field }) => (
                  <FormItem className='mt-8 w-full'>
                    <FormLabel className='text-lg uppercase text-slate-500'>
                      {all_form_structure.gig_from_to.to_label}
                    </FormLabel>
                    <FormControl>
                      <div className='relative w-full pr-7'>
                        <Input
                          className='rounded-full border-slate-400 bg-black px-6 py-6 text-end text-base [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                          min={0}
                          onChange={(e) => {
                            setPostData((prev) => ({
                              ...prev,
                              maxBudget: e.target.value,
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
          {/* For Hourly Rate budget */}
          {budgetMode == 'fixed' && (
            <FormField
              name='fixed_price'
              render={({ field }) => (
                <FormItem className='mt-8 w-full'>
                  <FormLabel className='text-lg uppercase text-slate-500'>
                    {all_form_structure.gig_fixed_label}
                  </FormLabel>
                  <FormControl>
                    <div className='relative w-full'>
                      <Input
                        className='rounded-full border-slate-400 bg-black px-6 py-6 text-end text-base [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
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

          {/* Description */}
          <FormField
            name='gig_description'
            render={({ field }) => (
              <FormItem className='mt-8'>
                <FormLabel className='text-lg uppercase text-slate-500'>
                  {all_form_structure.gig_description_label}
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='rounded-xl border-slate-500 px-6 py-6 text-base'
                    onChange={(e) => {
                      setPostData((prev) => ({
                        ...prev,
                        gigDescription: e.target.value,
                      }));
                    }}
                    placeholder={all_form_structure.gig_description_placeholder}
                    value={postData.gigDescription}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* File Upload */}
          <FormField
            name='attachemnts'
            render={({ field }) => (
              <FormItem className='mt-8'>
                <FormLabel className='text-lg uppercase text-slate-500'>
                  {all_form_structure.upload_files_label}
                </FormLabel>
                <FormControl>
                  <div className='rounded-xl border border-slate-500 p-4'>
                    <FileUpload
                      body={<FileUploadBody />}
                      fileValue={files}
                      onChange={(e) => FileChanged(e)}
                      onError={FileError}
                      overlap={false}
                    />
                    {files.length > 0 && (
                      <div className='mt-5 flex w-full flex-wrap gap-0 rounded-xl border border-slate-500'>
                        {files.map((item, index) => {
                          return (
                            <div
                              aria-hidden
                              className='w-1/3 p-3'
                              key={index}
                              onClick={() => onRemoveImage(item.id)}
                            >
                              <img
                                className='aspect-square w-full rounded-xl bg-slate-800 object-cover p-2'
                                src={item.preview}
                              />
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
        </form>
        <Button
          className='mt-8 w-1/5 rounded-full bg-[#DC4F13] text-white'
          onClick={(e) => {
            handlePublish();
          }}
        >
          {props.id ? 'Edit' : 'Publish'} Gig
        </Button>
      </Form>
    </div>
  );
};

export default GigPosting;
