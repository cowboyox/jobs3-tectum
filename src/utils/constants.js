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

export const TimeZone = {
  UTC: 'UTC',
  'UTC+1': 'UTC+1',
  'UTC+10': 'UTC+10',
  'UTC+11': 'UTC+11',
  'UTC+12': 'UTC+12',
  'UTC+2': 'UTC+2',
  'UTC+3': 'UTC+3',
  'UTC+4': 'UTC+4',
  'UTC+5': 'UTC+5',
  'UTC+6': 'UTC+6',
  'UTC+7': 'UTC+7',
  'UTC+8': 'UTC+8',
  'UTC+9': 'UTC+9',
  'UTC-1': 'UTC-1',
  'UTC-10': 'UTC-10',
  'UTC-11': 'UTC-11',
  'UTC-12': 'UTC-12',
  'UTC-2': 'UTC-2',
  'UTC-3': 'UTC-3',
  'UTC-4': 'UTC-4',
  'UTC-5': 'UTC-5',
  'UTC-6': 'UTC-6',
  'UTC-7': 'UTC-7',
  'UTC-8': 'UTC-8',
  'UTC-9': 'UTC-9',
};

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
  CONFIRMED: 'Confirmed',
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

export const APIS = {
  FL_FIND_GIGS_POSTED_BY_PROFILE_ID: '/api/v1/freelancer_gig/find_gigs_posted_by_profile_id',
  FL_FIND_GIGS_PROPOSED_BY_PROFILE_ID: '/api/v1/freelancer_gig/find_gigs_proposed_by_profile_id',
};
