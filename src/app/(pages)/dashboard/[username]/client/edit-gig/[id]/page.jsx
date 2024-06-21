'use client'
import React from 'react'
import GigPosting from "../../post-gig/page"
import { useParams } from 'next/navigation'

const Page = () => {  
    const params = useParams();

    return (
    <div>
        <GigPosting id={params.id} />
    </div>
  )
}

export default Page