import {
  Product,
  Category,
  Project,
  Customer,
  Quotation,
  CSTicket,
  CSSettings,
  Testimonial,
  CompanySettings,
  HomepageCMS,
  ActivityLog,
  AdminUser,
} from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'kreatifindo_products_v1',
  CATEGORIES: 'kreatifindo_categories_v1',
  PROJECTS: 'kreatifindo_projects_v1',
  CUSTOMERS: 'kreatifindo_customers_v1',
  QUOTATIONS: 'kreatifindo_quotations_v1',
  CS_TICKETS: 'kreatifindo_cs_tickets_v1',
  CS_SETTINGS: 'kreatifindo_cs_settings_v1',
  TESTIMONIALS: 'kreatifindo_testimonials_v1',
  SETTINGS: 'kreatifindo_settings_v1',
  HOMEPAGE: 'kreatifindo_homepage_v1',
  ACTIVITY_LOGS: 'kreatifindo_activity_logs_v1',
  ADMIN_USERS: 'kreatifindo_admin_users_v1',
  WISHLIST: 'kreatifindo_wishlist_v1',
  RECENTLY_VIEWED: 'kreatifindo_recent_v1',
};

// Seed Categories
export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-meja',
    name: 'Meja',
    slug: 'meja',
    description: 'Meja meeting, meja kerja, meja makan, dan meja konsol dengan material pilihan.',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Table',
    productCount: 12,
  },
  {
    id: 'cat-kursi',
    name: 'Kursi',
    slug: 'kursi',
    description: 'Kursi ergonomis, kursi direktur, kursi makan, dan sofa lounge berstandar tinggi.',
    image: 'https://images.unsplash.com/photo-1580481077195-c3f25c7e3c88?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Armchair',
    productCount: 8,
  },
  {
    id: 'cat-lemari',
    name: 'Lemari',
    slug: 'lemari',
    description: 'Wardrobe pakaian, lemari arsip, dan storage kabinet dengan engsel soft-closing.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Archive',
    productCount: 6,
  },
  {
    id: 'cat-rak',
    name: 'Rak',
    slug: 'rak',
    description: 'Rak buku, rak pajangan partisi, dan credenza display bergaya modern minimalis.',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Layers',
    productCount: 5,
  },
  {
    id: 'cat-kantor',
    name: 'Furniture Kantor',
    slug: 'furniture-kantor',
    description: 'Solusi lengkap workstation pod, ruang rapat eksekutif, dan front-office resepsionis.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Briefcase',
    productCount: 14,
  },
  {
    id: 'cat-rumah',
    name: 'Furniture Rumah',
    slug: 'furniture-rumah',
    description: 'Perabot living room, dining room, kamar tidur hingga kitchen set hunian privat.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Home',
    productCount: 10,
  },
  {
    id: 'cat-custom',
    name: 'Furniture Custom',
    slug: 'furniture-custom',
    description: 'Dibuat sesuai dimensi presisi dan konsep arsitektural ruangan Anda.',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Compass',
    productCount: 18,
  },
  {
    id: 'cat-lainnya',
    name: 'Perabot Lainnya',
    slug: 'perabot-lainnya',
    description: 'Partisi akustik, credenza foyer, planter box indoor, dan aksesoris ruang kerja.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Grid',
    productCount: 4,
  },
];

