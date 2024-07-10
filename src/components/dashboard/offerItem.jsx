'use client';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { v4 as uuid } from 'uuid';
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

import { useToast } from '@/components/ui/use-toast';
import api from '@/utils/api';
import IDL from '@/idl/gig_basic_contract.json';
import {
  ADMIN_ADDRESS,
  CONTRACT_SEED,
  ContractStatus,
  PAYTOKEN_MINT,
  PROGRAM_ID,
} from '@/utils/constants';

const data = {
  description:
    'We are looking for an expert UI/UX designer to take our online travel website to the next level. As our website is the primary platform for users to plan and book their travel experiences, we need someone who can create a visually stunning and user-friendly interface. The ideal candidate should have a strong portfolio showcasing their expertise in UI/UX design for travel or e-commerce websites.',
  responsibilities: [
    'Collaborate with the development team to understand project requirements',
    'Conduct user research and create user personas',
    'Design wireframes, mockups, and prototypes',
    'Implement design best practices and ensure a seamless user experience',
    'Stay updated with the latest UI/UX trends and technologies',
  ],
  required: [
    'Proficiency in UI design tools like Sketch, Adobe XD, or Figma',
    'Strong understanding of user-centered design principles',
    'Experience in creating responsive web designs',
    'Knowledge of HTML, CSS, and JavaScript is a plus',
  ],
  summary:
    'This is a medium-sized project that will require a commitment of 1 to 3 months. We are looking for an expert designer who can deliver exceptional results and elevate our online travel website to new heights.',
  skills: ['UI/UX', 'Design', 'Webdesign', 'Mobile UI Design', 'Wireframing'],
  attachments: [
    { name: 'Document _1.doc', size: '1.5 MB' },
    { name: 'Imagefilename.jpg', size: '1.5 MB' },
  ],
};
const descriptionTextMaxLength = 320;

