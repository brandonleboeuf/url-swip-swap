# Project Context

## Extension Loading
- The entire `url-swip-swap` directory is being loaded as the extension, not just the `dist` directory
- All paths in manifest.json must include `dist/` prefix
- HTML files are copied to `dist/` during build

## Build Process
- Using Vite for building React + TypeScript
- Assets are copied to `dist/assets/` during build
- HTML files (popup.html, options.html) are copied to `dist/`
- manifest.json is copied to `dist/`
- Script tags in HTML files must use `type="module"` since we're using ES modules

## Current Issues
- Need to maintain consistent paths across:
  - manifest.json (with dist/ prefix)
  - HTML files (relative to their location in dist/)
  - React components (relative to their build output)
- Script tags must have type="module" to support ES module imports

## Important Decisions
- manifest.json paths must include dist/ prefix since we're loading from root
- HTML files in dist/ reference assets relative to their location
- Vite config uses base: '' for proper asset resolution
- Using ES modules for better code organization and tree-shaking 