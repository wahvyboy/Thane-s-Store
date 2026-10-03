import { Product, Review } from '../types';

// EXCLUSIVELY using the two uploaded luxury brand photographs
export const LUXURY_IMAGES = {
  silkPyjamasModel: '/src/assets/images/thane_silk_pyjamas_model_1790860264040.jpg',
  ceramicMugs: '/src/assets/images/thane_luxury_ceramic_mugs_1790860245177.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'pyjamas-cup-combo',
    name: "Thane's Pinjamas & Cup Combo",
    subtitle: 'Pure Mulberry Silk Loungewear Suit & Handcrafted Ceramic Mug',
    price: 999,
    tag: 'SIGNATURE COMBO',
    description:
      "Handcrafted Grade 6A pure 22-Momme Mulberry silk sleepwear in signature Nordic sky blue with burgundy piping, paired with Thane Rivers' iconic double-fired artisanal stoneware ceramic mug branded with royal blue insignia and the concentric vortex mark.",
    image: LUXURY_IMAGES.silkPyjamasModel,
    variants: ['Sky Blue & Burgundy Piping', 'Obsidian Black Edition', 'Nordic Frost Silver'],
    features: [
      {
        title: '22-Momme Silk',
        description: 'Grade 6A pure organic Mulberry silk for supreme restorative sleep.',
        icon: 'Globe',
      },
      {
        title: 'Artisan Ceramic Cup',
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
      'Cup: Handcrafted double-fired ceramic stoneware, 400ml capacity',
      'Branding: Royal blue concentric vortex mark & thanerivers typography',
      'Includes: Custom luxury gift shopping bag & silk storage pouch',
    ],
  },
  {
    id: 'vip-membership-card',
    name: "VIP Titan Membership Card",
    subtitle: 'Includes Full Pinjamas & Ceramic Cup Merch Suite',
    price: 2099,
    tag: 'MOST POPULAR',
    description:
      "Official serialized titanium VIP Titan membership card granting lifetime priority backstage access to Thane Rivers world tours, private inner circle Telegram updates, plus the complete Pinjamas and Ceramic Cup merchandise bundle.",
    image: LUXURY_IMAGES.ceramicMugs,
    variants: ['Matte Black & 24K Gold', 'Brushed Damascus Steel', 'Frosted Titanium'],
    features: [
      {
        title: 'Metal VIP Titan Card',
        description: 'Heavyweight serialized card with cryptographic NFC verification.',
        icon: 'CreditCard',
      },
      {
        title: 'Full Merch Suite',
        description: 'Includes the complete Silk Pinjamas & Ceramic Cup combo ($999 value).',
        icon: 'Package',
      },
      {
        title: 'Backstage Tour Pass',
        description: 'Guaranteed VIP guest-list and private backstage access at any tour stop.',
        icon: 'Zap',
      },
      {
        title: 'Inner Circle Channel',
        description: 'Direct access to Thane’s private Telegram broadcast and early vault drops.',
        icon: 'Lock',
      },
    ],
    specifications: [
      'Aerospace-grade titanium serialized card with NFC tap verification',
      'Complete Pinjamas & Ceramic Cup kit in custom luxury gift packaging',
      'Annual private invitation to Thane Rivers Valhalla Gala',
      '24/7 dedicated personal concierge for VIP members',
    ],
  },
  {
    id: 'one-week-superstar',
    name: "One Week with the Superstar",
    subtitle: '7-Day All-Inclusive Private Retreat in Norway with Thane Rivers',
    price: 3499,
    tag: 'ULTIMATE VIP EXPERIENCE',
    description:
      "An ultra-exclusive 7-day personal experience with Thane Rivers. Train like a Viking titan, dine at world-class private tables, shadow Thane backstage, and receive 1-on-1 personal mentorship and the complete collector's merchandise suite.",
    image: LUXURY_IMAGES.silkPyjamasModel,
    variants: ['Oslo Private Fjord Estate', 'Reykjavik Expedition', 'Los Angeles Penthouse'],
    features: [
      {
        title: '7 Days with Thane',
        description: 'Direct daily access, personal Viking strength training and mindset sessions.',
        icon: 'Compass',
      },
      {
        title: 'All-Inclusive Luxury',
        description: '5-star private fjord estate, private chauffeur, and chef dining included.',
        icon: 'Star',
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
      'Duration: 7 Days / 6 Nights all-inclusive VIP stay',
      'Personal 1-on-1 strength and mental endurance training with Thane',
      'Includes 2x VIP Titan Membership cards & 4x Pinjama combos for your party',
      'Concierge flight arrangement and private security detail',
    ],
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    quote:
      "Purchased Thane's Pinjama & Cup set for my husband's 40th birthday. The silk quality is second to none, and drinking morning espresso from the Thane Rivers ceramic mug makes him feel like a Nordic king! He literally hasn't taken it off.",
    author: 'Elena Rostova',
    location: 'Munich, Germany',
    verifiedBuyer: true,
    productPurchased: "Thane's Pinjamas & Cup Combo",
    rating: 5,
  },
  {
    id: 'rev-2',
    quote:
      "The VIP Titan Membership is the real deal. I got private access to Thane during his European tour in London. The heavy card has serious presence, and lounging in this sky-blue silk is pure heaven.",
    author: 'Marcus Sterling',
    location: 'London, UK',
    verifiedBuyer: true,
    productPurchased: 'VIP Titan Membership Card',
    rating: 5,
  },
  {
    id: 'rev-3',
    quote:
      "Spent 7 days in Norway with Thane Rivers. The training, the discipline, the private dinner sessions—it transformed my entire perspective on fitness and life. Worth ten times the price.",
    author: 'Henrik Dahl',
    location: 'Stockholm, Sweden',
    verifiedBuyer: true,
    productPurchased: 'One Week with the Superstar',
    rating: 5,
  },
  {
    id: 'rev-4',
    quote:
      "I ordered the Lovers Gifting twin set for my partner and me. Waking up in matching sky-blue silk and sipping our coffee from the stacked ceramic mugs is our new daily ritual. Thane's team is first class.",
    author: 'Chloe & Dominic V.',
    location: 'Zurich, Switzerland',
    verifiedBuyer: true,
    productPurchased: 'Lovers Gifting Set',
    rating: 5,
  },
  {
    id: 'rev-5',
    quote:
      "The attention to detail is mind-blowing. The double-mug balance, the blue logo glaze, the pure silk with red piping—everything screams superstar craftsmanship. Thane doesn't cut corners.",
    author: 'Bradford Vance',
    location: 'Los Angeles, USA',
    verifiedBuyer: true,
    productPurchased: "Thane's Pinjamas & Cup Combo",
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
    subtitle: 'Artisan Ceramic Cups',
  },
  {
    id: 'tile-2',
    title: 'Sky Blue Silk Pyjama Suit',
    badge: 'SHOP',
    price: '$999',
    productId: 'pyjamas-cup-combo',
    image: LUXURY_IMAGES.silkPyjamasModel,
    subtitle: 'Grade 6A Mulberry Silk',
  },
  {
    id: 'tile-3',
    title: 'Thane Rivers Superstar Edition',
    badge: 'SHOP',
    price: '$3,499',
    productId: 'one-week-superstar',
    image: LUXURY_IMAGES.silkPyjamasModel,
    subtitle: '7-Day All-Inclusive VIP',
  },
  {
    id: 'tile-4',
    title: 'VIP Titan Membership Suite',
    badge: 'SHOP',
    price: '$2,099',
    productId: 'vip-membership-card',
    image: LUXURY_IMAGES.ceramicMugs,
    subtitle: 'Card + Full Merch Bundle',
  },
  {
    id: 'tile-5',
    title: 'Lovers Gifting Vault',
    badge: 'VIEW',
    image: LUXURY_IMAGES.silkPyjamasModel,
    action: 'lovers_gifting',
    subtitle: 'Curated for Power Couples',
  },
];

export const MARQUEE_WORDS = [
  'VIKING POWER',
  'TITAN STRENGTH',
  'ROYAL SILK',
  'ARTISANAL CERAMIC',
  'VIP BACKSTAGE PASS',
  'THANE RIVERS',
  'NORSE LEGEND',
  'SUPERSTAR MINDSET',
  'ALL-INCLUSIVE RETREAT',
  'UNSTOPPABLE DISCIPLINE',
  'VALHALLA COMFORT',
];
