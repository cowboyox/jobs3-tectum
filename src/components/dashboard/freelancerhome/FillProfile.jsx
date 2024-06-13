import React from 'react'

const FillProfile = () => {
  return (
    <div className='mt-10 bg-deepGreen h-48 rounded-2xl flex flex-col md:flex-row justify-between p-5'>
        <div className='w-full md:w-1/3 h-full flex flex-col justify-center gap-4'>
            <h1 className='text-white font-semibold text-3xl'>Fill out your profile</h1>
            <p className='text-medGray text-sm'>Increase your chances of standing out <br /> on job applications and searches.</p>
        </div>
        <div className='w-full md:w-1/5 flex flex-row md:flex-col justify-center items-center gap-2'>
            <button className='text-white border border-white w-40 h-10 rounded-xl cursor-pointer'>Edit Profile</button>
            <button className='text-medGray w-40 h-10 rounded-xl cursor-pointer font-semibold'>Don&apos;t Show again</button>
        </div>
    </div>
  )
}

export default FillProfile