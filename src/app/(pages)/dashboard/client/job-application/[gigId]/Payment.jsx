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
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import { useGetFreelancerGigById } from '@/hooks/useGetFreelancerGigById';
import IDL from '@/idl/gig_basic_contract.json';
import api from '@/utils/api';
import { CONTRACT_SEED, PAYTOKEN_MINT, PROGRAM_ID } from '@/utils/constants';

const Payment = ({ coverLetter, gigPrice, walletPubkey }) => {
  const auth = useCustomContext();
  const { gigId } = useParams();
  const { toast } = useToast();
  const { data: gigInfo } = useGetFreelancerGigById(gigId);

  const wallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

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

  const onApply = async () => {
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

    if (!walletPubkey) {
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
      const seller = new PublicKey(walletPubkey);
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

      let values = {};

      values.clientId = auth.currentProfile._id;
      values.fullName = auth.user.name;
      values.email = auth.user.email;
      values.proposal = coverLetter;
      values.connects = gigInfo.connects;
      values.contractId = contractId;

      await api.post(`/api/v1/bidding/${gigId}/confirm_and_pay`, values);

      toast({
        className:
          'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Successfully confirmed!</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (err) {
      console.error('Error corrupted during applying gig', err);

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
    <div className='flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-center gap-2 rounded-xl bg-[#1B272C] p-3'>
          <svg
            fill='none'
            height='24'
            viewBox='0 0 24 24'
            width='24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10'
              stroke='#96B0BD'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
            />
            <path
              d='M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z'
              stroke='#96B0BD'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
            />
            <path
              d='M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z'
              stroke='#96B0BD'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
            />
          </svg>
          SSL Secure Payment
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between'>
            <p>Delivery Time</p>
            <p>3 days</p>
          </div>
          <div className='flex justify-between'>
            <p>Refundable Dispute Fee</p>
            <p>$0.5</p>
          </div>
          <div className='flex justify-between'>
            <p>Service Fee</p>
            <p>${gigPrice * 0.1}</p>
          </div>
          <div className='flex justify-between'>
            <p className='text-xl font-bold'>Total</p>
            <p className='text-xl font-bold'>${gigPrice - gigPrice * 0.1}</p>
          </div>
        </div>
        <div className='mt-2 flex rounded-xl bg-[#1B272C] p-1 md:mt-0'>
          <button className='p-2 px-8 md:p-3 md:px-8'>Back</button>
          <button className='w-full bg-[#DC4F13] p-2 px-8 md:p-3' onClick={onApply}>
            Confirm and Pay
          </button>
        </div>
      </div>
    </div>
  );
};
export default Payment;
