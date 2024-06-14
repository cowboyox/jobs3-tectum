'use client';
/*
 * Selmani: I used client page as i didn't have enough time to organize it more
 * But if you do, please try to separate components that needs use client
 to another page and just remove them from this page so it remains a 
 server page
*/

/*----- React and related hooks -----*/
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

/*----- Context Providers -----*/
import { StepProvider } from "@/components/elements/formSteps/StepContext";

/*----- Form Steps Components -----*/
import FormStep from "@/components/elements/formSteps/Step";
import StepNavItem from "@/components/elements/formSteps/StepNavItem";
import FormNavigation from "@/components/elements/formSteps/StepNavigation";

/*----- UI Components -----*/
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

/*----- Icons -----*/
import { GoTrash } from "react-icons/go";

/*----- Custom Components -----*/
import DropFile from "@/components/elements/dropFile";

import { useToast } from "@/components/ui/use-toast";
import api from "@/utils/api";
import { useCustomContext } from "@/context/use-custom";
import { useRouter } from 'next/navigation';

const Question = (props) => {
  return (
    <div className='flex p-4 border rounded-xl border-[#526872] gap-2'>
      <p className="text-white text-base">{props.question_num}.</p>
      <div className="flex flex-col gap-1 w-full">
        <p className="text-white text-base">
          {props.question}
        </p>
        <p className='bg-transparent p-0 border-0 text-base text-[#96B0BD] w-full shadow-none outline-none shadow-transparent'>
          {props.answer_placeholder}
        </p>
      </div>
      <GoTrash onClick={() => props.onDelete(props.id)} className='cursor-pointer' />
    </div>
  )
}

const categories_list = [
  {
    value: "category_1",
    label: "Accounting & Consulting",
  },
  {
    value: "category_2",
    label: "Admin Support",
  },
  {
    value: "category_3",
    label: "Customer Service",
  },
  {
    value: "category_4",
    label: "Category 4",
  },
  {
    value: "category_5",
    label: "Category 5",
  },
];

