# SYNTRIQ - Manufacturing Reimagined

A modern, Apple-inspired landing page for SYNTRIQ, showcasing advanced manufacturing equipment including 3D Printers, CNC Machines, and Pick & Place systems.

## 🚀 Features

- **Modern React Stack**: Built with Vite for lightning-fast development and optimal build performance
- **Apple-like Design**: Sleek, minimalist interface inspired by Apple's design language
- **Smooth Animations**: Powered by Framer Motion for fluid, engaging user interactions
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Production Ready**: Optimized build with code splitting and modern bundling

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Language**: JavaScript (ES6+)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

This project is configured with **Nixpacks** for easy deployment to platforms like Railway, Render, and Fly.io.

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

**Quick Deploy Options:**
- Railway: Connect GitHub repo and auto-deploy
- Vercel/Netlify: Push to git and deploy
- Static hosting: Build and upload `dist` folder

```bash
# Local production test
npm run build
npx serve dist -s
```

## 🎨 Design Philosophy

The SYNTRIQ landing page embodies the following design principles:

- **Simplicity**: Clean, uncluttered interface focusing on content
- **Elegance**: Smooth transitions and refined typography
- **Performance**: Optimized for fast loading and smooth interactions
- **Accessibility**: Built with semantic HTML and ARIA standards
- **Modularity**: Component-based architecture for easy maintenance

## 📁 Project Structure

```
syntriq-website/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation bar with scroll effects
│   │   ├── Hero.jsx        # Hero section with animated background
│   │   ├── Products.jsx    # Product showcase cards
│   │   ├── Features.jsx    # Features section with icons
│   │   └── Footer.jsx      # Footer with links and newsletter
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global styles and Tailwind imports
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── vite.config.js          # Vite configuration
```

## 🎯 Key Components

### Navbar
- Sticky navigation with glass-morphism effect on scroll
- Smooth animations on mount
- Responsive mobile menu

### Hero Section
- Large, bold typography
- Animated background gradients
- Call-to-action buttons
- Animated scroll indicator

### Products Section
- Three main product categories (3D Printers, CNC, Pick & Place)
- Feature lists with checkmark icons
- Hover effects and animations
- Responsive grid layout

### Features Section
- Six key features with icons
- Staggered animations on scroll
- Call-to-action banner
- Gradient backgrounds

### Footer
- Multi-column link organization
- Social media icons
- Newsletter subscription
- Copyright and legal information

## 🎨 Color Palette

- **Primary Blue**: `#0066CC`
- **Dark**: `#1d1d1f`
- **Light Background**: `#f5f5f7`
- **Gradients**: Blue to lighter blue tones

## 🚀 Performance

- **Lighthouse Score**: Optimized for 90+ scores across all metrics
- **Bundle Size**: Optimized with code splitting and tree shaking
- **Loading**: Fast initial load with lazy loading for images
- **Animations**: Hardware-accelerated CSS and Framer Motion

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```js
theme: {
  extend: {
    colors: {
      'syntriq-blue': '#0066CC',
      'syntriq-dark': '#1d1d1f',
      'syntriq-light': '#f5f5f7',
    },
  },
}
```

### Fonts
The project uses SF Pro Display (Apple's font) as the primary font, with system font fallbacks.

## 📄 License

Copyright © 2025 SYNTRIQ. All rights reserved.

## 🤝 Support

For support, email support@syntriq.com or visit our website.

---

Built with ❤️ by SYNTRIQ
