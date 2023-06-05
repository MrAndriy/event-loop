const fs = require('fs');
const path = require('path');

const folderPath = './docs';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Помилка читання папки:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileExtension = path.extname(file);

    if (fileExtension.startsWith('.excalidraw')) {
      const newFileName = file.replace('.excalidraw', '');
      const newFilePath = path.join(folderPath, newFileName);

      fs.rename(filePath, newFilePath, (err) => {
        if (err) {
          console.error(`Помилка зміни назви файлу ${file}:`, err);
        } else {
          console.log(`Змінено назву файлу ${file} на ${newFileName}`);
        }
      });
    } else {
      const randomName = Math.random().toString(36).substring(2, 8);
      const newFileName = `${randomName}${fileExtension}`;
      const newFilePath = path.join(folderPath, newFileName);

      fs.rename(filePath, newFilePath, (err) => {
        if (err) {
          console.error(`Помилка зміни назви файлу ${file}:`, err);
        } else {
          console.log(`Змінено назву файлу ${file} на ${newFileName}`);
        }
      });
    }
  });
});
