'use client';

import {
  AnchorProvider,
  BN,
  getProvider,
  Program,
  setProvider,
  utils,
} from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaEllipsis, FaX } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { v4 as uuid } from 'uuid';

import searchOptions from '../freelancers/searchOptions';

import { FilterIcon } from '@/components/elements/svgs/FilterIcon';
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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/seperator';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetAllClientGigsProposed } from '@/hooks/useGetAllClientGigsProposed';
import { useHandleResize } from '@/hooks/useHandleResize';
import IDL from '@/idl/gig_basic_contract.json';
import api from '@/utils/api';
import {
  ADMIN_ADDRESS,
  CONTRACT_SEED,
  ContractStatus,
  PAYTOKEN_MINT,
  PROGRAM_ID,
} from '@/utils/constants';

const DropdownItem = ({ onCheckedChange, ...props }) => {
  return (
    <div className='flex cursor-pointer items-center gap-4 p-0'>
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

  const wallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [program, setProgram] = useState();
  const [searchType, setSearchType] = useState('normal');
  const [mode, setMode] = useState('live');
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;
  const [searchKeywords, setSearchKeyWords] = useState('');
  const debouncedSearchText = useDebounce(searchKeywords);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [filters, setFilters] = useState([]);
  const { data: gigs, refetch: refetchAllGigsProposed } = useGetAllClientGigsProposed(
    auth?.currentProfile?._id,
    page,
    itemsPerPage,
    debouncedSearchText,
    filters
  );

  const { toast } = useToast();

  const [filteredLiveList, setFilteredLiveList] = useState([]);
  const [filteredProposalsList, setFilteredProposalsList] = useState([]);

  const { isSmallScreen } = useHandleResize();
  const filterCategories = [
    {
      content: [
        { category_id: 'earned', category_name: 'Any Earned', category_value: 0 },
        { category_id: 'earned', category_name: '$1+ Earned', category_value: 1 },
        { category_id: 'earned', category_name: '$100+ Earned', category_value: 100 },
        { category_id: 'earned', category_name: '$1k+ Earned', category_value: 1000 },
        { category_id: 'earned', category_name: '$10k+ Earned', category_value: 10000 },
      ],
      title: 'Earned Amount',
    },
    {
      content: [
        {
          category_id: 'languages',
          category_name: 'Any Language',
          category_value: 'any',
        },
        { category_id: 'languages', category_name: 'English', category_value: 'English' },
        { category_id: 'languages', category_name: 'Germany', category_value: 'Germany' },
        { category_id: 'languages', category_name: 'Russian', category_value: 'Russian' },
        { category_id: 'languages', category_name: 'Spanish', category_value: 'Spanish' },
        { category_id: 'languages', category_name: 'Portugues', category_value: 'Portugues' },
      ],
      title: 'Languages',
    },
    {
      content: [
        {
          category_id: 'hourlyRate',
          category_name: 'Any Rate',
          category_value: 'any',
        },
        { category_id: 'hourlyRate', category_name: '$10 and Below', category_value: [0, 10] },
        { category_id: 'hourlyRate', category_name: '$10 - $30', category_value: [10, 30] },
        { category_id: 'hourlyRate', category_name: '$30 - $60', category_value: [30, 60] },
        {
          category_id: 'hourlyRate',
          category_name: '$60 and Above',
          category_value: [60, 99999999],
        },
      ],
      title: 'Hourly rate',
    },
    {
      content: [
        { category_id: 'hoursBilled', category_name: '1+ Hours Billed', category_value: 1 },
        { category_id: 'hoursBilled', category_name: '100+ Hours Billed', category_value: 100 },
        { category_id: 'hoursBilled', category_name: '1000+ Hours Billed', category_value: 1000 },
      ],
      title: 'Hours billed',
    },
    {
      content: [
        { category_id: 'jobSuccess', category_name: 'Any Score', category_value: 0 },
        { category_id: 'jobSuccess', category_name: '80% & UP', category_value: 80 },
        { category_id: 'jobSuccess', category_name: '90% & UP', category_value: 90 },
      ],
      title: 'Job Success',
    },
  ];

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
  }, [debouncedSearchText, mode]);

  useEffect(() => {
    if (mode === 'live') {
      if (gigs?.lives?.length > 0) {
        setCanLoadMore(true);
        if (page === 1) {
          setFilteredLiveList(gigs.lives);
        } else {
          setFilteredLiveList((prev) => {
            let result = [...prev];
            const ids = prev.map((item) => item._id);

            gigs.lives.map((lv) => {
              if (!ids.includes(lv._id)) {
                result = [...result, lv];
              }
            });

            return result;
          });
        }
      } else {
        if (page === 1) {
          setFilteredLiveList([]);
        }
        setCanLoadMore(false);
      }
    } else {
      if (gigs?.proposals?.length > 0) {
        setCanLoadMore(true);
        if (page === 1) {
          setFilteredProposalsList(gigs.proposals);
        } else {
          setFilteredProposalsList((prev) => {
            let result = [...prev];
            const ids = prev.map((item) => item._id);

            gigs.proposals.map((lv) => {
              if (!ids.includes(lv._id)) {
                result = [...result, lv];
              }
            });

            return result;
          });
        }
      } else {
        if (page === 1) {
          setFilteredProposalsList([]);
        }
        setCanLoadMore(false);
      }
    }
  }, [gigs, page, mode]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

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
        description: <h3>No seller pubkey provided!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
      return;
    }

    try {
      const seller = new PublicKey(sellerPubkey);
      const contractId = uuid().slice(0, 8);
      const amount = new BN(gigPrice * Math.pow(10, 6));
      const dispute = new BN(0.5 * Math.pow(10, 6)); // 0.5 USDC for dispute fee
      const deadline = Math.floor(Date.now() / 1000) + 10 * 24 * 60 * 60;

      const [contract, bump] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from(utils.bytes.utf8.encode(CONTRACT_SEED)),
          Buffer.from(utils.bytes.utf8.encode(contractId)),
        ],
        program.programId
      );

      const buyerAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, wallet?.publicKey);

      // Get the token balance
      const info = await connection.getTokenAccountBalance(buyerAta);

      if (info.value.uiAmount < Number(gigPrice) + 0.5) {
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: (
            <h3>{`You don't have enough token. Need at least ${gigPrice + 0.5} USDC!`}</h3>
          ),
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
        return;
      }

      const contractAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, contract, true);

      const transaction = await program.methods
        .startContract(contractId, amount, dispute, deadline)
        .accounts({
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          buyer: wallet.publicKey,
          buyerAta,
          contract,
          contractAta,
          payTokenMint: PAYTOKEN_MINT,
          rent: SYSVAR_RENT_PUBKEY,
          seller,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .transaction();
      console.log(transaction, connection);

      const signature = await sendTransaction(transaction, connection, { skipPreflight: true });

      console.log('Your transaction signature for creating a new contract', signature);

      await connection.confirmTransaction(signature, 'confirmed');

      await api.put(
        `/api/v1/client_gig/accept_freelancer/${gigId}`,
        JSON.stringify({ contractId, freelancerId, profileId: auth?.currentProfile?._id })
      );

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

  const onRelease = async (id, contractId) => {
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

      const buyerAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, wallet?.publicKey);

      const contractAccount = await program.account.contract.fetch(contract);

      const sellerAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, contractAccount.seller);

      const adminAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, ADMIN_ADDRESS);

      const contractAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, contract, true);

      const transaction = await program.methods
        .buyerApprove(contractId, false)
        .accounts({
          adminAta,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          buyer: wallet.publicKey,
          buyerAta,
          contract,
          contractAta,
          sellerAta,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .transaction();

      const signature = await sendTransaction(transaction, connection, { skipPreflight: true });

      console.log('Your transaction signature for approving the contract', signature);

      await connection.confirmTransaction(signature, 'confirmed');

      await api.put(`/api/v1/client_gig/release-contract/${id}`);

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully released the funds!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });

      await refetchAllGigsProposed();
    } catch (err) {
      console.error('Error corrupted during releasing funds', err);

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

  const onCheckedChange = (isChecked, id, name, value) => {
    if (isChecked) {
      setFilters((prev) => [...prev, { id, name, value }]);
    } else {
      setFilters((prev) =>
        prev.filter(
          (f) => f.id !== id || f.name !== name || JSON.stringify(f.value) !== JSON.stringify(value)
        )
      );
    }
  };

  const onChangeType = (e) => {
    setSearchType(e);
  };

  const handleClearAll = () => {
    setFilters([]);
  };

  const handleRemove = (id, name, value) => {
    setFilters((prev) =>
      prev.filter(
        (f) => f.id !== id || f.name !== name || JSON.stringify(f.value) !== JSON.stringify(value)
      )
    );
  };

  return (
    <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
      <div className='flex gap-2 rounded-xl bg-[#10191d] pr-4'>
        <div className='m-3 flex flex-1 gap-2 mobile:m-1'>
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
            className='w-full bg-transparent text-white outline-none mobile:text-sm'
            onChange={(e) => setKey(e)}
            onKeyDown={handleKeyDown}
            placeholder='Search by job title, company, keywords'
          />
        </div>
        <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl transition hover:bg-[#1B272C] mobile:hidden'>
          <IoLocationOutline size={20} stroke='#96B0BD' />
          <span className='text-[#96B0BD]'>Anywhere</span>
        </div>
        {(!isSmallScreen || searchType === 'normal') && (
          <Popover>
            <PopoverTrigger asChild>
              <button className='flex flex-row items-center justify-center gap-3'>
                <FilterIcon isFiltered={filters.length > 0} isSmallScreen={isSmallScreen} />
                {!isSmallScreen && (
                  <div className='flex flex-row gap-2'>
                    <span className='hidden text-[#96B0BD] md:block'>Filter</span>
                    {filters.length > 0 && (
                      <div className='flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#DC4F13] text-center align-middle'>
                        {filters.length}
                      </div>
                    )}
                  </div>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent
              align='end'
              className='mt-3 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
            >
              <div className='grid grid-cols-1 gap-4 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {filterCategories.map((item, index) => {
                  return (
                    <div className='flex flex-col gap-2' key={index}>
                      <div>{item.title}</div>
                      {item.content.map((con, i) => {
                        return (
                          <DropdownItem
                            category_id={con.category_id + con.category_value}
                            category_name={con.category_name}
                            isChecked={
                              !!filters.find(
                                (f) =>
                                  f.id === con.category_id &&
                                  f.name === con.category_name &&
                                  JSON.stringify(f.value) === JSON.stringify(con.category_value)
                              )
                            }
                            key={i}
                            onCheckedChange={(value) =>
                              onCheckedChange(
                                value,
                                con.category_id,
                                con.category_name,
                                con.category_value
                              )
                            }
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        )}
        {searchType === 'ai' && (
          <div className='flex'>
            <button
              className='hidden w-12 items-center justify-center self-stretch rounded-e-[15px] rounded-s-[0px] bg-orange text-lg text-white mobile:flex'
              onClick={aiSearch}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
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
      {filters.length > 0 && (
        <div className='mt-[30px] flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
          {filters.map((filter, index) => {
            return (
              <span
                className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                key={index}
              >
                <FaX
                  className='rounded-full bg-[#3E525B] p-[2px]'
                  onClick={() => handleRemove(filter.id, filter.name, filter.value)}
                />
                {filter.name}
              </span>
            );
          })}

          <span className='cursor-pointer' onClick={handleClearAll}>
            Clear&nbsp;All
          </span>
        </div>
      )}
      <div className='flex w-full items-center justify-center pb-5 pt-10'>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'live' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('live')}
        >
          {mode == 'live' ? (
            <h1>
              <span className='inline-block h-6 w-6 rounded-full bg-orange'>
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
              <span className='inline-block h-6 w-6 rounded-full bg-orange'>
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
                            {order.status}
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
                          {formattedDate(order.gigPostDate)} - Present
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
                        <button
                          className='bg-[#DC4F13] p-4 px-8 md:p-5'
                          onClick={() => router.push(`/dashboard/client/orders/${order?.id}`)}
                        >
                          See Order
                        </button>
                        {order?.status == ContractStatus.DELIVERED && (
                          <button
                            className='bg-green-500 p-4 px-8 md:p-5'
                            onClick={() => onRelease(order.id, order.contractId)}
                          >
                            Release
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
          {filteredProposalsList.length > 0 ? (
            <>
              {filteredProposalsList.map((proposal, index) => {
                return (
                  <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center' key={index}>
                    <div className='mt-1 flex items-start justify-between md:flex-row md:items-center'>
                      <div className='mt-3 flex-1 text-left text-[20px] md:mt-0 md:text-2xl'>
                        {proposal.gigTitle}
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
                          {formattedDate(proposal.gigPostDate)} - Present
                        </div>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    {/* {isSmallScreen && ( */}
                    <div className='text-left text-[#96B0BD]'>{proposal.gigDescription}</div>
                    {/* )} */}
                    <div className='mt-3 flex flex-col items-start justify-between md:flex-row md:items-center'>
                      <div className='flex flex-1 flex-row items-center gap-3 text-left'>
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
                          onClick={() =>
                            onAccept(
                              proposal.gigId,
                              proposal.freelancerId,
                              proposal.gigPrice,
                              proposal.freelancerId.walletPublicKey
                            )
                          }
                        >
                          Accept
                        </button>
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
              <p className='text-[18px] text-slate-600'>Freelancer proposals will be here</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
