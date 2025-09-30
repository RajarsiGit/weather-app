# CLAUDE.md

## Project Overview

This is a React-based weather application that provides real-time weather information using geolocation and the Open-Meteo API.

## Architecture

### Component Structure

The application consists of a single main component (`WeatherDisplay` in `App.jsx`) that handles:
- State management for weather data, loading states, and errors
- Geolocation API integration
- Weather API calls
- Conditional rendering based on application state

### Key Technologies

- **React 19.1.1**: Uses modern hooks (useState, useEffect)
- **Vite 7.1.2**: Build tool with fast HMR
- **Tailwind CSS 3.4.17**: Utility-first styling with custom gradient backgrounds
- **Lucide React 0.544.0**: Icon library for weather and metric icons

### API Integration

**Open-Meteo API**: Free weather API (no authentication required)
- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Parameters fetched:
  - `temperature_2m`: Current temperature
  - `relative_humidity_2m`: Humidity percentage
  - `apparent_temperature`: Feels-like temperature
  - `precipitation`: Precipitation amount
  - `weather_code`: WMO weather code
  - `wind_speed_10m`: Wind speed at 10m height
  - `wind_direction_10m`: Wind direction
  - `surface_pressure`: Atmospheric pressure

## Application Flow

1. **Initial Load** (`useEffect` on mount)
   - Shows loading spinner
   - Requests geolocation permission

2. **Geolocation Success**
   - Extracts latitude and longitude
   - Calls Open-Meteo API
   - Updates weather state
   - Renders weather display

3. **Error Handling**
   - Geolocation denied/unavailable
   - API fetch failures
   - Network errors
   - All errors display with retry button

4. **Weather Display**
   - Header with timezone
   - Large temperature display with icon
   - Weather description
   - 2x2 grid of metrics (wind, humidity, pressure, precipitation)
   - Refresh button

## State Management

Simple React state (no external state management):
```javascript
const [weather, setWeather] = useState(null);      // Weather data
const [loading, setLoading] = useState(true);      // Loading state
const [error, setError] = useState(null);          // Error messages
```

## Weather Code Mapping

Weather codes are mapped to icons and descriptions:
- `0`: Clear sky → Sun icon
- `1-3`: Partly cloudy → Cloud icon
- `4-67`: Rain/fog → CloudRain icon
- `68-77`: Snow → Cloud icon
- `80+`: Rain showers → CloudRain icon

## Styling Approach

**Tailwind CSS** with:
- Gradient backgrounds (`bg-gradient-to-br`)
- Glass-morphism effects (`backdrop-blur-lg`, `bg-opacity-20`)
- Responsive design (`min-h-screen`, `max-w-md`)
- Custom animations (`animate-spin` for loading)

## Development Considerations

### Strengths
- Clean, single-component architecture
- No API key required
- Good error handling
- Responsive and accessible UI
- Modern React practices

### Potential Improvements
- Add city search functionality
- Display forecast data (multi-day)
- Add unit conversion (Celsius/Fahrenheit)
- Implement caching to reduce API calls
- Add loading skeleton instead of spinner
- Store last known location in localStorage
- Add more detailed weather codes
- Implement PWA features for offline support

## Build Configuration

**Vite Configuration**: Standard React + Vite setup
- Uses `@vitejs/plugin-react` for fast refresh
- PostCSS with Autoprefixer for Tailwind
- ES module format

## Development Commands

- `npm run dev`: Start dev server (port 5173)
- `npm run build`: Production build
- `npm run preview`: Preview production build
- `npm run lint`: ESLint checks

## File Structure Notes

- **main.jsx**: Entry point with StrictMode
- **App.jsx**: Main component (WeatherDisplay)
- **index.css**: Tailwind directives
- **App.css**: Currently unused (can be removed)
- **index.html**: Minimal HTML with React root div

## Dependencies Analysis

### Production
- `react` + `react-dom`: Core framework
- `lucide-react`: Icons only (lightweight)

### Development
- Standard Vite + React setup
- ESLint for code quality
- Tailwind CSS toolchain
- TypeScript type definitions (no TS used currently)

## API Rate Limits

Open-Meteo API:
- Free tier: 10,000 requests/day
- No authentication required
- No rate limiting for reasonable use
- Unlimited for non-commercial projects

## Browser Requirements

- **Geolocation API**: Required for location detection
- **Fetch API**: For HTTP requests
- **ES6+**: Arrow functions, async/await, destructuring
- **CSS Grid/Flexbox**: For layout