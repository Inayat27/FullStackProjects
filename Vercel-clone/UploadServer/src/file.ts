import * as fs from 'fs';
import path from 'path';

export const getAllFiles = (folderName: string): string[] => {
    let allFiles: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderName);

    allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderName, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            allFiles = allFiles.concat(getAllFiles(fullFilePath));
        } else {
            allFiles.push(fullFilePath);
        }
    });

    return allFiles;
};
