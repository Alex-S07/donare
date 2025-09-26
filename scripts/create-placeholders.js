// Script to create placeholder images for the Donare platform
// This creates simple colored rectangles as placeholders

const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create videos directory if it doesn't exist
const videosDir = path.join(__dirname, '../public/videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

// Placeholder image data (SVG format for simplicity)
const createPlaceholderSVG = (width, height, color, text) => {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
};

// Create placeholder images
const placeholders = [
  { name: 'hero-poster.jpg', width: 1920, height: 1080, color: '#2563eb', text: 'Hero Video Poster' },
  { name: 'hero-1.jpg', width: 1920, height: 1080, color: '#10b981', text: 'People Sharing Resources' },
  { name: 'hero-2.jpg', width: 1920, height: 1080, color: '#f59e0b', text: 'Education Support' },
  { name: 'hero-3.jpg', width: 1920, height: 1080, color: '#ef4444', text: 'Medical Assistance' },
  { name: 'hero-4.jpg', width: 1920, height: 1080, color: '#8b5cf6', text: 'Community Support' },
  { name: 'money-bg.jpg', width: 1920, height: 1080, color: '#059669', text: 'Financial Support Background' },
  { name: 'clothes-bg.jpg', width: 1920, height: 1080, color: '#7c3aed', text: 'Clothing Donations Background' },
  { name: 'education-bg.jpg', width: 1920, height: 1080, color: '#2563eb', text: 'Education Resources Background' },
  { name: 'household-bg.jpg', width: 1920, height: 1080, color: '#ea580c', text: 'Household Items Background' },
  { name: 'medical-bg.jpg', width: 1920, height: 1080, color: '#dc2626', text: 'Medical Assistance Background' },
  { name: 'electronics-bg.jpg', width: 1920, height: 1080, color: '#0891b2', text: 'Electronics Background' },
  { name: 'og-image.jpg', width: 1200, height: 630, color: '#2563eb', text: 'Donare - Donation Platform' }
];

placeholders.forEach(placeholder => {
  const svg = createPlaceholderSVG(placeholder.width, placeholder.height, placeholder.color, placeholder.text);
  const filePath = path.join(imagesDir, placeholder.name);
  fs.writeFileSync(filePath, svg);
  console.log(`Created placeholder: ${placeholder.name}`);
});

// Create a simple manifest.json
const manifest = {
  "name": "Donare - Donation Platform",
  "short_name": "Donare",
  "description": "A donation platform connecting donors with people in need",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/favicon.ico",
      "sizes": "any",
      "type": "image/x-icon"
    }
  ]
};

fs.writeFileSync(path.join(__dirname, '../public/manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Created manifest.json');

console.log('All placeholder assets created successfully!');
