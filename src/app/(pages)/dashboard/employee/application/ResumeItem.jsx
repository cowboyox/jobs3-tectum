import { Radio } from 'lucide-react';

const ResumeItem = (props) => {
  return (
    <div
      className={`flex gap-2 items-center rounded-2xl border border-[#1b272c] px-[30px] py-5 text-white ${props.selected ? 'bg-[#1b272c]' : 'bg-transparent'}`}
      key={props.key}
    >
      <div className='relative'>
        <p className='absolute -translate-x-1/3 -translate-y-1/2 rounded-[3px] bg-orange px-[12px] py-[1px] text-[14px] font-bold text-white'>
          pdf
        </p>
        <div className='border-1 flex h-14 w-14 items-center justify-center rounded-full border bg-[#10191d]'>
          <img alt='pdf' src='/assets/images/icons/folder.svg' />
        </div>
      </div>
      <div className='flex w-full flex-col gap-2'>
        <p>{props.resume.name}</p>
        <p className='text-[#96B0BD]'>Last used on {new Date(props.resume.lastUsetTime).toLocaleDateString()}</p>
      </div>
      <div className='flex items-center gap-4'>
        <img
          className='h-6 w-6 cursor-pointer'
          //   onClick={() => setEditPrice(true)}
          src='/assets/images/icons/download-line.svg'
        />
        <div className='h-8 border border-l-[1px] border-r-0 border-[#28373e]' />
        {props.selected ? (
          <div className='h-6 max-h-6 w-6 min-w-6 rounded-full border-8 border-[#e0f0f9] bg-transparent' onClick={() => props.setSelected(props.resume.id)} />
        ) : (
          <div className='box-border h-6 max-h-6 w-6 min-w-6 rounded-full border border-[#e0f0f9] bg-transparent' onClick={() => props.setSelected(props.resume.id)} />
        )}
      </div>
    </div>
  );
};

export default ResumeItem;
