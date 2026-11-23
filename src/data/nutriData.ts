export type PrepRequirement = 'no-cook' | 'boiling-water';

export type DietaryTag =
  | 'Halal'
  | 'Kosher'
  | 'Vegan'
  | 'Infant Safe'
  | 'Allergen-Free'
  | 'Soft Texture';

export interface RationPack {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  image: string;
  kcal: number;
  proteinGrams: number;
  servings: number;
  shelfLifeDays: number;
  prep: PrepRequirement;
  prepSummary: string;
  waterRequiredLiters: number;
  dietaryTags: DietaryTag[];
  allergenNotice?: {
    severity: 'warning' | 'critical';
    text: string;
  };
  boilWaterAdvisory?: string;
  status: 'In Stock' | 'Low Stock';
  contents: string[];
  prepSteps: string[];
  nutritionPerServing: {
    energy: string;
    protein: string;
    carbs: string;
    fat: string;
    sodium: string;
  };
}

export interface DistributionHub {
  id: string;
  name: string;
  district: string;
  address: string;
  transitNote: string;
  hoursToday: string;
  isOpenNow: boolean;
  stepFreeAccess: boolean;
  boilWaterZone: boolean;
  infantStockReady: boolean;
  mealsAvailableToday: number;
  languagesSpoken: string[];
  stockedRationIds: string[];
}

export interface FoodTriageItem {
  id: string;
  category: string;
  scenario: string;
  verdict: 'safe' | 'cook-now' | 'discard';
  verdictLabel: string;
  guidance: string;
}

export const IMAGES = {
  heroPantry: '/src/assets/images/hero_community_pantry_1795438188898.jpg',
  noCookPack: '/src/assets/images/ration_nocook_pack_1795438188282.jpg',
  warmMeal: '/src/assets/images/ration_warm_meal_1795438188375.jpg',
  safeWater: '/src/assets/images/safe_water_prep_1795438188805.jpg',
};

