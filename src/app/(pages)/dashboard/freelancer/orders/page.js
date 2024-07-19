'use client';

import { AnchorProvider, getProvider, Program, setProvider, utils } from '@project-serum/anchor';
import { AnchorProvider, getProvider, Program, setProvider, utils } from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaEllipsis, FaX } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
import { useDebounce } from '@/hooks/useDebounce';
import { useGetAllFreelancerGigsProposed } from '@/hooks/useGetAllFreelancerGigsProposed';
import IDL from '@/idl/gig_basic_contract.json';
import api from '@/utils/api';
import {
  ADMIN_ADDRESS,
  CONTRACT_SEED,
  ContractStatus,
  COUNTRIES,
  PAYTOKEN_MINT,
  PROGRAM_ID,
} from '@/utils/constants';

const DropdownItem = ({ onCheckedChange, ...props }) => {
  return (
    <div className='flex items-center gap-4 p-0 cursor-pointer'>
      <Checkbox
        checked={props.checked}
        className='rounded border-[#96B0BD] data-[state=checked]:border-orange data-[state=checked]:bg-orange data-[state=checked]:text-white'
        id={props.category_id}
        onCheckedChange={onCheckedChange}
      />
      <label className='cursor-pointer text-sm text-[#96B0BD]' htmlFor={props.category_id}>
        {props.category_name}
      </label>
    </div>
  );
};

