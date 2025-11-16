import PrintIcon from '@mui/icons-material/Print';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BoltIcon from '@mui/icons-material/Bolt';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CloudIcon from '@mui/icons-material/Cloud';
import PaletteIcon from '@mui/icons-material/Palette';
import ExtensionIcon from '@mui/icons-material/Extension';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

export const products = [
  {
    id: '3d-printers',
    name: '3D Printers',
    slug: '3d-printers',
    category: 'Hardware',
    tagline: 'Industry-leading additive manufacturing solutions',
    description: 'High-precision 3D printing systems designed for professional manufacturing and rapid prototyping. Our printers deliver exceptional quality and reliability for complex geometries.',
    icon: <PrintIcon sx={{ fontSize: 'inherit' }} />,
    basePrice: 12999,
    priceLabel: 'Starting at $12,999',
    features: [
      'Multi-material support with advanced extruder systems',
      'Precision control with 10-micron layer resolution',
      'Automated bed leveling and calibration',
      'Real-time monitoring and remote control',
      'Professional-grade build volume up to 500x500x600mm'
    ],
    specs: {
      'Build Volume': 'Up to 500x500x600mm',
      'Layer Resolution': '10-100 microns',
      'Print Speed': 'Up to 300mm/s',
      'Materials': 'PLA, ABS, PETG, Nylon, TPU, Composites',
      'Connectivity': 'WiFi, Ethernet, USB'
    },
    variants: [
      {
        name: 'Standard',
        price: 12999,
        description: 'Perfect for small to medium production runs',
        specs: { 'Build Volume': '300x300x400mm' }
      },
      {
        name: 'Professional',
        price: 24999,
        description: 'Enhanced capabilities for demanding applications',
        specs: { 'Build Volume': '400x400x500mm' }
      },
      {
        name: 'Industrial',
        price: 49999,
        description: 'Maximum performance for high-volume manufacturing',
        specs: { 'Build Volume': '500x500x600mm' }
      }
    ],
    status: 'available',
    releaseDate: '2024-Q2'
  },
  {
    id: 'cnc-machines',
    name: 'CNC Machines',
    slug: 'cnc-machines',
    category: 'Hardware',
    tagline: 'Professional-grade computer numerical control systems',
    description: 'Precision CNC milling and routing machines for subtractive manufacturing. Built for accuracy, repeatability, and production-grade performance.',
    icon: <PrecisionManufacturingIcon sx={{ fontSize: 'inherit' }} />,
    basePrice: 29999,
    priceLabel: 'Starting at $29,999',
    features: [
      'High-speed spindle up to 24,000 RPM',
      '5-axis simultaneous machining capability',
      'Sub-micron positioning accuracy',
      'Automatic tool changing system',
      'Advanced collision detection and prevention'
    ],
    specs: {
      'Work Envelope': 'Up to 1000x800x500mm',
      'Spindle Speed': '24,000 RPM',
      'Positioning Accuracy': '±0.005mm',
      'Axes': '3, 4, or 5-axis configurations',
      'Tool Capacity': '12-20 tool automatic changer'
    },
    variants: [
      {
        name: '3-Axis',
        price: 29999,
        description: 'Versatile 3-axis machining for standard operations',
        specs: { 'Axes': '3-axis configuration', 'Tool Capacity': '12 tool changer' }
      },
      {
        name: '4-Axis',
        price: 49999,
        description: 'Advanced 4-axis capability for complex geometries',
        specs: { 'Axes': '4-axis configuration', 'Tool Capacity': '16 tool changer' }
      },
      {
        name: '5-Axis',
        price: 79999,
        description: 'Premium 5-axis simultaneous machining',
        specs: { 'Axes': '5-axis configuration', 'Tool Capacity': '20 tool changer' }
      }
    ],
    status: 'available',
    releaseDate: '2024-Q1'
  },
  {
    id: 'pick-and-place',
    name: 'Pick & Place',
    slug: 'pick-and-place',
    category: 'Hardware',
    tagline: 'Automated assembly systems for efficient PCB manufacturing',
    description: 'High-speed pick and place machines for PCB assembly and electronic manufacturing. Designed for accuracy, speed, and flexibility in production environments.',
    icon: <SmartToyIcon sx={{ fontSize: 'inherit' }} />,
    basePrice: 39999,
    priceLabel: 'Starting at $39,999',
    features: [
      'High-speed placement up to 25,000 CPH',
      'Vision-based component recognition',
      'Support for 0201 to large BGAs',
      'Automatic feeder management',
      'Industry 4.0 integration capabilities'
    ],
    specs: {
      'Placement Speed': 'Up to 25,000 components/hour',
      'Component Range': '0201 to 50x50mm',
      'Accuracy': '±0.02mm @ 3 sigma',
      'PCB Size': 'Up to 450x400mm',
      'Feeders': '80+ positions'
    },
    variants: [
      {
        name: 'Compact',
        price: 39999,
        description: 'Ideal for prototyping and small batch production',
        specs: { 'Placement Speed': '15,000 CPH', 'Feeders': '40 positions' }
      },
      {
        name: 'Production',
        price: 69999,
        description: 'High-speed production with expanded feeder capacity',
        specs: { 'Placement Speed': '20,000 CPH', 'Feeders': '80 positions' }
      },
      {
        name: 'Industrial',
        price: 99999,
        description: 'Maximum throughput for high-volume manufacturing',
        specs: { 'Placement Speed': '25,000 CPH', 'Feeders': '120 positions' }
      }
    ],
    status: 'available',
    releaseDate: '2024-Q3'
  },
  {
    id: 'zcad',
    name: 'ZCAD',
    slug: 'zcad',
    category: 'Software',
    tagline: 'Next-generation Electronic Design Automation',
    description: 'Revolutionary EDA software combining schematic capture, PCB layout, and simulation in a modern, intuitive interface. ZCAD reimagines electronic design with AI-assisted routing and real-time collaboration.',
    icon: <BoltIcon sx={{ fontSize: 'inherit' }} />,
    features: [
      'Unified schematic and PCB layout environment',
      'AI-assisted auto-routing and optimization',
      'Real-time design rule checking (DRC)',
      'Integrated SPICE simulation engine',
      'Cloud collaboration and version control',
      'Extensive component library with 3D models',
      'Advanced signal integrity analysis',
      'Automatic bill of materials (BOM) generation',
      'Gerber and industry-standard export formats',
      'Dark mode and customizable UI themes'
    ],
    specs: {
      'Platforms': 'Windows, macOS, Linux',
      'Max Layers': 'Unlimited',
      'Component Library': '10M+ components',
      'File Formats': 'Native, Eagle, KiCad, Altium',
      'Collaboration': 'Real-time multi-user',
      'Simulation': 'Analog, Digital, Mixed-signal'
    },
    status: 'coming-soon',
    releaseDate: '2025-Q1',
    comingSoonBadge: 'Shipping Soon',
    highlights: [
      {
        title: 'AI-Powered Design',
        description: 'Machine learning algorithms optimize trace routing, component placement, and signal integrity automatically.',
        icon: <PsychologyIcon sx={{ fontSize: 'inherit' }} />
      },
      {
        title: 'Cloud-Native',
        description: 'Work from anywhere with cloud sync, real-time collaboration, and automatic backups.',
        icon: <CloudIcon sx={{ fontSize: 'inherit' }} />
      },
      {
        title: 'Modern Interface',
        description: 'Beautiful, intuitive UI designed for productivity. Customizable workspaces and keyboard shortcuts.',
        icon: <PaletteIcon sx={{ fontSize: 'inherit' }} />
      },
      {
        title: 'Open Ecosystem',
        description: 'Import/export from all major EDA tools. Python API for automation and custom plugins.',
        icon: <ExtensionIcon sx={{ fontSize: 'inherit' }} />
      }
    ],
    basePrice: 0,
    priceLabel: 'Free to start',
    variants: [
      {
        name: 'Starter',
        price: 'Free',
        description: 'Perfect for hobbyists and students learning PCB design',
        features: ['2-layer PCBs', 'Basic component library', 'Community support', 'Export to Gerber']
      },
      {
        name: 'Professional',
        price: 49,
        priceLabel: '$49/month',
        description: 'Complete toolset for professional PCB designers',
        features: ['Unlimited layers', 'Full component library', 'Advanced simulation', 'Priority support', 'Cloud collaboration']
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Tailored solutions for organizations',
        features: ['Volume licensing', 'Dedicated support', 'Custom integrations', 'On-premise deployment', 'Training & onboarding']
      }
    ]
  },
  {
    id: 'syntric-slicer',
    name: 'Syntric Slicer',
    slug: 'slicer',
    category: 'Software',
    tagline: 'Advanced 3D printing slicer with intelligent optimization',
    description: 'Professional slicing software for 3D printing that combines speed, precision, and ease of use. Featuring AI-powered support generation and advanced print optimization.',
    icon: <ContentCutIcon sx={{ fontSize: 'inherit' }} />,
    basePrice: 0,
    priceLabel: 'Free to start',
    features: [
      'AI-powered automatic support generation',
      'Advanced infill patterns and optimization',
      'Real-time print time and cost estimation',
      'Multi-material and multi-color support',
      'Custom printer profiles and presets',
      'Detailed layer-by-layer preview',
      'Variable layer height optimization',
      'Seamless integration with cloud print farms'
    ],
    specs: {
      'Platforms': 'Windows, macOS, Linux',
      'File Input': 'STL, OBJ, 3MF, STEP',
      'File Output': 'G-code, X3G, custom formats',
      'Printer Support': '500+ printer profiles',
      'Languages': 'English, German, French, Spanish, Chinese, Japanese'
    },
    variants: [
      {
        name: 'Basic',
        price: 'Free',
        description: 'Essential slicing tools for makers and hobbyists',
        features: ['Standard slicing features', 'Basic support generation', 'Community support', '100+ printer profiles']
      },
      {
        name: 'Pro',
        price: 29,
        priceLabel: '$29/month',
        description: 'Advanced features for professional 3D printing',
        features: ['AI-powered supports', 'Advanced optimization', 'Priority support', 'Cloud print farm integration', '500+ printer profiles']
      },
      {
        name: 'Business',
        price: 99,
        priceLabel: '$99/month',
        description: 'Complete solution for production environments',
        features: ['Team collaboration', 'Custom printer profiles', 'API access', 'Dedicated support', 'On-premise deployment']
      }
    ],
    status: 'coming-soon',
    releaseDate: '2025-Q2',
    comingSoonBadge: 'In Development'
  },
  {
    id: 'syntric-cad',
    name: 'Syntric CAD',
    slug: 'cad',
    category: 'Software',
    tagline: 'Modern parametric CAD for mechanical design',
    description: 'Professional-grade CAD software with parametric modeling, assembly design, and technical drawing capabilities. Built for engineers, designers, and makers.',
    icon: <DesignServicesIcon sx={{ fontSize: 'inherit' }} />,
    basePrice: 0,
    priceLabel: 'Free to start',
    features: [
      'Parametric 3D modeling with history tree',
      'Assembly design and motion simulation',
      'Technical drawing and dimensioning',
      'Sheet metal and surface modeling',
      'FEA structural analysis integration',
      'Rendering and visualization tools',
      'Version control and collaboration',
      'Export to industry-standard formats (STEP, IGES, STL)'
    ],
    specs: {
      'Platforms': 'Windows, macOS, Linux',
      'File Formats': 'Native, STEP, IGES, STL, OBJ, DXF, DWG',
      'Modeling': 'Parametric, Direct, Hybrid',
      'Assembly': 'Bottom-up and Top-down',
      'Analysis': 'Static FEA, Motion simulation'
    },
    variants: [
      {
        name: 'Maker',
        price: 'Free',
        description: 'Full-featured CAD for students and makers',
        features: ['Parametric modeling', 'Basic assemblies', 'Technical drawings', 'Community support', 'Export to STEP/STL']
      },
      {
        name: 'Professional',
        price: 79,
        priceLabel: '$79/month',
        description: 'Advanced tools for professional engineers',
        features: ['Advanced surfacing', 'Sheet metal design', 'FEA analysis', 'Motion simulation', 'Priority support', 'Cloud collaboration']
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Complete engineering solution for teams',
        features: ['Volume licensing', 'PDM integration', 'Custom workflows', 'Dedicated support', 'On-premise deployment', 'Training programs']
      }
    ],
    status: 'coming-soon',
    releaseDate: '2025-Q3',
    comingSoonBadge: 'In Development'
  }
];

export const productCategories = [
  {
    name: 'Hardware',
    description: 'Manufacturing equipment and automation systems',
    products: ['3d-printers', 'cnc-machines', 'pick-and-place']
  },
  {
    name: 'Software',
    description: 'Design and engineering software solutions',
    products: ['zcad', 'syntric-slicer', 'syntric-cad']
  }
];

// Helper function to get product by slug
export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug);
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.status === 'available');
};

// Helper function to get upcoming products
export const getUpcomingProducts = () => {
  return products.filter(product => product.status === 'coming-soon');
};
