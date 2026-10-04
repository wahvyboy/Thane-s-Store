import { Product, Review } from '../types';
import silkPyjamasModel from '../assets/images/pj.jpeg';
import ceramicMugs from '../assets/images/mugs.jpeg';
import vipMembershipCard from '../assets/images/vip membership card.jpeg';
import luxuryMansion from '../assets/images/mansion.jpeg';

// Luxury brand photographs (aligned with /public and /src/assets/images)
export const LUXURY_IMAGES = {
  silkPyjamasModel: silkPyjamasModel || '/pj.jpeg',
  ceramicMugs: ceramicMugs || '/mugs.jpeg',
  vipMembershipCard: vipMembershipCard || '/vip-card.jpeg',
  luxuryMansion: luxuryMansion || '/mansion.jpeg',
  staticPj: '/pj.jpeg',
  staticMugs: '/mugs.jpeg',
  staticVipCard: '/vip-card.jpeg',
  staticMansion: '/mansion.jpeg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'pyjamas-mug-combo',
    name: "Thane's Pinjamas & Ceramic Mug Combo",
    subtitle: 'Handcrafted 22-Momme Mulberry Silk Loungewear Suit & Artisanal Ceramic Mug',
    price: 999,
    tag: 'SIGNATURE COMBO',
    badge: 'SIGNATURE COMBO',
    editionNumber: 'Edition 084 / 500 Handcrafted Sets',
    stockStatus: 'In Stock • Ships Worldwide in 24h',
    description:
      "Handcrafted Grade 6A pure 22-Momme Mulberry silk loungewear suit in signature Nordic sky blue with burgundy piping, paired with Thane Rivers' iconic double-fired artisanal stoneware ceramic mug.",
    image: LUXURY_IMAGES.silkPyjamasModel,
    images: [
      LUXURY_IMAGES.silkPyjamasModel,
      LUXURY_IMAGES.ceramicMugs,
    ],
    variants: ['Signature Nordic Sky Blue & Burgundy', 'Obsidian Shadow Edition', 'Frost Silver'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    whatsIncluded: [
      'Tailored Grade 6A 22-Momme Mulberry Silk Loungewear Shirt & Pants',
      'Artisanal Double-Fired Stoneware Ceramic Mug with Royal Blue Vortex Crest (400ml)',
      'Official Embossed White Thane Rivers Luxury Gift Bag & Protective Silk Travel Pouch',
      'Hand-Signed Serialized Certificate of Authenticity',
    ],
    craftsmanship: [
      '100% 22-Momme Grade 6A Organic Long-Strand Mulberry Silk (OEKO-TEX Standard 100)',
      'Artisanal stoneware fired twice at 1,280°C for thermal perfection and rich glaze durability',
      'Hand-finished burgundy piping and athletic bespoke seam reinforcement',
      'Laser-etched numbered edition label on the interior hemline',
    ],
    deliverySecurity: [
      'Complimentary express insured courier delivery worldwide via DHL Express Priority',
      'Discreet luxury outer packaging with tamper-evident security holographic seal',
      '24/7 dedicated personal concierge support via support@thaneriver.shop',
    ],
    features: [
      {
        title: '22-Momme Silk',
        description: 'Grade 6A pure organic Mulberry silk for supreme restorative sleep.',
        icon: 'Globe',
      },
      {
        title: 'Artisan Ceramic Mug',
        description: 'Hand-thrown stoneware mug preserves roasting notes and warmth.',
        icon: 'Coffee',
      },
      {
        title: 'Bespoke Tailoring',
        description: 'Athletic tailored fit with contrast piping and elastic drawstring waist.',
        icon: 'Sparkles',
      },
      {
        title: 'Luxury Gift Bag',
        description: 'Arrives in our signature embossed white thanerivers shopping bag.',
        icon: 'Gift',
      },
    ],
    specifications: [
      'Top & Trousers: 100% 22-Momme Grade 6A Organic Mulberry Silk',
      'Mug: Handcrafted double-fired ceramic stoneware, 400ml capacity',
      'Branding: Royal blue concentric vortex mark & thanerivers typography',
      'Includes: Custom luxury gift shopping bag & silk storage pouch',
    ],
  },
  {
    id: 'vip-member-card',
    name: 'VIP Member Card',
    subtitle: 'Serialized Titanium Card + Complete Pinjamas & Ceramic Mug Merch Suite',
    price: 2099,
    tag: 'VIP MEMBERSHIP',
    badge: 'VIP MEMBERSHIP',
    editionNumber: 'Serialized Titanium NFC Card #014 / 200',
    stockStatus: 'Limited Allocation • 9 Cards Remaining',
    description:
      "Official serialized titanium VIP membership card granting exclusive visual and backstage access to Thane Rivers, bundled with the complete Pinjamas & Mug merch combo.",
    image: LUXURY_IMAGES.vipMembershipCard,
    images: [
      LUXURY_IMAGES.vipMembershipCard,
      LUXURY_IMAGES.silkPyjamasModel,
      LUXURY_IMAGES.ceramicMugs,
    ],
    variants: ['Titanium & 24K Gold Accent', 'Damascus Brushed Steel', 'Frosted Obsidian Titanium'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    whatsIncluded: [
      'Heavyweight Serialized Aerospace-Grade Titanium VIP Member Card',
      'Encrypted Cryptographic NFC Chip for Instant Backstage Verification & Access',
      'Complete Thane Rivers Pinjamas & Ceramic Mug Suite ($999 Value Included)',
      'VIP Backstage & Soundcheck Pass for All Global Thane Rivers Arena Tours',
      'Direct Invitation to Thane Rivers Inner Circle Telegram Broadcast',
      'Custom Walnut & Velvet Collector Presentation Display Case',
    ],
    craftsmanship: [
      'CNC-milled Grade 5 aerospace titanium alloy with laser-engraved serial number',
      'Waterproof high-frequency cryptographic NFC transponder embedded into the core',
      'Complete tailored silk suit in your chosen size and hand-fired ceramic mug',
      'Annual private invitation to the Thane Rivers Summer Solstice Gala',
    ],
    deliverySecurity: [
      'Armored courier dispatch with direct ID and recipient signature required',
      'Full value insured global transport with live concierge GPS tracking',
      'Dedicated VIP Client Relations Officer available at support@thaneriver.shop',
    ],
    features: [
      {
        title: 'Titanium VIP Card',
        description: 'Heavyweight serialized card with cryptographic NFC verification.',
        icon: 'CreditCard',
      },
      {
        title: 'Full Merch Suite',
        description: 'Includes the complete Silk Pinjamas & Ceramic Mug combo ($999 value).',
        icon: 'Package',
      },
      {
        title: 'Backstage Tour Pass',
        description: 'Guaranteed VIP guest-list and private backstage access at any tour stop.',
        icon: 'Zap',
      },
      {
        title: 'Inner Circle Channel',
        description: 'Direct access to Thane’s private broadcast and early vault drops.',
        icon: 'Lock',
      },
    ],
    specifications: [
      'Aerospace-grade titanium serialized card with NFC tap verification',
      'Complete Pinjamas & Ceramic Mug kit in custom luxury gift packaging',
      'Annual private invitation to Thane Rivers Valhalla Gala',
      '24/7 dedicated personal concierge for VIP members',
    ],
  },
  {
    id: '10-day-stay',
    name: '10-Day Stay with Thane Rivers',
    subtitle: 'Ultra-Exclusive Private Residency, Viking Mentorship & All-Inclusive Estate Stay',
    price: 4999,
    tag: 'EXCLUSIVE RESIDENCY',
    badge: 'EXCLUSIVE RESIDENCY',
    editionNumber: 'Strictly Limited to 12 Guests Annually',
    stockStatus: 'Private Screening Required • Booking Open for 2026',
    description:
      "10-day private all-inclusive residency with Thane Rivers at his private estate. Includes 1-on-1 Viking training and mentorship, Michelin private dining, VIP Member Card access, and the complete Pinjamas & Mug collector's suite.",
    image: LUXURY_IMAGES.luxuryMansion,
    images: [
      LUXURY_IMAGES.luxuryMansion,
      LUXURY_IMAGES.vipMembershipCard,
      LUXURY_IMAGES.silkPyjamasModel,
      LUXURY_IMAGES.ceramicMugs,
    ],
    variants: ['Private Fjord Estate (Norway)', 'Alpine Sanctuary (Switzerland)', 'Beverly Hills Compound (USA)'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    whatsIncluded: [
      '10 Days / 9 Nights Private Luxury Villa Accommodations on Thane Rivers’ Estate',
      'Daily 1-on-1 Viking Strength, Mindset, and Breathwork Mentorship with Thane',
      'All-Inclusive Michelin-Trained Private Chef Culinary Program & Nutrition Protocol',
      'Official Serialized Titanium VIP Member Card with Lifetime Backstage Privileges',
      'The Complete Collector’s Merch Wardrobe Suite (Custom Silk Suites & Mugs for Party)',
      'Private Chauffeur & Helicopter Airport Transfers',
    ],
    craftsmanship: [
      'Bespoke athletic program tailored to your physical peak and recovery capacity',
      'Full access to estate wellness spa, Finnish cedar sauna, and glacial cold plunge',
      'Tailor on-site for immediate custom measuring and monogramming of your silk wardrobe',
      'Strict confidentiality NDA & executive close-protection security detail',
    ],
    deliverySecurity: [
      'Private flight coordination and executive travel concierge service',
      'Pre-residency onboarding call and medical health clearance consultation',
      'Direct VIP booking dispatch processed privately through order@thaneriver.shop',
    ],
    features: [
      {
        title: '10 Days with Thane',
        description: 'Direct daily access, personal Viking strength training and mindset sessions.',
        icon: 'Compass',
      },
      {
        title: 'All-Inclusive Luxury',
        description: 'Private luxury fjord estate, private chauffeur, and Michelin chef dining included.',
        icon: 'Crown',
      },
      {
        title: 'Studio & Tour Access',
        description: 'Shadow Thane behind the scenes at arena shows and studio sessions.',
        icon: 'Award',
      },
      {
        title: 'Master Merch Suite',
        description: 'Custom tailored silk wardrobe, ceramic mugs, and signed memorabilia.',
        icon: 'Package',
      },
    ],
    specifications: [
      'Duration: 10 Days / 9 Nights all-inclusive private VIP residency',
      'Personal 1-on-1 strength and mental endurance training with Thane',
      'Includes 1x Serialized Titanium VIP Member Card & complete Pinjama combos',
      'Executive airport chauffeur, helicopter transfer & security detail included',
    ],
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    quote:
      "Purchased Thane's Pinjamas & Ceramic Mug Combo for my husband's 40th birthday. The 22-Momme silk quality is second to none, and drinking morning espresso from the Thane Rivers ceramic mug makes him feel like a Norse titan! He literally hasn't taken it off.",
    author: 'Elena Rostova',
    location: 'Munich, Germany',
    verifiedBuyer: true,
    productPurchased: "Thane's Pinjamas & Ceramic Mug Combo",
    rating: 5,
  },
  {
    id: 'rev-2',
    quote:
      "The VIP Member Card is the real deal. I got private backstage access to Thane during his European tour in London. The heavy titanium card has serious gravitas, and lounging in this sky-blue silk is pure heaven.",
    author: 'Marcus Sterling',
    location: 'London, UK',
    verifiedBuyer: true,
    productPurchased: 'VIP Member Card',
    rating: 5,
  },
  {
    id: 'rev-3',
    quote:
      "Spent 10 days at Thane Rivers' private estate. The training, the discipline, the Michelin dining sessions—it transformed my entire perspective on health, business, and life. Worth every penny of $4,999.",
    author: 'Henrik Dahl',
    location: 'Stockholm, Sweden',
    verifiedBuyer: true,
    productPurchased: '10-Day Stay with Thane Rivers',
    rating: 5,
  },
  {
    id: 'rev-4',
    quote:
      "I ordered the combo for my partner and me. Waking up in matching sky-blue silk and sipping our coffee from the stacked ceramic mugs is our new daily ritual. Thane's concierge team at support@thaneriver.shop is first class.",
    author: 'Chloe & Dominic V.',
    location: 'Zurich, Switzerland',
    verifiedBuyer: true,
    productPurchased: "Thane's Pinjamas & Ceramic Mug Combo",
    rating: 5,
  },
  {
    id: 'rev-5',
    quote:
      "The attention to detail is mind-blowing. The mug balance, the royal blue vortex glaze, the pure silk with burgundy piping—everything screams superstar craftsmanship. Thane doesn't cut corners.",
    author: 'Bradford Vance',
    location: 'Los Angeles, USA',
    verifiedBuyer: true,
    productPurchased: 'VIP Member Card',
    rating: 5,
  },
];

export const WIREFRAME_TILES = [
  {
    id: 'tile-1',
    title: "Thane's Morning Ritual",
    badge: 'VIEW',
    image: LUXURY_IMAGES.ceramicMugs,
    action: 'view_ritual',
    subtitle: 'Artisan Ceramic Stoneware',
  },
  {
    id: 'tile-2',
    title: "Thane's Pinjamas & Mug Combo",
    badge: 'SHOP',
    price: '$999',
    productId: 'pyjamas-mug-combo',
    image: LUXURY_IMAGES.silkPyjamasModel,
    subtitle: '22-Momme Silk & Stoneware Mug',
  },
  {
    id: 'tile-3',
    title: '10-Day Stay with Thane Rivers',
    badge: 'SHOP',
    price: '$4,999',
    productId: '10-day-stay',
    image: LUXURY_IMAGES.luxuryMansion,
    subtitle: 'Ultra-Exclusive Private Residency',
  },
  {
    id: 'tile-4',
    title: 'VIP Member Card',
    badge: 'SHOP',
    price: '$2,099',
    productId: 'vip-member-card',
    image: LUXURY_IMAGES.vipMembershipCard,
    subtitle: 'Titanium Pass + Merch Suite',
  },
];

export const MARQUEE_WORDS = [
  'VIKING POWER',
  'TITAN STRENGTH',
  'ROYAL SILK',
  'ARTISANAL CERAMIC',
  'VIP MEMBER CARD',
  'THANE RIVERS',
  'NORSE LEGEND',
  'SUPERSTAR MINDSET',
  '10-DAY RESIDENCY',
  'UNSTOPPABLE DISCIPLINE',
  'VALHALLA COMFORT',
];
