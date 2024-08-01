'use client';
import { PhoneInput } from '@/components/ui/phone-input';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ResumeItem from './ResumeItem';
import { useState } from 'react';
import FileUpload from '@/components/pages/dashboard/freelancer/FileUpload';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@radix-ui/react-checkbox';

const Application = () => {
  const [resumes, setResumes] = useState([
    { id: 0, name: 'Devon Miles Resume1.pdf', lastUsetTime: Date.now() },
    { id: 1, name: 'Devon Miles Resume2.pdf', lastUsetTime: Date.now() },
  ]);
  const [selectedResumeId, setSelectedResumeId] = useState(0);
  const [descriptionOverflow, setDescriptionOverflow] = useState(false);
  const [applicationPosition, setApplicationPosition] = useState(0);
  const [applyData, setApplyData] = useState({
    firstName: 'Devon',
    lastName: 'Miles',
    email: 'Devonmiles@gmail.com',
    phoneNumber: '+44 20 7123 4567',
    resumes: resumes,
    coverLetter: '',
  });
  const form = useForm();
  const onSubmit = async () => {
    console.log('onSubmit');
  };
  const handleApplyDataChange = (e) => {
    setApplyData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className='flex gap-3'>
      {applicationPosition === 0 && (
        <div className='mt-10 w-2/3 rounded-xl bg-[#10191d] p-7 mobile:px-3'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'>
                <p className='text-2xl font-bold'>Contact Info</p>
                <hr className='w-full' />
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
                            name='firstName'
                            value={applyData.firstName}
                            onChange={(e) => handleApplyDataChange(e)}
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
                            name='lastName'
                            value={applyData.lastName}
                            onChange={(e) => handleApplyDataChange(e)}
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
                        <FormLabel className='text-2xl text-[#F5F5F5]'>Email</FormLabel>
                        <FormControl>
                          <Input
                            className='h-18 rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                            type='text'
                            placeholder='Email'
                            name='email'
                            value={applyData.email}
                            onChange={(e) => handleApplyDataChange(e)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name='gigTitle'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-2'>
                      <FormLabel className='text-2xl text-[#F5F5F5]'>
                        Phone <span className='text-[#dc4f13]'>*</span>
                      </FormLabel>
                      <FormControl>
                        <PhoneInput
                          defaultCountry='US'
                          placeholder='Input you number'
                          name='phoneNumber'
                          value={applyData.phoneNumber}
                          onChangeCapture={(e) => handleApplyDataChange(e)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='mt-8 flex flex-col'>
                  <div className='flex justify-between'>
                    <div className='flex items-center gap-3 text-xl md:text-2xl'>Resume</div>
                    {/* {isAuth && ( */}
                    <button
                      className='rounded-full border-[1px] border-[#dc4f13] bg-[#dc4f13] bg-opacity-[0.14] p-4 xs:hidden md:block'
                      onClick={() => router.push('/dashboard/employee/create-resume')}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className='flex items-center'>
                            <img
                              className='h-6 w-6 object-contain object-center'
                              src='/assets/images/icons/note.svg'
                            />
                          </TooltipTrigger>
                          <TooltipContent>Create your resume</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </button>
                    {/* )} */}
                  </div>
                  <div className='flex flex-col gap-5'>
                    <p className='text-[#96B0BD]'>Be sure to inculde an update resume *</p>
                    {resumes.map((resume) => {
                      return (
                        <ResumeItem
                          key={resume.id}
                          resume={resume}
                          selected={resume.id === selectedResumeId}
                          setSelected={setSelectedResumeId}
                          onDelete={() => {
                            setResumes(resumes.filter((r) => r.id !== resume.id));
                          }}
                        />
                      );
                    })}
                    <div className=''>
                      <FileUpload
                        className=''
                        //   email={profileData.email}
                        imagePath=''
                        //   key={`extra-${uploadedImagePath.length}`}
                        //   setProfileData={setProfileData}
                        //   setUploadedImagePath={setUploadedImagePath}
                      />
                    </div>
                    <p className='text-base text-[#96b0bd]'>DOC, DOCX, PDF (2 MB)</p>
                  </div>
                  <FormField
                    name='gigTitle'
                    render={({ field }) => (
                      <FormItem className='mt-6 flex flex-col gap-2'>
                        <FormLabel className='text-2xl text-[#F5F5F5]'>
                          Cover letter <span className='text-orange'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={7}
                            className='rounded-xl border-slate-500 bg-transparent px-4 py-4 text-base'
                            placeholder='I am Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring'
                            value={applyData.coverLetter}
                            name='coverLetter'
                            onChange={(e) => handleApplyDataChange(e)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <hr className='mt-8 w-full border-[#1b272c]' />
                  <div className='mt-8 flex w-2/5 rounded-2xl bg-[#1b272c] p-[5px]'>
                    <button
                      className='flex w-full cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#DC4F13] py-5 text-center text-white mobile:py-3'
                      onClick={() => setApplicationPosition((prevState) => prevState + 1)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      )}
      {applicationPosition === 1 && (
        <div className='mt-10 w-2/3 rounded-xl bg-[#10191d] p-7 mobile:px-3'>
          <div className='flex flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3'>
            <p className='text-2xl'>Review your application</p>
            <p className='text-sm text-[#96B0BD]'>
              The employer will also receive a copy of your profile.
            </p>
            <hr className='my-2 w-full' />
            <div className='flex gap-3'>
              <img alt='avatar' src='/assets/images/author.png' className='h-[100px] w-[100px]' />
              <div className='flex flex-col gap-1'>
                <p className='text-2xl'>{applyData.firstName + ' ' + applyData.lastName}</p>
                <p className='text-base'>Senior Product Designer</p>
                <p className='text-sm text-[#96b0bd]'>Yogyakarta, Indonesia</p>
              </div>
            </div>
            <hr className='my-2 w-full' />
            <div className='flex flex-col gap-2'>
              <div>
                <p>Email address *</p>
                <p className='text-[#96B0BD]'>{applyData.email}</p>
              </div>
              <div>
                <p>Phone number *</p>
                <p className='text-[#96B0BD]'>{applyData.phoneNumber}</p>
              </div>
            </div>
            <hr className='my-2 w-full' />
            <div className='flex justify-between'>
              <div className='flex items-center gap-3 text-xl md:text-2xl'>Resume</div>
              {/* {isAuth && ( */}
              <button
                className='rounded-full border-[1px] border-[#dc4f13] bg-[#dc4f13] bg-opacity-[0.14] p-4 xs:hidden md:block'
                onClick={() => router.push('/dashboard/employee/create-resume')}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className='flex items-center'>
                      <img
                        className='h-6 w-6 object-contain object-center'
                        src='/assets/images/icons/note.svg'
                      />
                    </TooltipTrigger>
                    <TooltipContent>Create your resume</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              {/* )} */}
            </div>
            <div className='flex flex-col gap-5'>
              <p className='text-[#96B0BD]'>Be sure to inculde an update resume *</p>
              {resumes.map((resume) => {
                return (
                  resume.id === selectedResumeId && (
                    <ResumeItem
                      key={resume.id}
                      resume={resume}
                      selected={resume.id === selectedResumeId}
                      setSelected={setSelectedResumeId}
                      onDelete={() => {
                        setResumes(resumes.filter((r) => r.id !== resume.id));
                      }}
                    />
                  )
                );
              })}
            </div>
            <hr className='my-2 w-full' />
            <div className='flex items-center gap-4'>
              <input type='checkbox' className='h-6 w-6 accent-orange' />
              <p className='text-sm'>Follow Company name to stay up to date with their page.</p>
            </div>
            <div className='flex w-full gap-3 rounded-2xl bg-[#1B272C] p-2'>
              <button
                className='w-full cursor-pointer rounded-2xl py-5 text-center text-white transition hover:bg-white hover:text-black mobile:py-3'
                onClick={() => setApplicationPosition((prevState) => prevState - 1)}
              >
                Back
              </button>
              <button
                className='flex w-full cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#DC4F13] py-5 text-center text-white mobile:py-3'
                onClick={() => setApplicationPosition((prevState) => prevState + 1)}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
      {applicationPosition === 2 && (
        <div className='m-auto mt-10 flex h-full w-4/5 flex-col gap-6 rounded-xl bg-[#10191d] p-[30px] mobile:px-3'>
          <div className='flex flex-col items-center'>
            <img src='/assets/images/complete-application.svg' />
            <p className='text-[32px] font-bold'>Your application has been submitted!</p>
          </div>
          <div className='flex items-center gap-4 text-[#96b0bd]'>
            <img src='/assets/images/icons/checkbox.svg' />
            <p>
              You will get an email confirmation at{' '}
              <span className='text-[18px] font-bold text-white'>{applyData.email}</span>
            </p>
          </div>
          <div className='flex gap-4 text-[#96b0bd]'>
            <img src='/assets/images/icons/checkbox.svg' />
            <p className='text-base'>
              This employer typically responds to applications within 19 days
            </p>
          </div>
          <div className='flex gap-4 text-[#96b0bd]'>
            <img src='/assets/images/icons/checkbox.svg' />
            <p>
              Your CV has been saved to your <span className='font-bold text-orange'>profile</span>
            </p>
          </div>
          <div className='flex w-full gap-3 rounded-2xl bg-[#1B272C] p-2'>
            <button
              className='w-full cursor-pointer rounded-2xl py-5 text-center text-base text-white transition hover:bg-white hover:text-black mobile:py-3'
              onClick={() => setApplicationPosition((prevState) => prevState - 1)}
            >
              Back
            </button>
            <button
              className='flex w-full cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#DC4F13] py-5 text-center text-white mobile:py-3'
              onClick={() => setApplicationPosition((prevState) => prevState)}
            >
              Publish
            </button>
          </div>
        </div>
      )}
      {applicationPosition !== 2 && (
        <div className='mt-10 flex h-full w-1/3 flex-col gap-6 rounded-xl bg-[#10191d] p-7 mobile:px-3 transition-all duration-200'>
          <div className='flex flex-col gap-4 px-[25px]'>
            <img alt='pdf' src='/assets/icons/ActiveOrder.png' className='h-16 w-16' />
            <p className='text-[18px]'>Figma and Flow bite mentor needed</p>
            <div className='flex gap-2'>
              <img
                className='h-6 w-6 object-contain object-center'
                src='/assets/images/icons/location.svg'
              />
              <p className='text-base text-[#96b0bd]'>London, UK</p>
            </div>
          </div>
          <hr className='my-2' />
          <p
            className={`text-base text-[#96b0bd] ${descriptionOverflow ? '' : 'h-52 overflow-hidden'}`}
          >
            We are looking for a highly skilled designer who works with Figma and Flow bite
            https://flowbite.com/ design system to come into our company as a trainer. We need you
            to teach our designers how to use a design system (flow bite) in figma including how to
            set up a new website, how to use the components from the design We are looking for a
            highly skilled designer who works with Figma and Flow bite https://flowbite.com/ design
            system to come into our company as a trainer. We need you to teach our designers how to
            use a design system (flow bite) in figma including how to set up a new website, how to
            use the components from the design{' '}
          </p>
          <button
            className='flex items-center justify-center gap-2 text-orange'
            onClick={() => setDescriptionOverflow((prevState) => !prevState)}
          >
            See {descriptionOverflow ? 'less' : 'full'} job description{' '}
            <img
              src='/assets/images/icons/arrow-down.svg'
              className={`${descriptionOverflow ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Application;
