# Image Popup App

A cross-platform desktop application built with Electron that displays an image popup every 20 minutes for 20 seconds.

## Features

- Shows a popup with an image every 20 minutes
- Popup stays visible for 20 seconds before automatically closing
- Displays a countdown timer on both the main window and popup
- Randomly selects images from the assets folder
- Cross-platform (Windows, macOS, Linux)

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Quick Setup

For a quick setup that installs dependencies and downloads a sample image:

```bash
npm run setup
```

### Manual Setup

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Adding Your Images (Optional)

1. Place your images in the `assets` folder
2. Supported formats: JPG, JPEG, PNG, GIF
3. The application will randomly select an image to display each time

You can download a sample image for testing:

```bash
npm run download-sample
```

## Usage

### Development

To run the application with image checking (recommended for first run):

```bash
npm run dev
```

To run the application directly:

```bash
npm start
```

### Building for Production

To build the application for your current platform:

```bash
npm run dist
```

The packaged application will be available in the `dist` folder.

## Configuration

You can modify the following settings in `main.js`:

- `POPUP_INTERVAL`: Time between popups (default: 20 minutes)
- `POPUP_DURATION`: How long the popup stays visible (default: 20 seconds)

## License

MIT
