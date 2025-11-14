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
    pricing: {
      starter: {
        name: 'Starter',
        price: 'Free',
        features: ['2-layer PCBs', 'Basic component library', 'Community support', 'Export to Gerber']
      },
      professional: {
        name: 'Professional',
        price: '$49/month',
        features: ['Unlimited layers', 'Full component library', 'Advanced simulation', 'Priority support', 'Cloud collaboration']
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Volume licensing', 'Dedicated support', 'Custom integrations', 'On-premise deployment', 'Training & onboarding']
      }
    }
  },
  {
    id: 'syntric-slicer',
    name: 'Syntric Slicer',
    slug: 'slicer',
    category: 'Software',
    tagline: 'Advanced 3D printing slicer with intelligent optimization',
    description: 'Professional slicing software for 3D printing that combines speed, precision, and ease of use. Featuring AI-powered support generation and advanced print optimization.',
    icon: <ContentCutIcon sx={{ fontSize: 'inherit' }} />,
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