const CreateGig = () => {
  const { toast } = useToast();
  const auth = useCustomContext();
  const router = useRouter();

  const form = useForm();
  const [tags, setTags] = useState([]);
  const [requirementQuestions, setRequirementQuestions] = useState([
    {
      id: 0,
      question: 'If you are ordering for a business, what’s your industry?',
      answer_placeholder: '3D design, e-commerce, accounting, marketing, etc'
    },
    {
      id: 1,
      question: 'Is this order part of a bigger project you’re working on?',
      answer_placeholder: 'Building a mobile app, creating an animation, developing a game, etc'
    },
  ]);

  const newQuestionRef = useRef(null);
  const newAnswerPlaceholderRef = useRef(null);

  const addNewQuestion = () => {
    const newQuestion = newQuestionRef.current.value.trim();
    const newAnswerPlaceholder = newAnswerPlaceholderRef.current.value.trim();

    if (newQuestion && newAnswerPlaceholder) {
      const newQuestionObject = {
        id: requirementQuestions.length + 1,
        question: newQuestion,
        answer_placeholder: newAnswerPlaceholder,
      };
      setRequirementQuestions(prevState => [...prevState, newQuestionObject]);

      // Clear input fields
      newQuestionRef.current.value = '';
      newAnswerPlaceholderRef.current.value = '';
    }
  };

  const deleteQuestion = (id) => {
    setRequirementQuestions(prevState => prevState.filter(question => question.id !== id));
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
    console.log(file)
    setVideoFile(file);  // Assuming single file for video
  };

  const handleImageUpload = (files, index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = files;  // Assuming single file for each image slot
    console.log(files)
    setImageFiles(newImageFiles);
  };

  const handleDocumentUpload = (files, index) => {
    const newDocumentFiles = [...documentFiles];
    newDocumentFiles[index] = files;  // Assuming single file for each document slot
    console.log(newDocumentFiles)
    setDocumentFiles(newDocumentFiles);
  };
  
  async function onSubmit(values) {
    /* Selmani: I didn't check if all the values are being passed here
      * And i'm sure not all, so please make sure all necessary inputs are being passed
      * NOTE: Make sure to check the ShadCN documentation
      * https://ui.shadcn.com/docs/components
      * I know you know but just wanted to mention :D
    */
    console.log("tag: ", tags)
    console.log("qa: ", requirementQuestions)
    values.question = requirementQuestions
    values.searchKeywords = tags
    values.email = auth.user.email
    values.creator = auth.user.id

    if (!values.gigTitle) {
      return toast({
        variant: "default",
        title: <h1 className='text-center'>Warning</h1>,
        description: <h3 className='text-center'>Input Gig Title</h3>,
        className: "bg-yellow-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center"
      });
    }

    let allFiles = []
    if (videoFile) allFiles.push(...videoFile) 
    
    imageFiles.forEach((file, index) => {
      if (file) allFiles.push(...file) 
    });
    documentFiles.forEach((file, index) => {
      if (file) allFiles.push(...file)
    });

    console.log("all: ", allFiles)
    const formData = new FormData();

    formData.append('file', allFiles);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    await api.post('/api/v1/freelancer_gig/post_gig', values).then(async (data) => {
      console.log(data)
      await api.post(`/api/v1/freelancer_gig/upload_attachment/${data.data.gigId}`, formData, config).then(data => {
        console.log("Successfully uploaded");
      })
      toast({
        variant: "default",
        title: <h1 className='text-center'>Success</h1>,
        description: <h3>Successfully posted gig titled {values.gigTitle}</h3>,
        className: "bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center"
      });
      router.push('../')
    }).catch(err => {
      console.log("Error corrupted during posting gig", err);
      toast({
        variant: "destructive",
        title: <h1 className='text-center'>Error</h1>,
        description: <h3>Internal Server Error</h3>,
        className: "bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center"
      });
    });


  }
  return (
    <StepProvider>
      <div className='flex w-full flex-col'>
        <nav className='flex flex-nowrap w-full bg-[#10191d] rounded-t-xl mobile:overflow-x-scroll'>
          <StepNavItem name="Overview" num={1} />
          <StepNavItem name="Pricing" num={2} />
          <StepNavItem name="Description" num={3} />
          <StepNavItem name="Requirements" num={4} />
          <StepNavItem name="Gallery" num={5} />
          <StepNavItem name="Publish" num={6} />
        </nav>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='p-7 mobile:px-3 bg-[#10191d] max-w-3xl w-full mx-auto mt-10 rounded-xl flex flex-col gap-6'>
            <FormStep stepOrder={1}>
              <FormField
                name="gigTitle"
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>
                      Gig title
                    </FormLabel>
                    <FormDescription className='text-base text-[#96B0BD]'>
                      As your Gig storefront, your title is the most important place to include words that buyers would likely use to search for a service like yours
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder='I will do something im really good at...'
                        className='border-slate-500 rounded-xl text-base px-4 py-4 h-18 bg-transparent'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <p className='text-2xl text-[#F5F5F5]'>
                  Category
                </p>
                <p className='text-base text-[#96B0BD]'>
                  Choose the category and subcategory most suitable for your Gig
                </p>
                <div className="flex gap-3 mobile:flex-col">
                  <FormField
                    name="gigCategory"
                    render={({ field }) => (
                      <FormItem className='flex flex-col gap-2 w-full'>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className='bg-[#1B272C] py-7 px-5 rounded-xl text-base text-[#96B0BD]'>
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent className='bg-[#1B272C] rounded-xl text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {categories_list.map((job_category) => (
                                  <SelectItem key={job_category.value} value={job_category.value}>
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
                    name="subCategory"
                    render={({ field }) => (
                      <FormItem className='flex flex-col gap-2 w-full'>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className='bg-[#1B272C] py-7 px-5 rounded-xl text-base text-[#96B0BD]'>
                              <SelectValue placeholder="Select a Sub Category" />
                            </SelectTrigger>
                            <SelectContent className='bg-[#1B272C] rounded-xl text-base text-[#96B0BD]'>
                              <SelectGroup>
                                {categories_list.map((job_category) => (
                                  <SelectItem key={job_category.value} value={job_category.value}>
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
                </div>
              </div>
              <div className='w-full flex flex-col gap-4'>
                <FormField
                  name="gig_tags"
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-2'>
                      <FormLabel className='text-2xl text-[#F5F5F5]'>
                        Search tags, positive keywords
                      </FormLabel>
                      <FormDescription className='text-base text-[#96B0BD]'>
                        Enter search terms you feel buyers will use when looking for service.
                      </FormDescription>
                      <FormControl>
                        <Input
                          defaultValue={tags.join(', ')}
                          type='hidden'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <input
                  placeholder="Enter tag"
                  className={`w-full border-slate-500 rounded-xl text-base px-4 py-4 h-14 bg-transparent border ${tags.length >= 5 ? 'cursor-not-allowed opacity-15' : ''}`}
                  value={tagInputValue}
                  onChange={(event) => setTagInputValue(event.target.value)}
                  onKeyDown={tagsInputFocus}
                />
                <div className="flex gap-3 items-center flex-wrap">
                  {tags.map((tag, index) => (
                    <div key={index} className="bg-white py-1 px-2 text-black rounded-full text-sm flex items-center cursor-pointer w-auto whitespace-nowrap" onClick={() => removeTag(index)}>
                      {tag}
                      <GoTrash className='ml-2' />
                    </div>
                  ))}
                </div>
                <p className='text-sm text-[#526872]'>5 tags maximum, use letters and numbers only</p>
              </div>
            </FormStep>
            <FormStep stepOrder={2}>
              <FormField
                name="gigPrice"
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>
                      Setup price
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full border-slate-500 rounded-xl text-base px-4 py-4 h-14 bg-transparent border'
                        type='number'
                        placeholder='Price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="revision"
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2 w-full'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>
                      Revisions
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className='bg-[#1B272C] py-7 px-5 rounded-xl text-base text-[#96B0BD]'>
                          <SelectValue placeholder="Revisions" />
                        </SelectTrigger>
                        <SelectContent className='bg-[#1B272C] rounded-xl text-base text-[#96B0BD]'>
                          <SelectGroup>
                            {Array.from({ length: 30 }, (_, i) => (
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
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2 w-full'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>
                      Delivery time
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className='bg-[#1B272C] py-7 px-5 rounded-xl text-base text-[#96B0BD]'>
                          <SelectValue placeholder="Delivery time" />
                        </SelectTrigger>
                        <SelectContent className='bg-[#1B272C] rounded-xl text-base text-[#96B0BD]'>
                          <SelectGroup>
                            {Array.from({ length: 60 }, (_, i) => (
                              <SelectItem key={i + 1} value={`${i + 1} days`}>
                                {i + 1} day{i + 1 > 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                            <SelectItem value="+ 2 months">+ 2 Months</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormStep>
            <FormStep stepOrder={3}>
              <FormField
                name="gigDescription"
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
                        placeholder='Add info here...'
                        className='border-slate-500 rounded-xl text-base px-4 py-4 h-60 bg-transparent'
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
                Add questions to help buyers provide you with exactly what you need to start working on their order
              </div>
              {requirementQuestions.map((requirement_question, q_indx) => (
                <Question
                  key={requirement_question.id}
                  id={requirement_question.id}
                  question_num={q_indx + 1}
                  question={requirement_question.question}
                  answer_placeholder={requirement_question.answer_placeholder}
                  onDelete={deleteQuestion}
                />
              ))}
              <div className="p-3 border border-[#526872] rounded-xl flex flex-col gap-3">
                <input
                  ref={newQuestionRef}
                  className='w-full border-slate-500 rounded-xl text-base px-4 py-4 h-14 bg-transparent border'
                  placeholder='Add question here'
                />
                <input
                  ref={newAnswerPlaceholderRef}
                  className='w-full border-slate-500 rounded-xl text-base px-4 py-4 h-14 bg-transparent border'
                  placeholder='Answer example (For the client to know how to answer)'
                />
                <div className="w-full cursor-pointer rounded-xl text-base px-4 py-4 h-14 text-center bg-slate-700 text-white hover:text-black hover:bg-white transition" onClick={addNewQuestion}>
                  Add new question
                </div>
              </div>
            </FormStep>
            <FormStep stepOrder={5}>
              <div className='text-3xl mobile:text-xl text-[#F5F5F5]'>
                Showcase your services in a Gig gallery. Drag and drop your files here or <span className='main_color'>browse</span> to upload
              </div>
              <div className='text-base text-[#96B0BD]'>
                Encourage buyers to choose your Gig by featuring a variety of your work. Format: JPEG, JPG, PNG, GIF, MP4, AVI. Max size per image/video: 50MB
              </div>
              <div className="flex flex-col gap-4">
                <p className='text-2xl text-[#F5F5F5]'>
                  Video (1 only)
                </p>
                <p className='text-base text-[#96B0BD]'>
                  Capture buyers attention with a video that showcases your services
                </p>
                <DropFile
                  className="aspect-video max-h-80"
                  placeHolderPlusIconSize={60}
                  acceptOnly='video'
                  inputName='video'
                  onFileUpload={handleVideoUpload}
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className='text-2xl text-[#F5F5F5]'>
                  Images (up to 4)
                </p>
                <p className='text-base text-[#96B0BD]'>
                  Het noticed by  the right buyers with visual examples of your services
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  {Array.from({ length: 4 }, (_, indx) => (
                    <DropFile
                      key={indx}
                      className="aspect-video"
                      placeHolderPlusIconSize={40}
                      acceptOnly='image'
                      inputName={`gig_image_${indx}`}
                      onFileUpload={(files) => handleImageUpload(files, indx)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className='text-2xl text-[#F5F5F5]'>
                  Documents (up to 2)
                </p>
                <p className='text-base text-[#96B0BD]'>
                  Show some the best work you created in a document. Format: PDF
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  {Array.from({ length: 2 }, (_, indx) => (
                    <DropFile
                      key={indx}
                      className="h-12"
                      placeHolderPlusIconSize={40}
                      acceptOnly='other'
                      inputName={`gig_document_${indx}`}
                      onFileUpload={(files) => handleDocumentUpload(files, indx)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-5">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I declare that these materials were created by myself or by my team and do not infringe on any 3rd party rights. I understand that the illegal use of digital assets is against JOBS3’s Terms of Service and may result in blocking my account
                </label>
              </div>
            </FormStep>
            <FormStep stepOrder={6}>
              <div className="flex flex-col gap-2">
                <div className='text-3xl text-[#F5F5F5] text-center'>
                  You’re almost done!
                </div>
                <div className='text-base text-[#96B0BD] text-center'>
                  Let’s publish your Gig and get you ready to start selling
                </div>
              </div>
              <img src="/assets/images/publish_image.png" className='w-1/2 mx-auto' />
            </FormStep>
            <FormNavigation />
          </form>
        </Form>
      </div>
    </StepProvider>
  )
}

export default CreateGig;