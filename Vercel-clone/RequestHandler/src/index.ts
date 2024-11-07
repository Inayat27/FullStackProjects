import express from "express";
import { S3 } from "aws-sdk";

const app = express();

const credentials = {
    accessKeyId: process.env.accessKeyId || "",
    secretAccessKey: process.env.secretAccessKey || "",
};

const s3 = new S3({
    region: process.env.region,
    credentials: credentials,
});


app.get("/*", async (req, res) => {

    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "xyz2622",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);


   
})
app.listen(process.env.PORT,() =>
{
    console.log(`Server running on port ${process.env.PORT}`);
    
})