import React from 'react';
import PanelContainer from '@/components/elements/panel'

const disputesData = [
  { id: "ID#5347357834", date: "2023-04-01", amount: "$1,200" },
  { id: "ID#5347357835", date: "2023-04-02", amount: "$2,300" },
  { id: "ID#5347357836", date: "2023-04-03", amount: "$3,400" },
  { id: "ID#5347357837", date: "2023-04-04", amount: "$4,500" },
];
const closedCasesData = [];
const DisputeRow = ({ dispute }) => {
  return (
    <div className='flex flex-col gap-3 border-t border-[#1B272C] py-4'>
      <div className='flex gap-3'>
        <div className="flex flex-col gap-2 w-full mobile:w-1/2"> 
          <div className='text-[#F5F5F5] text-lg font-semibold mobile:hidden'>Dispute Case For Contract ID#</div>
          <div className='text-[#96B0BD] text-base mobile:text-xs'>{dispute.id}</div>
        </div>
        <div className="flex flex-col gap-2 w-1/3 mobile:w-1/4"> 
          <div className='text-[#F5F5F5] text-lg font-semibold mobile:hidden'>Date</div>
          <div className='text-[#96B0BD] text-base mobile:text-xs'>{dispute.date}</div>
        </div>
        <div className="flex flex-col gap-2 w-1/3 mobile:w-1/4"> 
          <div className='text-[#F5F5F5] text-lg font-semibold mobile:hidden text-right'>Amount</div>
          <div className='text-[#96B0BD] text-base mobile:text-xs text-right'>{dispute.amount}</div>
        </div>
      </div>
    </div>
  )
}
const EmptyMessage = ({ message }) => {
  return (
    <div className='text-[#96B0BD] text-center py-8 border-t border-[#1B272C] text-base'>{message}</div>
  )
}

const Disputes = () => {
  return (
    <div className='flex min-h-screen w-full flex-col gap-10 items-center py-10'>
      <PanelContainer>
        <div className='text-[#F5F5F5] text-2xl font-semibold mb-2'>Open</div>
        <div className='flex flex-col'>
          {disputesData.length > 0 && (
            <div className='flex gap-3 md:hidden'>
              <div className="flex flex-col gap-2 w-full mobile:w-1/2"> 
                <div className='text-[#F5F5F5] text-lg font-semibold mobile:text-xs'>Dispute Case For Contract ID#</div> 
              </div>
              <div className="flex flex-col gap-2 w-1/4"> 
                <div className='text-[#F5F5F5] text-lg font-semibold mobile:text-xs'>Date</div> 
              </div>
              <div className="flex flex-col gap-2 w-1/4"> 
                <div className='text-[#F5F5F5] text-lg font-semibold mobile:text-xs text-right'>Amount</div> 
              </div>
            </div>
          )}
          {disputesData.length > 0 ? (
            disputesData.map((dispute, index) => (
              <DisputeRow key={index} dispute={dispute} />
            ))
          ) : (
            <EmptyMessage message='No open disputes available.' />
          )}
        </div>
      </PanelContainer>
      <PanelContainer>
        <div className="flex flex-col gap-3">
          <p className="text-base mobile:text-sm">
            <span className='main_color'>I must explain to you how all this mistaken idea</span> of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
          </p>
          <p className="text-base mobile:text-sm">
            I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
          </p>
        </div>
      </PanelContainer>
      <PanelContainer>
        <div className='text-[#F5F5F5] text-2xl font-semibold mb-2'>Closed Cases</div>
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            {closedCasesData.length > 0 && (
              <div className='flex gap-3 md:hidden'>
                <div className="flex flex-col gap-2 w-full mobile:w-1/2"> 
                  <div className='text-[#F5F5F5] text-lg font-semibold mobile:text-xs'>Dispute Case For Contract ID#</div> 
                </div>
                <div className="flex flex-col gap-2 w-1/4"> 
                  <div className='text-[#F5F5F5] text-lg font-semibold mobile:text-xs'>Date</div> 
                </div>
                <div className="flex flex-col gap-2 w-1/4"> 
                  <div className='text-[#F5F5F5] text-lg font-semibold mobile:text-xs text-right'>Amount</div> 
                </div>
              </div>
            )}
            {closedCasesData.length > 0 ? (
              closedCasesData.map((dispute, index) => (
                <DisputeRow key={index} dispute={dispute} />
              ))
            ) : (
              <EmptyMessage message='No closed disputes available.' />
            )}
          </div>
        </div>
      </PanelContainer>
    </div>
  )
}

export default Disputes