const Orders = () => {
  const router = useRouter();
  const auth = useCustomContext();
  const { toast } = useToast();

  const wallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [program, setProgram] = useState();
  const [search, setSearch] = useState('');
  const filterCategory = ['Active', 'Paused', 'Completed', 'Cancelled'];
  const [submissions, setSubmissions] = useState([]);
  const [lives, setLives] = useState([]);
  const [isSmallScreen, setIsSmallScree] = useState(false);
  const [mode, setMode] = useState('live');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [searchKeywords, setSearchKeyWords] = useState('');
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [locationFilters, setLocationFilters] = useState([]);
  const [countries, setCountries] = useState(COUNTRIES);
  const [locationText, setLocationText] = useState("");
  const debouncedSearchText = useDebounce(searchKeywords);


  const { data: gigs, refetch: refetchAllGigsProposed } = useGetAllFreelancerGigsProposed(
    auth?.currentProfile?._id,
    page,
    itemsPerPage,
    debouncedSearchText,
    locationFilters
  );

  useEffect(() => {
    if (mode == 'live') {
      if (gigs?.livesTotal > page * itemsPerPage && gigs?.lives?.length > 0) {
        setCanLoadMore(true);
      } else {
        setCanLoadMore(false);
      }
    } else {
      if (gigs?.submissionsTotal > page * itemsPerPage && gigs?.submissions?.length > 0) {
        setCanLoadMore(true);
      } else {
        setCanLoadMore(false);
      }
    }
    setLives(gigs?.lives);
    setSubmissions(gigs?.submissions);
  }, [gigs, mode, page, itemsPerPage]);

  useEffect(() => {
    // setPage(1);
    setItemsPerPage(2);
  }, [debouncedSearchText, mode]);

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

  useEffect(() => {
    setCountries(COUNTRIES.filter((item) => item.toLocaleLowerCase().includes(locationText.toLocaleLowerCase())));
  }, [locationText]);
  
  const setKey = (e) => {
    // setPage(1);
    setItemsPerPage(2);
    setSearchKeyWords(e.target.value);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    if (gigs) {
      if (mode === 'live') {
        const filtered = gigs.lives.filter(
          (p) =>
            p.creator.fullName?.toLowerCase().includes(value) ||
            p.gigTitle?.toLowerCase().includes(value) ||
            p.gigDescription?.toLowerCase().includes(value)
        );
        setLives(filtered);
      } else {
        const filtered = gigs.submissions.filter(
          (p) =>
            p.creator.fullName?.toLowerCase().includes(value) ||
            p.gigTitle?.toLowerCase().includes(value) ||
            p.gigDescription?.toLowerCase().includes(value)
        );
        setSubmissions(filtered);
      }
    }
  };

  const handleLoadMore = () => {
    // setPage((prev) => prev + 1);
    setItemsPerPage((prev) => prev + 2);
  };

  const handleMessage = (order) => {
    if (auth.user) window.location.href = `/dashboard/freelancer/inbox/${order.clientId._id}`;
  };

  const getFormattedDate = (dateStr) => {
    // Convert the string to a Date object
    const date = new Date(dateStr);

    // Format the date to "June 12"
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

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
        .activateContract(contractId, true)
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

      await refetchAllGigsProposed();
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

      await refetchAllGigsProposed();
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

      await refetchAllGigsProposed();
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

  const onCheckedLocationChange = (value, id, name) => {
    if (value) {
      setLocationFilters((prev) => [...prev, name]);
    } else {
      setLocationFilters((prev) => prev.filter((item) => item !== name));
    }
  };

  return (
    <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
      <div className='flex flex-row items-center justify-between gap-5 rounded-xl bg-[#10191D] p-3'>
        <div className='ml-3 flex flex-1 items-center gap-3'>
          <button>
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth={1.5}
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <input
            className='w-full bg-transparent outline-none'
            // onChange={handleSearch}
            onChange={(e) => setKey(e)}
            placeholder={isSmallScreen ? 'Search' : 'Search by Order title...'}
            type='text'
            // value={search}
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
                  strokeWidth='1.5'
                />
                <path
                  d='M3.816 8.49C5.786 -0.169998 18.616 -0.159997 20.576 8.5C21.726 13.58 18.566 17.88 15.796 20.54C13.786 22.48 10.606 22.48 8.586 20.54C5.826 17.88 2.666 13.57 3.816 8.49Z'
                  stroke='#96B0BD'
                  strokeWidth='1.5'
                />
              </svg>
            </button>
          )}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl px-2 transition hover:bg-[#1B272C] mobile:m-1'>
              <IoLocationOutline size={20} stroke='#96B0BD' />
              {
                locationFilters.length == 0 ?
                <span className='text-[#96B0BD]'>Anywhere</span> :
                <span className='text-[#96B0BD]'>{ locationFilters.join(", ").length > 11 ? locationFilters.join(", ").slice(0,10) + "..." : locationFilters.join(", ") }</span>
              }
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#DC4F13] text-sm mobile:h-4 mobile:w-4 mobile:text-sm'>
                {locationFilters.length}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align='end'
            className='mt-3 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] pl-4 pr-1 py-4'
          >
            <div className='max-h-[300px] overflow-y-auto country-list'>
              <div className='sticky top-0 flex bg-[#1B272C] p-1 mb-1'>
                <input 
                  className='w-full px-7 relative text-[#96B0BD] border-[#96B0BD] border-2 bg-transparent rounded-full outline-none mobile:text-sm' 
                  onChange={(e) => {
                    setLocationText(e.target.value);
                  }}
                  value={locationText}
                />
                <svg
                  className='absolute w-5 h-5 top-2 left-3'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={1.5}
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              {
                countries.length > 0 ?
                <div className='flex flex-col gap-2'>
                  {countries.map((con, i) => {
                    return (
                      <DropdownItem
                        category_id={con}
                        category_name={con}
                        checked={locationFilters.includes(con)}
                        key={i}
                        onCheckedChange={(value) =>
                          onCheckedLocationChange(value, con, con)
                        }
                      />
                    );
                  })}
                </div> :
                <div className='flex flex-col gap-2'>
                  <span className='text-[#96B0BD]'>No results found</span>
                </div>
              }
            </div>
          </PopoverContent>
        </Popover>
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
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M6.46191 6.58594H2.52441'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M10.3994 10.0312C12.3022 10.0312 13.8447 8.48873 13.8447 6.58594C13.8447 4.68314 12.3022 3.14062 10.3994 3.14062C8.49662 3.14062 6.9541 4.68314 6.9541 6.58594C6.9541 8.48873 8.49662 10.0312 10.3994 10.0312Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M22.2119 17.4141H18.2744'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M8.43066 17.4141H2.52441'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M14.3369 20.8594C16.2397 20.8594 17.7822 19.3169 17.7822 17.4141C17.7822 15.5113 16.2397 13.9688 14.3369 13.9688C12.4341 13.9688 10.8916 15.5113 10.8916 17.4141C10.8916 19.3169 12.4341 20.8594 14.3369 20.8594Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
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
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit='10'
                  strokeWidth='1.5'
                />
                <path
                  d='M6.42188 6.58594H2.48438'
                  stroke='#96B0BD'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit='10'
                  strokeWidth='1.5'
                />
                <path
                  d='M10.3594 10.0312C12.2622 10.0312 13.8047 8.48873 13.8047 6.58594C13.8047 4.68314 12.2622 3.14062 10.3594 3.14062C8.45658 3.14062 6.91406 4.68314 6.91406 6.58594C6.91406 8.48873 8.45658 10.0312 10.3594 10.0312Z'
                  stroke='#96B0BD'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit='10'
                  strokeWidth='1.5'
                />
                <path
                  d='M22.1719 17.4141H18.2344'
                  stroke='#96B0BD'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit='10'
                  strokeWidth='1.5'
                />
                <path
                  d='M8.39062 17.4141H2.48438'
                  stroke='#96B0BD'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit='10'
                  strokeWidth='1.5'
                />
                <path
                  d='M14.2969 20.8594C16.1997 20.8594 17.7422 19.3169 17.7422 17.4141C17.7422 15.5113 16.1997 13.9688 14.2969 13.9688C12.3941 13.9688 10.8516 15.5113 10.8516 17.4141C10.8516 19.3169 12.3941 20.8594 14.2969 20.8594Z'
                  stroke='#96B0BD'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit='10'
                  strokeWidth='1.5'
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
        {!isSmallScreen && (
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
        )}
      </div>
      {mode == 'live' ? (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{gigs?.livesTotal}</span> Orders😊
        </div>
      ) : (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{gigs?.submissionsTotal}</span>{' '}
          Submissions😊
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
      <div className='flex w-full items-center justify-center pb-5 pt-10'>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'live' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('live')}
        >
          {mode == 'live' ? (
            <h1>
              <span className='inline-block h-6 w-6 rounded-full bg-orange'>{lives?.length}</span>
              &nbsp; Live
            </h1>
          ) : (
            <h1>Live</h1>
          )}
        </div>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'submission' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('submission')}
        >
          {mode == 'submission' ? (
            <h1>
              <span className='inline-block h-6 w-6 rounded-full bg-orange'>
                {submissions?.length}
              </span>
              &nbsp; Submitted
            </h1>
          ) : (
            <h1>Submitted</h1>
          )}
        </div>
      </div>
      {mode == 'live' ? (
        <>
          {lives?.length > 0 ? (
            <>
              {lives.map((order, index) => {
                return (
                  <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center' key={index}>
                    <div className='mt-1 flex flex-col-reverse items-start justify-between md:flex-row md:items-center'>
                      <div className='mt-3 flex-1 text-left text-[20px] md:mt-0 md:text-2xl'>
                        {order.gigTitle}
                      </div>
                      <div className='flex flex-none flex-row items-center justify-between gap-2 mobile:w-full'>
                        <div className='flex gap-2'>
                          <div className='rounded-xl border border-[#F7AE20] p-1 px-3 text-[#F7AE20]'>
                            15 H: 30 S
                          </div>
                          <div className='rounded-xl border border-[#1BBF36] p-1 px-3 text-[#1BBF36]'>
                            {order?.status}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className='border-none bg-transparent hover:bg-transparent'
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
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M12.0004 21.4098H5.94042C2.47042 21.4098 1.02042 18.9298 2.70042 15.8998L5.82042 10.2798L8.76042 4.99979C10.5404 1.78979 13.4604 1.78979 15.2404 4.99979L18.1804 10.2898L21.3004 15.9098C22.9804 18.9398 21.5204 21.4198 18.0604 21.4198H12.0004V21.4098Z'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M11.9941 17H12.0031'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                              </svg>
                              Report
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showActivityBar}
                              // onCheckedChange={setShowActivityBar}
                              className='mt-1 gap-2 rounded-xl hover:bg-white'
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
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M2.51953 7.10986H21.4796'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M8.51953 2.10986V6.96985'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M15.4795 2.10986V6.5199'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M23 18.5C23 19.85 22.4 21.05 21.47 21.88C20.67 22.57 19.64 23 18.5 23C17.42 23 16.42 22.62 15.65 21.98C14.64 21.16 14 19.91 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeMiterlimit='10'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M18.7799 17.0898V18.7798L17.3799 19.6198'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeMiterlimit='10'
                                  strokeWidth='1.5'
                                />
                              </svg>
                              Extend The Delivery Date
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showPanel}
                              // onCheckedChange={setShowPanel}
                              className='mt-1 gap-2 rounded-xl hover:bg-white'
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
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M10.75 14.4302V9.3702C10.75 8.8902 10.55 8.7002 10.04 8.7002H8.75004C8.24004 8.7002 8.04004 8.8902 8.04004 9.3702V14.4302C8.04004 14.9102 8.24004 15.1002 8.75004 15.1002H10.04C10.55 15.1002 10.75 14.9102 10.75 14.4302Z'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M16.0303 14.4302V9.3702C16.0303 8.8902 15.8303 8.7002 15.3203 8.7002H14.0303C13.5203 8.7002 13.3203 8.8902 13.3203 9.3702V14.4302C13.3203 14.9102 13.5203 15.1002 14.0303 15.1002'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                              </svg>
                              Pause The Order
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showPanel}
                              // onCheckedChange={setShowPanel}
                              className='mt-1 gap-2 rounded-xl hover:bg-white'
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
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeMiterlimit='10'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M18.9004 5L4.90039 19'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeMiterlimit='10'
                                  strokeWidth='1.5'
                                />
                              </svg>
                              Cancel Order
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className='mt-3 flex flex-col items-start justify-between gap-3 md:flex-row md:justify-start md:gap-6'>
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
                            strokeWidth='1.5'
                          />
                          <path
                            d='M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z'
                            stroke='#96B0BD'
                            strokeWidth='1.5'
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
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeMiterlimit='10'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeMiterlimit='10'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M9 13.0098H12'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M9 9.00977H12'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M5.99609 13H6.00508'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M5.99609 9H6.00508'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
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
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                          </svg>
                          {`${getFormattedDate(order.gigPostDate)} - Present`}
                        </div>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    {/* {isSmallScreen && ( */}
                    <div className='text-left text-[#96B0BD]'>{order.gigDescription}</div>
                    {/* )} */}
                    <div className='mt-3 flex flex-col items-start justify-between md:flex-row md:items-center'>
                      <div className='flex flex-1 flex-row items-center gap-3 text-left'>
                        <div>
                          <img height={40} src='/assets/images/Rectangle 273.png' width={40} />
                        </div>
                        <div className='flex flex-col gap-1 text-left'>
                          <div className='flex flex-row items-center gap-1 font-bold'>
                            {order.creator.fullName}
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
                          <div className='text-left text-[14px] text-[#516170]'>Client</div>
                        </div>
                      </div>
                      <div className='mt-2 flex-none rounded-xl bg-[#1B272C] p-1 md:mt-0'>
                        <button className='p-4 px-10 md:p-5' onClick={() => handleMessage(order)}>
                          Message
                        </button>
                        {order?.status == ContractStatus.STARTED && (
                          <button
                            className='bg-[#DC4F13] p-4 px-8 md:p-5'
                            onClick={() => onActivate(order.id, order.contractId)}
                          >
                            Activate
                          </button>
                        )}
                        {order?.status != ContractStatus.STARTED && (
                          <button
                            className='bg-[#DC4F13] p-4 px-8 md:p-5'
                            onClick={() => router.push(`/dashboard/freelancer/orders/${order?.id}`)}
                          >
                            See Order
                          </button>
                        )}
                        {order?.status == ContractStatus.ACTIVE && (
                          <button
                            className='bg-green-500 p-4 px-8 md:p-5'
                            onClick={() => onDeliver(order.id)}
                          >
                            Deliver
                          </button>
                        )}
                        {order?.status == ContractStatus.DELIVERED && (
                          <button
                            className='bg-green-500 p-4 px-8 md:p-5'
                            // onClick={() => onActivate(order.id, order.contractId)}
                          >
                            Request Payment
                          </button>
                        )}
                        {order?.status == ContractStatus.RELEASED && (
                          <button
                            className='bg-green-500 p-4 px-8 md:p-5'
                            onClick={() => onComplete(order.id, order.contractId)}
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {canLoadMore && (
                <div
                  className='mt-4 cursor-pointer rounded-2xl border border-lightGray py-3 text-center'
                  onClick={handleLoadMore}
                >
                  Load More +
                </div>
              )}
            </>
          ) : (
            <div className='flex h-full flex-col items-center justify-center gap-3 py-20'>
              <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
              <p className='text-[18px] text-slate-600'>Live proposals will be here</p>
            </div>
          )}
        </>
      ) : (
        <>
          {submissions?.length > 0 ? (
            <>
              {submissions.map((submission, index) => {
                return (
                  <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center' key={index}>
                    <div className='mt-1 flex items-start justify-between md:flex-row md:items-center'>
                      <div className='mt-3 flex-1 text-left text-[20px] md:mt-0 md:text-2xl'>
                        {submission.gigTitle}
                      </div>
                      <div className='flex flex-none flex-row items-center gap-2'>
                        {/* <div className='rounded-xl border border-[#F7AE20] p-1 px-3 text-[#F7AE20]'>
                        15 H: 30 S
                      </div>
                      <div className='rounded-xl border border-[#1BBF36] p-1 px-3 text-[#1BBF36]'>
                        Active
                      </div> */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className='border-none bg-transparent hover:bg-transparent'
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
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M12.0004 21.4098H5.94042C2.47042 21.4098 1.02042 18.9298 2.70042 15.8998L5.82042 10.2798L8.76042 4.99979C10.5404 1.78979 13.4604 1.78979 15.2404 4.99979L18.1804 10.2898L21.3004 15.9098C22.9804 18.9398 21.5204 21.4198 18.0604 21.4198H12.0004V21.4098Z'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M11.9941 17H12.0031'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                              </svg>
                              Report
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showActivityBar}
                              // onCheckedChange={setShowActivityBar}
                              className='mt-1 gap-2 rounded-xl hover:bg-white'
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
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M2.51953 7.10986H21.4796'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M8.51953 2.10986V6.96985'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M15.4795 2.10986V6.5199'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M23 18.5C23 19.85 22.4 21.05 21.47 21.88C20.67 22.57 19.64 23 18.5 23C17.42 23 16.42 22.62 15.65 21.98C14.64 21.16 14 19.91 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeMiterlimit='10'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M18.7799 17.0898V18.7798L17.3799 19.6198'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeMiterlimit='10'
                                  strokeWidth='1.5'
                                />
                              </svg>
                              Extend The Delivery Date
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showPanel}
                              // onCheckedChange={setShowPanel}
                              className='mt-1 gap-2 rounded-xl hover:bg-white'
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
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M10.75 14.4302V9.3702C10.75 8.8902 10.55 8.7002 10.04 8.7002H8.75004C8.24004 8.7002 8.04004 8.8902 8.04004 9.3702V14.4302C8.04004 14.9102 8.24004 15.1002 8.75004 15.1002H10.04C10.55 15.1002 10.75 14.9102 10.75 14.4302Z'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M16.0303 14.4302V9.3702C16.0303 8.8902 15.8303 8.7002 15.3203 8.7002H14.0303C13.5203 8.7002 13.3203 8.8902 13.3203 9.3702V14.4302C13.3203 14.9102 13.5203 15.1002 14.0303 15.1002'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                />
                              </svg>
                              Pause The Order
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              // checked={showPanel}
                              // onCheckedChange={setShowPanel}
                              className='mt-1 gap-2 rounded-xl hover:bg-white'
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
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeMiterlimit='10'
                                  strokeWidth='1.5'
                                />
                                <path
                                  d='M18.9004 5L4.90039 19'
                                  stroke='#96B0BD'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeMiterlimit='10'
                                  strokeWidth='1.5'
                                />
                              </svg>
                              Cancel Order
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className='mt-3 flex flex-col items-start justify-between gap-3 md:flex-row md:justify-start md:gap-6'>
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
                            strokeWidth='1.5'
                          />
                          <path
                            d='M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z'
                            stroke='#96B0BD'
                            strokeWidth='1.5'
                          />
                        </svg>
                        {submission.location}
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
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeMiterlimit='10'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeMiterlimit='10'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M9 13.0098H12'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M9 9.00977H12'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M5.99609 13H6.00508'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M5.99609 9H6.00508'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                          </svg>
                          {submission.gigPrice}
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
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                          </svg>
                          {getFormattedDate(submission.gigPostDate)} - Present
                        </div>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    {/* {isSmallScreen && ( */}
                    <div className='text-left text-[#96B0BD]'>{submission.gigDescription}</div>
                    {/* )} */}
                    <div className='mt-3 flex flex-col items-start justify-between md:flex-row md:items-center'>
                      <div className='flex flex-1 flex-row items-center gap-3 text-left'>
                        <div>
                          <img
                            className='rounded'
                            height={40}
                            src={submission.clientId.avatarURL}
                            width={40}
                          />
                          <img
                            className='rounded'
                            height={40}
                            src={submission.clientId.avatarURL}
                            width={40}
                          />
                        </div>
                        <div className='flex flex-col gap-1 text-left'>
                          <div className='flex flex-row items-center gap-1 font-bold'>
                            {submission.creator?.fullName}
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
                          <div className='text-left text-[14px] text-[#516170]'>Client</div>
                        </div>
                      </div>
                      <div className='mt-2 flex-none rounded-xl bg-[#1B272C] p-1 md:mt-0'>
                        <button
                          className='p-4 px-8 md:p-5'
                          onClick={() => handleMessage(submission)}
                        >
                          Message
                        </button>
                        <button
                          className='p-4 px-8 md:p-5'
                          onClick={() => handleMessage(submission)}
                        >
                          Message
                        </button>
                        {/* <button
                          className='bg-[#DC4F13] p-4 px-8 md:p-5'
                          // onClick={() => onActivate(submission.gigId, submission.clientId, submission.contractId)}
                        >
                          Accept
                        </button> */}
                      </div>
                    </div>
                  </div>
                );
              })}
              {canLoadMore && (
                <div
                  className='mt-4 cursor-pointer rounded-2xl border border-lightGray py-3 text-center'
                  onClick={handleLoadMore}
                >
                  Load More +
                </div>
              )}
            </>
          ) : (
            <div className='flex h-full flex-col items-center justify-center gap-3 py-20'>
              <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
              <p className='text-[18px] text-slate-600'>Submitted proposals will be here</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