export const RATION_PACKS: RationPack[] = [
  {
    id: 'nocook-24h',
    code: 'NR-01',
    name: '24-Hour No-Cook Sustenance Pack',
    subtitle: 'Ready-to-eat sealed pouches, fortified oat cakes, and potable water cartons',
    image: IMAGES.noCookPack,
    kcal: 2200,
    proteinGrams: 72,
    servings: 3,
    shelfLifeDays: 365,
    prep: 'no-cook',
    prepSummary: 'Eat directly from sealed pouches. Zero heating or extra water required.',
    waterRequiredLiters: 0,
    dietaryTags: ['Halal', 'Vegan', 'Allergen-Free'],
    status: 'In Stock',
    contents: [
      '2x Ready-to-eat spiced chickpea & quinoa pouches (300g each)',
      '4x Fortified sunflower seed & oat energy cakes',
      '2x Roasted pumpkin seed butter sachets (zero tree nuts or peanuts)',
      '3x 500ml sterile aseptic drinking water cartons',
    ],
    prepSteps: [
      'Inspect outer pouch seals for punctures or swelling before opening.',
      'Tear open along the top notch and consume directly with the included wooden spoon.',
      'Drink included 500ml water cartons steadily across the day rather than all at once.',
      'Keep opened unfinished portions cool and consume within 4 hours.',
    ],
    nutritionPerServing: {
      energy: '733 kcal',
      protein: '24 g',
      carbs: '98 g',
      fat: '26 g',
      sodium: '410 mg',
    },
  },
  {
    id: 'halal-lentil-kit',
    code: 'NR-02',
    name: 'Halal Warm Lentil & Grain Family Kit',
    subtitle: 'Hearty red lentil, brown rice, and root vegetable dry blend for warm meals',
    image: IMAGES.warmMeal,
    kcal: 3600,
    proteinGrams: 132,
    servings: 6,
    shelfLifeDays: 540,
    prep: 'boiling-water',
    prepSummary: 'Requires 1.8L of boiled safe water and 12 minutes covered simmering or steeping.',
    waterRequiredLiters: 1.8,
    dietaryTags: ['Halal', 'Vegan', 'Allergen-Free'],
    boilWaterAdvisory: 'Use only boiled or disinfected water to hydrate this kit.',
    status: 'In Stock',
    contents: [
      '1x Vacuum-sealed pre-cooked quick-hydrate red lentil & brown rice blend (900g)',
      '1x Dehydrated carrot, pumpkin, and herb seasoning sachet',
      '1x Cold-pressed olive oil packet (90ml)',
    ],
    prepSteps: [
      'Bring 1.8 liters of clean or boiled water to a full rolling boil for at least 1 minute.',
      'Stir in the dry lentil-rice blend and vegetable seasoning sachet.',
      'Cover tightly, reduce heat or remove from stove, and steep 12 minutes until tender.',
      'Drizzle olive oil packet after steeping for essential fatty acids.',
    ],
    nutritionPerServing: {
      energy: '600 kcal',
      protein: '22 g',
      carbs: '94 g',
      fat: '14 g',
      sodium: '380 mg',
    },
  },
  {
    id: 'infant-maternal-pack',
    code: 'NR-03',
    name: 'Infant & Maternal Ready-Feed Pack',
    subtitle: 'Sterile ready-to-feed infant liquid bottles plus maternal iron-folate bars',
    image: IMAGES.safeWater,
    kcal: 1950,
    proteinGrams: 58,
    servings: 6,
    shelfLifeDays: 180,
    prep: 'no-cook',
    prepSummary: 'Ready-to-feed sterile liquid requires zero water mixing—safe during boil notices.',
    waterRequiredLiters: 0,
    dietaryTags: ['Infant Safe', 'Halal', 'Kosher'],
    allergenNotice: {
      severity: 'warning',
      text: 'Contains cow milk protein (infant formula). Soy-based dairy-free infant option available on request at hub desk.',
    },
    status: 'In Stock',
    contents: [
      '12x 200ml Ready-to-feed sterile infant formula bottles with single-use clean nipples',
      '4x Maternal oat, date, and sesame iron-folate nourishment bars',
      '2x WHO-standard oral rehydration salt (ORS) sachets for caregiver backup',
    ],
    prepSteps: [
      'Wash or sanitize hands before twisting open the sterile bottle cap.',
      'Attach single-use nipple directly—never dilute ready-to-feed liquid with tap water.',
      'Discard any formula left in a bottle more than 2 hours after feeding starts.',
      'Do not use microwave heating; warm gently in clean water if desired, or serve at room temperature.',
    ],
    nutritionPerServing: {
      energy: '325 kcal',
      protein: '9.6 g',
      carbs: '38 g',
      fat: '15 g',
      sodium: '140 mg',
    },
  },
  {
    id: 'kosher-allergen-safe',
    code: 'NR-04',
    name: 'Kosher Allergen-Free Dry Ration Box',
    subtitle: 'Top-9 allergen-free certified kosher meals with sealed fruit puree & grains',
    image: IMAGES.noCookPack,
    kcal: 2400,
    proteinGrams: 64,
    servings: 4,
    shelfLifeDays: 420,
    prep: 'no-cook',
    prepSummary: 'Ready to eat. Certified free of gluten, dairy, soy, nuts, eggs, and sesame.',
    waterRequiredLiters: 0,
    dietaryTags: ['Kosher', 'Vegan', 'Allergen-Free'],
    status: 'In Stock',
    contents: [
      '2x Certified kosher white bean & tomato stew pouches (no heating needed)',
      '4x Unsweetened apple & pear puree pouches',
      '4x Buckwheat & millet crisp packs (gluten-free facility)',
      '2x 500ml sealed mineral water cartons',
    ],
    prepSteps: [
      'Confirm intact tamper-evident kosher certification seal on outer carton.',
      'Open pouches cleanly with included tear notch; serve directly or warm in hot water bath.',
      'Store unopened pouches away from direct sunlight.',
    ],
    nutritionPerServing: {
      energy: '600 kcal',
      protein: '16 g',
      carbs: '104 g',
      fat: '11 g',
      sodium: '340 mg',
    },
  },
  {
    id: 'senior-soft-hydration',
    code: 'NR-05',
    name: 'Elder & Soft-Texture Hydration Kit',
    subtitle: 'Easy-to-chew nutrient-dense soups, fruit compotes, and low-sodium electrolytes',
    image: IMAGES.warmMeal,
    kcal: 2050,
    proteinGrams: 76,
    servings: 4,
    shelfLifeDays: 300,
    prep: 'boiling-water',
    prepSummary: 'Best served warm using 1.0L boiled water, or eat fruit compotes straight from cup.',
    waterRequiredLiters: 1.0,
    dietaryTags: ['Soft Texture', 'Allergen-Free', 'Halal'],
    boilWaterAdvisory: 'If local boil-water notice is active, boil mixing water for 1 full minute first.',
    status: 'Low Stock',
    contents: [
      '4x High-protein smooth split-pea & squash puree soup sachets',
      '4x Soft pear & cinnamon fortified compote cups',
      '4x Low-sodium balanced hydration drink mix sticks',
    ],
    prepSteps: [
      'Dissolve hydration sticks only in confirmed safe or boiled-and-cooled drinking water.',
      'Whisk soup sachet into 250ml hot boiled water per serving and let stand 3 minutes.',
      'Check temperature carefully before serving to older adults or individuals with dysphagia.',
    ],
    nutritionPerServing: {
      energy: '512 kcal',
      protein: '19 g',
      carbs: '78 g',
      fat: '12 g',
      sodium: '240 mg',
    },
  },
  {
    id: 'plant-protein-box',
    code: 'NR-06',
    name: 'Plant-Forward High-Protein Grain Box',
    subtitle: 'Hemp-seed oat porridge, savory black bean cups, and roasted soy-free bites',
    image: IMAGES.noCookPack,
    kcal: 2700,
    proteinGrams: 96,
    servings: 4,
    shelfLifeDays: 365,
    prep: 'no-cook',
    prepSummary: 'Fully cooked and sealed; ready immediately with zero water or cooking fuel.',
    waterRequiredLiters: 0,
    dietaryTags: ['Vegan', 'Halal', 'Kosher'],
    allergenNotice: {
      severity: 'critical',
      text: 'Allergen Warning: Contains sesame tahini and tree nuts (walnuts) in savory trail packets.',
    },
    status: 'In Stock',
    contents: [
      '2x Ready-to-eat black bean, corn & lime grain bowls',
      '4x Rolled oat & hemp-heart breakfast cups (pre-hydrated)',
      '4x Fig, walnut & sesame tahini energy squares',
    ],
    prepSteps: [
      'Check household allergy list before opening the walnut & sesame energy squares.',
      'Grain bowls and oat cups can be eaten cold straight from the peel-back lid.',
      'Reseal unused energy squares tightly to maintain freshness for up to 48 hours.',
    ],
    nutritionPerServing: {
      energy: '675 kcal',
      protein: '24 g',
      carbs: '86 g',
      fat: '24 g',
      sodium: '390 mg',
    },
  },
];

