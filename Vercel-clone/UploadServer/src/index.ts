import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { generate } from "./utils";
import { simpleGit } from "simple-git";
import { getAllFiles } from "./file";
import * as path from "path";
import { uploadToS3 } from "./upload";
import { createClient } from "redis";
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
const publisher = createClient();
publisher.connect();

// Inside the POST /deploy route handler
app.post("/deploy", async (req: Request, res: Response) => {
  const repoUrl = req.body.repoUrl;
  const id = generate();
  const client = createClient();
  client.connect();
  const outputDir = path.join(__dirname, `output/${id}`);

  await simpleGit().clone(repoUrl, outputDir);

  const files = getAllFiles(outputDir);

  // Uploading files to S3
  files.forEach(async (file) => {
    const relativePath = file.slice(__dirname.length + 1).replace(/\\/g, "/");
    // console.log(relativePath);

    // Uncomment the following line to upload to S3
    await uploadToS3(relativePath, file);
  });
  await new Promise((resolve) => setTimeout(resolve,5000));
  client.lPush("build-queues", id);
  client.hSet("status", id, "Uploaded");

  const value = client.hGet("status", id);

  res.json({
    id: id,
  });
});

app.get("/status", async (req, res) => {
  const id = req.query.id;
  const response = await publisher.hGet("status", id as string);
  res.json({
    status: response,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