// Seed Products
export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Meja Meeting Executive Arjuna',
    slug: 'meja-meeting-executive-arjuna',
    category: 'Furniture Kantor',
    categoryId: 'cat-kantor',
    shortDesc: 'Meja rapat eksekutif solid teak wood dengan kabel manajemen tersembunyi dan aksen brass.',
    description: 'Dirancang untuk ruang pertemuan korporat level dewan direksi. Menggunakan material kayu jati grade A dengan finishing melamine semi-matte natural. Dilengkapi slot kabel terintegrasi (power socket, LAN, HDMI box) yang rapi tanpa kabel berserakan di atas meja. Kaki berbahan baja tebal dengan aksen brushed brass PVD coating.',
    price: 8500000,
    priceStartingFrom: 8500000,
    priceMode: 'SHOW_PRICE',
    material: 'Kayu Jati Solid Grade A + Rangka Baja Aksen Brass PVD',
    dimensions: '320 x 120 x 76 cm (Kapasitas 10-12 Orang)',
    finishing: 'Melamine Satin Natural Walnut / Natural Teak',
    colors: ['Walnut Matte', 'Bleached Teak', 'Deep Espresso'],
    stockStatus: 'Tersedia',
    badge: 'Best Seller',
    featured: true,
    mainImage: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000&auto=format&fit=crop',
    ],
    viewCount: 1420,
    quoteCount: 48,
    createdAt: '2026-08-10',
    updatedAt: '2026-09-01',
  },
  {
    id: 'prod-002',
    name: 'Kursi Ergonomis Direktur Aero Luxe',
    slug: 'kursi-ergonomis-direktur-aero-luxe',
    category: 'Kursi',
    categoryId: 'cat-kursi',
    shortDesc: 'Kursi kerja ergonomis dengan multi-angle synchro tilt, 4D armrest, dan sasis aluminium polished.',
    description: 'Kenyamanan duduk optimal hingga 12 jam kerja dengan bantalan mesh elastis dari Korea yang tidak mudah kendor dan bersirkulasi udara dingin. Dilengkapi penyangga pinggang lumbar adaptif otomatis, headrest yang dapat diatur ketinggian serta sudut kemiringannya, dan kaki roda castors bersenyap di lantai parket.',
    price: 4200000,
    priceStartingFrom: 3950000,
    priceMode: 'SHOW_PRICE',
    material: 'Korea High-Tension Mesh + Aluminium Die-Cast Chassis',
    dimensions: '68 x 66 x 118-128 cm',
    finishing: 'Polished Mirror Aluminium + Matt Black Composite',
    colors: ['Onyx Black', 'Titanium Grey', 'Slate White'],
    stockStatus: 'Tersedia',
    badge: 'Best Seller',
    featured: true,
    mainImage: 'https://images.unsplash.com/photo-1580481077195-c3f25c7e3c88?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3f25c7e3c88?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=1000&auto=format&fit=crop',
    ],
    viewCount: 980,
    quoteCount: 62,
    createdAt: '2026-08-12',
    updatedAt: '2026-09-02',
  },
  {
    id: 'prod-003',
    name: 'Meja Makan Marmer Carrara Verona',
    slug: 'meja-makan-marmer-carrara-verona',
    category: 'Meja',
    categoryId: 'cat-meja',
    shortDesc: 'Kemewahan marmer alam Carrara Italia dengan urat abu lembut dan struktur kaki arsitektural.',
    description: 'Top table terbuat dari slab marmer Carrara asli setebal 20mm yang dilapisi sealant anti-noda food grade. Desain tepi chamfered mewah yang aman untuk keluarga. Kaki meja didesain dengan konsep sculptural geometri yang stabil dan kokoh dari baja lapis powder coat tekstur halus.',
    price: 14500000,
    priceStartingFrom: 13500000,
    priceMode: 'SHOW_PRICE',
    material: 'Natural Italian Carrara Marble + Carbon Steel Matte Base',
    dimensions: '220 x 100 x 75 cm (Kapasitas 8 Kursi)',
    finishing: 'Honed Matte Sealant Protection + Black Matte Powder Coat',
    colors: ['Carrara White & Grey', 'Nero Marquina Black (Custom)'],
    stockStatus: 'Pre-Order (14-21 Hari)',
    badge: 'New',
    featured: true,
    mainImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=1000&auto=format&fit=crop',
    ],
    viewCount: 750,
    quoteCount: 29,
    createdAt: '2026-08-15',
    updatedAt: '2026-08-30',
  },
  {
    id: 'prod-004',
    name: 'Credenza & Konsol Minimalis Nara',
    slug: 'credenza-konsol-minimalis-nara',
    category: 'Lemari',
    categoryId: 'cat-lemari',
    shortDesc: 'Credenza serbaguna dengan 4 pintu soft-close Blum, veneer American Walnut asli, dan rak modular.',
    description: 'Pilihan tepat untuk ruang TV, ruang makan buffet, atau ruang kerja eksekutif. Konstruksi bodi menggunakan Multiplek Meranti 18mm standar ekspor yang dilapisi veneer kayu American Walnut asli. Pintu menggunakan engsel hidrolik Blumotion buatan Austria yang menutup tanpa suara.',
    price: 6800000,
    priceStartingFrom: 6800000,
    priceMode: 'SHOW_PRICE',
    material: 'Multiplek 18mm + Natural American Walnut Veneer + Hardware Blum',
    dimensions: '180 x 45 x 78 cm',
    finishing: 'Polyurethane Satin Clear Coat (Tahan Gores & Panas)',
    colors: ['Warm Walnut', 'Light White Oak', 'Ebony Charcoal'],
    stockStatus: 'Tersedia',
    badge: 'Best Seller',
    featured: true,
    mainImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000&auto=format&fit=crop',
    ],
    viewCount: 640,
    quoteCount: 31,
    createdAt: '2026-08-18',
    updatedAt: '2026-08-28',
  },
  {
    id: 'prod-005',
    name: 'Sofa Modular 3-Seater Kastara',
    slug: 'sofa-modular-3-seater-kastara',
    category: 'Furniture Rumah',
    categoryId: 'cat-rumah',
    shortDesc: 'Sofa lounge ekstra dalam dengan busa Royal Foam density 32, pocket spring, dan kain Belgian linen.',
    description: 'Didesain untuk ruang santai keluarga dan area lounge eksekutif kantor. Busa dudukan kombinasi memory foam dan pocket spring menjamin keempukan tanpa amblas seiring waktu. Cover sofa menggunakan kain tenun linen Belgia yang sejuk, tahan noda air ringan, dan dapat dilepas untuk dicuci.',
    price: 9800000,
    priceStartingFrom: 8500000,
    priceMode: 'SHOW_PRICE',
    material: 'Rangka Kayu Mahoni Oven + Royal Foam D32 + Kain Belgian Linen',
    dimensions: '260 x 95 x 82 cm (Modular 3 Seater + Ottoman)',
    finishing: 'Kain Linen Water-Repellent + Kaki Kayu Jati Solid',
    colors: ['Oatmeal Sand', 'Sage Green', 'Charcoal Slate', 'Terracotta'],
    stockStatus: 'Pre-Order (14-21 Hari)',
    badge: 'New',
    featured: true,
    mainImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493663284041-77e3ae96093d?q=80&w=1000&auto=format&fit=crop',
    ],
    viewCount: 1100,
    quoteCount: 42,
    createdAt: '2026-08-20',
    updatedAt: '2026-09-02',
  },
  {
    id: 'prod-006',
    name: 'Custom Walk-In Wardrobe Sultan Suite',
    slug: 'custom-walk-in-wardrobe-sultan-suite',
    category: 'Furniture Custom',
    categoryId: 'cat-custom',
    shortDesc: 'Lemari pakaian full ceiling custom dengan pintu kaca tempered smoke, profil aluminium LED, dan organizer tas.',
    description: 'Pembuatan lemari custom eksklusif sesuai ukuran ruangan kamar utama Anda. Menggunakan bodi multiplek tebal lapis HPL serat kayu bertekstur, rak kaca tempered 8mm, gantungan baju hidrolik pull-down, laci perhiasan beludru bersekat, dan sensor otomatis lampu LED warm white tersembunyi.',
    price: 0,
    priceStartingFrom: 3200000, // per meter lari
    priceMode: 'REQUEST_QUOTE',
    material: 'Multiplek 18mm Lapis HPL Taco + Pintu Kaca Tempered 5mm + LED Strip Profil Alum',
    dimensions: 'Dibuat Custom Sesuai Ukuran Ruangan Anda (Floor to Ceiling)',
    finishing: 'HPL Premium Taco / AICA + Frame Aluminium Anodized Bronze/Black',
    colors: ['Custom HPL Woodgrain', 'Matte Charcoal Grey', 'Champagne Gold Frame'],
    stockStatus: 'Custom Made',
    badge: 'Custom',
    featured: true,
    mainImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop',
    ],
    viewCount: 1850,
    quoteCount: 88,
    createdAt: '2026-08-05',
    updatedAt: '2026-09-01',
  },
  {
    id: 'prod-007',
    name: 'Workstation Pod Kantor 4-Pax Symphony',
    slug: 'workstation-pod-kantor-4-pax-symphony',
    category: 'Furniture Kantor',
    categoryId: 'cat-kantor',
    shortDesc: 'Sistem meja kerja kolaboratif 4 orang dengan partisi akustik PET felt dan kabel trunking tersembunyi.',
    description: 'Solusi kantor modern yang mengutamakan produktivitas dan estetika bersih. Top table dilapisi HPL tahan gores dan anti sidik jari. Kaki hollow steel 50x50mm kokoh dengan finishing powder coat. Partisi di tengah menggunakan bahan acoustic sound absorbing felt untuk meredam kebisingan percakapan.',
    price: 12800000,
    priceStartingFrom: 11500000,
    priceMode: 'SHOW_PRICE',
    material: 'Top HPL Antibakterial + Heavy Duty Steel Frame + Acoustic PET Divider',
    dimensions: '280 x 140 x 75 cm (Total 4 Stasiun Kerja)',
    finishing: 'Powder Coat White / Industrial Grey + HPL Light Birch',
    colors: ['Light Birch & White', 'Dark Oak & Black Frame'],
    stockStatus: 'Pre-Order (14-21 Hari)',
    badge: 'Proyek',
    featured: false,
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop',
    ],
    viewCount: 890,
    quoteCount: 54,
    createdAt: '2026-08-22',
    updatedAt: '2026-09-02',
  },
  {
    id: 'prod-008',
    name: 'Meja Resepsionis Monolith Grand',
    slug: 'meja-resepsionis-monolith-grand',
    category: 'Furniture Custom',
    categoryId: 'cat-custom',
    shortDesc: 'Meja penerima tamu arsitektural dengan aksen batu terrazzo, indirect light cove, dan counter tersembunyi.',
    description: 'Menciptakan kesan pertama yang prestisius untuk kantor korporat, klinik kecantikan, hotel, maupun showroom. Desain monolithic berlapis curved panel dengan indirect LED hangat di bagian bawah dan slot logo akrilik timbul berlampu.',
    price: 0,
    priceStartingFrom: 15000000,
    priceMode: 'REQUEST_QUOTE',
    material: 'Curved Plywood Body + Terrazzo Surface / Solid Surface + LED Cove',
    dimensions: '300 x 90 x 105 cm (Dapat Disesuaikan)',
    finishing: 'Seamless Solid Surface / HPL High Texture Travertine',
    colors: ['Travertine Cream', 'Terrazzo Grey & White', 'Black Lava'],
    stockStatus: 'Custom Made',
    badge: 'Custom',
    featured: false,
    mainImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000&auto=format&fit=crop',
    ],
    viewCount: 920,
    quoteCount: 41,
    createdAt: '2026-08-14',
    updatedAt: '2026-08-29',
  },
  {
    id: 'prod-009',
    name: 'Rak Partisi Display Industrial Orion',
    slug: 'rak-partisi-display-industrial-orion',
    category: 'Rak',
    categoryId: 'cat-rak',
    shortDesc: 'Rak partisi ganda dua muka dengan ambalan kayu mahoni solid dan rangka besi hollow finishing matte.',
    description: 'Berfungsi ganda sebagai sekat ruang estetik dan media display buku, piala penghargaan, tanaman indoor, serta ornamen seni. Sangat cocok untuk membagi living room dan dining room tanpa membuat ruangan terasa sempit atau gelap.',
    price: 5200000,
    priceStartingFrom: 5200000,
    priceMode: 'SHOW_PRICE',
    material: 'Baja Hollow 25x25mm + Kayu Mahoni Solid Oven 28mm',
    dimensions: '160 x 38 x 200 cm',
    finishing: 'Matte Black Powder Coat + Natural Wood Stain',
    colors: ['Industrial Black & Walnut', 'White Frame & Natural Oak'],
    stockStatus: 'Tersedia',
    badge: 'New',
    featured: false,
    mainImage: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop',
    ],
    viewCount: 520,
    quoteCount: 19,
    createdAt: '2026-08-24',
    updatedAt: '2026-09-02',
  },
  {
    id: 'prod-010',
    name: 'Coffee Table Slab Kayu Suar Lembah',
    slug: 'coffee-table-slab-kayu-suar-lembah',
    category: 'Meja',
    categoryId: 'cat-meja',
    shortDesc: 'Meja kopi live-edge slab utuh kayu trembesi suar dengan urat alami unik dan resin matte accent.',
    description: 'Setiap unit adalah karya seni satu-satunya karena mempertahankan lekukan alami serat kayu suar hutan tropis Indonesia. Dioven kering dengan moisture meter terkontrol agar tidak melengkung atau retak.',
    price: 4750000,
    priceStartingFrom: 4750000,
    priceMode: 'SHOW_PRICE',
    material: 'Solid Trembesi / Suar Wood One Piece Slab + Kaki Besi Hairpin',
    dimensions: '120-130 x 60-70 x 45 cm (Live Edge)',
    finishing: 'Natural Danish Oil / Polyurethane Food Safe',
    colors: ['Natural Two-Tone Grain'],
    stockStatus: 'Tersedia',
    badge: 'Best Seller',
    featured: false,
    mainImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop',
    ],
    viewCount: 680,
    quoteCount: 22,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-31',
  },
];

