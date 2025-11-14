# SYNTRIQ Website - Deployment Guide

This guide covers deploying the SYNTRIQ website using Nixpacks to various platforms.

## Overview

The SYNTRIQ website is configured to deploy using **Nixpacks**, which automatically detects and builds the Vite + React application with optimal settings.

### What's Configured

- **nixpacks.toml**: Main configuration file for build and deployment
- **serve**: Production static file server (installed as dev dependency)
- **Build output**: `/dist` directory contains the production build
- **Port**: Application runs on port 3000 by default

## Supported Platforms

### 1. Railway (Recommended)

Railway has native Nixpacks support and is perfect for this application.

#### Steps:
1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect Nixpacks and deploy

#### Environment Variables (Optional):
```
NODE_ENV=production
```

Railway will automatically use the settings from `nixpacks.toml`.

### 2. Render

Render also supports Nixpacks deployments.

#### Steps:
1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Click "New" → "Web Service"
4. Connect your repository
5. Configure:
   - **Build Command**: `npm run build`
   - **Start Command**: `npx serve dist -s -l 3000`
   - **Environment**: `Node`

### 3. Fly.io

Fly.io can use Nixpacks with minimal configuration.

#### Steps:
1. Install Fly CLI: `npm install -g flyctl`
2. Login: `fly auth login`
3. Initialize: `fly launch`
4. Deploy: `fly deploy`

Fly will detect the `nixpacks.toml` and use it automatically.

### 4. Manual Deployment (VPS/Docker)

If you want to use Nixpacks locally or on a VPS:

#### Install Nixpacks:
```bash
# macOS
brew install railwayapp/tap/nixpacks

# Linux
curl -sSL https://nixpacks.com/install.sh | bash

# Windows (WSL required)
curl -sSL https://nixpacks.com/install.sh | bash
```

#### Build:
```bash
nixpacks build . --name syntriq-website
```

#### Run:
```bash
docker run -p 3000:3000 syntriq-website
```

## Configuration Details

### nixpacks.toml Breakdown

```toml
[phases.setup]
nixPkgs = ["nodejs_20"]          # Uses Node.js 20

[phases.install]
cmds = ["npm ci"]                # Clean install dependencies

[phases.build]
cmds = ["npm run build"]         # Builds to /dist

[start]
cmd = "npx serve dist -s -l 3000"  # Serves static files on port 3000

[variables]
NODE_ENV = "production"          # Sets production environment
```

### What `serve` Does

- Serves static files from `/dist`
- `-s` flag: Single-page app mode (redirects to index.html)
- `-l 3000`: Listen on port 3000
- Handles client-side routing correctly

## Static Hosting (Alternative)

Since this is a static SPA, you can also deploy to static hosts (no Nixpacks needed):

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Cloudflare Pages
1. Go to Cloudflare Pages dashboard
2. Connect GitHub repository
3. Build command: `npm run build`
4. Output directory: `dist`

### GitHub Pages
```bash
npm install -g gh-pages
npm run build
npx gh-pages -d dist
```

## Environment Variables

Currently, the application doesn't use environment variables, but if you add any:

1. Create `.env` file locally (already in `.gitignore`)
2. Add to deployment platform's environment settings
3. Prefix with `VITE_` to expose to the app (Vite requirement)

Example:
```env
VITE_API_URL=https://api.syntriq.com
```

Usage in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Build Verification

Before deploying, verify the build works locally:

```bash
# Build the app
npm run build

# Preview the production build
npm run preview

# Or use serve directly
npx serve dist -s
```

Visit `http://localhost:4173` (or the port shown) to test.

## Troubleshooting

### Issue: 404 on page refresh
**Solution**: Ensure your server is configured for SPA routing:
- Nixpacks: Already handled by `serve -s` flag
- Nginx: Add `try_files $uri /index.html`
- Apache: Add `.htaccess` with rewrite rules

### Issue: Blank page after deployment
**Check**:
1. Build completed successfully (check logs)
2. `/dist` directory contains files
3. Console for JavaScript errors
4. Base URL is correct in `vite.config.js`

### Issue: CSS not loading
**Check**:
1. Tailwind is configured correctly
2. Build process ran successfully
3. No CORS issues (shouldn't happen with static hosting)

### Issue: Port conflicts
**Solution**: Change port in `nixpacks.toml`:
```toml
[start]
cmd = "npx serve dist -s -l 8080"  # Use port 8080 instead
```

## Performance Optimization

The current setup is already optimized, but for additional improvements:

1. **Enable Compression**: Most platforms (Railway, Vercel) do this automatically
2. **CDN**: Use Cloudflare or similar for static assets
3. **Image Optimization**: Convert images to WebP format
4. **Code Splitting**: Vite handles this automatically
5. **Caching**: Configure cache headers (platform-specific)

## Custom Domain

After deployment, to use a custom domain:

### Railway:
1. Go to project Settings → Domains
2. Add custom domain
3. Update DNS records as shown

### Vercel/Netlify:
1. Project Settings → Domains
2. Add domain and follow DNS instructions

### DNS Records (General):
```
Type: A or CNAME
Name: @ (or www)
Value: [provided by platform]
```

## Monitoring

Recommended monitoring setup:

1. **Uptime**: Use UptimeRobot or Pingdom
2. **Analytics**: Google Analytics or Plausible
3. **Error Tracking**: Sentry (if you add it)
4. **Performance**: Lighthouse CI in GitHub Actions

## CI/CD (Optional)

For automated deployments, platforms like Railway and Vercel auto-deploy on git push.

For custom CI/CD with GitHub Actions, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      # Add deployment step for your platform
```

## Security Considerations

1. **HTTPS**: Always use HTTPS (platforms enable by default)
2. **Headers**: Add security headers (CSP, X-Frame-Options)
3. **Dependencies**: Run `npm audit` regularly
4. **Secrets**: Never commit API keys (use environment variables)
5. **CORS**: Configure if you add a backend API

## Cost Estimates

- **Railway**: Free tier available, ~$5/month for hobby projects
- **Render**: Free tier available with limitations
- **Vercel/Netlify**: Free for personal projects
- **Fly.io**: Free tier available, pay for scaling
- **Cloudflare Pages**: Free tier is very generous

## Next Steps

1. Choose a deployment platform
2. Push code to GitHub (if not already done)
3. Follow platform-specific steps above
4. Configure custom domain (optional)
5. Set up monitoring and analytics
6. Configure CI/CD for auto-deployments

## Support

For deployment issues:
- Check platform documentation
- Review build logs
- Test locally first with `npm run build && npx serve dist -s`
- Open issue in project repository

---

**Last Updated**: 2025-11-14
**Nixpacks Version**: Latest
**Node Version**: 20.x