export const DISTRIBUTION_HUBS: DistributionHub[] = [
  {
    id: 'hub-cedar-hall',
    name: 'Cedar Commons Civic Hall',
    district: 'Eastside Corridor',
    address: '412 Cedar Park Avenue (Main Ground Entrance)',
    transitNote: '2 min walk from Metro Line B · Cedar Station',
    hoursToday: '07:00 – 21:00',
    isOpenNow: true,
    stepFreeAccess: true,
    boilWaterZone: false,
    infantStockReady: true,
    mealsAvailableToday: 1480,
    languagesSpoken: ['English', 'Español', 'العربية'],
    stockedRationIds: ['nocook-24h', 'halal-lentil-kit', 'infant-maternal-pack', 'kosher-allergen-safe'],
  },
  {
    id: 'hub-riverbend-school',
    name: 'Riverbend Community School Gym',
    district: 'South Basin',
    address: '89 Riverbend Boulevard (North Ramp Door)',
    transitNote: 'Bus Routes 14 & 22 stop directly outside gate',
    hoursToday: '08:00 – 20:00',
    isOpenNow: true,
    stepFreeAccess: true,
    boilWaterZone: true,
    infantStockReady: true,
    mealsAvailableToday: 960,
    languagesSpoken: ['English', 'Tiếng Việt', 'Español'],
    stockedRationIds: ['nocook-24h', 'infant-maternal-pack', 'senior-soft-hydration', 'plant-protein-box'],
  },
  {
    id: 'hub-harbor-library',
    name: 'Harbor Branch Public Library',
    district: 'West Pier',
    address: '150 Harbor Walk (West Courtyard)',
    transitNote: '5 min walk from Ferry Terminal Plaza',
    hoursToday: '09:00 – 19:00',
    isOpenNow: true,
    stepFreeAccess: true,
    boilWaterZone: true,
    infantStockReady: false,
    mealsAvailableToday: 620,
    languagesSpoken: ['English', 'Français', 'العربية'],
    stockedRationIds: ['nocook-24h', 'kosher-allergen-safe', 'plant-protein-box'],
  },
  {
    id: 'hub-oakridge-clinic',
    name: 'Oakridge Neighborhood Clinic Pavilion',
    district: 'North Hills',
    address: '720 Oakridge Terrace (Garden Tent)',
    transitNote: 'Shuttle Loop North · Stops every 20 min',
    hoursToday: '06:30 – 22:00',
    isOpenNow: true,
    stepFreeAccess: false,
    boilWaterZone: false,
    infantStockReady: true,
    mealsAvailableToday: 1120,
    languagesSpoken: ['English', 'Español', 'Français', 'Tiếng Việt'],
    stockedRationIds: ['nocook-24h', 'halal-lentil-kit', 'infant-maternal-pack', 'senior-soft-hydration'],
  },
  {
    id: 'hub-midtown-market',
    name: 'Midtown Covered Market Shed',
    district: 'Central District',
    address: '305 Market Arcade (Bays 1–4)',
    transitNote: 'Adjacent to Central Tram Hub',
    hoursToday: '10:00 – 18:00',
    isOpenNow: false,
    stepFreeAccess: true,
    boilWaterZone: false,
    infantStockReady: true,
    mealsAvailableToday: 540,
    languagesSpoken: ['English', 'Español'],
    stockedRationIds: ['nocook-24h', 'halal-lentil-kit', 'kosher-allergen-safe', 'plant-protein-box'],
  },
];

