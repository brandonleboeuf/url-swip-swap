# URL Swip-Swap (React Version)

A Chrome extension for quickly switching between different URL environments (e.g., production and development).

## Features

- Unlimited URL pairs support
- Smooth animations for adding/removing URL pairs
- Modern React-based UI with TypeScript
- Persistent storage of URL configurations
- Support for localhost URLs with path preservation

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory

## Project Structure

- `src/components/` - React components
- `src/store/` - Zustand store for state management
- `src/styles/` - CSS styles
- `public/assets/` - Static assets (icons, images)

## Technologies Used

- React 18
- TypeScript
- Zustand (State Management)
- Emotion (Styled Components)
- Vite (Build Tool)

## Version History

- v2.0.0 - React Migration
  - Complete rewrite in React
  - Modern component architecture
  - Improved state management with Zustand
  - Enhanced TypeScript support

## License

MIT
