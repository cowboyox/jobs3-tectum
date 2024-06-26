'use client';

import React, { useEffect, useState } from 'react';
import { FaEllipsis, FaX } from 'react-icons/fa6';

import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  Program,
  AnchorProvider,
  setProvider,
  getProvider,
  Idl,
  utils,
  BN,
  Provider,
} from "@project-serum/anchor";
import { Keypair, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";

import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { v4 as uuid } from "uuid";
import IDL from "@/idl/gig_basic_contract.json";
import {
  PROGRAM_ID,
  ADMIN_ADDRESS,
  CONTRACT_SEED,
  PAYTOKEN_MINT,
  DECIMALS,
} from "@/utils/constants";

import searchOptions from '../freelancers/searchOptions';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/seperator';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import { useGetAllClientGigsProposed } from '@/hooks/useGetAllClientGigsProposed';
import api from '@/utils/api';

const Orders = () => {
  const auth = useCustomContext();

  const wallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [program, setProgram] = useState();
  const filterCategory = ['Active', 'Paused', 'Completed', 'Cancelled'];
  const [searchType, setSearchType] = useState('normal');
  const [isSmallScreen, setIsSmallScree] = useState(false);
  const [mode, setMode] = useState('live');
  const { data: gigs, refetch: refetchAllGigsProposed } = useGetAllClientGigsProposed(
    auth?.currentProfile?._id
  );
  const { toast } = useToast();
  const [searchKeywords, setSearchKeyWords] = useState('');
  const [filteredLiveList, setFilteredLiveList] = useState([]);
  const [filteredProposalsList, setFilteredProposalsList] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScree(true);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsSmallScree(false);
      } else {
        setIsSmallScree(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (gigs) {
      setFilteredLiveList(gigs.lives);
      setFilteredProposalsList(gigs.proposals);
    }
  }, [gigs]);

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

          console.log("programId", program.programId, program)
        } catch (err) {}
      })();
    }
  }, [wallet]);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);

    // Get abbreviated month name
    const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

    // Get day with leading zero if needed
    const day = date.getUTCDate().toString().padStart(2, '0');

    // Formatted date string
    const formattedDate = `${monthAbbreviation} ${day}`;
    return formattedDate;
  };

  const onAccept = async (gigId, freelancerId, gigPrice, sellerPubkey) => {
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

    if (!sellerPubkey) {
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>No seller's pubkey provided!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
      return;
    }

    try {
      const seller = new PublicKey(sellerPubkey);
      const contractId = uuid().slice(0, 8);
      const amount = new BN(gigPrice * Math.pow(10, 6));
      const dispute = new BN(0.5 * Math.pow(10, 6));
      const deadline = Math.floor(Date.now() / 1000) + (10 * 24 * 60 * 60); 

      const [contract, bump] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from(utils.bytes.utf8.encode(CONTRACT_SEED)),
          Buffer.from(utils.bytes.utf8.encode(contractId)),
        ],
        program.programId
      );

      const buyerAta = getAssociatedTokenAddressSync(
        PAYTOKEN_MINT,
        wallet?.publicKey,
      );

      // Get the token balance
      const info = await connection.getTokenAccountBalance(buyerAta);

      if (info.value.uiAmount < Number(gigPrice)) {
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>{`You don't have enough token. Need at least ${gigPrice} USDC!`}</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
        return;
      }
      
      const contractAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, contract, true);

      const transaction = await program.methods
        .startContract(contractId, amount, dispute, deadline)
        .accounts({
          buyer: wallet.publicKey,
          contract,
          seller,
          payTokenMint: PAYTOKEN_MINT,
          buyerAta,
          contractAta,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .transaction();
      console.log(transaction, connection)

      const signature = await sendTransaction(transaction, connection, { skipPreflight: true });

      console.log("Your transaction signature for creating a new contract", signature);

      await connection.confirmTransaction(signature, "confirmed");


      await api.put(`/api/v1/client_gig/accept_freelancer/${gigId}`, JSON.stringify({ freelancerId, contractId }));
  
      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully accepted!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });

      await refetchAllGigsProposed();
    } catch (err) {
      console.error('Error corrupted during applying gig', err);
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  const setKey = (e) => {
    setSearchKeyWords(e.target.value);
    if (searchType == 'normal') {
      if (mode === 'live') {
        const filtered = gigs.lives.filter(
          (gig) =>
            gig.creator.fullName?.toLowerCase().includes(e.target.value.toLowerCase()) ||
            gig.gigDescription?.toLowerCase().includes(e.target.value.toLowerCase()) ||
            gig.gigPostDate?.toLowerCase().includes(e.target.value.toLowerCase()) ||
            gig.gigPrice?.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
            gig.gigTitle?.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredLiveList(filtered);
      } else {
        const filtered = gigs.proposals.filter(
          (gig) =>
            gig.creator.fullName?.toLowerCase().includes(e.target.value.toLowerCase()) ||
            gig.gigDescription?.toLowerCase().includes(e.target.value.toLowerCase()) ||
            gig.gigPostDate?.toLowerCase().includes(e.target.value.toLowerCase()) ||
            gig.gigPrice?.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
            gig.gigTitle?.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredProposalsList(filtered);
      }
    }
  };

  const aiSearch = () => {
    api.get(`/api/v1/freelancer_gig/ai-search/${searchKeywords}`).then((data) => {
      let ai_ids = [];
      if (data.data.profileIDs) ai_ids = data.data.profileIDs;
      if (mode === 'live') {
        const ai_filtered = ai_ids
          .map((id) => gigs.lives.find((gig) => gig.gigId.toString() === id))
          .filter((gig) => gig != undefined);
        setFilteredLiveList(ai_filtered);
      } else {
        const ai_filtered = ai_ids
          .map((id) => gigs.proposals.find((gig) => gig.gigId.toString() === id))
          .filter((gig) => gig != undefined);
        setFilteredProposalsList(ai_filtered);
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
      aiSearch();
    }
  };

  const onChangeType = (e) => {
    setSearchType(e);
  };

  return (
    <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
      <div className='flex flex-row items-center justify-between gap-5 rounded-xl bg-[#10191D] p-3'>
        <div className='flex items-center flex-1 gap-3 ml-3'>
          <Select defaultValue='normal' onValueChange={(e) => onChangeType(e)}>
            <SelectTrigger className='w-20 rounded-xl bg-[#1B272C] mobile:w-14 mobile:p-2'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='rounded-xl bg-[#1B272C]'>
              <SelectGroup>
                <SelectItem value='normal'>{searchOptions[0].icon}</SelectItem>
                <SelectItem value='ai'>{searchOptions[1].icon}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input
            className='w-full bg-transparent outline-none'
            onChange={(e) => setKey(e)}
            onKeyDown={handleKeyDown}
            placeholder={isSmallScreen ? '' : 'Search by Order title...'}
          />
          {isSmallScreen && (
            <button>
              <svg
                fill='none'
                height='24'
                viewBox='0 0 25 24'
                width='25'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12.1962 13.4299C13.9193 13.4299 15.3162 12.0331 15.3162 10.3099C15.3162 8.58681 13.9193 7.18994 12.1962 7.18994C10.473 7.18994 9.07617 8.58681 9.07617 10.3099C9.07617 12.0331 10.473 13.4299 12.1962 13.4299Z'
                  stroke='#96B0BD'
                  stroke-width='1.5'
                />
                <path
                  d='M3.816 8.49C5.786 -0.169998 18.616 -0.159997 20.576 8.5C21.726 13.58 18.566 17.88 15.796 20.54C13.786 22.48 10.606 22.48 8.586 20.54C5.826 17.88 2.666 13.57 3.816 8.49Z'
                  stroke='#96B0BD'
                  stroke-width='1.5'
                />
              </svg>
            </button>
          )}
        </div>
        <div className='flex flex-row items-center flex-none gap-2'>
          <button className='flex flex-row items-center justify-center gap-3'>
            {!isSmallScreen ? (
              <>
                <svg
                  fill='none'
                  height='24'
                  viewBox='0 0 25 24'
                  width='25'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22.2119 6.58594H16.3057'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M6.46191 6.58594H2.52441'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M10.3994 10.0312C12.3022 10.0312 13.8447 8.48873 13.8447 6.58594C13.8447 4.68314 12.3022 3.14062 10.3994 3.14062C8.49662 3.14062 6.9541 4.68314 6.9541 6.58594C6.9541 8.48873 8.49662 10.0312 10.3994 10.0312Z'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M22.2119 17.4141H18.2744'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M8.43066 17.4141H2.52441'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M14.3369 20.8594C16.2397 20.8594 17.7822 19.3169 17.7822 17.4141C17.7822 15.5113 16.2397 13.9688 14.3369 13.9688C12.4341 13.9688 10.8916 15.5113 10.8916 17.4141C10.8916 19.3169 12.4341 20.8594 14.3369 20.8594Z'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                </svg>
                Filter
              </>
            ) : (
              <svg
                fill='none'
                height='24'
                viewBox='0 0 25 24'
                width='25'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M22.1719 6.58594H16.2656'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <path
                  d='M6.42188 6.58594H2.48438'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <path
                  d='M10.3594 10.0312C12.2622 10.0312 13.8047 8.48873 13.8047 6.58594C13.8047 4.68314 12.2622 3.14062 10.3594 3.14062C8.45658 3.14062 6.91406 4.68314 6.91406 6.58594C6.91406 8.48873 8.45658 10.0312 10.3594 10.0312Z'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <path
                  d='M22.1719 17.4141H18.2344'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <path
                  d='M8.39062 17.4141H2.48438'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <path
                  d='M14.2969 20.8594C16.1997 20.8594 17.7422 19.3169 17.7422 17.4141C17.7422 15.5113 16.1997 13.9688 14.2969 13.9688C12.3941 13.9688 10.8516 15.5113 10.8516 17.4141C10.8516 19.3169 12.3941 20.8594 14.2969 20.8594Z'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <circle cx='18.2344' cy='5.10938' fill='#DC4F13' r='4.92188' />
              </svg>
            )}
          </button>
          {!isSmallScreen && (
            <div className='flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#DC4F13] text-center align-middle'>
              4
            </div>
          )}
        </div>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Sort by</div>
          <div>
            <Select>
              <SelectTrigger className='flex justify-center border-none bg-transparent text-[#96B0BD] focus:border-none focus:outline-none'>
                <SelectValue placeholder='Sort By' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value='date'>Date</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {mode == 'live' ? (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{filteredLiveList.length}</span>{' '}
          Orders😊
        </div>
      ) : (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{filteredProposalsList.length}</span>{' '}
          Proposals😊
        </div>
      )}
      <div className='mt-4 flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
        {filterCategory.map((item, index) => {
          return (
            <span
              className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
              key={index}
            >
              <FaX className='rounded-full bg-[#3E525B] p-[2px]' />
              {item}
            </span>
          );
        })}
        <span>Clear&nbsp;All</span>
      </div>
      <div className='flex items-center justify-center w-full pt-10 pb-5'>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'live' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('live')}
        >
          {mode == 'live' ? (
            <h1>
              <span className='inline-block w-6 h-6 rounded-full bg-orange'>
                {gigs ? gigs.lives.length : ''}
              </span>
              &nbsp; Live
            </h1>
          ) : (
            <h1>Live</h1>
          )}
        </div>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'proposal' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('proposal')}
        >
          {mode == 'proposal' ? (
            <h1>
              <span className='inline-block w-6 h-6 rounded-full bg-orange'>
                {gigs ? gigs.proposals.length : ''}
              </span>
              &nbsp; Proposals
            </h1>
          ) : (
            <h1>Proposals</h1>
          )}
        </div>
      </div>
      {mode == 'live' ? (
        <>
          {filteredLiveList.length > 0 ? (
            <>
              {filteredLiveList.map((order, index) => {
                return (
                  <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center' key={index}>
                    <div className='flex flex-col-reverse items-start justify-between mt-1 md:flex-row md:items-center'>
                      <div className='mt-3 flex-1 text-left text-[20px] md:mt-0 md:text-2xl'>
                        {order.gigTitle}
                      </div>
                      <div className='flex flex-row items-center justify-between flex-none gap-2 mobile:w-full'>
                        <div className='flex gap-2'>
                          <div className='rounded-xl border border-[#F7AE20] p-1 px-3 text-[#F7AE20]'>
                            15 H: 30 S
                          </div>
                          <div className='rounded-xl border border-[#1BBF36] p-1 px-3 text-[#1BBF36]'>
                            Active
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className='bg-transparent border-none hover:bg-transparent'
                              variant='outline'
                            >
                              <FaEllipsis />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='rounded-xl border-[#3E525B] bg-[#28373E]'>
                            <DropdownMenuCheckboxItem
                              // checked={showStatusBar}
                              // onCheckedChange={setShowStatusBar}
                              className='gap-2 rounded-xl hover:bg-white'
                            >
                              <svg
                                fill='none'
                                height='24'
                                viewBox='0 0 24 24'
                                width='24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M12 9V14'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M12.0004 21.4098H5.94042C2.47042 21.4098 1.02042 18.9298 2.70042 15.8998L5.82042 10.2798L8.76042 4.99979C10.5404 1.78979 13.4604 1.78979 15.2404 4.99979L18.1804 10.2898L21.3004 15.9098C22.9804 18.9398 21.5204 21.4198 18.0604 21.4198H12.0004V21.4098Z'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M11.9941 17H12.0031'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                              </svg>
                              Report
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showActivityBar}
                              // onCheckedChange={setShowActivityBar}
                              className='gap-2 mt-1 rounded-xl hover:bg-white'
                            >
                              <svg
                                fill='none'
                                height='24'
                                viewBox='0 0 24 24'
                                width='24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M22 9V15C22 15.22 22 15.44 21.98 15.65C21.16 14.64 19.91 14 18.5 14C17.44 14 16.46 14.37 15.69 14.99C14.65 15.81 14 17.08 14 18.5C14 19.91 14.64 21.16 15.65 21.98C15.44 22 15.22 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M2.51953 7.10986H21.4796'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M8.51953 2.10986V6.96985'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M15.4795 2.10986V6.5199'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M23 18.5C23 19.85 22.4 21.05 21.47 21.88C20.67 22.57 19.64 23 18.5 23C17.42 23 16.42 22.62 15.65 21.98C14.64 21.16 14 19.91 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-miterlimit='10'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M18.7799 17.0898V18.7798L17.3799 19.6198'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-miterlimit='10'
                                  stroke-width='1.5'
                                />
                              </svg>
                              Extend The Delivery Date
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showPanel}
                              // onCheckedChange={setShowPanel}
                              className='gap-2 mt-1 rounded-xl hover:bg-white'
                            >
                              <svg
                                fill='none'
                                height='24'
                                viewBox='0 0 24 24'
                                width='24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M10.75 14.4302V9.3702C10.75 8.8902 10.55 8.7002 10.04 8.7002H8.75004C8.24004 8.7002 8.04004 8.8902 8.04004 9.3702V14.4302C8.04004 14.9102 8.24004 15.1002 8.75004 15.1002H10.04C10.55 15.1002 10.75 14.9102 10.75 14.4302Z'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M16.0303 14.4302V9.3702C16.0303 8.8902 15.8303 8.7002 15.3203 8.7002H14.0303C13.5203 8.7002 13.3203 8.8902 13.3203 9.3702V14.4302C13.3203 14.9102 13.5203 15.1002 14.0303 15.1002'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                              </svg>
                              Pause The Order
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showPanel}
                              // onCheckedChange={setShowPanel}
                              className='gap-2 mt-1 rounded-xl hover:bg-white'
                            >
                              <svg
                                fill='none'
                                height='24'
                                viewBox='0 0 24 24'
                                width='24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-miterlimit='10'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M18.9004 5L4.90039 19'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-miterlimit='10'
                                  stroke-width='1.5'
                                />
                              </svg>
                              Cancel Order
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className='flex flex-col items-start justify-between gap-3 mt-3 md:flex-row md:justify-start md:gap-6'>
                      <div className='flex flex-row items-center gap-2'>
                        <svg
                          fill='none'
                          height='24'
                          viewBox='0 0 24 24'
                          width='24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M12.0009 13.4299C13.724 13.4299 15.1209 12.0331 15.1209 10.3099C15.1209 8.58681 13.724 7.18994 12.0009 7.18994C10.2777 7.18994 8.88086 8.58681 8.88086 10.3099C8.88086 12.0331 10.2777 13.4299 12.0009 13.4299Z'
                            stroke='#96B0BD'
                            stroke-width='1.5'
                          />
                          <path
                            d='M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z'
                            stroke='#96B0BD'
                            stroke-width='1.5'
                          />
                        </svg>
                        {order.location}
                      </div>
                      <div className='flex gap-2'>
                        <div className='flex flex-row items-center gap-2'>
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                            <path
                              d='M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                            <path
                              d='M9 13.0098H12'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M9 9.00977H12'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M5.99609 13H6.00508'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M5.99609 9H6.00508'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                          </svg>
                          {order.gigPrice}
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                          </svg>
                          {formattedDate(order.gigPostDate)} - Present
                        </div>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    {/* {isSmallScreen && ( */}
                    <div className='text-left text-[#96B0BD]'>{order.gigDescription}</div>
                    {/* )} */}
                    <div className='flex flex-col items-start justify-between mt-3 md:flex-row md:items-center'>
                      <div className='flex flex-row items-center flex-1 gap-3 text-left'>
                        <div>
                          <img height={40} src='/assets/images/Rectangle 273.png' width={40} />
                        </div>
                        <div className='flex flex-col gap-1 text-left'>
                          <div className='flex flex-row items-center gap-1 font-bold'>
                            {order.creator?.fullName}
                            <svg
                              fill='none'
                              height='17'
                              viewBox='0 0 17 17'
                              width='17'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M14.1422 6.03555C14.1585 5.9123 14.167 5.78905 14.167 5.6665C14.167 3.98138 12.649 2.62917 10.9646 2.85796C10.4737 1.98459 9.53874 1.4165 8.50033 1.4165C7.46191 1.4165 6.52691 1.98459 6.03603 2.85796C4.34808 2.62917 2.83366 3.98138 2.83366 5.6665C2.83366 5.78905 2.84216 5.9123 2.85845 6.03555C1.98508 6.52713 1.41699 7.46213 1.41699 8.49984C1.41699 9.53755 1.98508 10.4725 2.85845 10.9641C2.84211 11.0865 2.83383 11.2097 2.83366 11.3332C2.83366 13.0183 4.34808 14.367 6.03603 14.1417C6.52691 15.0151 7.46191 15.5832 8.50033 15.5832C9.53874 15.5832 10.4737 15.0151 10.9646 14.1417C12.649 14.367 14.167 13.0183 14.167 11.3332C14.167 11.2106 14.1585 11.0874 14.1422 10.9641C15.0156 10.4725 15.5837 9.53755 15.5837 8.49984C15.5837 7.46213 15.0156 6.52713 14.1422 6.03555ZM7.76012 11.6278L5.16266 8.99709L6.17133 8.00259L7.77003 9.62184L10.835 6.58025L11.8323 7.58609L7.76012 11.6278Z'
                                fill='#0A75C2'
                              />
                            </svg>
                          </div>
                          <div className='text-left text-[14px] text-[#516170]'>Freelancer</div>
                        </div>
                      </div>
                      <div className='mt-2 flex-none rounded-xl bg-[#1B272C] p-1 md:mt-0'>
                        <button className='p-4 px-8 md:p-5'>Message</button>
                        <button className='bg-[#DC4F13] p-4 px-8 md:p-5'>See Order</button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button className='mt-6 w-full border border-[#28373E] p-3 text-center'>
                Load more +{' '}
              </button>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-full gap-3 py-20'>
              <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
              <p className='text-[18px] text-slate-600'>Live proposals will be here</p>
            </div>
          )}
        </>
      ) : (
        <>
          {filteredProposalsList.length > 0 ? (
            <>
              {filteredProposalsList.map((proposal, index) => {
                return (
                  <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center' key={index}>
                    <div className='flex items-start justify-between mt-1 md:flex-row md:items-center'>
                      <div className='mt-3 flex-1 text-left text-[20px] md:mt-0 md:text-2xl'>
                        {proposal.gigTitle}
                      </div>
                      <div className='flex flex-row items-center flex-none gap-2'>
                        {/* <div className='rounded-xl border border-[#F7AE20] p-1 px-3 text-[#F7AE20]'>
                        15 H: 30 S
                      </div>
                      <div className='rounded-xl border border-[#1BBF36] p-1 px-3 text-[#1BBF36]'>
                        Active
                      </div> */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className='bg-transparent border-none hover:bg-transparent'
                              variant='outline'
                            >
                              <FaEllipsis />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='rounded-xl border-[#3E525B] bg-[#28373E]'>
                            <DropdownMenuCheckboxItem
                              // checked={showStatusBar}
                              // onCheckedChange={setShowStatusBar}
                              className='gap-2 rounded-xl hover:bg-white'
                            >
                              <svg
                                fill='none'
                                height='24'
                                viewBox='0 0 24 24'
                                width='24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M12 9V14'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M12.0004 21.4098H5.94042C2.47042 21.4098 1.02042 18.9298 2.70042 15.8998L5.82042 10.2798L8.76042 4.99979C10.5404 1.78979 13.4604 1.78979 15.2404 4.99979L18.1804 10.2898L21.3004 15.9098C22.9804 18.9398 21.5204 21.4198 18.0604 21.4198H12.0004V21.4098Z'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M11.9941 17H12.0031'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                              </svg>
                              Report
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showActivityBar}
                              // onCheckedChange={setShowActivityBar}
                              className='gap-2 mt-1 rounded-xl hover:bg-white'
                            >
                              <svg
                                fill='none'
                                height='24'
                                viewBox='0 0 24 24'
                                width='24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M22 9V15C22 15.22 22 15.44 21.98 15.65C21.16 14.64 19.91 14 18.5 14C17.44 14 16.46 14.37 15.69 14.99C14.65 15.81 14 17.08 14 18.5C14 19.91 14.64 21.16 15.65 21.98C15.44 22 15.22 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M2.51953 7.10986H21.4796'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M8.51953 2.10986V6.96985'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M15.4795 2.10986V6.5199'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M23 18.5C23 19.85 22.4 21.05 21.47 21.88C20.67 22.57 19.64 23 18.5 23C17.42 23 16.42 22.62 15.65 21.98C14.64 21.16 14 19.91 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-miterlimit='10'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M18.7799 17.0898V18.7798L17.3799 19.6198'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-miterlimit='10'
                                  stroke-width='1.5'
                                />
                              </svg>
                              Extend The Delivery Date
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showPanel}
                              // onCheckedChange={setShowPanel}
                              className='gap-2 mt-1 rounded-xl hover:bg-white'
                            >
                              <svg
                                fill='none'
                                height='24'
                                viewBox='0 0 24 24'
                                width='24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M10.75 14.4302V9.3702C10.75 8.8902 10.55 8.7002 10.04 8.7002H8.75004C8.24004 8.7002 8.04004 8.8902 8.04004 9.3702V14.4302C8.04004 14.9102 8.24004 15.1002 8.75004 15.1002H10.04C10.55 15.1002 10.75 14.9102 10.75 14.4302Z'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M16.0303 14.4302V9.3702C16.0303 8.8902 15.8303 8.7002 15.3203 8.7002H14.0303C13.5203 8.7002 13.3203 8.8902 13.3203 9.3702V14.4302C13.3203 14.9102 13.5203 15.1002 14.0303 15.1002'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='1.5'
                                />
                              </svg>
                              Pause The Order
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showPanel}
                              // onCheckedChange={setShowPanel}
                              className='gap-2 mt-1 rounded-xl hover:bg-white'
                            >
                              <svg
                                fill='none'
                                height='24'
                                viewBox='0 0 24 24'
                                width='24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-miterlimit='10'
                                  stroke-width='1.5'
                                />
                                <path
                                  d='M18.9004 5L4.90039 19'
                                  stroke='#96B0BD'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-miterlimit='10'
                                  stroke-width='1.5'
                                />
                              </svg>
                              Cancel Order
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className='flex flex-col items-start justify-between gap-3 mt-3 md:flex-row md:justify-start md:gap-6'>
                      <div className='flex flex-row items-center gap-2'>
                        <svg
                          fill='none'
                          height='24'
                          viewBox='0 0 24 24'
                          width='24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M12.0009 13.4299C13.724 13.4299 15.1209 12.0331 15.1209 10.3099C15.1209 8.58681 13.724 7.18994 12.0009 7.18994C10.2777 7.18994 8.88086 8.58681 8.88086 10.3099C8.88086 12.0331 10.2777 13.4299 12.0009 13.4299Z'
                            stroke='#96B0BD'
                            stroke-width='1.5'
                          />
                          <path
                            d='M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z'
                            stroke='#96B0BD'
                            stroke-width='1.5'
                          />
                        </svg>
                        {proposal.location}
                      </div>
                      <div className='flex gap-2'>
                        <div className='flex flex-row items-center gap-2'>
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                            <path
                              d='M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                            <path
                              d='M9 13.0098H12'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M9 9.00977H12'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M5.99609 13H6.00508'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M5.99609 9H6.00508'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                          </svg>
                          ${proposal.gigPrice}
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                          </svg>
                          {formattedDate(proposal.gigPostDate)} - Present
                        </div>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    {/* {isSmallScreen && ( */}
                    <div className='text-left text-[#96B0BD]'>{proposal.gigDescription}</div>
                    {/* )} */}
                    <div className='flex flex-col items-start justify-between mt-3 md:flex-row md:items-center'>
                      <div className='flex flex-row items-center flex-1 gap-3 text-left'>
                        <div>
                          <img height={40} src='/assets/images/Rectangle 273.png' width={40} />
                        </div>
                        <div className='flex flex-col gap-1 text-left'>
                          <div className='flex flex-row items-center gap-1 font-bold'>
                            {proposal.creator?.fullName}
                            <svg
                              fill='none'
                              height='17'
                              viewBox='0 0 17 17'
                              width='17'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M14.1422 6.03555C14.1585 5.9123 14.167 5.78905 14.167 5.6665C14.167 3.98138 12.649 2.62917 10.9646 2.85796C10.4737 1.98459 9.53874 1.4165 8.50033 1.4165C7.46191 1.4165 6.52691 1.98459 6.03603 2.85796C4.34808 2.62917 2.83366 3.98138 2.83366 5.6665C2.83366 5.78905 2.84216 5.9123 2.85845 6.03555C1.98508 6.52713 1.41699 7.46213 1.41699 8.49984C1.41699 9.53755 1.98508 10.4725 2.85845 10.9641C2.84211 11.0865 2.83383 11.2097 2.83366 11.3332C2.83366 13.0183 4.34808 14.367 6.03603 14.1417C6.52691 15.0151 7.46191 15.5832 8.50033 15.5832C9.53874 15.5832 10.4737 15.0151 10.9646 14.1417C12.649 14.367 14.167 13.0183 14.167 11.3332C14.167 11.2106 14.1585 11.0874 14.1422 10.9641C15.0156 10.4725 15.5837 9.53755 15.5837 8.49984C15.5837 7.46213 15.0156 6.52713 14.1422 6.03555ZM7.76012 11.6278L5.16266 8.99709L6.17133 8.00259L7.77003 9.62184L10.835 6.58025L11.8323 7.58609L7.76012 11.6278Z'
                                fill='#0A75C2'
                              />
                            </svg>
                          </div>
                          <div className='text-left text-[14px] text-[#516170]'>Freelancer</div>
                        </div>
                      </div>
                      <div className='mt-2 flex-none rounded-xl bg-[#1B272C] p-1 md:mt-0'>
                        <button className='p-4 px-8 md:p-5'>Message</button>
                        <button
                          className='bg-[#DC4F13] p-4 px-8 md:p-5'
                          onClick={() => onAccept(proposal.gigId, proposal.freelancerId, proposal.gigPrice, proposal.walletPubkey)}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button className='mt-6 w-full border border-[#28373E] p-3 text-center'>
                Load more +{' '}
              </button>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-full gap-3 py-20'>
              <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
              <p className='text-[18px] text-slate-600'>Freelancer proposals will be here</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
