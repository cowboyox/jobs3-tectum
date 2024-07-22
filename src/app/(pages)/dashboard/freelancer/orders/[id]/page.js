'use client';
import { AnchorProvider, getProvider, Program, setProvider, utils } from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiCircleQuestion } from 'react-icons/ci';
import { FaAngleDown, FaPlus } from 'react-icons/fa6';
import { GoCircle } from 'react-icons/go';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiLineVerticalLight } from 'react-icons/pi';

import DropFile from '@/components/elements/dropFile';
import PanelContainer from '@/components/elements/panel';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/ContextProvider';
import { useGetClientGigContractById } from '@/hooks/useGetClientGigContractById';
import IDL from '@/idl/gig_basic_contract.json';
import api from '@/utils/api';
import {
  ADMIN_ADDRESS,
  CONTRACT_SEED,
  ContractStatus,
  PAYTOKEN_MINT,
  PROGRAM_ID,
} from '@/utils/constants';

const MessagesArea = () => {
  const auth = useCustomContext();

  return (
    <PanelContainer>
      <div className='flex flex-col gap-4'>
        <div className='space-between flex'>
          <div className='flex w-1/2 gap-5 mobile:w-7/12 mobile:gap-2'>
            <img
              className='aspect-square h-12 w-12 rounded-full object-cover mobile:h-8 mobile:w-8'
              src={
                auth?.currentProfile?.avatarURL
                  ? auth?.currentProfile?.avatarURL
                  : '/assets/images/users/user-1.png'
              }
            />
            <div className='flex cursor-pointer items-center gap-2 mobile:gap-1'>
              <span className='text-base mobile:text-xs'>Use a quick response</span>
              <FaAngleDown />
            </div>
          </div>
          <div className='flex w-1/2 items-center justify-end gap-3 mobile:w-5/12'>
            <span className='text-base text-[#96B0BD] mobile:text-xs'>Local time:</span>
            <span className='text-base text-white mobile:text-xs'>4:25 pm</span>
          </div>
        </div>
        <textarea
          className='h-80 rounded-2xl border border-[#526872] bg-transparent p-5 text-white'
          placeholder='Type your message here...'
        />
        <div className='flex gap-3 rounded-2xl bg-[#1B272C] p-2'>
          <div className='w-full cursor-pointer rounded-2xl py-5 text-center text-white transition hover:bg-white hover:text-black mobile:py-3'>
            Back
          </div>
          <div className='w-full cursor-pointer rounded-2xl bg-[#DC4F13] py-5 text-center text-white mobile:py-3'>
            Send
          </div>
        </div>
      </div>
    </PanelContainer>
  );
};
const OrderPage = ({ params }) => {
  const { data: contractRawData, refetch: refetchClientGigContractById } =
    useGetClientGigContractById(params.id);
  const contractInfo = contractRawData?.data?.data;

  const startDateString = contractInfo?.contractStartDate;
  const date = new Date(startDateString);
  const options = {
    day: 'numeric',
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formattedStartDate = date.toLocaleString('en-US', options); // Output: "Jun 26, 2024, 5:23 PM"

  const form = useForm();
  const wallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { toast } = useToast();

  const [program, setProgram] = useState();

  useEffect(() => {
    if (wallet) {
      (async function () {
        let provider;
        try {
          provider = getProvider();
        } catch {
          provider = new AnchorProvider(connection, wallet, {});
          setProvider(provider);
        }

        try {
          const program = new Program(IDL, PROGRAM_ID);
          setProgram(program);

          console.log('programId', program.programId, program);
        } catch (err) {}
      })();
    }
  }, [wallet, connection]);

  const onActivate = async (id, contractId) => {
    if (!wallet || !program) {
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Please connect your wallet!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
      return;
    }

    try {
      const [contract, bump] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from(utils.bytes.utf8.encode(CONTRACT_SEED)),
          Buffer.from(utils.bytes.utf8.encode(contractId)),
        ],
        program.programId
      );

      const sellerAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, wallet?.publicKey);

      // Get the token balance
      const info = await connection.getTokenAccountBalance(sellerAta);

      if (info.value.uiAmount < 0.5) {
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>{`You don't have enough token. Need at least 0.5 USDC!`}</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
        return;
      }

      const contractAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, contract, true);

      const transaction = await program.methods
        .activateContract(contractId)
        .accounts({
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          contract,
          contractAta,
          seller: wallet.publicKey,
          sellerAta,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .transaction();

      const signature = await sendTransaction(transaction, connection, { skipPreflight: true });

      console.log('Your transaction signature for activating the contract', signature);

      await connection.confirmTransaction(signature, 'confirmed');

      await api.put(`/api/v1/client_gig/activate-contract/${id}`);

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully activated the contract!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });

      await refetchClientGigContractById();
    } catch (err) {
      console.error('Error corrupted during applying gig', err);

      if (err.message == 'User rejected the request.') {
        // In this case, don't need to show error toast.
        return;
      }

      if (
        err.message == 'failed to get token account balance: Invalid param: could not find account'
      ) {
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>You should have USDC in your wallet!</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });

        return;
      }

      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  const onDeliver = async (id) => {
    try {
      await api.put(`/api/v1/client_gig/deliver-contract/${id}`);

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully delivered the gig!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });

      await refetchClientGigContractById();
    } catch (err) {
      console.error('Error corrupted during delivering gig', err);

      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  const onComplete = async (id, contractId) => {
    if (!wallet || !program) {
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Please connect your wallet!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
      return;
    }

    try {
      const [contract, bump] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from(utils.bytes.utf8.encode(CONTRACT_SEED)),
          Buffer.from(utils.bytes.utf8.encode(contractId)),
        ],
        program.programId
      );

      const sellerAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, wallet?.publicKey);

      const contractAccount = await program.account.contract.fetch(contract);

      const buyerAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, contractAccount.buyer);

      const adminAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, ADMIN_ADDRESS);

      const contractAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, contract, true);

      const transaction = await program.methods
        .sellerApprove(contractId, false)
        .accounts({
          adminAta,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          buyerAta,
          contract,
          contractAta,
          seller: wallet.publicKey,
          sellerAta,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .transaction();

      const signature = await sendTransaction(transaction, connection, { skipPreflight: true });

      console.log('Your transaction signature for approving the contract', signature);

      await connection.confirmTransaction(signature, 'confirmed');

      await api.put(`/api/v1/client_gig/complete-contract/${id}`);

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully completed the contract!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });

      await refetchClientGigContractById();
    } catch (err) {
      console.error('Error corrupted during completing gig', err);

      if (err.message == 'User rejected the request.') {
        // In this case, don't need to show error toast.
        return;
      }

      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  return (
    <Tabs className='flex w-full flex-col gap-6' defaultValue='details'>
      <TabsList className='h-auto w-full bg-transparent p-0'>
        <TabsTrigger
          className='w-full border-b-4 border-[#516170] bg-transparent py-6 text-base data-[state=active]:border-[#dc4f14]'
          value='details'
        >
          Details
        </TabsTrigger>
        <TabsTrigger
          className='w-full border-b-4 border-[#516170] bg-transparent py-6 text-base data-[state=active]:border-[#dc4f14]'
          value='requirements'
        >
          Requirements
        </TabsTrigger>
      </TabsList>
      <div className='flex gap-8 mobile:flex-col'>
        <div className='w-8/12 mobile:w-full'>
          <TabsContent className='w-full' value='details'>
            <div className='flex w-full flex-col gap-5'>
              <PanelContainer>
                <div className='flex items-center justify-between text-[24px] text-white mobile:text-xl'>
                  <div>{contractInfo?.clientGig?.gigTitle}</div>
                  <div>
                    {contractInfo?.status == ContractStatus.STARTED && (
                      <button
                        className='bg-[#DC4F13] p-2 px-4 text-sm md:p-3'
                        onClick={() => onActivate(contractInfo._id, contractInfo.contractId)}
                      >
                        Activate
                      </button>
                    )}
                    {contractInfo?.status == ContractStatus.ACTIVE && (
                      <button
                        className='bg-green-500 p-2 px-4 text-sm md:p-3'
                        onClick={() => onDeliver(contractInfo._id)}
                      >
                        Deliver
                      </button>
                    )}
                    {contractInfo?.status == ContractStatus.DELIVERED && (
                      <button
                        className='bg-green-500 p-2 px-4 text-sm md:p-3'
                        // onClick={() => onActivate(order.id, order.contractId)}
                      >
                        Request Payment
                      </button>
                    )}
                    {contractInfo?.status == ContractStatus.RELEASED && (
                      <button
                        className='bg-green-500 p-2 px-4 text-sm md:p-3'
                        onClick={() => onComplete(contractInfo._id, contractInfo.contractId)}
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
                <div className='flex w-full items-center gap-2 md:w-3/4 md:gap-5'>
                  <div className='relative h-12 w-12 mobile:h-8 mobile:w-8'>
                    <img
                      className='aspect-square h-12 w-12 rounded-full object-cover mobile:h-8 mobile:w-8'
                      src={
                        contractInfo?.gigOwner?.avatarURL
                          ? contractInfo?.gigOwner?.avatarURL
                          : '/assets/images/users/user-3.png'
                      }
                    />
                    <div className='absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 mobile:bottom-0 mobile:right-0 mobile:h-3 mobile:w-3' />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                      <h2 className='text-xl mobile:text-xs'>{contractInfo?.gigOwner?.fullName}</h2>
                      <img
                        className='h-4 w-4 mobile:h-3 mobile:w-3'
                        src='/assets/images/icons/checkmark.svg'
                      />
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <IoCalendarOutline className='h-5 w-5 fill-[#96B0BD] stroke-[#96B0BD] mobile:h-3 mobile:w-3' />
                    <p className='text-[15px] text-[#96B0BD] mobile:text-xs'>
                      {formattedStartDate}
                    </p>
                  </div>
                </div>
                <PanelContainer nested={true}>
                  <div className='space-between flex items-center gap-4'>
                    <span className='text-base text-[#96B0BD] mobile:text-xs'>Order number</span>
                    <span className='text-base font-bold text-white mobile:text-xs'>
                      #{params.id}
                    </span>
                    <div className='ml-auto rounded-xl border border-[#1BBF36] px-2 py-1 text-sm text-[#1BBF36] mobile:text-xs'>
                      {contractInfo?.status}
                    </div>
                  </div>
                </PanelContainer>
                <PanelContainer nested={true}>
                  <div className='flex flex-col gap-5'>
                    <div className='flex'>
                      <div className='w-8/12'>
                        <div className='flex flex-col gap-2'>
                          <span className='text-base text-[#96B0BD] mobile:text-xs'>Item</span>
                          <span className='text-base font-bold text-white mobile:text-xs'>
                            Design UI/UX design for your mobile apps
                          </span>
                        </div>
                      </div>
                      <div className='w-2/12'>
                        <div className='flex flex-col gap-2'>
                          <span className='text-base text-[#96B0BD] mobile:text-xs'>Duration</span>
                          <span className='text-base font-bold text-white mobile:text-xs'>
                            2 days
                          </span>
                        </div>
                      </div>
                      <div className='w-2/12'>
                        <div className='flex flex-col items-end gap-2'>
                          <span className='text-base text-[#96B0BD] mobile:text-xs'>Price</span>
                          <span className='text-base font-bold text-white mobile:text-xs'>
                            ${contractInfo?.clientGig?.gigPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='w-full border-t border-[#28373E]' />
                    <div className='flex justify-between rounded-xl bg-[#10191D] p-4'>
                      <span className='text-base font-bold text-white'>Total</span>
                      <span className='text-base font-bold text-white'>
                        ${contractInfo?.clientGig?.gigPrice}
                      </span>
                    </div>
                  </div>
                </PanelContainer>
              </PanelContainer>
              <div className='mobile:hidden'>
                <MessagesArea />
              </div>
            </div>
          </TabsContent>
          <TabsContent value='requirements'>
            <Form {...form}>
              <form>
                <PanelContainer>
                  <span className='text-2xl font-bold text-white mobile:text-xl mobile:font-normal'>
                    Brief about the project
                  </span>
                  <textarea className='h-80 rounded-2xl border border-[#526872] bg-transparent p-5 text-white' />
                  <div className='mt-5 text-3xl text-[#F5F5F5] mobile:text-xl'>
                    Drag and drop your files here or
                    <span className='main_color'> browse</span> to upload
                  </div>
                  <div className='text-base text-[#96B0BD]'>
                    Format: JPEG, JPG, PNG, GIF, MP4, AVI. Max size per image/video: 50MB
                  </div>
                  <DropFile
                    acceptOnly='image'
                    className='aspect-video'
                    inputName='order_attachment'
                    placeHolderPlusIconSize={80}
                  />
                </PanelContainer>
              </form>
            </Form>
          </TabsContent>
        </div>
        <div className='flex w-4/12 flex-col gap-5 mobile:w-full'>
          <PanelContainer>
            <span className='text-xl font-bold text-white'>Time left</span>
            <div className='flex gap-2'>
              <div className='flex w-full flex-col items-center gap-1 rounded-2xl bg-[#1B272C] py-2'>
                <span className='text-sm text-[#96B0BD]'>Days</span>
                <span className='text-xl font-bold text-white'>01</span>
              </div>
              <div className='flex w-full flex-col items-center gap-1 rounded-2xl bg-[#1B272C] py-2'>
                <span className='text-sm text-[#96B0BD]'>Hours</span>
                <span className='text-xl font-bold text-white'>11</span>
              </div>
              <div className='flex w-full flex-col items-center gap-1 rounded-2xl bg-[#1B272C] py-2'>
                <span className='text-sm text-[#96B0BD]'>Minutes</span>
                <span className='text-xl font-bold text-white'>06</span>
              </div>
              <div className='flex w-full flex-col items-center gap-1 rounded-2xl bg-[#1B272C] py-2'>
                <span className='text-sm text-[#96B0BD]'>Seconds</span>
                <span className='text-xl font-bold text-white'>52</span>
              </div>
            </div>
          </PanelContainer>
          <PanelContainer>
            <div className='flex flex-col gap-5'>
              <span className='text-xl font-bold text-white'>Track Order</span>
              <div className='flex items-center gap-3'>
                <IoIosCheckmarkCircle fill='#DC4F13' size={30} />
                <span className='text-base font-bold text-[#96B0BD]'>Order Placed</span>
              </div>
              <PiLineVerticalLight className='-my-3' fill='#DC4F13' size={30} />
              <div className='flex items-center gap-3'>
                <GoCircle fill='#DC4F13' size={30} />
                <span className='text-base font-bold text-[#F5F5F5]'>Submit requirements</span>
              </div>
            </div>
          </PanelContainer>
          <PanelContainer>
            <div className='flex justify-between'>
              <span className='text-lg font-bold text-white'>Private Note</span>
              <div className='flex cursor-pointer items-center gap-2'>
                <FaPlus fill='#DC4F13' size={15} />
                <span className='text-[#DC4F13]'>Add Note</span>
              </div>
            </div>
            <span className='-mt-2 text-base text-[#96B0BD]'>Only visible to you</span>
          </PanelContainer>
          <PanelContainer>
            <span className='text-lg font-bold text-white'>Support</span>
            <div className='flex gap-3 border-b border-[#1B272C] pb-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#1B272C]'>
                <CiCircleQuestion fill='#8599A5' size={25} />
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-bold text-white'>FAQs</span>
                <span className='text-base text-[#96B0BD]'>Find needed answers</span>
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#1B272C]'>
                <CiCircleQuestion fill='#8599A5' size={25} />
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-bold text-white'>Resolution Center</span>
                <span className='text-base text-[#96B0BD]'>Find needed answers</span>
              </div>
            </div>
          </PanelContainer>
        </div>
        <div className='md:hidden'>
          <MessagesArea />
        </div>
      </div>
    </Tabs>
  );
};

export default OrderPage;
