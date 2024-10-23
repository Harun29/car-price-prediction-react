const fs = require('fs');
const path = require('path');

const folderPath = 'public/CarPictures';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }
  const imageFiles = files.filter(file => {
    return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'].includes(path.extname(file).toLowerCase());
  });

  const imageArray = JSON.stringify(imageFiles);

  console.log('Image file names:', imageArray);
});