// Seed Projects
export const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    name: 'Headquarters Office Fit-Out SCBD',
    slug: 'headquarters-office-fit-out-scbd',
    client: 'PT Sinarmas Digital Teknologi',
    location: 'Equity Tower Lt. 28, SCBD Jakarta Selatan',
    category: 'Kantor',
    description: 'Pengadaan dan instalasi custom workstation 120 pax, ruang meeting dewan direksi 20 pax dengan integrasi smart cable, executive lounge, serta pantry komunal bergaya scandinavian warm.',
    date: 'Juli 2026',
    featured: true,
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1000&auto=format&fit=crop',
    ],
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    },
  },
  {
    id: 'proj-002',
    name: 'Luxury Penthouse Dharmawangsa Residence',
    slug: 'luxury-penthouse-dharmawangsa-residence',
    client: 'Bapak Hendra & Keluarga',
    location: 'The Dharmawangsa, Jakarta Selatan',
    category: 'Residensial',
    description: 'Pengerjaan interior penuh mencakup custom walk-in wardrobe 36m2 dengan smoke glass dan pencahayaan aksen, meja makan marmer statuario 10 seater, credenza ruang keluarga, dan panel dinding kayu jati.',
    date: 'Mei 2026',
    featured: true,
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    ],
  },
  {
    id: 'proj-003',
    name: 'Flagship Roastery & Boutique Cafe',
    slug: 'flagship-roastery-boutique-cafe',
    client: 'Kala Kopi Nusantara',
    location: 'Jl. R.E. Martadinata, Bandung',
    category: 'Cafe & Resto',
    description: 'Custom bar espresso counter solid suar wood, seating area modular 80 kursi, rak pajangan biji kopi metal-wood setinggi 4 meter, dan signage interior minimalis.',
    date: 'Maret 2026',
    featured: true,
    mainImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
    ],
  },
];

