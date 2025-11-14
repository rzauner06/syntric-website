# CLAUDE.md - AI Assistant Guide for SYNTRIQ Website

This document provides comprehensive guidance for AI assistants working on the SYNTRIQ website codebase.

## Project Overview

**Project Name:** SYNTRIQ Website (syntric-website)
**Type:** Modern React SPA (Single Page Application)
**Purpose:** Marketing website for SYNTRIQ's manufacturing equipment and software products
**Design Philosophy:** Apple-inspired minimalist design with smooth animations and premium feel

### Business Context
SYNTRIQ offers both hardware (3D printers, CNC machines, Pick & Place systems) and software (ZCAD, Syntric Slicer, Syntric CAD) solutions for advanced manufacturing.

## Technology Stack

### Core Framework
- **React**: v19.2.0 - Latest version with modern features
- **Vite**: v7.2.2 - Build tool and development server
- **React Router DOM**: v7.9.5 - Client-side routing

### Styling & UI
- **Tailwind CSS**: v3.4.18 - Utility-first CSS framework
- **Framer Motion**: v12.23.24 - Animation library for smooth interactions
- **PostCSS**: v8.5.6 - CSS processing with Autoprefixer

### Code Quality
- **ESLint**: v9.39.1 - Linting with React-specific rules
- **eslint-plugin-react-hooks**: Ensures proper hooks usage
- **eslint-plugin-react-refresh**: HMR optimization

### Language
- **JavaScript (ES6+)** - No TypeScript currently used
- **JSX** - For React components

## Project Structure

```
syntric-website/
├── public/                      # Static assets
│   └── vite.svg                # Default favicon
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Features.jsx        # Features section with icons
│   │   ├── Footer.jsx          # Site footer with links and newsletter
│   │   ├── Hero.jsx            # Hero section with animations
│   │   ├── Navbar.jsx          # Main navigation with scroll effects
│   │   ├── Products.jsx        # Product showcase cards
│   │   ├── ThemeToggle.jsx     # Dark/light mode toggle button
│   │   └── Navigation/         # Navigation-specific components
│   │       ├── MegaMenu.jsx    # Desktop mega menu dropdown
│   │       └── MobileMenu.jsx  # Mobile hamburger menu
│   ├── pages/                  # Route-level page components
│   │   ├── Home.jsx            # Homepage (Hero + Products + Features)
│   │   ├── AllProducts.jsx     # All products listing page
│   │   ├── ProductDetail.jsx   # Generic product detail template
│   │   ├── ZCADPage.jsx        # ZCAD-specific product page
│   │   └── Q1Product.jsx       # Q1-specific product page
│   ├── contexts/               # React Context providers
│   │   └── ThemeContext.jsx    # Dark mode state management
│   ├── data/                   # Static data and configuration
│   │   └── products.js         # Product catalog and helper functions
│   ├── assets/                 # Images, fonts, etc.
│   ├── App.jsx                 # Root component with routing
│   ├── App.css                 # App-specific styles
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles + Tailwind imports
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind customization
├── postcss.config.js           # PostCSS configuration
├── eslint.config.js            # ESLint rules and configuration
└── README.md                   # Project documentation

```

## Key Architecture Patterns

### 1. Component Organization
- **Components folder**: Reusable, generic components (Navbar, Footer, Hero, etc.)
- **Pages folder**: Route-level components that compose smaller components
- **Navigation subfolder**: Navigation-related components (MegaMenu, MobileMenu)

### 2. Data Management
- **Centralized data**: Product data stored in `src/data/products.js`
- **Helper functions**: Export utility functions for filtering/finding products
- **Static imports**: Components import data directly (no API calls currently)

### 3. State Management
- **Context API**: Used for theme (dark mode) state
- **Local state**: Component-level useState for UI interactions
- **LocalStorage**: Theme preference persistence

### 4. Routing Strategy
- **React Router DOM** with BrowserRouter
- **Nested routes**: All routes wrapped in ThemeProvider
- **Dynamic routes**: `/products/:slug` for product details
- **Static routes**: Explicit pages for ZCAD and Q1 products

## Development Workflows

