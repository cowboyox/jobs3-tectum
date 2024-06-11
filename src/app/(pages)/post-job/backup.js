"use client";
import React from 'react';

import Layout from '@/components/layout/Layout';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Input,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const PostJob = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });  


  return (
    <Layout>
        <div className='container post_job'>
            <div className='top_section'>
                <h2>Post a New Job</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            </div>
            <div className='jobs_forms_container'>
              <Form {...form}>
                <form className="w-2/3 space-y-6">
                  <div className='job_form'>
                    <h3>Post a New Job</h3>
                    <div className='cols-1'>
                    </div>
                  </div>    
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
        </div>
    </Layout>
  )
}

export default PostJob
