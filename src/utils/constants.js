import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

const skillSets = [
  'UI/UX',
  'Design',
  'Web Design',
  'Prototyping',
  'Wireframing',
  'Research',
  'Figma',
  'JavaScript',
  'React.JS',
  'Next.JS',
  'Shadcn',
  'Tailwind',
  'Mobile Development',
  'Web Development',
  'Database Development',
  'Desktop Application',
  'Python',
  'Java',
  'C++',
  'Swift',
  'Kotlin',
  'SQL',
  'MongoDB',
  'Angular',
  'Vue.JS',
];

const languages = ['English', 'Germany', 'Russian', 'Spanish', 'Portugues'];

const ContractStatus = {
  ACTIVE: 'Active',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  DELIVERED: 'Delivered',
  PENDING: 'Pending',
  PENDING: 'Pending',
  RELEASED: 'Released',
  STARTED: 'Started',
};

const PROGRAM_ID = 'GuqgMVMCLi9daQMHyhnLRGTpgpwNGU4yZXs9GK4SYrbS'; // devnet and mainnet
const CONTRACT_SEED = 'gig_contract';
const ADMIN_ADDRESS = new PublicKey('CxMudY9Vyw4p5fx1ZY173GHH2Q1ewZFo2YWmd8sozquQ');

// Mainnet
const RPC_ENDPOINT = 'https://rpc.hellomoon.io/9b116588-7790-4286-9bbb-77d326750f2f'; // mainnet
const DECIMALS = new BN(1_000_000); // mainnet
const PAYTOKEN_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // mainnet USDC

// Devnet
// const RPC_ENDPOINT = "https://rpc-devnet.hellomoon.io/9b116588-7790-4286-9bbb-77d326750f2f"; // devnet
// const DECIMALS = new BN(100_000_000); // devnet
// const PAYTOKEN_MINT = new PublicKey("7FctSfSZ9GonfMrybp45hzoQyU71CEjjZFxxoSzqKWT"); // devnet BPT

export {
  skillSets,
  languages,
  ContractStatus,
  RPC_ENDPOINT,
  PROGRAM_ID,
  CONTRACT_SEED,
  DECIMALS,
  PAYTOKEN_MINT,
  ADMIN_ADDRESS,
};

export const USER_ROLE = {
  CLIENT: 3,
  EMPLOYEE: 1,
  EMPLOYER: 2,
  FREELANCER: 0,
};
