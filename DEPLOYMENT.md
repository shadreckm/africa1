# Kulima Africa Deployment Guide (Netlify)

This guide provides step-by-step instructions for deploying the **Kulima Africa** web application to Netlify.

## 1. Prerequisites

- A [Netlify account](https://app.netlify.com/signup).
- The project repository must be on GitHub.

## 2. Deployment Steps

1. **Log in to Netlify:** Go to [app.netlify.com](https://app.netlify.com).
2. **Add New Site:** Click on **"Add new site"** and select **"Import an existing project"**.
3. **Connect to GitHub:** Choose **GitHub** as your Git provider.
4. **Authorize Netlify:** Authorize Netlify to access your GitHub repositories.
5. **Select Repository:** Find and select the `kulima-africa` repository.
6. **Configure Build Settings:**
   - **Branch to deploy:** `main` (or your primary branch).
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. **Set Environment Variables:**
   - Click on **"Site settings"** > **"Environment variables"**.
   - Add the following variables:
     - `GEMINI_API_KEY`: Your Google Gemini API Key.
     - `APP_URL`: Your Netlify site URL (e.g., `https://kulima-africa.netlify.app`).
8. **Deploy:** Click **"Deploy site"**. Netlify will start building and deploying your application.

## 3. Routing Configuration

The project includes a `netlify.toml` file that handles Single Page Application (SPA) routing. This prevents 404 errors when refreshing pages.

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 4. Troubleshooting Guide

### Common Errors and Fixes

| Error | Cause | Solution |
|-------|-------|----------|
| **Build failed: vite: not found** | Dependencies not installed correctly. | Ensure `vite` is in `devDependencies` in `package.json`. |
| **404 on page refresh** | Missing redirect rules for SPA. | Ensure `netlify.toml` is in the root directory with the redirect rule. |
| **API Key not working** | Environment variable not set in Netlify. | Check Site settings > Environment variables in Netlify. |
| **Blank screen after deploy** | Incorrect publish directory. | Ensure the publish directory is set to `dist` in Netlify settings. |
| **TypeScript errors during build** | Code has type issues. | Run `npm run lint` locally to fix type errors before pushing. |

## 5. Local Verification

To simulate the production build locally:

```bash
npm run build
```

If this command completes without errors, the project is ready for Netlify.