### Starting Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
```

### Building for Production
```bash
npm run build        # Build for production (outputs to /dist)
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint on all files
```

### Git Workflow
- **Branch naming**: Use `claude/` prefix for AI-generated branches
- **Main branch**: Merges happen through pull requests
- **Commits**: Clear, descriptive messages following conventional commits style
- **Push**: Always use `git push -u origin <branch-name>`

## Coding Conventions

### File Naming
- **Components**: PascalCase with `.jsx` extension (e.g., `Navbar.jsx`, `ProductDetail.jsx`)
- **Data files**: camelCase with `.js` extension (e.g., `products.js`)
- **Styles**: camelCase with `.css` extension (e.g., `index.css`)

### Component Structure
```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const ComponentName = () => {
  // 1. Hooks
  const [state, setState] = useState(initialValue);

  // 2. Event handlers
  const handleClick = () => {
    // handler logic
  };

  // 3. Render helpers (if needed)
  const renderItem = (item) => {
    return <div>{item.name}</div>;
  };

  // 4. Return JSX
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  );
};

export default ComponentName;
```

### Import Order
1. React and React hooks
2. Third-party libraries (framer-motion, react-router-dom)
3. Components
4. Contexts
5. Data/utilities
6. Styles (if any)

### ESLint Rules
- **No unused variables**: Except those matching specific patterns (capitals, `motion`, destructured with `_`)
- **React Hooks**: Follow rules of hooks (enforced by eslint-plugin-react-hooks)
- **React Refresh**: Ensure HMR compatibility

## Styling Conventions

### Tailwind Usage
- **Utility-first**: Prefer Tailwind utilities over custom CSS
- **Dark mode**: Use `dark:` prefix for dark mode styles
- **Custom colors**: Use defined colors from tailwind.config.js
  - `syntriq-blue`: #0066CC (primary brand color)
  - `syntriq-dark`: #1d1d1f (dark backgrounds)
  - `syntriq-light`: #f5f5f7 (light backgrounds)

### Responsive Design
```jsx
// Mobile-first approach
<div className="text-base md:text-lg lg:text-xl">
  // Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
</div>
```

### Dark Mode Pattern
```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  // Always provide both light and dark variants
</div>
```

### Animation Pattern (Framer Motion)
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Typography
- **Font family**: SF Pro Display (Apple font) with system fallbacks
- **Large headings**: Use `text-display` or `text-display-sm` custom sizes
- **Line height**: Tight for headings (1.05-1.07), normal for body

## Theme System

### ThemeContext Structure
Located in `src/contexts/ThemeContext.jsx`:

```jsx
const { darkMode, toggleTheme } = useTheme();
```

**Features:**
- Reads from localStorage for persistence
- Falls back to system preference (`prefers-color-scheme`)
- Updates document class (`dark`) and localStorage on toggle

**Usage in components:**
```jsx
import { useTheme } from '../contexts/ThemeContext';

