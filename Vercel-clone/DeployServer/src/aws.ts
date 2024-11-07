import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";
import dotenv from 'dotenv';

dotenv.config();

const credentials = {
    accessKeyId: process.env.accessKeyId || "",
    secretAccessKey: process.env.secretAccessKey || "",
};

const s3 = new S3({
    region: process.env.region,
    credentials: credentials,
});

export async function downloadS3Folder(prefix: string) {
    const allFiles = await s3.listObjectsV2({
        Bucket: "xyz2622",
        Prefix: prefix
    }).promise();

    const allPromises = allFiles.Contents?.map(async ({ Key }) => {
        return new Promise(async (resolve) => {
            if (!Key) {
                resolve("");
                return;
            }
            const finalOutputPath = path.join(__dirname, Key);
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);
            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName, { recursive: true });
            }
            s3.getObject({
                Bucket: "xyz2622",
                Key
            }).createReadStream().pipe(outputFile).on("finish", () => {
                resolve("");
            });
        });
    }) || [];

    console.log("awaiting");
    await Promise.all(allPromises.filter(x => x !== undefined));
}

export function copyFinalDist(id: string) {
    const folderPath = path.join(__dirname, `output/${id}/dist/`).replace(/\\/g, "/");
    if (!fs.existsSync(folderPath)) {
        console.error("Folder does not exist:", folderPath);
        return;
    }

    const allFiles = getAllFiles(folderPath);
    allFiles.forEach(file => {
        const fileName = `dist/${id}/` + file.slice(folderPath.length + 1);
        uploadFile(fileName, file);
    });
}

export const getAllFiles = (folderName: string): string[] => {
    let allFiles: string[] = [];
    console.log(folderName);

    if (!fs.existsSync(folderName)) {
        console.error("Folder does not exist:", folderName);
        return allFiles;
    }

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

const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "xyz2622",
        Key: fileName,
    }).promise();
    console.log(response);
};