export const WATER_DOSAGE_TABLE = [
  {
    volumeLabel: '1 Liter (1 Quart)',
    liters: 1,
    boilSeaLevel: '1 full minute rolling boil',
    boilHighAlt: '3 full minutes (above 2,000m / 6,500ft)',
    bleachClearDrops: '2 drops (0.1 ml)',
    bleachCloudyDrops: '4 drops after filtering through clean cloth',
    waitMinutes: 30,
  },
  {
    volumeLabel: '4 Liters (1 Gallon)',
    liters: 4,
    boilSeaLevel: '1 full minute rolling boil',
    boilHighAlt: '3 full minutes (above 2,000m / 6,500ft)',
    bleachClearDrops: '8 drops (~1/8 teaspoon)',
    bleachCloudyDrops: '16 drops (~1/4 teaspoon) after cloth filtration',
    waitMinutes: 30,
  },
  {
    volumeLabel: '20 Liters (5 Gallons)',
    liters: 20,
    boilSeaLevel: '1 full minute rolling boil',
    boilHighAlt: '3 full minutes (above 2,000m / 6,500ft)',
    bleachClearDrops: '40 drops (1/2 teaspoon / 2.5 ml)',
    bleachCloudyDrops: '80 drops (1 teaspoon / 5 ml) after settling',
    waitMinutes: 30,
  },
];

export const FOOD_TRIAGE_ITEMS: FoodTriageItem[] = [
  {
    id: 'triage-dairy-meat',
    category: 'Refrigerated Perishables',
    scenario: 'Milk, meat, poultry, eggs, or cooked leftovers held above 4°C (40°F) for over 4 hours',
    verdict: 'discard',
    verdictLabel: 'Discard Immediately',
    guidance: 'Bacteria multiply rapidly above 4°C even if food smells and looks normal. Never taste to test.',
  },
  {
    id: 'triage-freezer-crystals',
    category: 'Freezer Inventory',
    scenario: 'Frozen meats or meals that still contain visible ice crystals and feel cold (≤ 4°C)',
    verdict: 'cook-now',
    verdictLabel: 'Safe to Cook or Refreeze',
    guidance: 'A full closed freezer keeps food safe up to 48 hours (24 hours if half-full). Cook thoroughly before eating.',
  },
  {
    id: 'triage-intact-produce',
    category: 'Whole Produce & Bread',
    scenario: 'Whole uncut apples, citrus, carrots, peanut butter, and dry bread kept dry',
    verdict: 'safe',
    verdictLabel: 'Safe at Room Temperature',
    guidance: 'Wash whole produce with boiled or disinfected water before peeling or slicing.',
  },
  {
    id: 'triage-damaged-cans',
    category: 'Canned & Pouched Goods',
    scenario: 'Cans that are visibly swollen, deeply dented along the seam, rusted through, or leaking',
    verdict: 'discard',
    verdictLabel: 'Discard — Botulism Hazard',
    guidance: 'Intact undamaged cans remain safe; sanitize exteriors with clean water before opening if exposed to floodwater.',
  },
];
