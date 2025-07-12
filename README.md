# url-swip-swap Chrome Extension

A modern Chrome extension built with React 19, TypeScript, and Vite that allows for effortlessly switching between different URLs while preserving parameters with just a click. Perfect for transitioning between testing and development environments or any two specified URLs.

<div style="text-align: center; margin: 15px 0">
    <img src="src/assets/options-screen.png" height="250" />
    <img src="src/assets/widget.png" height="250" />
</div>

## 🚀 Features

- **Modern Tech Stack**: Built with React 19, TypeScript, and Vite
- **Type Safety**: Full TypeScript support for better development experience
- **Component-Based**: Modular React components for maintainability
- **Chrome Extension**: Native Chrome extension functionality
- **URL Swapping**: Seamless switching between configured URLs
- **Local Storage**: Persistent configuration using Chrome Storage API

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build extension (includes asset copying)
npm run build:extension
```

### Loading the Extension
1. Run `npm run build:extension`
2. Navigate to [chrome://extensions/](chrome://extensions/)
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked" and select the `dist` folder
5. Pin the extension to your toolbar

### Publishing to Chrome Web Store
1. Run the build command to create a production-ready version:
   ```bash
   npm run build:extension
   ```
2. Compress the `dist` folder into a ZIP file:
   - On macOS/Linux: `cd dist && zip -r ../extension.zip ./*`
   - On Windows: Right-click the `dist` folder and select "Compress to ZIP"
3. Navigate to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
4. Click "Upload New Package" and select your ZIP file
5. Fill in/update the required store listing information:
   - Description
   - Screenshots
   - Privacy policy
   - Promotional tiles
6. Submit for review
7. Once approved, your update will be available to users

## 📁 Project Structure

```
src/
├── components/
│   ├── Popup/           # Popup component and styles
│   └── Options/         # Options page components
├── services/
│   ├── chromeStorage.ts # Chrome storage operations
│   └── urlManipulation.ts # URL swapping logic
├── types/
│   └── index.ts         # TypeScript type definitions
├── pages/
│   ├── popup.tsx        # Popup entry point
│   └── options.tsx      # Options entry point
├── styles/
│   └── global.ts        # Global styles
└── assets/              # Static assets
```

## 🔧 Configuration

### URL Sets
Configure URL pairs in the options page:
- **Primary URL**: Your main/production URL
- **Alternative URL**: Your development/testing URL
- **Enable/Disable**: Toggle each URL set on/off

### Example Configuration
```
Primary URL: production.myapp.com
Alternative URL: localhost:3000
```

## 🎯 Usage

1. **Configure URLs**: Open extension options and set up your URL pairs
2. **Enable Sets**: Check the boxes for URL sets you want to use
3. **Navigate**: Go to any configured URL
4. **Swap**: Click the extension icon to switch between URLs
5. **Preserve**: Parameters and paths are maintained during swaps

## 🚨 Important Notes

- **HTTPS Required**: Localhost must use HTTPS when running locally
- **Chrome APIs**: Extension uses Chrome Tabs and Storage APIs
- **Build Process**: Always use `npm run build:extension` for production builds

## 🛠️ Development Notes

### TypeScript
- All components are fully typed
- Chrome API types are included
- Strict type checking enabled

### Styling
- Uses styled-components for component styling
- Global styles for consistent theming
- Responsive design for popup and options pages

### Build Process
- Vite handles bundling and optimization
- Separate builds for popup and options pages
- Assets are automatically copied to dist folder

## 📝 Changelog

### v1.1.1
- Migrated to React 19 + TypeScript + Vite
- Improved component architecture
- Added type safety
- Modern build system
- Enhanced developer experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and build
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