// Seed Quotations
export const SEED_QUOTATIONS: Quotation[] = [
  {
    id: 'qt-2026-0001',
    quotationNumber: 'QT-2026-0001',
    createdAt: '2026-08-28',
    validUntil: '2026-09-28',
    customerName: 'Ir. Dimas Suryo',
    companyName: 'PT Mandiri Artha Properti',
    whatsappNumber: '081288991234',
    email: 'dimas.suryo@mandiriarthaproperti.co.id',
    address: 'Menara Palma Lt. 15, Jl. H.R. Rasuna Said, Kuningan, Jakarta Selatan',
    items: [
      {
        productId: 'prod-001',
        productName: 'Meja Meeting Executive Arjuna',
        productImage: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1000&auto=format&fit=crop',
        quantity: 2,
        unitPrice: 8500000,
        customNotes: 'Warna walnut matte, termasuk power socket HDMI tersembunyi',
        materialSpec: 'Kayu Jati Solid Grade A',
        dimensions: '320 x 120 x 76 cm',
      },
      {
        productId: 'prod-002',
        productName: 'Kursi Ergonomis Direktur Aero Luxe',
        productImage: 'https://images.unsplash.com/photo-1580481077195-c3f25c7e3c88?q=80&w=1000&auto=format&fit=crop',
        quantity: 20,
        unitPrice: 4000000, // special volume pricing applied by admin
        customNotes: 'Warna sasis aluminium polished + mesh hitam',
        materialSpec: 'High tension mesh Korea',
        dimensions: 'Standar Direktur',
      },
    ],
    subtotal: 97000000,
    discount: 5000000,
    additionalCost: 1500000, // Instalasi & assembly ruang meeting
    shippingCost: 750000,
    totalAmount: 94250000,
    customerNotes: 'Mohon jadwal instalasi weekend agar tidak mengganggu operasional kantor.',
    specialRequirements: 'Butuh sertifikasi garansi konstruksi 2 tahun resmi untuk pengajuan audit perusahaan.',
    adminNotes: 'Klien VIP korporat. Sudah diberikan diskon proyek khusus volume 20 unit kursi.',
    status: 'QUOTED',
    terms: 'DP 50% saat PO diterbitkan, pelunasan 50% setelah serah terima dan instalasi tuntas di lokasi.',
    assignedCs: 'Rina Kartika',
  },
  {
    id: 'qt-2026-0002',
    quotationNumber: 'QT-2026-0002',
    createdAt: '2026-09-02',
    validUntil: '2026-10-02',
    customerName: 'Maya Kusuma, S.Ars',
    companyName: 'Studio Studio Interior Design',
    whatsappNumber: '081399882211',
    email: 'maya@studiodesign.id',
    address: 'Jl. Kemang Timur Raya No. 42B, Jakarta Selatan',
    items: [
      {
        productId: 'prod-006',
        productName: 'Custom Walk-In Wardrobe Sultan Suite',
        productImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 28500000,
        customNotes: 'Panjang 4.5m x Tinggi 3.1m, finishing HPL Taco Walnut dan kaca smoke bronze',
        materialSpec: 'Multiplek 18mm + Blum hardware',
        dimensions: '450 x 60 x 310 cm',
      },
      {
        productId: 'prod-004',
        productName: 'Credenza & Konsol Minimalis Nara',
        productImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 6800000,
        customNotes: 'Warna disamakan dengan wardrobe',
        materialSpec: 'Veneer Walnut',
        dimensions: '180 x 45 x 78 cm',
      },
    ],
    subtotal: 35300000,
    discount: 1000000,
    additionalCost: 1000000,
    shippingCost: 500000,
    totalAmount: 35800000,
    customerNotes: 'Kebutuhan untuk rumah klien di Menteng. Sudah siap survey ukuran akhir.',
    specialRequirements: 'Pintu kaca menggunakan aluminium frame bronze hairline.',
    adminNotes: 'Menunggu konfirmasi survey lapangan hari Sabtu mendatang.',
    status: 'REVIEWING',
    terms: 'Pengerjaan 21 hari kerja sejak approval gambar kerja dan penerimaan uang muka.',
    assignedCs: 'Rina Kartika',
  },
  {
    id: 'qt-2026-0003',
    quotationNumber: 'QT-2026-0003',
    createdAt: '2026-09-03',
    validUntil: '2026-10-03',
    customerName: 'Bambang Irawan',
    companyName: 'PT Sentosa Boga Abadi',
    whatsappNumber: '081122334455',
    email: 'bambang@sentosaboga.com',
    address: 'Kawasan Industri MM2100 Cikarang Barat, Bekasi',
    items: [
      {
        productId: 'prod-007',
        productName: 'Workstation Pod Kantor 4-Pax Symphony',
        productImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
        quantity: 5,
        unitPrice: 12800000,
        customNotes: 'Total 20 kursi untuk staf administrasi pabrik',
        materialSpec: 'HPL birch + rangka hitam',
      },
    ],
    subtotal: 64000000,
    discount: 0,
    additionalCost: 0,
    shippingCost: 0,
    totalAmount: 64000000,
    customerNotes: 'Mohon dikirimkan draft penawaran resmi untuk diajukan ke bagian procurement.',
    specialRequirements: 'Pengiriman ke kawasan MM2100 Cikarang.',
    adminNotes: 'Quotation baru masuk via website.',
    status: 'REQUESTED',
    terms: 'Masa penawaran berlaku 30 hari.',
    assignedCs: 'Budi Santoso',
  },
];

