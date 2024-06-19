import { PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";

const skillSets = [
    'UI/UX',
    'Design',
    'Webdesign',
    'Prototyping',
    'Wireframing',
    'Research'
];

const languages = [
    'English',
    'Germany',
    'Russian',
    'Spanish',
    'Portugues'
];

const PROGRAM_ID = "GuqgMVMCLi9daQMHyhnLRGTpgpwNGU4yZXs9GK4SYrbS"; // devnet and mainnet
const CONTRACT_SEED = "gig_contract";
const ADMIN_ADDRESS = new PublicKey("CxMudY9Vyw4p5fx1ZY173GHH2Q1ewZFo2YWmd8sozquQ");

// Mainnet
const RPC_ENDPOINT = "https://rpc.hellomoon.io/9b116588-7790-4286-9bbb-77d326750f2f"; // mainnet
const DECIMALS = new BN(1_000_000); // mainnet
const PAYTOKEN_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // mainnet USDC

// Devnet
// const RPC_ENDPOINT = "https://rpc-devnet.hellomoon.io/9b116588-7790-4286-9bbb-77d326750f2f"; // devnet
// const DECIMALS = new BN(100_000_000); // devnet
// const PAYTOKEN_MINT = new PublicKey("7FctSfSZ9GonfMrybp45hzoQyU71CEjjZFxxoSzqKWT"); // devnet BPT

export { skillSets, languages, RPC_ENDPOINT, PROGRAM_ID, CONTRACT_SEED, DECIMALS, PAYTOKEN_MINT, ADMIN_ADDRESS };