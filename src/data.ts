import { Product, UserProfile, Order, HeritageStory } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'kashmiri-saffron',
    title: 'Kashmiri Saffron',
    subtitle: 'Grade Lalgul Heritage Sourced',
    description: 'Sourced from the glacial-fed soil of Pampore, saffron threads of exceptional crocin potency, hand-plucked at dawn.',
    longDescription: 'Our Kashmiri Saffron represents the absolute pinnacle of Single Origin spices. Hand-harvested in the legendary town of Pampore from the Crocus sativus blossoms, only three crimson stigmas are gathered from each flower. With an industry-leading Crocin level (potency index of 240+), its aroma is remarkably complex, loaded with honey-like warmth and rich, earthy leather overtones. Each batch is serial-numbered and packaged in custom airtight amber glass to prevent oxidation.',
    price: 380, // for 1g
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 124,
    heatLevel: 'None',
    origin: 'Pampore, Kashmir Valley',
    category: 'Single Origin',
    weightOptions: ['1g', '3g', '5g'],
    baseWeightIndex: 0,
    provenance: {
      grower: 'Mir Heritage Family Farm',
      altitude: '1,620 meters above sea level',
      harvest: 'Late Autumn (Dawn plucking)',
      process: 'Traditional elevated solar-shade drying'
    },
    usageStorage: {
      aroma: 'Sublime honeyed incense combined with raw wood, leather, and cut hay.',
      pairing: 'Royal Biryani, festive kheer, kesar milk, saffron-infused almond broths, and elevated pilafs.',
      storage: 'Keep in our original airtight amber vessel in a dark, temperate drawer. Avoid heat and direct sunlight.'
    },
    inStock: true,
    tag: 'Heritage Reserve'
  },
  {
    id: 'tellicherry-black-pepper',
    title: 'Tellicherry Black Pepper',
    subtitle: 'Aged TGSEB Bold Berries',
    description: 'Sun-dried, vine-ripened Malabar berries of exceptional size and intense citrus-pine complexity, aged to perfection.',
    longDescription: 'Culled from the highest vine elevations in Kerala, our Tellicherry Garbled Special Extra Bold (TGSEB) pepper represents the absolute gold standard of heat. These berries are allowed to mature on the vine far longer than standard peppercorns, capturing intense sugars that develop a sweet, citrus-pine and deeply fragrant, woody complexity. Once hand-plucked, the berries are naturally sun-dried on organic rush mats and aged for months in specialized temperature-regulated spice cellars.',
    price: 240, // for 100g
    images: [
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 86,
    heatLevel: 'Mild',
    origin: 'Wayanad, Malabar Coast',
    category: 'Single Origin',
    weightOptions: ['50g', '100g', '250g'],
    baseWeightIndex: 1,
    provenance: {
      grower: 'Malabar Highlands Cooperative',
      altitude: '1,100 meters above sea level',
      harvest: 'Mid Winter (Fully ripened)',
      process: 'Traditional yard-sun curing & cellared conditioning'
    },
    usageStorage: {
      aroma: 'Intensely sharp, forest floor, resinous pine, with distinct notes of dehydrated lime peel.',
      pairing: 'Cacio e pepe, braised lamb, heritage garam masala bases, and fresh citrus salad dressings.',
      storage: 'Store as whole berries in a dry, cool jar. Grind freshly at the very last moment of cooking to preserve volatile oils.'
    },
    inStock: true,
    tag: 'Bestseller'
  },
  {
    id: 'lakadong-turmeric',
    title: 'Lakadong Turmeric',
    subtitle: 'High Curcumin (7-9%) Gold Roots',
    description: 'Grown in the pristine Jaintia Hills of Meghalaya, this legendary yellow root contains world-class curcumin levels.',
    longDescription: 'Sourced from the remote village of Lakadong in Meghalaya, our turmeric is renowned for having double to triple the curcumin concentration of ordinary commercial turmeric. It is farmed on family plots using organic heritage methods with pure sub-tropical rain filtration. The resulting powder has an intense, metallic golden color and deep pungent earthiness that lends exceptional flavor profile and healthy therapeutic qualities.',
    price: 180, // for 100g
    images: [
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608797178974-15b35a61d121?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.95,
    reviewsCount: 194,
    heatLevel: 'None',
    origin: 'Jaintia Hills, Meghalaya',
    category: 'Single Origin',
    weightOptions: ['100g', '250g', '500g'],
    baseWeightIndex: 0,
    provenance: {
      grower: 'Jaintia Hills Women Agriculturalist Group',
      altitude: '1,250 meters above sea level',
      harvest: 'Late Winter',
      process: 'Hand-scrubbed, solar-dried slice, and slow mill pulverized'
    },
    usageStorage: {
      aroma: 'Intensely earthy, woody, with sweet nutmeg back-notes.',
      pairing: 'Turmeric lattes (Golden Milk), curries, root vegetable roasts, and wild rice pilafs.',
      storage: 'Keep in a dark drawer inside our air-sealed ceramic container. Keep strictly away from light to prevent curcumin breakdown.'
    },
    inStock: true,
    tag: 'Signature'
  },
  {
    id: 'alleppey-green-cardamom',
    title: 'Alleppey Green Cardamom',
    subtitle: 'Bold 8mm+ Queen Pods',
    description: 'Hand-sorted sweet-resinous green pods harvested from the misty slopes of the Western Ghats, Kerala.',
    longDescription: 'Universally called the Queen of Spices, our Alleppey Cardamom features exceptionally large, emerald-green pods. Collected from selected high-canopy cardamom estates in Idukki and Alleppey, each pod must meet a rigid 8mm diameter sorting mandate. These capsules are packed with juicy black seeds filled with delicate fragrant eucalyptus and sweet citrus oils.',
    price: 290, // for 50g
    images: [
      'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.7,
    reviewsCount: 74,
    heatLevel: 'None',
    origin: 'Idukki Ghats, Kerala',
    category: 'Single Origin',
    weightOptions: ['50g', '100g', '250g'],
    baseWeightIndex: 0,
    provenance: {
      grower: 'Vandiperiyar Heritage Estates',
      altitude: '1,400 meters above sea level',
      harvest: 'Autumn (Hand picked only)',
      process: 'Slow fluid drying-shed curation to lock in green chlorophyll'
    },
    usageStorage: {
      aroma: 'Effervescent sweet pine, eucalyptus, camphor, and soft floral undertones.',
      pairing: 'Masala Chai, cardamom buns, royal curries, milk desserts, and gin infusion botanical lists.',
      storage: 'Keep whole pods sealed in their container; only open the outer husk right before use to extract freshest tasting seeds.'
    },
    inStock: true,
    tag: 'Limited Crop'
  },
  {
    id: 'guntur-sannam-chilli',
    title: 'Guntur Sannam Chilli',
    subtitle: 'S33 High Heat Crimson Pods',
    description: 'Dark crimson chillies sourced from the nutrient-rich fields of Andhra Pradesh, offering a searing heat and deep color.',
    longDescription: 'For those seeking authentic local heat, our Guntur Sannam (Type 33) chillies are sourced from the black cotton soil belt along the Krishna River in Andhra Pradesh. Prized for their robust capsaicin index combined with high natural redness value, these whole dry chillies offer deep smoky undertones beneath an immediate, sharp firing heat that clean-slices through proteins and carbohydrates.',
    price: 145, // for 100g
    images: [
      'https://images.unsplash.com/photo-1608797178974-15b35a61d121?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582401931326-25867375a024?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.88,
    reviewsCount: 110,
    heatLevel: 'Hot',
    origin: 'Guntur, Andhra Pradesh',
    category: 'Single Origin',
    weightOptions: ['100g', '250g', '500g'],
    baseWeightIndex: 0,
    provenance: {
      grower: 'Reddy Heritage Farms',
      altitude: '80 meters (River Basin Delta)',
      harvest: 'Late Summer peak crop',
      process: 'Field sun-ripened and custom de-seeded'
    },
    usageStorage: {
      aroma: 'Smoky, dry wood-cured, sharp pungent capsaicin notes.',
      pairing: 'Authentic Andhra curries, roasted marinades, fiery hot oils, and spicy pickles.',
      storage: 'Store strictly airtight in a cool dry spice rack. Do not open near eyes.'
    },
    inStock: true,
    tag: 'Fierce Heat'
  },
  {
    id: 'true-ceylon-cinnamon',
    title: 'True Ceylon Cinnamon',
    subtitle: 'Grade C5 Extra Special Quills',
    description: 'Paper-thin, delicate nested quills of soft sweet cinnamon, hand-planed in traditional southern coastal Sri Lanka.',
    longDescription: 'Unlike standard rough Cassia bark (which is often high in liver-toxic coumarin), our Ceylon Cinnamon consists of ultra-thin, delicate quills nested inside one another by seasoned cinnamon craftsmen. It yields a light brown, subtle, incredibly sweet and citrusy flavor profile that melts harmoniously on the palate, carrying virtually zero toxicity.',
    price: 280, // for 50g
    images: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.91,
    reviewsCount: 95,
    heatLevel: 'None',
    origin: 'Matara, Southern Sri Lanka',
    category: 'Single Origin',
    weightOptions: ['50g', '100g', '250g'],
    baseWeightIndex: 0,
    provenance: {
      grower: 'Wickramasinghe Forestry Plot',
      altitude: '150 meters (Coastal plain)',
      harvest: 'Monsoon Monsoon flush',
      process: 'Hand-scraped outer bark, inner wood hand-peeled, nested and shade-cured'
    },
    usageStorage: {
      aroma: 'Warm, exquisitely sweet, floral, with mild vanilla and clove undertone.',
      pairing: 'Fine pastries, warm cocoa, cinnamon-toasted oats, apple compotes, and classic biryani broth.',
      storage: 'Keep quills whole. Avoid breaking them down in storage to maintain volatile sweet oils.'
    },
    inStock: true,
    tag: 'True Origin'
  },
  {
    id: 'signature-garam-masala',
    title: 'Signature Garam Masala',
    subtitle: '15-Spice Heritage Roast',
    description: 'A classic hand-roasted blend featuring star anise, stone flower, and mace, passed down through generations of masters.',
    longDescription: 'Our Signature Garam Masala is not just a blend; it is the soul of our kitchens. Featuring a complex ratio of 15 premium spices, including rare Stone Flower (Kalpasi), Star Anise, Javitri (Mace), and Green Cardamom, it is processed with a low-temperature heritage hot dry pan-roasting method. This coaxes out the rich volatile essential oils without scorching the spices, making it extremely balanced and aromatic.',
    price: 220, // for 100g
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVM54H-8s9GkE_VeKmaWuFUpkLHS8OHOnMTjBgvFSyE-ulwdjokaB6C6uXNJ7j0gfqmkO65NXx48WwDD6ALC1HA2-Gb8qW0Xbn1CjZtoke-iFTXDvdJk4lLam5UNgmUwOjxKlEb-mkD_iwixg8U_sA_uCucfOAk9ydELex4pOQvSDmT0ZPWlAcFgSYoEBCmjVokDHkBVlP-uvxZceZgh2JLq95SOG-6rs6RCvDS90q1Om7f9B1aX6e1p-C9QcQ70xnLkvKo5gDuYk',
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.96,
    reviewsCount: 312,
    heatLevel: 'Medium',
    origin: 'Apurvae Master Blending House, Delhi',
    category: 'Signature Blends',
    weightOptions: ['100g', '250g', '500g'],
    baseWeightIndex: 0,
    provenance: {
      grower: 'Compiled from selected estate crops',
      altitude: 'Multi-origin compilation',
      harvest: 'Fresh current-season crop selection',
      process: 'Master dry-cast pan roasted, iron-pestle pulverized'
    },
    usageStorage: {
      aroma: 'Warm, savory, earthy incense notes with sharp spice pops of cloves and dark cardamom.',
      pairing: 'Rich dhal tadkas, pan-roasted paneer, heritage mutton bhuna, chicken curry finish, and dry masalas rubs.',
      storage: 'Keep strictly air-sealed. Always close the lid immediately after scooping. Never use a wet spoon.'
    },
    inStock: true,
    tag: 'Signature Blend'
  },
  {
    id: 'royal-biryani-masala',
    title: 'Royal Biryani Masala',
    subtitle: 'Awadhi Court Blend',
    description: 'Rich aromatic blend with saffron powder, sandalwood extracts, and rose petal dust, recreating the royal dining halls of Awadh.',
    longDescription: 'The Royal Biryani blend is inspired by the legendary recipes of Nawab Wajid Ali Shah’s royal khansamas of Lucknow. Combining fine saffron, fragrant sandalwood mist, crushed organic rose petals, royal white poppy seeds, and stone mace, this blend delivers an ethereal floral wood aroma. Unlike commercial heavy powders, this is delicate and layers fragrances sequentially in the steam-sealed handi (dum cooking).',
    price: 320, // for 100g
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDC4VkGJxw2rVe8ZbH_VSDCEFh-dm3zt9TggyymnNihyhXiTKBbu7IuwR6QcQjhPcQc1fpSif_xmwEwMMHbijhkGdhSDaCTYc8a9JfOhxRna2C07aKeg34h_Z2mmg9uM1bQSO1YNZgzvwn_x-w65-p_CVGM2nWvVNM0oi3O0WOJQcrn2gE_CZtnaMt0dQpFXA4HwTHWRawXdZPalvD05mzz5s50hKMTXiKORkKqsga3x2bcA0xGygIz8YXfAOX2kqD4K-L-HjRLWx8',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.93,
    reviewsCount: 145,
    heatLevel: 'Mild',
    origin: 'Mughlai Archive, Lucknow',
    category: 'Signature Blends',
    weightOptions: ['100g', '250g'],
    baseWeightIndex: 0,
    provenance: {
      grower: 'Preserved royal family archives formula',
      altitude: 'Multi-terrain sourced ingredients',
      harvest: 'Seasonal selection',
      process: 'Slow shade desiccated petals and stone-milled whole seeds'
    },
    usageStorage: {
      aroma: 'Sublimely fragrant rose, sandalwood accents, soft saffron warmth, and sweet mace-clove overlay.',
      pairing: 'Dum-cooked Mughlai Biryani, Lucknowi Pulao, roasted winter vegetables, and rich cashew gravies.',
      storage: 'Keep cold and dark. Warm environments will cause the volatile sandalwood and rose essences to dissipate.'
    },
    inStock: true,
    tag: 'Limited Heritage'
  }
];

export const HERITAGE_STORIES: HeritageStory[] = [
  {
    id: 'saffron-harvest',
    title: 'The Saffron Dawn of Pampore',
    excerpt: 'Each October, the misty plains of Pampore turn into a sea of purple blossoms. Our cameras capture the dawn harvest.',
    content: 'Pampore is the only place where saffron grows of this grade. The soil, rich in lakeside loam, is drained by glacial runoffs of the Jhelum river. Farmers start their work in full frost when the blossoms open at 4:30 AM. By harvest time, the petals must be plucked before the sun scorches the stigmas. Spanning across miles of purple fields, we partner with the Mir family, who have held their plots since 1883, maintaining strict natural solar curation and hand-separating each threads.',
    location: 'Pampore, Kashmir Valley',
    elevation: '1,620 meters',
    readTime: '4 mins read',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80'
  }
];

export const DEFAULT_USER: UserProfile = {
  name: "Apurva Masale",
  email: "apurvamasale@gmail.com",
  phone: "+91 00000 00000",
  defaultAddress: {
    firstName: "Apurva",
    lastName: "Masale",
    addressLine1: "House of Heritage, 12 Saffron Lane",
    addressLine2: "DLF Phase 3",
    city: "Gurugram",
    state: "Haryana",
    pinCode: "122002",
    phone: "+91 00000 00000",
    email: "apurvamasale@gmail.com"
  }
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: "AM-2026-9042",
    date: "May 25, 2026",
    status: "Picked Up",
    items: [
      {
        product: PRODUCTS[2], // turmeric
        quantity: 2,
        selectedWeight: "100g",
        priceAtSelection: 180
      }
    ],
    subtotal: 360,
    total: 360,
    bookingContact: {
      fullName: "Apurva Masale",
      phone: "+91 00000 00000",
      deliveryNote: ""
    },
    fulfillment: "Pickup",
    estimatedReady: "May 25, 2026"
  },
  {
    id: "AM-2026-9081",
    date: "May 26, 2026",
    status: "Ready for Pickup",
    items: [
      {
        product: PRODUCTS[3], // cardamom
        quantity: 1,
        selectedWeight: "100g",
        priceAtSelection: 490
      }
    ],
    subtotal: 490,
    total: 490,
    bookingContact: {
      fullName: "Apurva Masale",
      phone: "+91 00000 00000",
      deliveryNote: "Can you deliver to MG Road if possible?"
    },
    fulfillment: "Delivery Requested",
    estimatedReady: "May 27, 2026"
  }
];
