import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { AwsCredentialIdentity } from '@aws-sdk/types';
import fs from 'fs';
require('dotenv').config();



const credentials: AwsCredentialIdentity = {
    accessKeyId: process.env.accessKeyId || '',
    secretAccessKey: process.env.secretAccessKey || ''
};

const s3Client = new S3Client({
    region: process.env.region,
    credentials: credentials
});



  export const uploadToS3 = async  (fileName: string, localFilePath: string) =>
  {
    const fileContent = fs.readFileSync(localFilePath);
    try {
        const response = await s3Client.send(new PutObjectCommand({
            Bucket: 'xyz2622',
            Key: fileName,
            Body: fileContent
        }));
        console.log(response);
    } catch (error) {
        console.error('Error uploading file to S3:', error);
    }
  }



//   export async function uploadFilesToS3(files:string[]) {
//     for (const file of files) {
//         await uploadToS3(file.slice(__dirname.length + 1), file);
//     }
// }