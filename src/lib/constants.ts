export const PAGE_SIZE = 24

export const PLATFORMS = {
  whatsapp: {
    id: 'whatsapp',
    label: 'WhatsApp',
    color: '#25D366',
    bgClass: 'bg-[#25D366]',
    textClass: 'text-[#25D366]',
    borderClass: 'border-[#25D366]',
    hoverBgClass: 'hover:bg-[#25D366]',
    linkPrefix: 'https://chat.whatsapp.com/',
  },
  telegram: {
    id: 'telegram',
    label: 'Telegram',
    color: '#2AABEE',
    bgClass: 'bg-[#2AABEE]',
    textClass: 'text-[#2AABEE]',
    borderClass: 'border-[#2AABEE]',
    hoverBgClass: 'hover:bg-[#2AABEE]',
    linkPrefix: 'https://t.me/',
  },
  discord: {
    id: 'discord',
    label: 'Discord',
    color: '#5865F2',
    bgClass: 'bg-[#5865F2]',
    textClass: 'text-[#5865F2]',
    borderClass: 'border-[#5865F2]',
    hoverBgClass: 'hover:bg-[#5865F2]',
    linkPrefix: 'https://discord.gg/',
  },
} as const

export type PlatformId = keyof typeof PLATFORMS

export const CONTINENTS = [
  { id: 'africa', label: 'Africa' },
  { id: 'asia', label: 'Asia' },
  { id: 'europe', label: 'Europe' },
  { id: 'north-america', label: 'Americas' },
  { id: 'south-america', label: 'South America' },
  { id: 'oceania', label: 'Oceania' },
] as const

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
  { value: 'most-joined', label: 'Most Joined' },
] as const

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'it', name: 'Italian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ur', name: 'Urdu' },
  { code: 'fa', name: 'Persian' },
  { code: 'sw', name: 'Swahili' },
  { code: 'ha', name: 'Hausa' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'ig', name: 'Igbo' },
  { code: 'am', name: 'Amharic' },
  { code: 'so', name: 'Somali' },
  { code: 'tl', name: 'Filipino' },
]

export const REPORT_REASONS = [
  { value: 'spam', label: 'Spam or fake group' },
  { value: 'inappropriate', label: 'Inappropriate content' },
  { value: 'broken_link', label: 'Broken or expired link' },
  { value: 'wrong_category', label: 'Wrong category' },
  { value: 'other', label: 'Other' },
] as const
