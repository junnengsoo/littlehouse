const https = require('https');
const fs = require('fs');
const path = require('path');

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Sample image URL from Unsplash (royalty-free)
const imageUrl = 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=benjamin-voros-phIFdC6lA4E-unsplash.jpg&w=640';
const outputPath = path.join(assetsDir, 'popup-image.jpg');

console.log('Downloading sample image for testing...');

// Download the image
https.get(imageUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download image: ${response.statusCode} ${response.statusMessage}`);
    return;
  }

  const fileStream = fs.createWriteStream(outputPath);
  response.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close();
    console.log(`Sample image downloaded to: ${outputPath}`);
    console.log('You can now run the application with: npm start');
  });
}).on('error', (err) => {
  console.error(`Error downloading image: ${err.message}`);
  console.log('Please add your own images to the assets folder manually.');
});