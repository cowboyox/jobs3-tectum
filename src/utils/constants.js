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
  CONFIRMED: 'Confirmed',
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

export const APIS = {
  CL_FIND_GIGS: '/api/v1/client_gig/get_gigs',
  FL_FIND_GIGS_POSTED_BY_PROFILE_ID: '/api/v1/freelancer_gig/find_gigs_posted_by_profile_id',
  FL_FIND_GIGS_PROPOSED_BY_PROFILE_ID: '/api/v1/freelancer_gig/find_gigs_proposed_by_profile_id',
};

export const DEFAULT_AVATAR = '/assets/images/users/user-5.png';

export const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

