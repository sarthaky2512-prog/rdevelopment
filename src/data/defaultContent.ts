import {
  CmsPage,
  FaqItem,
  ProjectCategory,
  ProjectItem,
  ServiceItem,
  SiteSettings,
  TestimonialItem,
} from '../types';

export const IMAGES = {
  heroResidence: '/src/assets/images/hero_luxury_residence_1795255903792.jpg',
  studioCraftsmanship: '/src/assets/images/about_craftsmanship_studio_1795255906851.jpg',
  residentialHome: '/src/assets/images/residential_custom_home_1795255906865.jpg',
  commercialOffice: '/src/assets/images/commercial_banner_modern_1795257510901.jpg',
  kitchenLuxury: '/src/assets/images/kitchen_remodeling_luxury_1795255906596.jpg',
  bathroomSpa: '/src/assets/images/bathroom_spa_remodel_1795255906468.jpg',
  exteriorDeckRoof: '/src/assets/images/exterior_deck_roofing_1795255906693.jpg',
  renovationFraming: '/src/assets/images/renovation_before_construction_1795255906569.jpg',
};

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What construction services do you provide?',
    answer:
      'Rdevelopmentgroup provides residential and commercial construction, new home building, architectural and interior/exterior design, 3D visualization, kitchen and bathroom remodeling, whole-home renovations, basement finishing, home additions, roofing, siding, custom decks, and project coordination.',
  },
  {
    id: 'faq-2',
    question: 'Do you offer residential construction?',
    answer:
      'Yes. We work with homeowners on new custom home construction, structural additions, whole-home remodeling, kitchen and bathroom renovations, exterior improvements, and tailored interior finishing.',
  },
  {
    id: 'faq-3',
    question: 'Do you provide commercial remodeling?',
    answer:
      'Yes. Our commercial services cover office remodeling, retail space improvements, commercial interior design, building upgrades, and commercial build-out projects.',
  },
  {
    id: 'faq-4',
    question: 'Can I request a project estimate?',
    answer:
      'Yes. You can submit your project details, preferred timeline, and optional photos through our Request an Estimate form. Our team reviews every submission and confirms estimate availability and consultation scheduling directly with you.',
  },
  {
    id: 'faq-5',
    question: 'Do you provide interior and exterior design?',
    answer:
      'Yes. We offer integrated architectural design, exterior elevation design, interior space planning, material selection guidance, and 3D visualization so you can review design concepts before construction begins.',
  },
  {
    id: 'faq-6',
    question: 'Can I see examples of completed projects?',
    answer:
      'You can explore our Our Projects and Project Gallery pages to review architectural concepts, remodeling layouts, and before-and-after showcases. Each portfolio entry is clearly labeled to distinguish sample architectural concepts from completed Rdevelopmentgroup projects.',
  },
  {
    id: 'faq-7',
    question: 'How do I start a construction project?',
    answer:
      'Starting begins with an initial consultation to review your property, design goals, and timeline. From there we move through planning and design, scope and estimate review, construction execution, and a thorough final walkthrough.',
  },
  {
    id: 'faq-8',
    question: 'How can I contact Rdevelopmentgroup?',
    answer:
      'You can reach our team directly by phone at +1 8444543465, by email at support@rdevelopmentgroup.com, via our Contact Us page, or at 6805 Marleigh Ct, Clifton, Virginia 20124, USA.',
  },
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: 'Rdevelopmentgroup',
  tagline: 'BUILDING YOUR VISION. CREATING YOUR FUTURE.',
  phone: '+1 8444543465',
  email: 'support@rdevelopmentgroup.com',
  address: '6805 Marleigh Ct, Clifton, Virginia 20124, USA.',
  domain: import.meta.env.VITE_SITE_URL || 'https://rdevelopmentgroup.com',
  confirmFreeEstimates: false,
  heroHeading: 'BUILDING YOUR VISION. CREATING YOUR FUTURE.',
  heroSubheading: 'QUALITY CRAFTSMANSHIP. EXCEPTIONAL RESULTS.',
  heroDescription:
    'Professional Construction, Remodeling & Architecture Solutions.',
  heroImageUrl: IMAGES.heroResidence,
  heroVideoUrl:
    'https://gfk0fto1mnuj6g6f.public.blob.vercel-storage.com/Create_architecture_renovation_v%E2%80%A6_9b51c2e8.mp4',
  aboutHeading: 'BUILDING WITH QUALITY. DESIGNING WITH PURPOSE.',
  aboutDescription:
    'Rdevelopmentgroup is dedicated to delivering professional construction, architecture, remodeling, and home improvement solutions. We focus on quality craftsmanship, attention to detail, and customer satisfaction. From initial planning and design to renovation and finishing, our goal is to help customers create spaces that reflect their vision and needs.',
  seoTitle: 'Rdevelopmentgroup | Construction, Architecture & Remodeling',
  seoDescription:
    'Rdevelopmentgroup delivers residential and commercial construction, architectural design, interior design, and remodeling services from Clifton, Virginia.',
  seoKeywords:
    'Rdevelopmentgroup, residential construction, commercial construction, architectural design, kitchen remodeling, bathroom remodeling, Clifton Virginia',
  socialInstagram: '',
  socialLinkedIn: '',
  socialFacebook: '',
  socialHouzz: '',
  footerDisclaimer:
    'Project photography and sample layouts shown prior to verified project publication illustrate architectural scope and design direction. Service availability, project estimates, and trade coordination details are confirmed individually during formal consultation.',
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Residential', path: '/residential-construction' },
    { label: 'Commercial', path: '/commercial-construction' },
    { label: 'Projects', path: '/projects' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' },
  ],
  footerLinks: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Residential Construction', path: '/residential-construction' },
    { label: 'Commercial Construction', path: '/commercial-construction' },
    { label: 'Projects', path: '/projects' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' },
  ],
  faqs: DEFAULT_FAQS,
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  // A. Construction Services (1-6)
  {
    id: 'svc-01',
    number: 1,
    category: 'Construction Services',
    title: 'Residential Construction',
    description:
      'Comprehensive ground-up residential builds, structural upgrades, and custom home construction tailored to your property and lifestyle.',
    benefits: ['Dedicated residential project oversight', 'Cohesive structural and architectural execution', 'Clear milestone communication'],
    imageUrl: IMAGES.residentialHome,
    featured: true,
  },
  {
    id: 'svc-02',
    number: 2,
    category: 'Construction Services',
    title: 'Commercial Construction',
    description:
      'Purpose-built commercial construction, tenant build-outs, and workspace transformations engineered for durability and daily operational flow.',
    benefits: ['Scheduled phasing for business continuity', 'Functional spatial layouts', 'Consistent quality control across trades'],
    imageUrl: IMAGES.commercialOffice,
    featured: true,
  },
  {
    id: 'svc-03',
    number: 3,
    category: 'Construction Services',
    title: 'New Home Construction',
    description:
      'Turnkey custom residence construction guiding clients from site planning and architectural layout through framing, finishes, and final walkthrough.',
    benefits: ['Custom floor plan integration', 'Thoughtful material specification', 'Structured build timeline'],
    imageUrl: IMAGES.heroResidence,
    featured: true,
  },
  {
    id: 'svc-04',
    number: 4,
    category: 'Construction Services',
    title: 'Building Renovation',
    description:
      'Comprehensive interior and structural revitalization for aging residential and commercial properties seeking modern function and visual appeal.',
    benefits: ['Preserves core structural value', 'Modernizes utilities and finishes', 'Enhances long-term usability'],
    imageUrl: IMAGES.renovationFraming,
  },
  {
    id: 'svc-05',
    number: 5,
    category: 'Construction Services',
    title: 'Structural Improvements',
    description:
      'Load-bearing modifications, open-concept beam installations, framing reinforcements, and layout reconfigurations executed with precision.',
    benefits: ['Opens cramped floor plans safely', 'Supports multi-room remodeling goals', 'Coordinated engineering review'],
    imageUrl: IMAGES.renovationFraming,
  },
  {
    id: 'svc-06',
    number: 6,
    category: 'Construction Services',
    title: 'General Contracting',
    description:
      'End-to-end site coordination, trade scheduling, material procurement, and quality oversight under one accountable point of contact.',
    benefits: ['Single-point project accountability', 'Transparent scope management', 'Aligned subcontractor scheduling'],
    imageUrl: IMAGES.studioCraftsmanship,
  },
  // B. Architecture & Design (7-12)
  {
    id: 'svc-07',
    number: 7,
    category: 'Architecture & Design',
    title: 'Architectural Design',
    description:
      'Thoughtful architectural planning that balances structural proportion, natural daylight, circulation, and site orientation.',
    benefits: ['Cohesive elevation and massing design', 'Functional floor plan flow', 'Integrated indoor-outdoor sightlines'],
    imageUrl: IMAGES.studioCraftsmanship,
    featured: true,
  },
  {
    id: 'svc-08',
    number: 8,
    category: 'Architecture & Design',
    title: 'Exterior Design',
    description:
      'Refined facade compositions combining natural stone, architectural siding, window proportions, and outdoor living geometry.',
    benefits: ['Elevated curb appeal', 'Balanced material palettes', 'Weather-conscious envelope detailing'],
    imageUrl: IMAGES.residentialHome,
  },
  {
    id: 'svc-09',
    number: 9,
    category: 'Architecture & Design',
    title: 'Interior Design',
    description:
      'Curated interior environments uniting custom cabinetry, stonework, architectural lighting, and refined finish schedules.',
    benefits: ['Harmonized material & color selection', 'Custom millwork detailing', 'Cohesive room-to-room transitions'],
    imageUrl: IMAGES.kitchenLuxury,
    featured: true,
  },
  {
    id: 'svc-10',
    number: 10,
    category: 'Architecture & Design',
    title: '3D Design & Visualization',
    description:
      'Realistic spatial renderings and perspective studies allowing you to evaluate proportions, lighting, and finishes prior to build.',
    benefits: ['Eliminates guesswork before construction', 'Simplifies finish comparisons', 'Aligns homeowners and design teams'],
    imageUrl: IMAGES.studioCraftsmanship,
  },
  {
    id: 'svc-11',
    number: 11,
    category: 'Architecture & Design',
    title: 'Space Planning',
    description:
      'Strategic room zoning, storage optimization, and ergonomic circulation layouts designed for how your household or business operates.',
    benefits: ['Maximizes usable square footage', 'Improves natural light distribution', 'Tailored workflow and storage zones'],
    imageUrl: IMAGES.commercialOffice,
  },
  {
    id: 'svc-12',
    number: 12,
    category: 'Architecture & Design',
    title: 'Residential & Commercial Design',
    description:
      'Unified design services spanning private custom residences, executive offices, hospitality suites, and client-facing retail spaces.',
    benefits: ['Brand-aligned commercial aesthetics', 'Residential warmth and comfort', 'Seamless transition to build phase'],
    imageUrl: IMAGES.commercialOffice,
  },
  // C. Remodeling Services (13-18)
  {
    id: 'svc-13',
    number: 13,
    category: 'Remodeling Services',
    title: 'Kitchen Remodeling',
    description:
      'Bespoke kitchen transformations featuring custom cabinetry, stone waterfall islands, tailored lighting, and efficient culinary layouts.',
    benefits: ['Custom island and storage engineering', 'High-durability stone surfaces', 'Integrated task and ambient lighting'],
    imageUrl: IMAGES.kitchenLuxury,
    featured: true,
  },
  {
    id: 'svc-14',
    number: 14,
    category: 'Remodeling Services',
    title: 'Bathroom Remodeling',
    description:
      'Serene, spa-caliber bathroom renovations with large-format stone tile, frameless glass enclosures, custom vanities, and refined fixtures.',
    benefits: ['Waterproof wet-area detailing', 'Custom vanity & mirror architecture', 'Comfort-focused layout improvements'],
    imageUrl: IMAGES.bathroomSpa,
    featured: true,
  },
  {
    id: 'svc-15',
    number: 15,
    category: 'Remodeling Services',
    title: 'Whole-Home Remodeling',
    description:
      'Comprehensive multi-room renovations unifying flooring, wall layouts, trim profiles, lighting, and mechanical upgrades across the entire residence.',
    benefits: ['Consistent architectural language throughout', 'Coordinated multi-phase execution', 'Complete modern transformation'],
    imageUrl: IMAGES.heroResidence,
  },
  {
    id: 'svc-16',
    number: 16,
    category: 'Remodeling Services',
    title: 'Basement Remodeling',
    description:
      'Converting unfinished lower levels into inviting living suites, home offices, media lounges, or guest quarters with proper lighting and comfort.',
    benefits: ['Expands livable home footprint', 'Acoustic and moisture-conscious finishes', 'Flexible multi-purpose zoning'],
    imageUrl: IMAGES.renovationFraming,
  },
  {
    id: 'svc-17',
    number: 17,
    category: 'Remodeling Services',
    title: 'Home Additions',
    description:
      'Seamless architectural extensions—including primary suite wings, sunrooms, and second-story additions—matched to your existing structure.',
    benefits: ['Matched roofline and exterior materials', 'Preserves neighborhood character', 'Custom-tailored new living space'],
    imageUrl: IMAGES.residentialHome,
  },
  {
    id: 'svc-18',
    number: 18,
    category: 'Remodeling Services',
    title: 'Interior Finishes',
    description:
      'Precision installation of architectural trim, hardwood flooring, custom wainscoting, built-ins, interior doors, and hardware.',
    benefits: ['Crisp joinery and clean sightlines', 'Elevated tactile material quality', 'Detail-oriented final punch list'],
    imageUrl: IMAGES.kitchenLuxury,
  },
  // D. Exterior Services (19-23)
  {
    id: 'svc-19',
    number: 19,
    category: 'Exterior Services',
    title: 'Roofing',
    description:
      'Architectural shingle and standing-seam metal roofing installations designed for weather protection, clean roof geometry, and longevity.',
    benefits: ['Clean flashing and valley detailing', 'Complements modern and classic facades', 'Thorough site cleanup'],
    imageUrl: IMAGES.exteriorDeckRoof,
  },
  {
    id: 'svc-20',
    number: 20,
    category: 'Exterior Services',
    title: 'Siding',
    description:
      'Precision exterior cladding systems—from fiber-cement panels and board-and-batten to natural wood and stone accents.',
    benefits: ['Refreshed exterior architectural presence', 'Improved moisture barrier detailing', 'Low-maintenance material options'],
    imageUrl: IMAGES.residentialHome,
  },
  {
    id: 'svc-21',
    number: 21,
    category: 'Exterior Services',
    title: 'Exterior Deck Construction',
    description:
      'Custom multi-level decks, covered timber pavilions, glass or steel railings, and integrated architectural step lighting.',
    benefits: ['Extends entertaining outdoors', 'Composite and hardwood options', 'Custom covered roof structures'],
    imageUrl: IMAGES.exteriorDeckRoof,
    featured: true,
  },
  {
    id: 'svc-22',
    number: 22,
    category: 'Exterior Services',
    title: 'Exterior Renovation',
    description:
      'Coordinated facade modernization updating entryways, porches, window trim, masonry accents, and outdoor architectural lighting.',
    benefits: ['Cohesive whole-exterior transformation', 'Upgraded entry focal points', 'Unified material palette'],
    imageUrl: IMAGES.heroResidence,
  },
  {
    id: 'svc-23',
    number: 23,
    category: 'Exterior Services',
    title: 'Painting & Finishing',
    description:
      'Careful surface preparation and crisp interior and exterior coatings applied with attention to trim lines, sheen, and durability.',
    benefits: ['Thorough masking and surface prep', 'Consistent satin and matte finishes', 'Clean jobsite protection'],
    imageUrl: IMAGES.bathroomSpa,
  },
  // E. Specialized Services (24-26)
  {
    id: 'svc-24',
    number: 24,
    category: 'Specialized Services',
    title: 'Electrical Services',
    description:
      'Coordinated residential and commercial electrical layout planning, architectural recessed lighting, fixture installation, and project-phase wiring support.',
    benefits: ['Integrated architectural lighting plans', 'Coordinated rough-in and trim scheduling', 'Clean fixture alignment'],
    imageUrl: IMAGES.commercialOffice,
  },
  {
    id: 'svc-25',
    number: 25,
    category: 'Specialized Services',
    title: 'Plumbing Services',
    description:
      'Fixture upgrades, kitchen and bath rough-in coordination, vanity and wet-room plumbing layouts integrated seamlessly into remodeling schedules.',
    benefits: ['Supports modern kitchen & spa layouts', 'Coordinated with tile and cabinetry timelines', 'Clean finish trim installation'],
    imageUrl: IMAGES.bathroomSpa,
  },
  {
    id: 'svc-26',
    number: 26,
    category: 'Specialized Services',
    title: 'Permits & Project Coordination',
    description:
      'Structured scheduling, documentation organization, and submittal coordination with homeowners, design consultants, and local review workflows.',
    benefits: ['Organized pre-construction documentation', 'Clear milestone tracking', 'Responsive owner communication'],
    imageUrl: IMAGES.studioCraftsmanship,
  },
];