const OfferItem = ({ 
  gigId,
  freelancerId, 
  clientId,
  gigTitle, 
  gigPrice, 
  deliveryTime, 
  proposal, 
  avatarURL,
  fullName,
  proposalId, 
  refetchAllOrdersProposed,
  accepted,
  status,
  clientSide,
  contractId,
  buyerPubkey,
  quantity,
}) => {
  const { toast } = useToast();

  const wallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [program, setProgram] = useState();
  const [showDetail, setShowDetail] = useState(false);

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

  const _renderDetails = () => (
    <div className='flex w-full flex-col gap-6 text-[#516170]'>
      <div>{data.description}</div>

      <div>
        <h2>Key Responsibilities:</h2>
        {data.responsibilities.map((_item, key) => (
          <div className='mt-1' key={key}>- {_item}</div>
        ))}
      </div>

      <div>
        <h2>Skills required:</h2>
        {data.required.map((_item, key) => (
          <div className='mt-1' key={key}>- {_item}</div>
        ))}
      </div>

      <div>
        <h2>{data.summary}</h2>
        <a className='text-white cursor-pointer' onClick={() => setShowDetail(false)}>
            View less
        </a>
      </div>

      <div className='border-b border-[#28373A] pb-5'>
        <h2 className='text-white'>Skills</h2>
        <div className='flex items-center gap-2 mt-3 text-white'>
            {data.skills.map((_text, key) => (
                <div className='rounded-full w-full xs:w-auto border justify-center xs:justify-start truncate border-[#32525B] bg-[#283732] px-3 py-1' key={key}>
                  {_text}
                </div>
            ))}
        </div>
      </div>
      <div className='border-b border-[#28373A] pb-5'>
        <h2 className='text-white'>Attachments</h2>
        <div className='flex flex-col items-start gap-2 mt-3 text-white'>
          {data.attachments.map((_item, key) => (
            <div className='flex items-center gap-2 rounded-xl border border-[#526872] p-2' key={key}>
              <Icon icon='solar:file-download-outline' />
              <span>{_item.name}</span>
              <span>({_item.size})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Start contract on freelancer side
  const onAccept = async () => {
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

    if (!buyerPubkey) {
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>No buyer pubkey provided!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
      return;
    }

    try {
      const newContractId = uuid().slice(0, 8);
      const buyer = new PublicKey(buyerPubkey);
      const amount = new BN(quantity * gigPrice * Math.pow(10, 6));
      const dispute = new BN(0.5 * Math.pow(10, 6)); // 0.5 USDC for dispute fee
      const deadline = Math.floor(Date.now() / 1000) + 10 * 24 * 60 * 60;

      const [contract, bump] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from(utils.bytes.utf8.encode(CONTRACT_SEED)),
          Buffer.from(utils.bytes.utf8.encode(newContractId)),
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
          description: (
            <h3>{`You don't have enough token. Need at least $0.5 USDC!`}</h3>
          ),
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
        return;
      }

      const contractAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, contract, true);

      const transaction = await program.methods
        .startContractOnSeller(newContractId, amount, dispute, deadline)
        .accounts({
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          seller: wallet.publicKey,
          sellerAta,
          contract,
          contractAta,
          payTokenMint: PAYTOKEN_MINT,
          rent: SYSVAR_RENT_PUBKEY,
          buyer,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .transaction();
      console.log(transaction, connection);

      const signature = await sendTransaction(transaction, connection, { skipPreflight: true });

      console.log('Your transaction signature for creating a new contract on seller side', signature);

      await connection.confirmTransaction(signature, 'confirmed');

      await api.put(`/api/v1/freelancer_gig/accept-order/${proposalId}`, JSON.stringify({ gigId, contractId: newContractId, freelancerId, clientId, quantity }));

      await refetchAllOrdersProposed();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully accepted the proposal!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during accepting proposal:', err);

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

  const onReject = async () => {
    try {
      await api.put(`/api/v1/freelancer_gig/reject-order/${proposalId}`);

      await refetchAllOrdersProposed();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully rejected the proposal!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during rejecting proposal:', err);

      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  const onComplete = async () => {
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

      const sellerAta = getAssociatedTokenAddressSync(
          PAYTOKEN_MINT,
          wallet?.publicKey,
      );

      const contractAccount = await program.account.contract.fetch(contract);

      const buyerAta = getAssociatedTokenAddressSync(
          PAYTOKEN_MINT,
          contractAccount.buyer
      );

      const adminAta = getAssociatedTokenAddressSync(
          PAYTOKEN_MINT,
          ADMIN_ADDRESS,
      );
      
      const contractAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, contract, true);

      const transaction = await program.methods
          .sellerApprove(contractId, false)
          .accounts({
              seller: wallet.publicKey,
              contract,
              sellerAta,
              buyerAta,
              adminAta,
              contractAta,
              tokenProgram: TOKEN_PROGRAM_ID,
              associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
              systemProgram: SystemProgram.programId,
          })
          .transaction();

      const signature = await sendTransaction(transaction, connection, { skipPreflight: true });

      console.log("Your transaction signature for approving the contract", signature);

      await connection.confirmTransaction(signature, "confirmed");

      await api.put(`/api/v1/client_gig/complete-contract/${proposalId}`);

      await refetchAllOrdersProposed();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully completed the contract!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during rejecting proposal:', err);

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
 
  // Confirm on buyer side(client)
  const onConfirm = async () => {
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
        .acceptContractOnBuyer(contractId)
        .accounts({
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          buyer: wallet.publicKey,
          buyerAta,
          contract,
          contractAta,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .transaction();
      console.log(transaction, connection);

      const signature = await sendTransaction(transaction, connection, { skipPreflight: true });

      console.log('Your transaction signature for accepting the contract on buyer side', signature);

      await connection.confirmTransaction(signature, 'confirmed');


      await api.put(`/api/v1/client_gig/confirm-contract/${proposalId}`);

      await refetchAllOrdersProposed();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully confirmed the contract!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during rejecting proposal:', err);

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
  
  const onActivate = async () => {
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

      const contractAta = getAssociatedTokenAddressSync(PAYTOKEN_MINT, contract, true);

      // Without dispute fee
      const transaction = await program.methods
        .activateContract(contractId, false)
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

      await api.put(`/api/v1/client_gig/activate-contract/${proposalId}`);

      await refetchAllOrdersProposed();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully activated the contract!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during activating contract:', err);

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
  
  const onDeliver = async () => {
    try {
      await api.put(`/api/v1/client_gig/deliver-contract/${proposalId}`);

      await refetchAllOrdersProposed();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully delivered the contract!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during delivering:', err);

      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  const onRelease = async () => {
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

      await api.put(`/api/v1/client_gig/release-contract/${proposalId}`);

      await refetchAllOrdersProposed();

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully released the funds!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during releasing funds:', err);

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

  return (
    <div className='mx-auto flex w-full flex-col gap-2 rounded-xl bg-[#10191D] p-4 sm:p-8 mb-5'>
      {
        status ? 
          <div className='flex items-center justify-between'>
            <h1 className='text-xl'>{gigTitle}</h1>
            <div className='ml-auto rounded-xl border border-[#1BBF36] px-2 py-1 text-sm text-[#1BBF36] mobile:text-xs'>
              {status}
            </div>
          </div> :
          <h1 className='text-xl'>{gigTitle}</h1>
      }
      <div className='flex items-center gap-4 py-1'>
        <div className='relative w-12 h-12 mobile:h-8 mobile:w-8'>
          <img
            className='object-cover w-12 h-12 rounded-full mobile:h-8 mobile:w-8 aspect-square'
            src={
              avatarURL
                ? avatarURL
                : '/assets/images/users/user-3.png'
            }
          />
          <div className='absolute w-3 h-3 bg-green-500 rounded-full bottom-1 right-1 mobile:bottom-0 mobile:right-0 mobile:h-3 mobile:w-3' />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <h2 className='text-xl mobile:text-xs'>
              {fullName}
            </h2>
            <img
              className='w-4 h-4 mobile:h-3 mobile:w-3'
              src='/assets/images/icons/checkmark.svg'
            />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Icon icon='mdi:address-marker-outline' className='text-2xl' />
          London, United Kingdom
        </div>
        <div className='flex items-center gap-2'>
          <Icon icon='fa6-regular:clock' className='text-2xl' />
          May 15 / 04:35 PM
        </div>
      </div>
      <div className='mt-2 w-full border-b border-t border-[#28373A] py-4'>
        <div className='flex w-full flex-col gap-2 rounded-xl bg-[#1B272C] px-6 py-4'>
          <div className='grid gap-3 text-[#516170] md:grid-cols-[40%_20%_20%_20%]'>
            <div className='flex flex-col gap-2'>
              <span className='text-[#516170]'>Item</span>
              <span className='text-white'>{gigTitle}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-[#516170]'>Duration</span>
              <span className='text-white'>{deliveryTime}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-[#516170]'>Price</span>
              <span className='text-white'>${gigPrice}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-[#516170]'>Quantity</span>
              <span className='text-white'>{quantity}</span>
            </div>
          </div>
        </div>
      </div>
     
      <div className='flex w-full flex-col gap-3 text-[#516170]'>
        {proposal && <div>
          <div className=''>
            {
              proposal?.length < descriptionTextMaxLength
                ? proposal
                : showDetail
                  ? proposal
                  : proposal?.slice(0, descriptionTextMaxLength) + '...'
            }
          </div>
          {
            proposal?.length < descriptionTextMaxLength ? (
                <></>
              ) : !showDetail ? (
                <button
                  className='text-white cursor-pointer'
                  onClick={() => {
                    setShowDetail(true);
                  }}
                >
                  Show more
                </button>
              ) : (
                <button
                  className='text-white cursor-pointer'
                  onClick={() => {
                    setShowDetail(false);
                  }}
                >
                  Show less
                </button>
              )
          }
        </div>}
        
        <div className='border-b border-[#28373A] pb-3'>
          <h2 className='text-white'>Skills</h2>
          <div className='flex items-center gap-2 mt-3 text-white'>
            {data.skills.map((_text, key) => (
              <div className='rounded-full border truncate border-[#32525B] bg-[#283732] px-3 py-1' key={key}>
                {_text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {
        !clientSide &&
          <div>
            {
              !accepted &&
                <div className='grid grid-cols-2 rounded-xl bg-[#1B272C] p-1 text-white w-[50%] float-right'>
                  <div onClick={onReject} className='flex items-center justify-center p-3 cursor-pointer hover:opacity-60'>
                    Reject
                  </div>
                  <div onClick={onAccept} className='flex cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-3 hover:opacity-60'>
                    Accept
                  </div>
                </div>
            }
            {
              status == ContractStatus.CONFIRMED &&
                <div className='grid grid-cols-1 rounded-xl bg-[#1B272C] p-1 text-white w-[25%] float-right'>
                  <div onClick={onActivate} className='flex cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-3 hover:opacity-60'>
                      Activate
                  </div>
                </div>
            }
            {
              status == ContractStatus.ACTIVE &&
                <div className='grid grid-cols-1 rounded-xl bg-[#1B272C] p-1 text-white w-[25%] float-right'>
                  <div onClick={onDeliver} className='flex cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-3 hover:opacity-60'>
                      Deliver
                  </div>
                </div>
            }
            {
              status == ContractStatus.DELIVERED &&
                <div className='grid grid-cols-1 rounded-xl bg-[#1B272C] p-1 text-white w-[25%] float-right'>
                  <div className='flex cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-3 hover:opacity-60'>
                      Request Payment
                  </div>
                </div>
            }
            {
              status == ContractStatus.RELEASED &&
                <div className='grid grid-cols-1 rounded-xl bg-[#1B272C] p-1 text-white w-[25%] float-right'>
                  <div onClick={onComplete} className='flex cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-3 hover:opacity-60'>
                      Complete
                  </div>
                </div>
            }
        </div>
      }
      {
        clientSide && 
          <div>
            {
              status == ContractStatus.STARTED &&
                <div className='grid grid-cols-1 rounded-xl bg-[#1B272C] p-1 text-white w-[25%] float-right'>
                  <div onClick={onConfirm} className='flex cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-3 hover:opacity-60'>
                      Confirm
                  </div>
                </div>
            }
            {
              status == ContractStatus.DELIVERED &&
                <div className='grid grid-cols-1 rounded-xl bg-[#1B272C] p-1 text-white w-[25%] float-right'>
                  <div onClick={onRelease} className='flex cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-3 hover:opacity-60'>
                      Release
                  </div>
                </div>
            }
          </div>
      }
    </div>
  );
};

export default OfferItem;
