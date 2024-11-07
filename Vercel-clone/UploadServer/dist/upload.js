"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = __importDefault(require("fs"));
require('dotenv').config();
const credentials = {
    accessKeyId: process.env.accessKeyId || '',
    secretAccessKey: process.env.secretAccessKey || ''
};
const s3Client = new client_s3_1.S3Client({
    region: process.env.region,
    credentials: credentials
});
const uploadToS3 = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = fs_1.default.readFileSync(localFilePath);
    try {
        const response = yield s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: 'xyz2622',
            Key: fileName,
            Body: fileContent
        }));
        console.log(response);
    }
    catch (error) {
        console.error('Error uploading file to S3:', error);
    }
});
exports.uploadToS3 = uploadToS3;
//   export async function uploadFilesToS3(files:string[]) {
//     for (const file of files) {
//         await uploadToS3(file.slice(__dirname.length + 1), file);
//     }
// }
