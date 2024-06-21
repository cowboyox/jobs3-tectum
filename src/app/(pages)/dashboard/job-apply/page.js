'use client';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';


const JobApply = ()=> {
    const [cvFiles, setCvFiles] = useState([]);
    const [coverLetterFiles, setCoverLetterFiles] = useState([]);

    const cvDropzone = useDropzone({
        onDrop: (acceptedFiles) => {
            setCvFiles(acceptedFiles);
        }
    });

    const coverLetterDropzone = useDropzone({
        onDrop: (acceptedFiles) => {
            setCoverLetterFiles(acceptedFiles);
        }
    });

    const renderFiles = (files) => (
        <ul>
            {files.map(file => (
                <div key={file.path} className='single_file'> {file.path} </div>
            ))}
        </ul>
    );

    return (
        <div className="job_apply">
            <h1><span>JOB</span> APPLY</h1>
            <form>
                <div className="fields_top">
                    <div className="field_container">
                        <label>Enter Full Name</label>
                        <input type="text" placeholder='Enter your ful name' />
                    </div>
                    <div className="field_container">
                        <label>Enter Email</label>
                        <input type="email" placeholder='Enter your email' />
                    </div>
                    <div className="field_container">
                        <label>Upload CV</label>
                        <section className="inputDragAndDrop">
                            <div {...cvDropzone.getRootProps({ className: 'dropzone' })}>
                                <input {...cvDropzone.getInputProps()} />
                                <p><span>Drag and drop</span> or browse files</p>
                            </div>
                            <div className='uploaded_files'>
                                {renderFiles(cvFiles)}
                            </div>
                        </section>
                    </div>
                    <div className="field_container">
                        <label>Upload Cover Letter</label>
                        <section className="inputDragAndDrop">
                            <div {...coverLetterDropzone.getRootProps({ className: 'dropzone' })}>
                                <input {...coverLetterDropzone.getInputProps()} />
                                <p><span>Drag and drop</span> or browse files</p>
                            </div>
                            <div className='uploaded_files'>
                                {renderFiles(coverLetterFiles)}
                            </div>
                        </section>
                    </div>
                </div>
                <div className="write_message">
                    <label>Write your message</label>
                    <textarea placeholder='Write your message...'></textarea>
                    <button>Apply</button>
                </div>
            </form>
        </div>
    )
}
export default JobApply;