// Seed Customer Service Tickets
export const SEED_CS_TICKETS: CSTicket[] = [
  {
    id: 'ticket-1023',
    ticketNumber: 'CS-1023',
    customerName: 'Bapak Edwin Pratama',
    customerPhone: '081299887766',
    customerEmail: 'edwin@megaperkasa.com',
    category: 'Konsultasi Produk',
    subject: 'Konsultasi Meja Rapat 16 Orang SCBD',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-02 10:15',
    updatedAt: '2026-09-02 11:30',
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        senderName: 'Edwin Pratama',
        message: 'Halo Kreatifindo, kami butuh meja rapat untuk kapasitas 16 orang di kantor SCBD. Apakah tipe Arjuna bisa dibuat ukuran 4.5 meter?',
        timestamp: '2026-09-02 10:15',
      },
      {
        id: 'msg-2',
        sender: 'cs',
        senderName: 'Rina (Kreatifindo)',
        message: 'Selamat pagi Bapak Edwin! Tentu bisa sekali Pak, untuk panjang 4.5 meter kami bagi menjadi 2 modular sambungan presisi dengan rangka baja penopang agar tidak lentur di tengah. Apakah kami boleh kirimkan portofolio foto real project meja 16 orang yang pernah kami pasang di Menara Astra?',
        timestamp: '2026-09-02 10:25',
      },
      {
        id: 'msg-3',
        sender: 'customer',
        senderName: 'Edwin Pratama',
        message: 'Boleh Bu Rina, tolong sekalian buatkan estimasi penawaran kasarnya ya.',
        timestamp: '2026-09-02 11:30',
      },
    ],
  },
  {
    id: 'ticket-1024',
    ticketNumber: 'CS-1024',
    customerName: 'Ibu Sarah Amelia',
    customerPhone: '081700112233',
    customerEmail: 'sarah.amelia@gmail.com',
    category: 'Custom Furniture',
    subject: 'Jadwal Survey Walk-in Wardrobe Jagakarsa',
    status: 'OPEN',
    createdAt: '2026-09-03 14:20',
    updatedAt: '2026-09-03 14:20',
    messages: [
      {
        id: 'msg-4',
        sender: 'customer',
        senderName: 'Sarah Amelia',
        message: 'Selamat siang tim Kreatifindo, saya ingin menjadwalkan survey lokasi untuk pembuatan walk-in closet kamar tidur utama di Jagakarsa Jakarta Selatan hari Sabtu ini apakah bisa?',
        timestamp: '2026-09-03 14:20',
      },
    ],
  },
];

// Seed CS Settings
export const SEED_CS_SETTINGS: CSSettings = {
  name: 'Rina Kartika',
  title: 'Senior Interior Consultant & Client Care',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
  whatsappNumber: '6281290008888',
  operatingHours: 'Senin - Sabtu: 08.30 - 18.00 WIB',
  greetingMessage: 'Halo! Saya Rina dari Kreatifindo. Ada kebutuhan furniture atau proyek interior yang bisa kami bantu hari ini?',
  isOnline: true,
};

// Seed Testimonials
export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Andra Matin Syahputra, IAI',
    company: 'Studio Arsitek Urban Ruang',
    role: 'Principal Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    comment: 'Kreatifindo adalah rekanan workshop furniture yang luar biasa presisi. Gambar detail kerja arsitek kami dieksekusi tanpa kompromi: sambungan mitered joint rapi, pemilihan veneer kayu konsisten, dan waktu instalasi di lokasi proyek SCBD tepat waktu.',
    projectType: 'Office Fit-out 1.200 m2',
    published: true,
    date: 'Agustus 2026',
  },
  {
    id: 'testi-2',
    name: 'Jessica Tanuwidjaja',
    company: 'Private Residence Pondok Indah',
    role: 'Homeowner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    comment: 'Sangat puas dengan custom walk-in wardrobe dan meja makan marmer Verona. Kualitas materialnya benar-benar terasa mewah seperti furniture brand Eropa, namun harganya sangat masuk akal karena mereka punya workshop dan tim tukang sendiri.',
    projectType: 'Residential Custom Furniture',
    published: true,
    date: 'Juli 2026',
  },
  {
    id: 'testi-3',
    name: 'Ferry Gunawan',
    company: 'PT Global Logistik Nusantara',
    role: 'Head of Procurement & Facility',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    comment: 'Proses penawaran quotation sangat cepat dan transparan. Semua spesifikasi teknis, tipe busa, tebal hollow besi, hingga garansi dicantumkan dengan jelas di lembar penawaran resmi. Sangat mempermudah pertanggungjawaban ke direksi.',
    projectType: 'Commercial Workstation 60 Pax',
    published: true,
    date: 'Juni 2026',
  },
];

