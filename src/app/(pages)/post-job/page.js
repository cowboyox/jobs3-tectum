'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import RichText from '@/components/elements/RichText';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FormSchema = z.object({});

// Temporarily
const pageReadyToLaunch = false;

const PostJob = () => {
  const router = useRouter();
  const currentUrl = router.asPath;

  const form = useForm({
    defaultValues: {
      username: '',
    },
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data) {
    // For Backend: To make things easier, the parameter (data) is the data submitted from the user
    console.log(data);
    alert('Thanks for submitting');
  }

  return (
    <Layout>
      <div className='post_job container'>
        {pageReadyToLaunch == false ? (
          <div className='top_section'>
            <h2>Post a New Job</h2>
            <p>
              This page is currently under development, and expected to be launched soon
              <br />
              check again later!
            </p>
          </div>
        ) : (
          <>
            <div className='top_section'>
              <h2>Post a New Job</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
            <div className='jobs_forms_container'>
              <Form {...form}>
                <form className='w-2/3 space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='job_form'>
                    <h3>Post a New Job</h3>
                    <div className='cols-1'>
                      <FormField
                        control={form.control}
                        name='Job Title'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title *</FormLabel>
                            <FormControl>
                              <Input placeholder='Example: Node JS developer' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='cols-1'>
                      <FormField
                        control={form.control}
                        name='job_description'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description *</FormLabel>
                            <FormControl>
                              <RichText description={field.name} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='cols-3'>
                      <FormField
                        control={form.control}
                        name='AppDeadline'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Application Deadline *</FormLabel>
                            <FormControl>
                              <Input placeholder='Application Deadline' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='jobSectors'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Sectors *</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select a Job Sectors ' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='Sector 1'>Sector 1</SelectItem>
                                <SelectItem value='Sector 2'>Sector 2</SelectItem>
                                <SelectItem value='Sector 3'>Sector 3</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='jobType'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Type *</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select Type ' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='Type 1'>Type 1</SelectItem>
                                <SelectItem value='Type 2'>Type 2</SelectItem>
                                <SelectItem value='Type 3'>Type 3</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='cols-1'>
                      <FormField
                        control={form.control}
                        name='RequiredSkills'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Required Skills *</FormLabel>
                            <FormControl>
                              <Input placeholder='Required Skills' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='cols-2'>
                      <FormField
                        control={form.control}
                        name='jobApplyType'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Apply Type *</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Job Apply Type ' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='Email'>By Email</SelectItem>
                                <SelectItem value='External URL'>By External URL</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='jobApplyFrom'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Apply Email *</FormLabel>
                            <FormControl>
                              <Input placeholder='example@gmail.com' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className='job_form'>
                    <h3>Other Informations</h3>
                    <div className='cols-2'>
                      <FormField
                        control={form.control}
                        name='workingHours'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Working Hours *</FormLabel>
                            <Select>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Working Hours' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='Full Time'>Full Time</SelectItem>
                                <SelectItem value='Part Time'>Part Time</SelectItem>
                                <SelectItem value='1-10 Hours a week'>1-10 Hours a week</SelectItem>
                                <SelectItem value='11-20 Hours a week'>
                                  11-20 Hours a week
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='AnnualSallery'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Annual Sallery $USD *</FormLabel>
                            <Select>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Annual Sallery $USD' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='> $10k'> &lt; $10k</SelectItem>
                                <SelectItem value='$10-20k'>$10-20k</SelectItem>
                                <SelectItem value='$20-29k'>$20-29k</SelectItem>
                                <SelectItem value='$30-39k'>$30-39k</SelectItem>
                                <SelectItem value='$40-49k'>$40-49k</SelectItem>
                                <SelectItem value='$50-59k'>$50-59k</SelectItem>
                                <SelectItem value='$60-69k'>$60-69k</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='AnnualSallery'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Equity Option</FormLabel>
                            <Select>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Not Offered' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='Not Offered'> Not Offered</SelectItem>
                                <SelectItem value='Negotiable'>Negotiable</SelectItem>
                                <SelectItem value='0-0.5%'>0-0.5%</SelectItem>
                                <SelectItem value='0.5-1%'>0.5-1%</SelectItem>
                                <SelectItem value='1-2%'>1-2%</SelectItem>
                                <SelectItem value='2-3%'>2-3%</SelectItem>
                                <SelectItem value='3-4%'>3-4%</SelectItem>
                                <SelectItem value='4-5%'>4-5%</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='AnnualSallery'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years Experience Required</FormLabel>
                            <Select>
                              <FormControl>
                                <Input placeholder='Years Experience required' />
                              </FormControl>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className='job_form'>
                    <h3>File Attachments</h3>
                  </div>
                  <div className='job_form'>
                    <div className='cols-3'>
                      <div />
                      <div />
                      <Button className='rounded' type='submit'>
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
export default PostJob;