const Component = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};
```

## Routing Structure

### Current Routes
```jsx
// Defined in src/App.jsx
"/"                    -> Home (Hero + Products + Features)
"/products"            -> AllProducts
"/products/zcad"       -> ZCADPage (dedicated page)
"/products/q1"         -> Q1Product (dedicated page)
"/products/:slug"      -> ProductDetail (dynamic, generic)
"/features"            -> Features + Footer
"/about"               -> Coming soon placeholder
"/contact"             -> Coming soon placeholder
```

### Route Hierarchy
- All routes wrapped in `<ThemeProvider>`
- All routes wrapped in `<Router>` (BrowserRouter)
- Navbar rendered globally above routes
- Footer included per-page or in route component

### Adding New Routes
1. Import the page component in `App.jsx`
2. Add a `<Route>` element in the `<Routes>` block
3. Update navigation links in `Navbar.jsx` and `MegaMenu.jsx`

## Data Structure

### Product Object Schema
Located in `src/data/products.js`:

```javascript
{
  id: 'unique-id',              // Internal identifier
  name: 'Product Name',          // Display name
  slug: 'url-slug',              // URL-friendly identifier
  category: 'Hardware|Software', // Product category
  tagline: 'Short description',  // Subtitle
  description: 'Full text...',   // Detailed description
  icon: '🖨️',                    // Emoji icon
  features: [...],               // Array of feature strings
  specs: {...},                  // Key-value specs object
  status: 'available|coming-soon',
  releaseDate: '2024-Q1',
  comingSoonBadge: 'Optional',   // For coming-soon products
  highlights: [...],             // Optional: Feature highlights
  pricing: {...}                 // Optional: Pricing tiers
}
```

### Helper Functions
```javascript
getProductBySlug(slug)          // Find product by slug
getProductsByCategory(category) // Filter by category
getFeaturedProducts()           // Get available products
getUpcomingProducts()           // Get coming-soon products
```

## Component Patterns

### Navbar Component
- **Scroll behavior**: Glass morphism effect on scroll
- **Responsive**: Desktop MegaMenu, Mobile MobileMenu
- **Theme toggle**: Integrated ThemeToggle button
- **Links**: Products, Features, About, Contact

### Hero Component
- **Layout**: Full viewport height with centered content
- **Animations**: Fade in with Framer Motion
- **CTAs**: Two buttons (primary and secondary)
- **Scroll indicator**: Animated down arrow

### Products Component
- **Grid layout**: 3 columns on desktop, responsive
- **Product cards**: Hover effects, feature lists
- **Status badges**: "Coming Soon" for unreleased products
- **Icons**: Emoji icons for visual appeal

### Footer Component
- **Multi-column layout**: Products, Company, Support, Legal
- **Newsletter**: Email input with subscribe button
- **Social links**: Placeholder social media icons
- **Copyright**: Dynamic year

### MegaMenu Component (Desktop)
- **Trigger**: Hover on "Products" link
- **Layout**: Two-column (Hardware | Software)
- **Product cards**: Name, tagline, category, status
- **Animations**: Smooth fade in/out

### MobileMenu Component
- **Trigger**: Hamburger button on mobile
- **Animation**: Slide from right
- **Close**: X button and backdrop click
- **Links**: All navigation items

## Common Tasks for AI Assistants

### Adding a New Product
1. Open `src/data/products.js`
2. Add new product object to `products` array
3. Update `productCategories` if needed
4. If product needs special page, create in `src/pages/`
5. Add route in `src/App.jsx`
6. Test in dev server

### Adding a New Page
1. Create component in `src/pages/PageName.jsx`
2. Import in `src/App.jsx`
3. Add route: `<Route path="/path" element={<PageName />} />`
4. Add navigation link in `Navbar.jsx`
5. Consider adding to MegaMenu if relevant

### Styling a Component
1. Use Tailwind utilities first
2. Include dark mode variants: `dark:`
3. Make responsive: `md:`, `lg:` prefixes
4. Add animations with Framer Motion if needed
5. Follow existing color scheme (syntriq-blue, etc.)

### Updating Theme
1. Modify `tailwind.config.js` for global changes
2. Use ThemeContext for runtime theme switching
3. Always test both light and dark modes
4. Check mobile and desktop views

### Running Tests
Currently no automated tests configured. Consider:
- Manual testing in browser
- ESLint for code quality
- Lighthouse for performance

## Important Notes for AI Assistants

### DO:
- ✅ Use Tailwind utilities for styling
- ✅ Include dark mode variants for all styled elements
- ✅ Use Framer Motion for animations
- ✅ Follow existing component structure patterns
- ✅ Add products to `products.js` rather than hardcoding
- ✅ Test responsive design (mobile, tablet, desktop)
- ✅ Use meaningful component and variable names
- ✅ Keep animations subtle and Apple-like
- ✅ Run `npm run lint` before committing
- ✅ Use `motion` from framer-motion for animations

### DON'T:
- ❌ Create custom CSS files unless absolutely necessary
- ❌ Ignore dark mode support
- ❌ Use inline styles (use Tailwind classes)
- ❌ Hardcode product data in components
- ❌ Break responsive design
- ❌ Use overly aggressive animations
- ❌ Ignore ESLint warnings
- ❌ Create TypeScript files (project uses JS)
- ❌ Push directly to main branch
- ❌ Skip testing in both themes

### When Making Changes:
1. **Understand the scope**: Is it a component, page, or data change?
2. **Check existing patterns**: Look at similar components first
3. **Maintain consistency**: Follow established conventions
4. **Test thoroughly**: Light/dark mode, mobile/desktop, animations
5. **Run lint**: Fix any ESLint issues
6. **Commit clearly**: Descriptive commit messages
7. **Document if needed**: Update this CLAUDE.md if architecture changes

### Performance Considerations:
- Images should be optimized (WebP preferred)
- Use lazy loading for images when possible
- Minimize bundle size (Vite handles tree-shaking)
- Avoid unnecessary re-renders (React.memo if needed)
- Keep animations hardware-accelerated (transform, opacity)

### Accessibility:
- Use semantic HTML elements
- Add proper ARIA labels where needed
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers when possible

## Design Language

### Apple-Inspired Principles:
1. **Simplicity**: Clean, uncluttered interfaces
2. **Whitespace**: Generous spacing between elements
3. **Typography**: Large, bold headlines with clear hierarchy
4. **Animations**: Smooth, purposeful, not distracting
5. **Colors**: Subtle, professional palette
6. **Imagery**: High-quality, minimal
7. **Precision**: Attention to detail in every element

### Color Usage:
- **Primary actions**: `syntriq-blue` (#0066CC)
- **Backgrounds (light)**: White, `syntriq-light` (#f5f5f7)
- **Backgrounds (dark)**: `syntriq-dark` (#1d1d1f), gray-900
- **Text (light)**: gray-900
- **Text (dark)**: white, gray-300
- **Accents**: Blue gradients, subtle grays

### Spacing Scale:
Use Tailwind's default spacing scale (4px base):
- Small gaps: `gap-2`, `gap-4`
- Medium gaps: `gap-6`, `gap-8`
- Large gaps: `gap-12`, `gap-16`
- Section padding: `py-16`, `py-24`, `py-32`

## Troubleshooting

### Common Issues:

**Dark mode not working:**
- Check ThemeContext is wrapping the app
- Verify `dark:` classes are present
- Ensure Tailwind config has `darkMode: 'class'`

**Animations choppy:**
- Use `transform` and `opacity` for performance
- Avoid animating `width`, `height`, `top`, `left`
- Check for excessive re-renders

**Routing not working:**
- Verify route path is correct in App.jsx
- Check for typos in Link components
- Ensure BrowserRouter wraps Routes

**ESLint errors:**
- Fix unused variables or prefix with `_`
- Follow React hooks rules
- Import all used dependencies

**Build failures:**
- Check for syntax errors
- Verify all imports exist
- Run `npm install` if dependencies changed

## Version Control

### Branch Strategy:
- **Main branch**: Production-ready code
- **Feature branches**: `claude/*` prefix for AI-generated work
- **Naming**: Descriptive branch names (e.g., `claude/add-dark-mode`)

### Commit Messages:
Follow conventional commit style:
```
feat: add dark mode toggle
fix: correct navbar scroll behavior
docs: update README with new features
style: improve button hover states
refactor: reorganize product data structure
```

### Before Pushing:
```bash
npm run lint          # Fix linting issues
npm run build         # Ensure build succeeds
git status            # Review changes
git add .             # Stage changes
git commit -m "..."   # Descriptive message
git push -u origin <branch-name>
```

## Future Considerations

### Potential Enhancements:
- Add TypeScript for type safety
- Implement automated testing (Vitest, React Testing Library)
- Add E2E tests (Playwright, Cypress)
- Set up CI/CD pipeline
- Add image optimization pipeline
- Implement SSR/SSG with Next.js or similar
- Add analytics tracking
- Implement SEO optimizations (meta tags, sitemap)
- Add contact form backend integration
- Create CMS for product management

### Known Limitations:
- No API integration (static data only)
- No user authentication
- No backend/database
- Limited SEO optimization
- No automated testing
- About and Contact pages are placeholders

## Resources

### Documentation Links:
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)

### Project-Specific:
- README.md - Project overview and setup
- package.json - Dependencies and scripts
- tailwind.config.js - Custom theme configuration

---

**Last Updated:** 2025-11-14
**Maintainer:** AI Assistant (Claude)
**Version:** 1.0.0