// Seed Company Settings
export const SEED_SETTINGS: CompanySettings = {
  companyName: 'KREATIFINDO',
  tagline: 'Perabot & Furniture yang Dibuat untuk Ruang Anda',
  logoUrl: '',
  address: 'Jl. Pahlawan Revolusi No. 88, Pondok Bambu, Duren Sawit',
  city: 'Jakarta Timur, DKI Jakarta',
  postalCode: '13430',
  phone: '(021) 8660-9988',
  whatsapp: '6281290008888',
  email: 'halo@kreatifindo.co.id',
  instagram: '@kreatifindo.furniture',
  facebook: 'Kreatifindo Interior & Furniture',
  googleMapsUrl: 'https://maps.google.com',
  openingHoursWeekday: 'Senin - Jumat: 08:30 - 18:00 WIB',
  openingHoursWeekend: 'Sabtu: 09:00 - 16:00 WIB (Minggu Libur/By Appointment)',
  isCurrentlyOpen: true,
  footerText: 'Kreatifindo adalah manufaktur perabot dan kontraktor interior berpengalaman lebih dari 12 tahun yang melayani kebutuhan furniture residensial, perkantoran, ritel komersial, dan proyek institusi dengan standar presisi tinggi.',
  bankAccount: {
    bankName: 'Bank Central Asia (BCA)',
    accountNumber: '527-0988-123',
    accountHolder: 'PT KREATIF INDO KREASI MEBEL',
  },
};

// Seed Homepage CMS
export const SEED_HOMEPAGE: HomepageCMS = {
  heroBrand: 'KREATIFINDO',
  heroEyebrow: 'PABRIKASI PERABOT & INTERIOR PRESISI',
  heroTitle: 'Furniture & Perabot yang Dibuat untuk Ruang Anda.',
  heroSubtitle: 'Solusi perabot dan furniture presisi untuk rumah, kantor, ritel, hingga kebutuhan proyek korporat dengan workshop mandiri dan material bergaransi.',
  heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
  heroCtaCatalog: 'Lihat Katalog',
  heroCtaConsult: 'Konsultasi Desain',
  ctaPrimaryText: 'Jelajahi Katalog Perabot',
  ctaPrimaryLink: '#/katalog',
  ctaSecondaryText: 'Konsultasi Desain & Proyek',
  ctaSecondaryLink: '#/layanan-pelanggan',
  experienceYears: 12,
  completedProjects: 450,
  clientSatisfaction: '99.2%',
  satisfactionRate: 99,
  aboutTitle: 'Dedikasi terhadap Material Terbaik & Ketelitian Konstruksi',
  aboutText: 'Didirikan di Jakarta, Kreatifindo berawal dari workshop pengrajin kayu terpilih yang berfokus pada ketahanan fisik dan keanggunan visual. Kami percaya perabot yang baik bukan sekadar pengisi ruangan, melainkan investasi jangka panjang yang memperkuat fungsi dan karakter tempat Anda beraktivitas.',
  workshopText: 'Dilengkapi mesin edge-banding otomatis, vacuum press veneer, panel saw presisi, dan spray booth bertekanan positif untuk hasil akhir finishing tanpa cacat debu.',
};

// Seed Admin Users
export const SEED_ADMIN_USERS: AdminUser[] = [
  {
    id: 'user-1',
    name: 'Budi Prakoso (Super Admin)',
    email: 'admin@kreatifindo.co.id',
    role: 'SUPER_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    lastLogin: 'Baru saja',
  },
  {
    id: 'user-2',
    name: 'Ahmad Fauzi (Catalog Manager)',
    email: 'fauzi@kreatifindo.co.id',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    lastLogin: '2 jam yang lalu',
  },
  {
    id: 'user-3',
    name: 'Rina Kartika (Client Service)',
    email: 'rina@kreatifindo.co.id',
    role: 'CS',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    lastLogin: '30 menit yang lalu',
  },
];

// Seed Activity Logs
export const SEED_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    userName: 'Rina Kartika',
    userRole: 'CS',
    action: 'Membalas Tiket Layanan',
    target: 'Ticket #CS-1023 (PT Mega Sentosa)',
    timestamp: '2026-09-02 10:25',
    details: 'Memberikan penjelasan detail teknis meja meeting 16 pax.',
  },
  {
    id: 'act-2',
    userName: 'Budi Prakoso',
    userRole: 'SUPER_ADMIN',
    action: 'Menerbitkan Penawaran Resmi',
    target: 'Quotation QT-2026-0001 (PT Mandiri Artha)',
    timestamp: '2026-09-01 16:40',
    details: 'Approval penawaran total Rp 94.250.000 dengan diskon proyek.',
  },
  {
    id: 'act-3',
    userName: 'Ahmad Fauzi',
    userRole: 'ADMIN',
    action: 'Menambahkan Produk Baru',
    target: 'Produk: Meja Makan Marmer Verona',
    timestamp: '2026-08-30 11:20',
    details: 'Upload 2 foto resolusi tinggi dan spesifikasi marmer alam Carrara.',
  },
];

