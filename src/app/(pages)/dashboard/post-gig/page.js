"use client";
import React, { useState } from 'react';

// Components
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label";
import FileUpload from "react-drag-n-drop-image";

// Icons
import { IoCheckmark } from "react-icons/io5";
import { GoChevronDown } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { GoTrash } from "react-icons/go";



function FileUploadBody() {
    return <div className="h-52 w-full border border-dashed border-slate-500 p-3 flex items-center justify-center rounded-xl"> 
        <p className='text-center'>
            <span className='text-lg text-slate-500'>Drag and drop or &nbsp; </span> borwse files
        </p> 
    </div>
}

/*
    * This is the data for the form, like labels, placholders, options and more
    * You can restructure it if you want no problem
    * I just created it quickly to have an easier method to edit the info on the page
*/
const all_form_structure = {
    title_label: 'Title',
    title_placeholder:  'Write a title for your job post',

    categories_label: 'JOB CATEGORY',
    categories_placeholder: 'Dropdown menu with categories list',
    categories_list: [
        {
            value: "category_1",
            label: "Category 1",
        },
        {
            value: "category_2",
            label: "Category 2",
        },
        {
            value: "category_3",
            label: "Category 3",
        },
        {
            value: "category_4",
            label: "Category 4",
        },
        {
            value: "category_5",
            label: "Category 5",
        },
    ],

    skills_label: 'Skills',
    skills_placeholder: 'Type or search...',
    skills_list : [
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
        }
    ],

    scope_label: 'Scope',
    scope_placeholder: 'Estimate the scope of your work',
    scope_options: [
        {
            label: 'Above 6 months',
            value: 'Above 6 months'
        },
        {
            label: '3 to 6 months',
            value: '3 to 6 months'
        },
        {
            label: '1 to 3 months',
            value: '1 to 3 months'
        },
        {
            label: 'Less than a month',
            value: 'Less than a month'
        },
    ], // Default will be the first option

    experience_label: 'Experience Requirements',
    experience_options: [
        {
            label: 'Entry',
            value: 'Entry',
            description: 'Looking for someone relatively new to this field'
        },
        {
            label: 'Intermediate',
            value: 'Intermediate',
            description: 'Looking for substantial experience in this field'
        },
        {
            label: 'Expert',
            value: 'Expert',
            description: 'Looking for comprehensive and deep expertise in this field'
        },
    ],

    location_label: 'Location',
    location_placeholder: 'Budapest, Hungary',

    budget_label: 'Your Budget',
    budget_placeholder: 'Select the payment mode and min/max budget',
    budget_mode : [
        {
            label: 'Hourly Rate',
            value: 'hourly'
        },
        {
            label: 'Fixed Price',
            value: 'fixed'
        }
    ],

    gig_fixed_label: "Project Price",
    gig_fixed_price: "36.00",

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

    upload_files_label: 'Upload Files'
}