export const DEFAULT_CATEGORIES: ProjectCategory[] = [
  { id: 'cat-1', name: 'Residential Construction', order: 1 },
  { id: 'cat-2', name: 'Commercial Construction', order: 2 },
  { id: 'cat-3', name: 'Interior Design', order: 3 },
  { id: 'cat-4', name: 'Exterior Design', order: 4 },
  { id: 'cat-5', name: 'Kitchen Remodeling', order: 5 },
  { id: 'cat-6', name: 'Bathroom Remodeling', order: 6 },
  { id: 'cat-7', name: 'Roofing', order: 7 },
  { id: 'cat-8', name: 'Exterior Decks', order: 8 },
  { id: 'cat-9', name: 'Renovations', order: 9 },
];

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-sample-residence',
    slug: 'modern-limestone-residence-concept',
    title: 'Modern Limestone & Steel Residence',
    category: 'Residential Construction',
    projectStatus: 'sample',
    location: 'Sample Showcase · Northern Virginia Concept',
    summary:
      'Sample architectural showcase illustrating custom new home massing, natural limestone masonry, black steel glazing, and courtyard integration.',
    description:
      'This sample architectural showcase demonstrates how Rdevelopmentgroup approaches modern residential builds: pairing warm limestone masonry and cedar soffits with crisp black architectural window framing, standing-seam metal roofing, and seamless indoor-outdoor courtyard circulation.',
    scopeItems: [
      'Architectural elevation & site orientation concept',
      'Limestone & cedar exterior envelope',
      'Expansive structural steel window walls',
      'Courtyard hardscape & evening architectural lighting',
    ],
    imageUrl: IMAGES.heroResidence,
    beforeImageUrl: IMAGES.renovationFraming,
    afterImageUrl: IMAGES.heroResidence,
    galleryImages: [IMAGES.heroResidence, IMAGES.residentialHome, IMAGES.exteriorDeckRoof],
  },
  {
    id: 'proj-sample-kitchen',
    slug: 'calacatta-waterfall-kitchen-concept',
    title: 'Calacatta & Matte Black Culinary Suite',
    category: 'Kitchen Remodeling',
    projectStatus: 'sample',
    location: 'Sample Showcase · Interior Remodeling Concept',
    summary:
      'Sample kitchen remodeling layout pairing custom matte black cabinetry, white oak shelving, satin brass fixtures, and a waterfall marble island.',
    description:
      'Designed as an illustrative sample of our kitchen remodeling capabilities, this concept highlights structural wall opening, custom full-height cabinetry, fluted white oak niches, and balanced warm architectural pendant illumination.',
    scopeItems: [
      'Custom matte black & white oak cabinetry',
      'Book-matched waterfall stone island',
      'Integrated under-cabinet & pendant lighting',
      'Hardwood flooring & precision trim finish',
    ],
    imageUrl: IMAGES.kitchenLuxury,
    beforeImageUrl: IMAGES.renovationFraming,
    afterImageUrl: IMAGES.kitchenLuxury,
    galleryImages: [IMAGES.kitchenLuxury, IMAGES.renovationFraming],
  },
  {
    id: 'proj-sample-commercial',
    slug: 'executive-travertine-office-buildout',
    title: 'Executive Travertine & Steel Lobby',
    category: 'Commercial Construction',
    projectStatus: 'sample',
    location: 'Sample Showcase · Commercial Interior Concept',
    summary:
      'Sample commercial interior build-out featuring acoustic glass office partitions, travertine stone reception paneling, and linear LED ceilings.',
    description:
      'This commercial construction concept illustrates a refined client-facing office environment with honed travertine millwork, black anodized aluminum storefront framing, brushed brass floor inlays, and private executive suites.',
    scopeItems: [
      'Commercial interior space planning',
      'Architectural glass & steel office fronts',
      'Custom stone reception desk & wall cladding',
      'Recessed linear architectural lighting',
    ],
    imageUrl: IMAGES.commercialOffice,
    beforeImageUrl: IMAGES.renovationFraming,
    afterImageUrl: IMAGES.commercialOffice,
    galleryImages: [IMAGES.commercialOffice, IMAGES.studioCraftsmanship],
  },
  {
    id: 'proj-sample-bath',
    slug: 'honed-limestone-spa-bath-concept',
    title: 'Honed Limestone Primary Bath Suite',
    category: 'Bathroom Remodeling',
    projectStatus: 'sample',
    location: 'Sample Showcase · Bathroom Remodeling Concept',
    summary:
      'Sample spa bathroom renovation showcasing large-format limestone tile, floating walnut double vanity, frameless glass shower, and freestanding tub.',
    description:
      'An illustrative bathroom remodeling showcase focused on clean wet-room waterproofing, continuous large-format stone planes, brushed brass wall-mounted fixtures, and natural daylighting.',
    scopeItems: [
      'Frameless glass walk-in shower enclosure',
      'Custom floating walnut double vanity',
      'Freestanding soaking tub & floor-mount filler',
      'Large-format honed stone wall & floor tile',
    ],
    imageUrl: IMAGES.bathroomSpa,
    beforeImageUrl: IMAGES.renovationFraming,
    afterImageUrl: IMAGES.bathroomSpa,
    galleryImages: [IMAGES.bathroomSpa],
  },
  {
    id: 'proj-sample-deck-roof',
    slug: 'covered-timber-pavilion-and-roofing',
    title: 'Covered Timber Pavilion & Metal Roofing',
    category: 'Exterior Decks',
    projectStatus: 'sample',
    location: 'Sample Showcase · Exterior & Roofing Concept',
    summary:
      'Sample exterior living addition combining a custom covered timber deck, stone fireplace hearth, composite decking, and standing-seam metal roof.',
    description:
      'This exterior design showcase pairs durable standing-seam black metal roofing with exposed timber trusses, low-voltage step lighting, and sleek horizontal cable-style railings for year-round outdoor living.',
    scopeItems: [
      'Timber-framed gable pavilion roof',
      'Standing-seam architectural metal roofing',
      'Composite decking with integrated step LEDs',
      'Custom stone outdoor hearth integration',
    ],
    imageUrl: IMAGES.exteriorDeckRoof,
    beforeImageUrl: IMAGES.renovationFraming,
    afterImageUrl: IMAGES.exteriorDeckRoof,
    galleryImages: [IMAGES.exteriorDeckRoof, IMAGES.residentialHome],
  },
  {
    id: 'proj-sample-estate',
    slug: 'custom-estate-exterior-architecture',
    title: 'Custom Estate Facade & Siding Upgrade',
    category: 'Exterior Design',
    projectStatus: 'sample',
    location: 'Sample Showcase · Exterior Renovation Concept',
    summary:
      'Sample new home and exterior renovation concept uniting natural stone piers, dark vertical cladding, cedar soffits, and black metal roofing.',
    description:
      'This sample residential exterior showcase demonstrates cohesive facade composition—balancing stone retaining walls, warm cedar eaves, expansive black-framed windows, and crisp metal roof lines.',
    scopeItems: [
      'Full facade & siding architectural design',
      'Standing-seam metal roof system',
      'Natural stone masonry & retaining walls',
      'Custom window & entry door package',
    ],
    imageUrl: IMAGES.residentialHome,
    beforeImageUrl: IMAGES.renovationFraming,
    afterImageUrl: IMAGES.residentialHome,
    galleryImages: [IMAGES.residentialHome, IMAGES.heroResidence],
  },
  {
    id: 'proj-sample-renovation',
    slug: 'structural-framing-open-plan-renovation',
    title: 'Structural Framing & Open-Plan Conversion',
    category: 'Renovations',
    projectStatus: 'sample',
    location: 'Sample Showcase · Structural Renovation Concept',
    summary:
      'Sample structural renovation progression showing timber wall framing, ceiling joist reconfiguration, and transition to finished architectural space.',
    description:
      'Illustrating the behind-the-walls craftsmanship that anchors every Rdevelopmentgroup renovation, this sample compares active structural framing and rough-in preparation against a finished modern living interior.',
    scopeItems: [
      'Interior wall reconfiguration & framing',
      'Ceiling joist & window opening preparation',
      'Subfloor leveling & mechanical rough-in prep',
      'Full drywall, millwork & finish completion',
    ],
    imageUrl: IMAGES.renovationFraming,
    beforeImageUrl: IMAGES.renovationFraming,
    afterImageUrl: IMAGES.kitchenLuxury,
    galleryImages: [IMAGES.renovationFraming, IMAGES.kitchenLuxury],
  },
  {
    id: 'proj-sample-interior-studio',
    slug: 'architectural-material-curation-studio',
    title: 'Architectural Space & Material Curation',
    category: 'Interior Design',
    projectStatus: 'sample',
    location: 'Sample Showcase · Architecture & Design Concept',
    summary:
      'Sample design-build planning showcase covering architectural elevation drawings, marble and walnut palette boards, and brass hardware selection.',
    description:
      'Every cohesive build begins on the drafting table. This sample interior and architectural design showcase illustrates our material curation and blueprint review workflow before site mobilization.',
    scopeItems: [
      'Floor plan & elevation blueprint preparation',
      'Natural stone & hardwood palette curation',
      'Architectural hardware & fixture specification',
      '3D visualization & scope alignment',
    ],
    imageUrl: IMAGES.studioCraftsmanship,
    galleryImages: [IMAGES.studioCraftsmanship, IMAGES.commercialOffice],
  },
  {
    id: 'proj-sample-roofing',
    slug: 'standing-seam-architectural-roofing',
    title: 'Standing-Seam Metal Roofing System',
    category: 'Roofing',
    projectStatus: 'sample',
    location: 'Sample Showcase · Roofing Concept',
    summary:
      'Sample architectural roofing showcase highlighting matte black standing-seam panels, precision ridge caps, and integrated gutter flashing.',
    description:
      'Designed to protect both modern estates and covered outdoor pavilions, this roofing concept pairs clean standing-seam metal panels with cedar soffit ventilation and crisp perimeter trim.',
    scopeItems: [
      'Matte black standing-seam metal panels',
      'Precision valley & chimney flashing',
      'Ventilated cedar soffit integration',
      'Perimeter fascia & drainage alignment',
    ],
    imageUrl: IMAGES.exteriorDeckRoof,
    galleryImages: [IMAGES.exteriorDeckRoof, IMAGES.residentialHome],
  },
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-layout-1',
    customerName: 'Sample Client Slot — Residential Remodel',
    projectType: 'Kitchen & Whole-Home Remodeling',
    feedback:
      'Placeholder testimonial layout reserved for a verified homeowner review. Once published by Rdevelopmentgroup in the Admin Dashboard, verified client feedback will appear here.',
    rating: 5,
    isSampleLayout: true,
  },
  {
    id: 'test-layout-2',
    customerName: 'Sample Client Slot — Commercial Build-Out',
    projectType: 'Commercial Interior Construction',
    feedback:
      'Placeholder testimonial layout reserved for a verified commercial client review highlighting project communication, finish quality, and schedule coordination.',
    rating: 5,
    isSampleLayout: true,
  },
  {
    id: 'test-layout-3',
    customerName: 'Sample Client Slot — Exterior & Decking',
    projectType: 'Custom Pavilion & Roofing',
    feedback:
      'Placeholder testimonial layout reserved for a verified residential exterior client review covering craftsmanship, material quality, and final walkthrough.',
    rating: 5,
    isSampleLayout: true,
  },
];

export const DEFAULT_PAGES: CmsPage[] = [];