// LocalStorage Helper
function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);
    if (typeof defaultValue === 'object' && defaultValue !== null && !Array.isArray(defaultValue)) {
      return { ...defaultValue, ...parsed };
    }
    return parsed;
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save ${key} to localStorage:`, e);
  }
}

// Data Access Service
export const storage = {
  // PRODUCTS
  getProducts(): Product[] {
    return getStored<Product[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
  },
  saveProducts(products: Product[]): void {
    setStored(STORAGE_KEYS.PRODUCTS, products);
  },
  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find((p) => p.slug === slug);
  },
  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  },
  saveProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      products[index] = { ...product, updatedAt: new Date().toISOString().split('T')[0] };
    } else {
      products.unshift({
        ...product,
        id: product.id || `prod-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      });
    }
    this.saveProducts(products);
    this.addLog('Menyimpan Produk', `Produk: ${product.name}`);
  },
  deleteProduct(id: string): void {
    const products = this.getProducts();
    const item = products.find((p) => p.id === id);
    const filtered = products.filter((p) => p.id !== id);
    this.saveProducts(filtered);
    if (item) {
      this.addLog('Menghapus Produk', `Produk: ${item.name}`);
    }
  },
  incrementProductView(id: string): void {
    const products = this.getProducts();
    const item = products.find((p) => p.id === id);
    if (item) {
      item.viewCount = (item.viewCount || 0) + 1;
      this.saveProducts(products);
    }
  },

  // CATEGORIES
  getCategories(): Category[] {
    return getStored<Category[]>(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES);
  },
  saveCategories(categories: Category[]): void {
    setStored(STORAGE_KEYS.CATEGORIES, categories);
  },
  saveCategory(category: Category): void {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => c.id === category.id);
    if (index >= 0) {
      categories[index] = category;
    } else {
      categories.push({ ...category, id: category.id || `cat-${Date.now()}` });
    }
    this.saveCategories(categories);
    this.addLog('Menyimpan Kategori', `Kategori: ${category.name}`);
  },
  deleteCategory(id: string): void {
    const categories = this.getCategories();
    const item = categories.find((c) => c.id === id);
    this.saveCategories(categories.filter((c) => c.id !== id));
    if (item) {
      this.addLog('Menghapus Kategori', `Kategori: ${item.name}`);
    }
  },

  // PROJECTS
  getProjects(): Project[] {
    return getStored<Project[]>(STORAGE_KEYS.PROJECTS, SEED_PROJECTS);
  },
  saveProjects(projects: Project[]): void {
    setStored(STORAGE_KEYS.PROJECTS, projects);
  },
  saveProject(project: Project): void {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.unshift({ ...project, id: project.id || `proj-${Date.now()}` });
    }
    this.saveProjects(projects);
    this.addLog('Menyimpan Proyek Portfolio', `Proyek: ${project.name}`);
  },
  deleteProject(id: string): void {
    const projects = this.getProjects();
    const item = projects.find((p) => p.id === id);
    this.saveProjects(projects.filter((p) => p.id !== id));
    if (item) {
      this.addLog('Menghapus Proyek Portfolio', `Proyek: ${item.name}`);
    }
  },

  // QUOTATIONS
  getQuotations(): Quotation[] {
    return getStored<Quotation[]>(STORAGE_KEYS.QUOTATIONS, SEED_QUOTATIONS);
  },
  saveQuotations(quotations: Quotation[]): void {
    setStored(STORAGE_KEYS.QUOTATIONS, quotations);
  },
  getQuotationByNumber(quotationNumber: string): Quotation | undefined {
    return this.getQuotations().find(
      (q) => q.quotationNumber.toLowerCase() === quotationNumber.toLowerCase().trim()
    );
  },
  createQuotation(quoteData: Omit<Quotation, 'id' | 'quotationNumber' | 'createdAt' | 'status'>): Quotation {
    const quotations = this.getQuotations();
    const currentYear = new Date().getFullYear();
    const nextNumber = String(quotations.length + 1).padStart(4, '0');
    const quotationNumber = `QT-${currentYear}-${nextNumber}`;
    const today = new Date().toISOString().split('T')[0];
    const validUntilDate = new Date();
    validUntilDate.setDate(validUntilDate.getDate() + 30);
    const validUntil = validUntilDate.toISOString().split('T')[0];

    const newQuotation: Quotation = {
      ...quoteData,
      id: `qt-${Date.now()}`,
      quotationNumber,
      createdAt: today,
      validUntil: quoteData.validUntil || validUntil,
      status: 'REQUESTED',
      terms: quoteData.terms || 'DP 50% saat konfirmasi PO, pelunasan 50% setelah instalasi tuntas di lokasi.',
    };

    quotations.unshift(newQuotation);
    this.saveQuotations(quotations);

    // Increment quote count on products
    const products = this.getProducts();
    newQuotation.items.forEach((item) => {
      const p = products.find((prod) => prod.id === item.productId);
      if (p) p.quoteCount = (p.quoteCount || 0) + 1;
    });
    this.saveProducts(products);

    this.addLog('Permintaan Penawaran Baru', `Quotation: ${quotationNumber} (${newQuotation.customerName})`);
    return newQuotation;
  },
  updateQuotation(updated: Quotation): void {
    const quotations = this.getQuotations();
    const idx = quotations.findIndex((q) => q.id === updated.id);
    if (idx >= 0) {
      quotations[idx] = updated;
      this.saveQuotations(quotations);
      this.addLog('Update Penawaran', `Quotation: ${updated.quotationNumber} (${updated.status})`);
    }
  },

  // CS TICKETS
  getCSTickets(): CSTicket[] {
    return getStored<CSTicket[]>(STORAGE_KEYS.CS_TICKETS, SEED_CS_TICKETS);
  },
  saveCSTickets(tickets: CSTicket[]): void {
    setStored(STORAGE_KEYS.CS_TICKETS, tickets);
  },
  createTicket(data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    category: CSTicket['category'];
    subject: string;
    initialMessage: string;
  }): CSTicket {
    const tickets = this.getCSTickets();
    const ticketNumber = `CS-${1020 + tickets.length + 1}`;
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTicket: CSTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      category: data.category,
      subject: data.subject,
      status: 'OPEN',
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'customer',
          senderName: data.customerName,
          message: data.initialMessage,
          timestamp,
        },
      ],
    };

    tickets.unshift(newTicket);
    this.saveCSTickets(tickets);
    this.addLog('Tiket Layanan Pelanggan Baru', `Tiket: #${ticketNumber} (${data.customerName})`);
    return newTicket;
  },
  addTicketMessage(ticketId: string, message: { sender: 'customer' | 'cs'; senderName: string; message: string }): void {
    const tickets = this.getCSTickets();
    const ticket = tickets.find((t) => t.id === ticketId);
    if (ticket) {
      const now = new Date();
      const timestamp = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      ticket.messages.push({
        id: `msg-${Date.now()}`,
        ...message,
        timestamp,
      });
      ticket.updatedAt = timestamp;
      if (message.sender === 'cs') {
        ticket.status = 'WAITING_CUSTOMER';
      } else {
        ticket.status = 'IN_PROGRESS';
      }
      this.saveCSTickets(tickets);
      this.addLog('Pesan Tiket CS', `Tiket #${ticket.ticketNumber} dari ${message.senderName}`);
    }
  },
  updateTicketStatus(ticketId: string, status: CSTicket['status']): void {
    const tickets = this.getCSTickets();
    const ticket = tickets.find((t) => t.id === ticketId);
    if (ticket) {
      ticket.status = status;
      this.saveCSTickets(tickets);
      this.addLog('Status Tiket Diubah', `Tiket #${ticket.ticketNumber} -> ${status}`);
    }
  },

  // CS SETTINGS
  getCSSettings(): CSSettings {
    return getStored<CSSettings>(STORAGE_KEYS.CS_SETTINGS, SEED_CS_SETTINGS);
  },
  saveCSSettings(settings: CSSettings): void {
    setStored(STORAGE_KEYS.CS_SETTINGS, settings);
    this.addLog('Update Konfigurasi CS', `Staff: ${settings.name}`);
  },

  // TESTIMONIALS
  getTestimonials(): Testimonial[] {
    return getStored<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, SEED_TESTIMONIALS);
  },
  saveTestimonials(testimonials: Testimonial[]): void {
    setStored(STORAGE_KEYS.TESTIMONIALS, testimonials);
  },
  saveTestimonial(testimonial: Testimonial): void {
    const testimonials = this.getTestimonials();
    const index = testimonials.findIndex((t) => t.id === testimonial.id);
    if (index >= 0) {
      testimonials[index] = testimonial;
    } else {
      testimonials.unshift({ ...testimonial, id: testimonial.id || `testi-${Date.now()}` });
    }
    this.saveTestimonials(testimonials);
    this.addLog('Menyimpan Testimonial', `Testimonial: ${testimonial.name}`);
  },
  deleteTestimonial(id: string): void {
    const testimonials = this.getTestimonials();
    const item = testimonials.find((t) => t.id === id);
    this.saveTestimonials(testimonials.filter((t) => t.id !== id));
    if (item) {
      this.addLog('Menghapus Testimonial', `Testimonial: ${item.name}`);
    }
  },

  // SETTINGS
  getCompanySettings(): CompanySettings {
    return getStored<CompanySettings>(STORAGE_KEYS.SETTINGS, SEED_SETTINGS);
  },
  saveCompanySettings(settings: CompanySettings): void {
    setStored(STORAGE_KEYS.SETTINGS, settings);
    this.addLog('Update Pengaturan Perusahaan', 'Profil & Kontak Diperbarui');
  },

  // HOMEPAGE CMS
  getHomepageCMS(): HomepageCMS {
    return getStored<HomepageCMS>(STORAGE_KEYS.HOMEPAGE, SEED_HOMEPAGE);
  },
  saveHomepageCMS(cms: HomepageCMS): void {
    setStored(STORAGE_KEYS.HOMEPAGE, cms);
    this.addLog('Update Konten Homepage', 'Hero & Seksi Beranda Diperbarui');
  },

  // ADMIN USERS
  getAdminUsers(): AdminUser[] {
    return getStored<AdminUser[]>(STORAGE_KEYS.ADMIN_USERS, SEED_ADMIN_USERS);
  },
  saveAdminUsers(users: AdminUser[]): void {
    setStored(STORAGE_KEYS.ADMIN_USERS, users);
  },

  // ACTIVITY LOGS
  getActivityLogs(): ActivityLog[] {
    return getStored<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOGS, SEED_ACTIVITY_LOGS);
  },
  addLog(action: string, target: string, details?: string): void {
    const logs = this.getActivityLogs();
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      userName: 'Admin Sistem',
      userRole: 'SUPER_ADMIN',
      action,
      target,
      timestamp,
      details,
    };
    logs.unshift(newLog);
    // Keep max 100 logs
    setStored(STORAGE_KEYS.ACTIVITY_LOGS, logs.slice(0, 100));
  },

  // WISHLIST & RECENTLY VIEWED (Client Storage)
  getWishlist(): string[] {
    return getStored<string[]>(STORAGE_KEYS.WISHLIST, []);
  },
  saveWishlist(ids: string[]): void {
    setStored(STORAGE_KEYS.WISHLIST, ids);
  },
  toggleWishlist(productId: string): boolean {
    const list = this.getWishlist();
    const exists = list.includes(productId);
    const updated = exists ? list.filter((id) => id !== productId) : [...list, productId];
    this.saveWishlist(updated);
    return !exists;
  },
  getRecentlyViewed(): string[] {
    return getStored<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
  },
  addRecentlyViewed(productId: string): void {
    const list = this.getRecentlyViewed().filter((id) => id !== productId);
    list.unshift(productId);
    setStored(STORAGE_KEYS.RECENTLY_VIEWED, list.slice(0, 8));
  },

  // RESET TO DEMO DATA
  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.QUOTATIONS);
    localStorage.removeItem(STORAGE_KEYS.CS_TICKETS);
    localStorage.removeItem(STORAGE_KEYS.CS_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.HOMEPAGE);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITY_LOGS);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USERS);
    this.addLog('Reset Data Sistem', 'Semua data dikembalikan ke konfigurasi awal bawaan');
  },
};
