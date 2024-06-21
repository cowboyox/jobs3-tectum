'use client';
/*
 * Selmani: I used client page as i didn't have enough time to organize it more
 * But if you do, please try to separate components that needs use client
 to another page and just remove them from this page so it remains a 
 server page
*/

/*----- React and related hooks -----*/
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

/*----- Context Providers -----*/
import { StepProvider } from '@/components/elements/formSteps/StepContext';

/*----- Form Steps Components -----*/
import FormStep from '@/components/elements/formSteps/Step';
import StepNavItem from '@/components/elements/formSteps/StepNavItem';
import FormNavigation from '@/components/elements/formSteps/StepNavigation';

/*----- UI Components -----*/
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

/*----- Icons -----*/
import { GoTrash } from 'react-icons/go';

/*----- Custom Components -----*/
import DropFile from '@/components/elements/dropFile';

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

const categories_list = [
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
];

const CreateGig = () => {
  const form = useForm();
  const [tags, setTags] = useState([]);
  const [requirementQuestions, setRequirementQuestions] = useState([
    {
      id: 0,
      question: 'If you are ordering for a business, what’s your industry?',
      answer_placeholder: '3D design, e-commerce, accounting, marketing, etc',
    },
    {
      id: 1,
      question: 'Is this order part of a bigger project you’re working on?',
      answer_placeholder: 'Building a mobile app, creating an animation, developing a game, etc',
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

  function onSubmit(values) {
    /* Selmani: I didn't check if all the values are being passed here
     * And i'm sure not all, so please make sure all necessary inputs are being passed
     * NOTE: Make sure to check the ShadCN documentation
     * https://ui.shadcn.com/docs/components
     * I know you know but just wanted to mention :D
     */
    console.log(values);
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
                name='gig_title'
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
                    name='gig_category'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col gap-2'>
                        <FormControl>
                          <Select>
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Select a Category' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
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
                    name='gig_category'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col gap-2'>
                        <FormControl>
                          <Select>
                            <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                              <SelectValue placeholder='Select a Sub Category' />
                            </SelectTrigger>
                            <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
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
                name='gig_price'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>Setup price</FormLabel>
                    <FormControl>
                      <Input
                        className='h-14 w-full rounded-xl border border-slate-500 bg-transparent px-4 py-4 text-base'
                        placeholder='Price'
                        type='number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='revisions_number'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>Revisions</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                          <SelectValue placeholder='Revisions' />
                        </SelectTrigger>
                        <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
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
                name='delivery_time'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormLabel className='text-2xl text-[#F5F5F5]'>Delivery time</FormLabel>
                    <FormControl>
                      <Select>
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
                )}
              />
            </FormStep>
            <FormStep stepOrder={3}>
              <FormField
                name='description'
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
            <FormNavigation />
          </form>
        </Form>
      </div>
    </StepProvider>
  );
};

export default CreateGig;
