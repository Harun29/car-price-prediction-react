const fs = require('fs');
const path = require('path');

// Specify the folder path
const folderPath = 'public/CarPictures'; // replace with your folder name

// Read the folder and get all the image file names
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Filter the files to include only images (e.g., .jpg, .png, .gif)
  const imageFiles = files.filter(file => {
    return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'].includes(path.extname(file).toLowerCase());
  });

  // Store the image file names in an array
  const imageArray = JSON.stringify(imageFiles);

  // Log the array to the console
  console.log('Image file names:', imageArray);
});
