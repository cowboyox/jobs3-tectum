'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useCustomContext } from '@/context/ContextProvider';
import { useToast } from '@/components/ui/use-toast';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import api from '@/utils/api';

const Review = () => {
  const { gigId, receiverId } = useParams();
  const { data: userInfo } = useGetUserInfo(receiverId);
  const auth = useCustomContext();
  const { toast } = useToast();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rate, setRate] = useState(0);
  const [value, setValue] = useState(0);
  const [feeling, setFeeling] = useState(0);
  const [attraction, setAttraction] = useState("");
  const [reviewText, setReviewText] = useState("");

  // Handle submit review
  const handleSubmitReview = async () => {
    try {
      setSubmitting(true);
      // const { senderId, recepientId, gigId, reviewText, rating, attraction, feeling, value } = req.body;
      await api.post(`/api/v1/review/create_review_clientgig`, {
        senderId: auth?.currentProfile?._id,
        recepientId: receiverId, 
        gigId, 
        reviewText, 
        rating: rate, 
        attraction, 
        feeling, 
        value
      });
      
      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully submitted!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (error) {
      console.log("Error while submitting review:", error);
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>{error?.response?.data?.message || "Internal Server Error!"}</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
      router.push('../../orders');
    }
  };
  
  return (
    <div className='relative p-0 sm:p-0 lg:mt-8 xl:mt-8'>
      <div className={ showModal ? `rounded-xl bg-[#10191D] p-10 blur-xl` : `rounded-xl bg-[#10191D] p-10`}>
        <div className='p-5 bg-[#1B272C] rounded-tr-2xl rounded-br-2xl border-l-[#34E250] border-l-4'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-3'>Your order was completed.</h1>
          <p className='text-[#96B0BD] text-[16px] font-normal'>Based on your expectations, how would you rate the rate of this delivery?</p>
        </div>
        
        <div className='bg-[#1B272C] border-b-2 my-7'></div>

        <div className='py-5'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-10'>Based on your expectations, how would you rate the rate of this delivery?</h1>
          <div className='flex items-center gap-8'>
            <div 
              onClick={() => {
                if (value == 1) {
                  setValue(0);
                } else {
                  setValue(1);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${value == 1 ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                value == 1 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Poor</p>
            </div>

            <div 
              onClick={() => {
                if (value == 2) {
                  setValue(0);
                } else {
                  setValue(2);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${value == 2 ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                value == 2 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Fair</p>
            </div>

            <div 
              onClick={() => {
                if (value == 3) {
                  setValue(0);
                } else {
                  setValue(3);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${value == 3 ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                value == 3 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Good</p>
            </div>
            
            <div 
              onClick={() => {
                if (value == 4) {
                  setValue(0);
                } else {
                  setValue(4);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${value == 4 ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                value == 4 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Very Good</p>
            </div>

            <div 
              onClick={() => {
                if (value == 5) {
                  setValue(0);
                } else {
                  setValue(5);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${value == 5 ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                value == 5 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Exceptional</p>
            </div>
          </div>
        </div>

        <div className='py-5'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-10'>We love to hear that! What made it exceptional?</h1>
          <div className='flex items-center gap-8'>
            <div 
              onClick={() => {
                if (attraction == "Attention to details") {
                  setAttraction("");
                } else {
                  setAttraction("Attention to details");
                }
              }} 
              className={`flex items-center gap-3 p-5 w-60 h-14 py-4 text-center ${attraction == "Attention to details" ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                attraction == "Attention to details" ?
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.837891" width="24" height="24" rx="5" fill="#DC4F13"/>
                    <path d="M6 13.0809L10.243 17.3239L18.727 8.83789" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> :
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold'>Attention to details</p>
            </div>

            <div 
              onClick={() => {
                if (attraction == "Data Depth") {
                  setAttraction("");
                } else {
                  setAttraction("Data Depth");
                }
              }} 
              className={`flex items-center gap-3 p-5 w-60 h-14 py-4 text-center ${attraction == "Data Depth" ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                attraction == "Data Depth" ?
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.837891" width="24" height="24" rx="5" fill="#DC4F13"/>
                    <path d="M6 13.0809L10.243 17.3239L18.727 8.83789" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> :
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
                  </svg>
              }

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Data Depth</p>
            </div>

            <div 
              onClick={() => {
                if (attraction == "Professionalism") {
                  setAttraction("");
                } else {
                  setAttraction("Professionalism");
                }
              }} 
              className={`flex items-center gap-3 p-5 w-60 h-14 py-4 text-center ${attraction == "Professionalism" ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                attraction == "Professionalism" ?
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.837891" width="24" height="24" rx="5" fill="#DC4F13"/>
                    <path d="M6 13.0809L10.243 17.3239L18.727 8.83789" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> :
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
                  </svg>
              }

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Professionalism</p>
            </div>
          </div>
          <div className='flex items-center gap-8 mt-5'>
          <div 
              onClick={() => {
                if (attraction == "Innovation") {
                  setAttraction("");
                } else {
                  setAttraction("Innovation");
                }
              }} 
              className={`flex items-center gap-3 p-5 w-60 h-14 py-4 text-center ${attraction == "Innovation" ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                attraction == "Innovation" ?
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.837891" width="24" height="24" rx="5" fill="#DC4F13"/>
                    <path d="M6 13.0809L10.243 17.3239L18.727 8.83789" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> :
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
                  </svg>
              }

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Innovation</p>
            </div>

            <div 
              onClick={() => {
                if (attraction == "Exceed Expectations") {
                  setAttraction("");
                } else {
                  setAttraction("Exceed Expectations");
                }
              }} 
              className={`flex items-center gap-3 p-5 w-60 h-14 py-4 text-center ${attraction == "Exceed Expectations" ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                attraction == "Exceed Expectations" ?
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.837891" width="24" height="24" rx="5" fill="#DC4F13"/>
                    <path d="M6 13.0809L10.243 17.3239L18.727 8.83789" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> :
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
                  </svg>
              }

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Exceed Expectations</p>
            </div>

            <div 
              onClick={() => {
                if (attraction == "Strategic thinking") {
                  setAttraction("");
                } else {
                  setAttraction("Strategic thinking");
                }
              }} 
              className={`flex items-center gap-3 p-5 w-60 h-14 py-4 text-center ${attraction == "Strategic thinking" ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                attraction == "Strategic thinking" ?
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.837891" width="24" height="24" rx="5" fill="#DC4F13"/>
                    <path d="M6 13.0809L10.243 17.3239L18.727 8.83789" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> :
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
                  </svg>
              }

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Strategic thinking</p>
            </div>
          </div>
        </div>

        <div className='py-5'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-10'>How was it working with Devon miles?</h1>
          <div className='flex items-center gap-8'>
            <div 
              onClick={() => {
                if (feeling == 1) {
                  setFeeling(0);
                } else {
                  setFeeling(1);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${feeling == 1 ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                feeling == 1 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Poor</p>
            </div>

            <div 
              onClick={() => {
                if (feeling == 2) {
                  setFeeling(0);
                } else {
                  setFeeling(2);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${feeling == 2 ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                feeling == 2 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Fair</p>
            </div>

            <div 
              onClick={() => {
                if (feeling == 3) {
                  setFeeling(0);
                } else {
                  setFeeling(3);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${feeling == 3 ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                feeling == 3 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Good</p>
            </div>
            
            <div 
              onClick={() => {
                if (feeling == 4) {
                  setFeeling(0);
                } else {
                  setFeeling(4);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${feeling == 4 ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                feeling == 4 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Very Good</p>
            </div>

            <div 
              onClick={() => {
                if (feeling == 5) {
                  setFeeling(0);
                } else {
                  setFeeling(5);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${feeling == 5 ? "border-[#DC4F13]" : "border-[#3E525B]"}  border-[1px] rounded-xl`}
            >
              {
                feeling == 5 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Exceptional</p>
            </div>
          </div>
        </div>

        <div className='py-5'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-3'>Based on your expectations, how would you rate the value of this delivery</h1>
          <p className='text-[#96B0BD] text-[16px] font-normal mb-10'>Based on your expectations, how would you rate the rate of this delivery?</p>
          <div className='flex items-center gap-8'>
            <div 
              onClick={() => {
                if (rate == 1) {
                  setRate(0);
                } else {
                  setRate(1);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${rate == 1 ? "border-[#DC4F13]" : "border-[#3E525B]" }  border-[1px] rounded-xl` }
            >
              {
                rate == 1 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> 
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Poor</p>
            </div>

            <div 
              onClick={() => {
                if (rate == 2) {
                  setRate(0);
                } else {
                  setRate(2);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${rate == 2 ? "border-[#DC4F13]" : "border-[#3E525B]" }  border-[1px] rounded-xl` }
            >
              {
                rate == 2 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> 
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Fair</p>
            </div>

            <div 
              onClick={() => {
                if (rate == 3) {
                  setRate(0);
                } else {
                  setRate(3);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${rate == 3 ? "border-[#DC4F13]" : "border-[#3E525B]" }  border-[1px] rounded-xl` }
            >
              {
                rate == 3 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> 
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Good</p>
            </div>
            
            <div 
              onClick={() => {
                if (rate == 4) {
                  setRate(0);
                } else {
                  setRate(4);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${rate == 4 ? "border-[#DC4F13]" : "border-[#3E525B]" }  border-[1px] rounded-xl` }
            >
              {
                rate == 4 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> 
              }
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Very Good</p>
            </div>

            <div 
              onClick={() => {
                if (rate == 5) {
                  setRate(0);
                } else {
                  setRate(5);
                }
              }} 
              className={`cursor-pointer flex items-center flex-col px-6 w-40 h-24 py-4 text-center ${rate == 5 ? "border-[#DC4F13]" : "border-[#3E525B]" }  border-[1px] rounded-xl` }
            >
              {
                rate == 5 ?
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> 
              }

              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Exceptional</p>
            </div>
          </div>
        </div>

        <div className='bg-[#1B272C] border-b-2 my-5'></div>

        <div className='py-5'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-3'>Write your public review</h1>
          <p className='text-[#96B0BD] text-[16px] font-normal mb-10'>Based on your expectations, how would you rate the rate of this delivery?</p>
          <div className='border-[#526872] border-[1px] rounded-xl p-5'>
            <div className='bg-[#1B272C] flex items-center rounded-xl p-5 gap-3'>
              <div className='flex items-center gap-3'>
                <img
                  className='object-cover w-12 h-12 rounded-full aspect-square mobile:h-8 mobile:w-8'
                  src={
                    userInfo?.avatarURL
                      ? userInfo?.avatarURL
                      : '/assets/images/users/user-1.png'
                  }
                />
                <p className='text-[#F5F5F5] font-bold text-[16px]'>{userInfo?.fullName}</p>
              </div>
              <div className='border-x-[1px] border-[#3E525B] px-3'>
                <p className='text-[#F5F5F5] font-bold text-[16px]'>${userInfo?.totalEarns || 0}</p>
              </div>
              <div className='flex items-center gap-1'>
                <div>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1209 1.1568L11.5098 3.93454C11.6992 4.32122 12.2042 4.69211 12.6303 4.76313L15.1477 5.18137C16.7575 5.44967 17.1363 6.61759 15.9763 7.76972L14.0192 9.72677C13.6878 10.0582 13.5063 10.6974 13.6089 11.1551L14.1691 13.5777C14.6111 15.4953 13.5931 16.2371 11.8965 15.2349L9.53695 13.8381C9.11082 13.5856 8.40849 13.5856 7.97447 13.8381L5.61496 15.2349C3.92622 16.2371 2.90035 15.4874 3.34226 13.5777L3.90255 11.1551C4.00514 10.6974 3.82363 10.0582 3.4922 9.72677L1.53515 7.76972C0.383022 6.61759 0.753914 5.44967 2.36374 5.18137L4.88107 4.76313C5.29931 4.69211 5.80435 4.32122 5.99375 3.93454L7.38262 1.1568C8.14018 -0.350443 9.37123 -0.350443 10.1209 1.1568Z" fill="#DC4F13"/>
                  </svg>
                </div>
                <div>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1209 1.1568L11.5098 3.93454C11.6992 4.32122 12.2042 4.69211 12.6303 4.76313L15.1477 5.18137C16.7575 5.44967 17.1363 6.61759 15.9763 7.76972L14.0192 9.72677C13.6878 10.0582 13.5063 10.6974 13.6089 11.1551L14.1691 13.5777C14.6111 15.4953 13.5931 16.2371 11.8965 15.2349L9.53695 13.8381C9.11082 13.5856 8.40849 13.5856 7.97447 13.8381L5.61496 15.2349C3.92622 16.2371 2.90035 15.4874 3.34226 13.5777L3.90255 11.1551C4.00514 10.6974 3.82363 10.0582 3.4922 9.72677L1.53515 7.76972C0.383022 6.61759 0.753914 5.44967 2.36374 5.18137L4.88107 4.76313C5.29931 4.69211 5.80435 4.32122 5.99375 3.93454L7.38262 1.1568C8.14018 -0.350443 9.37123 -0.350443 10.1209 1.1568Z" fill="#DC4F13"/>
                  </svg>
                </div>
                <div>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1209 1.1568L11.5098 3.93454C11.6992 4.32122 12.2042 4.69211 12.6303 4.76313L15.1477 5.18137C16.7575 5.44967 17.1363 6.61759 15.9763 7.76972L14.0192 9.72677C13.6878 10.0582 13.5063 10.6974 13.6089 11.1551L14.1691 13.5777C14.6111 15.4953 13.5931 16.2371 11.8965 15.2349L9.53695 13.8381C9.11082 13.5856 8.40849 13.5856 7.97447 13.8381L5.61496 15.2349C3.92622 16.2371 2.90035 15.4874 3.34226 13.5777L3.90255 11.1551C4.00514 10.6974 3.82363 10.0582 3.4922 9.72677L1.53515 7.76972C0.383022 6.61759 0.753914 5.44967 2.36374 5.18137L4.88107 4.76313C5.29931 4.69211 5.80435 4.32122 5.99375 3.93454L7.38262 1.1568C8.14018 -0.350443 9.37123 -0.350443 10.1209 1.1568Z" fill="#DC4F13"/>
                  </svg>
                </div>
                <div>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1209 1.1568L11.5098 3.93454C11.6992 4.32122 12.2042 4.69211 12.6303 4.76313L15.1477 5.18137C16.7575 5.44967 17.1363 6.61759 15.9763 7.76972L14.0192 9.72677C13.6878 10.0582 13.5063 10.6974 13.6089 11.1551L14.1691 13.5777C14.6111 15.4953 13.5931 16.2371 11.8965 15.2349L9.53695 13.8381C9.11082 13.5856 8.40849 13.5856 7.97447 13.8381L5.61496 15.2349C3.92622 16.2371 2.90035 15.4874 3.34226 13.5777L3.90255 11.1551C4.00514 10.6974 3.82363 10.0582 3.4922 9.72677L1.53515 7.76972C0.383022 6.61759 0.753914 5.44967 2.36374 5.18137L4.88107 4.76313C5.29931 4.69211 5.80435 4.32122 5.99375 3.93454L7.38262 1.1568C8.14018 -0.350443 9.37123 -0.350443 10.1209 1.1568Z" fill="#DC4F13"/>
                  </svg>
                </div>
                <div>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1209 1.1568L11.5098 3.93454C11.6992 4.32122 12.2042 4.69211 12.6303 4.76313L15.1477 5.18137C16.7575 5.44967 17.1363 6.61759 15.9763 7.76972L14.0192 9.72677C13.6878 10.0582 13.5063 10.6974 13.6089 11.1551L14.1691 13.5777C14.6111 15.4953 13.5931 16.2371 11.8965 15.2349L9.53695 13.8381C9.11082 13.5856 8.40849 13.5856 7.97447 13.8381L5.61496 15.2349C3.92622 16.2371 2.90035 15.4874 3.34226 13.5777L3.90255 11.1551C4.00514 10.6974 3.82363 10.0582 3.4922 9.72677L1.53515 7.76972C0.383022 6.61759 0.753914 5.44967 2.36374 5.18137L4.88107 4.76313C5.29931 4.69211 5.80435 4.32122 5.99375 3.93454L7.38262 1.1568C8.14018 -0.350443 9.37123 -0.350443 10.1209 1.1568Z" fill="#DC4F13"/>
                  </svg>
                </div>
                <p className='text-[#F5F5F5] font-medium text-[14.2px]'>(5)</p>
              </div>
            </div>

            <div className='bg-[#1B272C] border-b-2 my-5'></div>

            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder='Write your review here...' rows={5} className='w-full bg-[#10191D] p-2 focus:outline-none'/>
          </div>
        </div>

        <div className='py-5'>
          <div className='bg-[#1B272C] rounded-xl h-4'></div>
          <p className='text-[#96B0BD] text-[16px] font-normal mt-5'>Write at least 50 characters</p>
        </div>

        <div className='flex items-center justify-end'>
          <button onClick={handleSubmitReview} className='bg-[#DC4F13] rounded-xl p-4 text-[#F5F5F5] font-bold text-[16px] w-44'>Send</button>
        </div>
      </div>

      {/* Modal */}
      {/* {
        showModal && 
          <div className='bg-[#28373E] absolute top-10 left-16 w-[650px] mx-auto text-center p-5 border-[#28373E] rounded-2xl'>
            <div className='flex items-center justify-center'>
              <svg width="261" height="218" viewBox="0 0 261 218" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M116.553 213.135C119.843 213.9 129.177 214.42 131.014 208.544" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M121.375 200.282C126.884 205.562 135.607 214.055 140.197 207.168L142.952 202.578" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M121.375 186.05C127.649 192.018 146.9 206.341 155.347 201.2C156.877 200.205 159.984 197.022 160.167 192.247" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M136.522 178.014C144.249 184.059 161.312 194.863 167.739 189.721C174.166 184.579 167.51 177.479 163.378 174.571L135.604 152.076" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M56.6406 156.21C60.0838 158.018 63.8825 162.709 65.1336 166.998C66.7405 172.507 71.2548 177.251 73.1676 178.705" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M125.503 125.451C120.912 123.614 108.058 119.896 97.9579 121.548C87.8581 123.201 88.7764 119.942 83.956 117.187L56.6406 100.431" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M162.23 124.074L172.33 118.794M171.183 183.525C175.406 182.423 182.43 176.179 185.414 173.195L197.121 166.997" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M163.15 148.635C156.417 152.69 139.554 157.679 125.965 147.028" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M125.964 147.028C120.914 154.144 109.07 167.733 102.092 165.162C95.1137 162.591 98.2661 155.062 100.714 151.619C107.83 137.388 130.096 111.954 162.231 124.074" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M117.012 204.871C116.829 211.666 114.64 214.588 113.569 215.2C108.347 218.184 102.551 213.594 104.169 209.862C105.279 207.795 106.767 203.531 107.372 201.658C108.78 197.296 117.196 198.077 117.012 204.871Z" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M97.9588 211.299C90.2462 212.951 90.1544 205.101 93.5975 201.199C94.7008 199.949 97.4538 197.379 100.943 194.542C104.432 191.706 106.681 194.126 107.37 195.69C108.279 197.756 105.671 209.646 97.9588 211.299Z" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M85.1051 202.119C76.658 201.935 77.0711 194.544 80.5142 191.33C83.1922 188.499 90.0172 183.25 95.8935 184.903C101.77 186.556 100.484 192.019 99.107 194.773C97.9593 197.298 93.5521 202.302 85.1051 202.119Z" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M87.8613 176.639C78.8633 174.435 71.2579 179.852 68.5799 182.836C66.7436 185.223 66.8966 187.963 67.2027 189.034C69.4062 194.543 79.5978 190.564 84.4182 187.886C89.3151 185.055 96.8593 178.842 87.8613 176.639Z" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M100.254 94.0029C101.631 97.0635 103.972 104.608 102.32 110.3" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M108.746 99.7432C109.129 101.426 109.894 105.482 109.894 108.236" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M137.441 83.4443L142.721 102.037" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M152.363 91.709L150.756 102.727" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M166.593 99.7432L158.559 105.941" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <circle cx="7.75052" cy="119.942" r="7.11576" fill="#DC4F13"/>
                <path d="M19.4471 120.55C31.4849 119.311 50.3733 120.776 52.6058 130.088C54.8382 139.399 46.3133 142.805 41.7718 143.344C24.4813 146.092 1.55469 144.799 1.55469 130.088" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M259 39.5C256.768 30.1884 218.379 28.4995 206.379 28.5C199.416 28.5 185.68 30.493 184.88 36.5001C184.106 42.3162 190.768 47.0281 194.521 48.8319C194.751 48.9424 194.934 49.1317 195.031 49.3679L198.555 57.9819C198.879 58.7736 199.983 58.8196 200.371 58.0576L203.504 51.9154C203.722 51.4873 204.209 51.275 204.673 51.4006C217.27 54.8132 238.171 54.3447 248.166 52.756C252.708 52.2172 261.232 48.8116 259 39.5Z" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <circle cx="15.0953" cy="133.254" r="1.36862" stroke="#DC4F13" stroke-width="2.31266"/>
                <path d="M28.3995 133.254C28.3995 133.918 27.7808 134.623 26.8014 134.623C25.822 134.623 25.2032 133.918 25.2032 133.254C25.2032 132.591 25.822 131.886 26.8014 131.886C27.7808 131.886 28.3995 132.591 28.3995 133.254Z" stroke="#DC4F13" stroke-width="2.31266"/>
                <circle cx="38.5093" cy="133.254" r="1.36862" stroke="#DC4F13" stroke-width="2.31266"/>
                <path d="M210.782 93.5645L186.91 111.698C156.61 134.882 186.221 160.896 197.239 166.788L232.359 144.293" stroke="white" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M109.16 34.8927C112.603 34.4336 119.994 31.8169 122.014 25.0225" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M97.9121 29.3841C100.208 29.4606 105.487 28.3282 108.241 23.1865" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M87.582 21.1213C91.2547 20.3586 99.2427 17.9831 101.814 14.583" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M120.796 46.4381C97.7191 51.5874 76.204 28.6202 67.662 15.566C67.334 15.0647 67.5781 14.3995 68.146 14.2091L104.469 2.0277C104.811 1.91315 105.186 2.00681 105.437 2.26448C117.531 14.6399 139.991 20.0968 151.843 21.5899C152.687 21.6962 152.983 22.7938 152.298 23.2987L121.14 46.2812C121.038 46.3564 120.92 46.4105 120.796 46.4381Z" stroke="#DC4F13" stroke-width="2.31266" stroke-linecap="round"/>
                <path d="M202.416 38.4408L203.058 39.7256C203.146 39.9045 203.379 40.076 203.576 40.1089L204.741 40.3023C205.485 40.4264 205.661 40.9666 205.124 41.4995L204.219 42.4047C204.066 42.558 203.982 42.8537 204.029 43.0654L204.288 44.1859C204.493 45.0728 204.022 45.4159 203.237 44.9524L202.146 44.3063C201.949 44.1895 201.624 44.1895 201.423 44.3063L200.332 44.9524C199.551 45.4159 199.076 45.0692 199.28 44.1859L199.54 43.0654C199.587 42.8537 199.503 42.558 199.35 42.4047L198.445 41.4995C197.912 40.9666 198.083 40.4264 198.828 40.3023L199.992 40.1089C200.186 40.076 200.419 39.9045 200.507 39.7256L201.149 38.4408C201.5 37.7437 202.069 37.7437 202.416 38.4408Z" fill="#DC4F13"/>
                <path d="M213.879 38.4408L214.521 39.7256C214.609 39.9045 214.842 40.076 215.039 40.1089L216.204 40.3023C216.948 40.4264 217.124 40.9666 216.587 41.4995L215.682 42.4047C215.528 42.558 215.445 42.8537 215.492 43.0654L215.751 44.1859C215.956 45.0728 215.485 45.4159 214.7 44.9524L213.609 44.3063C213.411 44.1895 213.087 44.1895 212.886 44.3063L211.795 44.9524C211.013 45.4159 210.539 45.0692 210.743 44.1859L211.003 43.0654C211.05 42.8537 210.966 42.558 210.813 42.4047L209.908 41.4995C209.375 40.9666 209.546 40.4264 210.291 40.3023L211.455 40.1089C211.649 40.076 211.882 39.9045 211.97 39.7256L212.612 38.4408C212.963 37.7437 213.532 37.7437 213.879 38.4408Z" fill="#DC4F13"/>
                <path d="M225.344 38.4408L225.986 39.7256C226.074 39.9045 226.307 40.076 226.504 40.1089L227.669 40.3023C228.413 40.4264 228.588 40.9666 228.052 41.4995L227.147 42.4047C226.993 42.558 226.909 42.8537 226.957 43.0654L227.216 44.1859C227.42 45.0728 226.95 45.4159 226.165 44.9524L225.073 44.3063C224.876 44.1895 224.551 44.1895 224.351 44.3063L223.259 44.9524C222.478 45.4159 222.004 45.0692 222.208 44.1859L222.467 43.0654C222.515 42.8537 222.431 42.558 222.278 42.4047L221.372 41.4995C220.839 40.9666 221.011 40.4264 221.756 40.3023L222.92 40.1089C223.113 40.076 223.347 39.9045 223.435 39.7256L224.077 38.4408C224.427 37.7437 224.997 37.7437 225.344 38.4408Z" fill="#DC4F13"/>
                <path d="M236.806 38.4408L237.449 39.7256C237.536 39.9045 237.77 40.076 237.967 40.1089L239.131 40.3023C239.876 40.4264 240.051 40.9666 239.515 41.4995L238.61 42.4047C238.456 42.558 238.372 42.8537 238.42 43.0654L238.679 44.1859C238.883 45.0728 238.412 45.4159 237.628 44.9524L236.536 44.3063C236.339 44.1895 236.014 44.1895 235.814 44.3063L234.722 44.9524C233.941 45.4159 233.467 45.0692 233.671 44.1859L233.93 43.0654C233.978 42.8537 233.894 42.558 233.74 42.4047L232.835 41.4995C232.302 40.9666 232.474 40.4264 233.218 40.3023L234.383 40.1089C234.576 40.076 234.81 39.9045 234.897 39.7256L235.54 38.4408C235.89 37.7437 236.46 37.7437 236.806 38.4408Z" fill="#DC4F13"/>
                <path d="M248.269 38.4408L248.912 39.7256C248.999 39.9045 249.233 40.076 249.43 40.1089L250.594 40.3023C251.339 40.4264 251.514 40.9666 250.978 41.4995L250.072 42.4047C249.919 42.558 249.835 42.8537 249.883 43.0654L250.142 44.1859C250.346 45.0728 249.875 45.4159 249.091 44.9524L247.999 44.3063C247.802 44.1895 247.477 44.1895 247.277 44.3063L246.185 44.9524C245.404 45.4159 244.93 45.0692 245.134 44.1859L245.393 43.0654C245.441 42.8537 245.357 42.558 245.203 42.4047L244.298 41.4995C243.765 40.9666 243.937 40.4264 244.681 40.3023L245.846 40.1089C246.039 40.076 246.273 39.9045 246.36 39.7256L247.003 38.4408C247.353 37.7437 247.923 37.7437 248.269 38.4408Z" fill="#DC4F13"/>
              </svg>
            </div>
            <h1 className='text-[#F5F5F5] text-2xl font-semibold mt-5'>Thanks for your review!</h1>

            <div className='bg-[#1B272C] border-b-1 my-5'></div>

            <div className='mb-5 text-center'>
              <p className='text-[#F5F5F5] text-lg font-medium'>Show your appreciation to Devon Miles by leaving a tip</p>
              <p className='text-[#96B0BD] text-[16px] font-normal'>Choose an option below</p>
            </div>
            
            <div className='flex items-center justify-between'>
            <div className='rounded-xl border-[1px] border-[#3E525B] w-28 h-18 p-3 text-center'>
              <p className='text-[#F5F5F5] text-lg font-medium'>15%</p>
              <p className='text-[#96B0BD] text-[16px] font-normal'>$12</p>
            </div>
            <div className='rounded-xl border-[1px] border-[#3E525B] w-28 h-18 p-3 text-center'>
              <p className='text-[#F5F5F5] text-lg font-medium'>15%</p>
              <p className='text-[#96B0BD] text-[16px] font-normal'>$12</p>
            </div>
            <div className='rounded-xl border-[1px] border-[#3E525B] w-28 h-18 p-3 text-center'>
              <p className='text-[#F5F5F5] text-lg font-medium'>15%</p>
              <p className='text-[#96B0BD] text-[16px] font-normal'>$12</p>
            </div>
            <div className='rounded-xl border-[1px] border-[#3E525B] w-28 h-18 p-3 text-center'>
              <p className='text-[#F5F5F5] text-lg font-medium'>15%</p>
              <p className='text-[#96B0BD] text-[16px] font-normal'>$12</p>
            </div>
            </div>
          </div>
      } */}
    </div>
  );
};

export default Review;
