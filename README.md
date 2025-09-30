# Weather App

A modern, responsive weather application built with React and Vite that displays real-time weather information based on your current location.

## Features

- **Real-time Weather Data**: Fetches current weather conditions using the Open-Meteo API
- **Geolocation**: Automatically detects your location to show relevant weather information
- **Comprehensive Weather Metrics**:
  - Current temperature and "feels like" temperature
  - Weather conditions with visual icons
  - Wind speed and direction
  - Humidity levels
  - Atmospheric pressure
  - Precipitation data
- **Beautiful UI**: Modern glass-morphism design with gradient backgrounds
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Refresh button to get the latest weather data

## Tech Stack

- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Open-Meteo API**: Free weather data API (no API key required)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
weather-app/
├── src/
│   ├── App.jsx          # Main weather component
│   ├── App.css          # Component styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/
│   └── weather.png      # Favicon
├── index.html           # HTML template
└── package.json         # Project dependencies
```

## How It Works

1. The app requests permission to access your geolocation
2. Once permission is granted, it fetches your latitude and longitude
3. Weather data is retrieved from the Open-Meteo API using your coordinates
4. The UI displays current conditions with icons and detailed metrics
5. Click "Refresh Weather" to update the data

## Browser Compatibility

Requires a modern browser with:
- Geolocation API support
- ES6+ JavaScript support

## License

This project is open source and available for personal and commercial use.