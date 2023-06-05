const fs = require("fs").promises;
const path = require("path");

const folderPath = path.resolve(__dirname, "..", "docs");

console.log(process.cwd());

async function renameFiles() {
  try {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileExtension = path.extname(file);
      const fileNameWithoutExtension = path.basename(file, fileExtension);

      const secondToLastDotIndex = fileNameWithoutExtension.lastIndexOf(".");

      if (
        secondToLastDotIndex !== -1 &&
        fileNameWithoutExtension.substring(secondToLastDotIndex) ===
          ".excalidraw"
      ) {
        const newFileName =
          fileNameWithoutExtension.substring(0, secondToLastDotIndex) +
          fileExtension;
        const newFilePath = path.join(folderPath, newFileName);

        try {
          await fs.rename(filePath, newFilePath);
          console.log(`✨ Changed file name ${file} to ${newFileName}`);
        } catch (err) {
          console.error(`Error renaming file ${file}:`, err);
        }
      }
    }
  } catch (err) {
    console.error("Error reading folder:", err);
  }
}

renameFiles();