const GigPosting = () => {
    const [open, setOpen] = useState(false)
    const [jobCategory, setCategoryValue] = useState("");
    const [skillSet, setSkillSet] = useState([]);
    const [budgetMode, setBudgetMode] = useState("hourly");
    const [files, setFiles] = useState([]);
    
    const FileChanged = (file) => {
        setFiles(file);
    };
    const onRemoveImage = (id) => {
        setFiles((prev) => prev.filter((i) => i.id !== id));
    };
    const FileError = (error) => {
        console.error(error);
    };
    const form = useForm(); 


    return (
        <div className='gig_posting'>
            <h1 className='text-3xl	md:text-4xl'>Create a <span className='main_color'>New Gig</span> Post</h1>
            <Form {...form}>
                <form className='max-w-lg'>
                    <FormField
                        name="gig_title" 
                        render={({ field }) => (
                        <FormItem className='mt-8'>
                            <FormLabel className='uppercase text-slate-500 text-lg'>
                                {all_form_structure.title_label}
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder={all_form_structure.title_placeholder}
                                    className='border-slate-500 rounded-full text-base px-6 py-6' {...field} 
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        name="job_category" 
                        render={({ field }) => (
                        <FormItem className='mt-8'>
                            <FormLabel className='uppercase text-slate-500 text-lg'>
                                {all_form_structure.categories_label}
                            </FormLabel>
                            <FormControl className='w-full'> 
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild  className="w-full border-slate-500 rounded-full text-base px-6 py-6">
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className=" justify-between w-full"
                                        >
                                        {jobCategory
                                            ? all_form_structure.categories_list.find((job_category) => job_category.value === jobCategory)?.label
                                            : all_form_structure.categories_placeholder}
                                        <GoChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="max-w-lg w-screen p-0">
                                        <Command>
                                            <CommandInput placeholder="Type or search..." />
                                            <CommandList>
                                                <CommandEmpty>No results found.</CommandEmpty>
                                                <CommandGroup>
                                                    {all_form_structure.categories_list.map((job_category) => (
                                                    <CommandItem
                                                        key={job_category.value}
                                                        value={job_category.value}
                                                        onSelect={(currentValue) => {
                                                            setCategoryValue(currentValue === jobCategory ? "" : currentValue)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        {job_category.label}
                                                        <IoCheckmark
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                jobCategory === job_category.value ? "opacity-100" : "opacity-0"
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
                        name="gig_skills" 
                        render={({ field }) => (
                            <FormItem className='mt-8 gig_skills'>
                                <FormLabel className='uppercase text-slate-500 text-lg'>
                                    {all_form_structure.skills_label}
                                </FormLabel>
                                <FormControl  className='w-full'>
                                    <Command>
                                        <div className='flex gap-3 items-center mb-2 flex-wrap'>
                                            {skillSet.map((selectedSkill, selectedSkillIndex)=> (
                                                <div 
                                                    className='bg-white py-1 px-2 text-black rounded-full text-sm flex items-center cursor-pointer w-auto whitespace-nowrap'
                                                    data-index={selectedSkillIndex}
                                                    key={selectedSkillIndex}
                                                    onClick={()=> {
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
                                        <div className='w-full border border-slate-500 rounded-full text-base px-6 py-3'>
                                            <CommandInput placeholder={all_form_structure.skills_placeholder} />
                                        </div>
                                        <CommandList>
                                            <CommandEmpty>No skills found.</CommandEmpty>
                                            <CommandGroup>
                                                <div className='flex flex-wrap gap-3 mt-3 suggested_skills'> 
                                                  {all_form_structure.skills_list.map((suggestedSkill)=> ( 
                                                    <CommandItem 
                                                        key={suggestedSkill.label}
                                                        value={suggestedSkill.label}
                                                        className={`
                                                            skill_name
                                                            ${skillSet.includes(suggestedSkill.label) && "hidden"}
                                                            rounded-full py-2 px-4 bg-transparent w-auto whitespace-nowrap border border-slate-500 cursor-pointer
                                                        `}
                                                        onSelect={(currentSkill) => {
                                                          setSkillSet((prevSkillSet) => [...prevSkillSet, currentSkill]);
                                                        }}
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
                        name="gig_scope"
                        render={({ field }) => (
                            <FormItem className='mt-8'>
                                <FormLabel  className='uppercase text-slate-500 text-lg'>
                                    {all_form_structure.scope_label}
                                </FormLabel>
                                <FormDescription className="text-base">
                                    {all_form_structure.scope_placeholder}
                                </FormDescription>
                                <RadioGroup 
                                  onValueChange={field.onChange}
                                  defaultValue={all_form_structure.scope_options[0].value}
                                  className='flex gap-0 flex-wrap radio_items pt-3'>
                                    {all_form_structure.scope_options.map((single_option)=> (
                                        <div 
                                            key={single_option.value}
                                            className="flex items-center space-x-2 md:w-1/2 w-full radio_item mb-4 md:pr-2">
                                            <RadioGroupItem 
                                                value={single_option.value} 
                                                id={single_option.value} 
                                                className='hidden' 
                                            />
                                            <Label 
                                                className='p-5 border border-slate-500 w-full rounded-full ml-0 transition cursor-pointer' 
                                                htmlFor={single_option.value}>
                                                {single_option.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="gig_experience"
                        render={({ field }) => (
                            <FormItem className='mt-8'>
                                <FormLabel  className='uppercase text-slate-500 text-lg'>
                                    {all_form_structure.experience_label}
                                </FormLabel>
                                <RadioGroup 
                                  onValueChange={field.onChange}
                                  defaultValue={all_form_structure.experience_options[0].value}  
                                  className='flex flex-wrap gap-3 pt-3'>
                                    {all_form_structure.experience_options.map((experience_option)=> (
                                        <div 
                                          key={experience_option.value}
                                          className="flex items-center space-x-2 gap-3 px-3 py-0 border border-slate-500 rounded-xl w-full">
                                            <RadioGroupItem 
                                                value={experience_option.value} 
                                                id={experience_option.value} 
                                                className="h-6 w-6" 
                                            />
                                            <Label
                                                className='w-full py-7 cursor-pointer'  
                                                htmlFor={experience_option.value} >
                                                <span className="text-xl text-slate-300">{experience_option.label}</span>
                                                <p className="text-base text-slate-500">
                                                    {experience_option.description}
                                                </p>
                                            </Label>
                                        </div> 
                                    ))}
                                </RadioGroup>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="location"
                        render={({ field }) => (
                            <FormItem className='mt-8'>
                                <FormLabel  className='uppercase text-slate-500 text-lg'>
                                    {all_form_structure.location_label}
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder={all_form_structure.location_placeholder}
                                        className='border-slate-500 rounded-full text-base px-6 py-6' {...field} 
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Budget */}
                    <FormField
                        name="budget" 
                        render={({ field }) => (
                            <FormItem className='mt-8'>
                                <FormLabel  className='uppercase text-slate-500 text-lg'>
                                    {all_form_structure.budget_label}
                                </FormLabel>
                                <FormDescription className="text-base">
                                    {all_form_structure.budget_placeholder}
                                </FormDescription>
                                <RadioGroup 
                                  onValueChange={(val)=> { 
                                    field.onChange();
                                    setBudgetMode(val)
                                  }}
                                  defaultValue={all_form_structure.budget_mode[0].value}
                                  className='flex gap-3 pt-3 flex-wrap md:flex-nowrap'>
                                    {all_form_structure.budget_mode.map((budget_option) => ( 
                                        <div 
                                          key={budget_option.value}
                                          className="flex items-center space-x-2 gap-2 px-3 py-0 border border-slate-500 rounded-xl w-full">
                                            <RadioGroupItem 
                                                value={budget_option.value} 
                                                id={budget_option.value} 
                                                className="h-4 w-4" 
                                            />
                                            <Label
                                                className='w-full py-7 cursor-pointer text-xl text-slate-300'
                                                htmlFor={budget_option.value}>
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
                                name="hourly_rate_from"
                                render={({ field }) => (
                                    <FormItem className='mt-8 w-full'>
                                        <FormLabel  className='uppercase text-slate-500 text-lg'>
                                            {all_form_structure.gig_from_to.from_label}
                                        </FormLabel>
                                        <FormControl>
                                            <div className='relative pr-7 w-full'>
                                                <Input 
                                                    placeholder={all_form_structure.gig_from_to.from_placeholder}
                                                    className='border-slate-400 rounded-full text-base px-6 py-6 text-end' {...field} 
                                                />
                                                <span className='absolute top-1/2 left-5 border-slate-400 -translate-y-1/2'>
                                                    $
                                                </span>
                                                <span className='absolute top-1/2 right-0 border-slate-400 -translate-y-1/2 '>
                                                    /hr
                                                </span>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="hourly_rate_to"
                                render={({ field }) => (
                                    <FormItem className='mt-8 w-full'>
                                        <FormLabel  className='uppercase text-slate-500 text-lg'>
                                            {all_form_structure.gig_from_to.to_label}
                                        </FormLabel>
                                        <FormControl>
                                            <div className='relative pr-7 w-full'>
                                                <Input 
                                                    placeholder={all_form_structure.gig_from_to.to_placeholder}
                                                    className='border-slate-400 rounded-full text-base px-6 py-6 text-end' {...field} 
                                                />
                                                <span className='absolute top-1/2 left-5 border-slate-400 -translate-y-1/2'>
                                                    $
                                                </span>
                                                <span className='absolute top-1/2 right-0 border-slate-400 -translate-y-1/2 '>
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
                            name="fixed_price"
                            render={({ field }) => (
                                <FormItem className='mt-8 w-full'>
                                    <FormLabel  className='uppercase text-slate-500 text-lg'>
                                        {all_form_structure.gig_fixed_label}
                                    </FormLabel>
                                    <FormControl>
                                        <div className='relative w-full'>
                                            <Input 
                                                placeholder={all_form_structure.gig_fixed_price} 
                                                className='border-slate-400 rounded-full text-base px-6 py-6 text-end' {...field} 
                                            />
                                            <span className='absolute top-1/2 left-5 border-slate-400 -translate-y-1/2'>
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
                        name="gig_description"
                        render={({ field }) => (
                            <FormItem className='mt-8'>
                                <FormLabel  className='uppercase text-slate-500 text-lg'>
                                    {all_form_structure.gig_description_label} 
                                </FormLabel>
                                <FormControl> 
                                    <Textarea 
                                        placeholder={all_form_structure.gig_description_placeholder} 
                                        className='border-slate-500 rounded-xl text-base px-6 py-6' 
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* File Upload */}
                    <FormField
                        name="attachemnts"
                        render={({ field }) => (
                            <FormItem className='mt-8'>
                                <FormLabel  className='uppercase text-slate-500 text-lg'>
                                    {all_form_structure.upload_files_label} 
                                </FormLabel>
                                <FormControl>
                                    <div className='border border-slate-500 p-4 rounded-xl'>
                                        <FileUpload
                                            onError={FileError}
                                            body={<FileUploadBody />}
                                            overlap={false}
                                            fileValue={files}
                                            onChange={FileChanged}
                                        />
                                        {files.length > 0 && ( 
                                            <div className="w-full border border-slate-500 rounded-xl mt-5 flex flex-wrap gap-0">
                                                {files.map((item) => {
                                                    return (
                                                    <div
                                                        onClick={() => onRemoveImage(item.id)}
                                                        aria-hidden
                                                        key={item.id}
                                                        className='w-1/3 p-3'
                                                    >
                                                        <img
                                                            src={item.preview}
                                                            className="object-cover p-2 rounded-xl bg-slate-800 w-full aspect-square"
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
                    <Button className='mt-8 w-1/2 text-white rounded-full'>Publish Gig</Button>
                </form>
            </Form>
        </div>
    )
}

export default GigPosting
