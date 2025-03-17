const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Check if there are any images in the assets directory
const assetsDir = path.join(__dirname, 'assets');
let hasImages = false;

try {
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
      });

    hasImages = files.length > 0;
  }
} catch (err) {
  console.error('Error checking for images:', err);
}

// If no images found, suggest downloading a sample
if (!hasImages) {
  console.log('No images found in the assets directory.');
  console.log('You need at least one image for the application to work properly.');
  console.log('\nWould you like to download a sample image? (y/n)');

  process.stdin.once('data', (data) => {
    const input = data.toString().trim().toLowerCase();

    if (input === 'y' || input === 'yes') {
      console.log('Downloading sample image...');

      const downloadProcess = spawn('node', ['download-sample-image.js'], {
        stdio: 'inherit'
      });

      downloadProcess.on('close', (code) => {
        if (code === 0) {
          startApp();
        } else {
          console.log('Failed to download sample image. Please add images manually to the assets folder.');
          process.exit(1);
        }
      });
    } else {
      console.log('Please add your own images to the assets folder before running the application.');
      process.exit(0);
    }
  });
} else {
  // If images exist, start the app directly
  startApp();
}

function startApp() {
  console.log('Starting Image Popup App...');

  const electronProcess = spawn('npm', ['start'], {
    stdio: 'inherit',
    shell: true
  });

  electronProcess.on('close', (code) => {
    process.exit(code);
  });
}