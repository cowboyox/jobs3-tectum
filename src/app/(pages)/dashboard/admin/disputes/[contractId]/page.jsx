'use client';
import React from 'react';

// const Status = ({ status }) => {
//   const getStatusStyles = () => {
//     switch (status) {
//       case 0:
//         return 'border-green-500 text-green-500';
//       case 'declined':
//         return 'border-red-500 text-red-500';
//       default:
//         return 'border-gray-500 text-gray-500';
//     }
//   };

//   const getStatusContent = () => {
//     switch (status) {
//       case 0:
//         return 'Alive';
//       case 1:
//         return 'Hired';
//       case 2:
//         return 'Ended';
//     }
//   };

//   return (
//     <div className={`rounded border px-2 py-1 text-sm capitalize ${getStatusStyles()}`}>
//       {getStatusContent(status)}
//     </div>
//   );
// };
// const GigCard = ({ gig }) => {
//   return (
//     <div className='cursor-pointer border-t-2 bg-[#10191d] py-7 mobile:flex-col-reverse mobile:gap-3 mobile:py-3'>
//       <div className='flex items-center justify-between gap-1'>
//         <div>
//           <h3 className='mb-2 text-lg text-white'>Dispute Case For Contract Id#</h3>
//           <p className='text-slate-500'>#23532523532</p>
//         </div>
//         <div>
//           <h3 className='mb-2 text-lg text-white'>Date</h3>
//           <p className='text-slate-500'>6/22, 2024</p>
//         </div>
//         <div>
//           <h3 className='mb-2 text-lg text-white'>Amount</h3>
//           <p className='text-slate-500'>$780</p>
//         </div>
//       </div>
//     </div>
//   );
// };

const DisputeDetail = () => {
  // const params = useParams();

  // const [myGigs, setMyGigs] = useState([]);
  // useEffect(() => {
  //   api.get(`/api/v1/client_gig/get-gig-by-userId`).then((data) => {
  //     setMyGigs(data.data.data);
  //   });
  // }, []);

  return (
    <div className='flex justify-between gap-2'>
      <div className='mb-4 w-[60%] rounded-xl bg-[#10191d] p-7 mobile:gap-3 mobile:p-3'>
        <div className='mb-5 flex'>
          <h1 className='text-xl text-white'>Dispute Detail</h1>
        </div>
        <div className='mb-5 border-t-2 bg-[#10191d] py-7 mobile:flex-col-reverse mobile:gap-3 mobile:py-3'>
          <div className='flex items-center justify-between gap-1'>
            <div>
              <h3 className='mb-2 text-lg text-slate-500'>Git Title</h3>
              <p className='text-white'>Rust developer</p>
            </div>
            <div>
              <h3 className='mb-2 text-lg text-slate-500'>Buuer username</h3>
              <p className='text-white'>Devon Miles</p>
            </div>
            <div>
              <h3 className='mb-2 text-lg text-slate-500'>Seller username</h3>
              <p className='text-white'>Devon Miles</p>
            </div>
          </div>
        </div>
        <div className='border-t-2 bg-[#10191d] pt-7 mobile:flex-col-reverse mobile:gap-3 mobile:pt-3'>
          <div className='mb-5 flex flex-col'>
            <h1 className='mb-5 text-xl text-white'>Buyer Explanation</h1>
            <textarea
              className='rounded-xl border-2 bg-[#10191d] p-4'
              placeholder='Write your request details...'
              rows={4}
            />
          </div>
          <div className='flex flex-col'>
            <h1 className='mb-5 text-xl text-white'>Seller Explanation</h1>
            <textarea
              className='rounded-xl border-2 bg-[#10191d] p-4'
              placeholder='Write your request details...'
              rows={4}
            />
          </div>
        </div>
      </div>
      <div className='mb-4 w-[40%] rounded-xl bg-[#10191d] p-7 mobile:gap-3 mobile:p-3'>
        <div className='mb-5'>
          <h3 className='mb-2 text-lg text-slate-500'>Buyer dispute fee</h3>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Buyer percentage</h3>
              <p className='text-white'>100%</p>
            </div>
          </div>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Admin percentage</h3>
              <p className='text-white'>0%</p>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <h3 className='mb-2 text-lg text-slate-500'>Seller dispute fee</h3>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Seller percentage</h3>
              <p className='text-white'>50%</p>
            </div>
          </div>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Admin percentage</h3>
              <p className='text-white'>50%</p>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <h3 className='mb-2 text-lg text-slate-500'>Payment</h3>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Buyer percentage</h3>
              <p className='text-white'>100%</p>
            </div>
          </div>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Seller percentage</h3>
              <p className='text-white'>0%</p>
            </div>
          </div>
        </div>
        <div className='mb-5 w-full'>
          <select className='w-full rounded-xl bg-[#10191d] p-2'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div className='w-full'>
          <button className='bg-orange-600 w-full rounded-xl text-white'>Excute Decision</button>
        </div>
      </div>
    </div>
  );
};

export default DisputeDetail;
