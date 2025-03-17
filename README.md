# Little House

A cross-platform desktop application built with Electron that locks your screen every 20 minutes for 20 seconds.

# How it came about
As a software engineer, I have a habit of occasionally looking out the window to relax my eyes and prevent strain. However, after moving to a new office with no windows, I started experiencing frequent eye strain and dryness. To adapt, I’ve been trying to develop a new habit of closing my eyes as an alternative, but I’ve struggled to maintain it. To reinforce this habit, I created Little House—a tool designed to help me and others in similar situations. I hope it benefits anyone working in a windowless office like mine, I hate it.

## Features

- Shows a popup with an image every 20 minutes that locks your screen
- Popup stays visible for 20 seconds before automatically closing
- Displays a countdown timer on both the main window and popup
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